"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.verifyAdmin = exports.registerAdmin = void 0;
const Admin_1 = require("../models/Admin");
const data_source_1 = require("../config/data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../utils/mailer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const adminRepository = data_source_1.AppDataSource.getRepository(Admin_1.Admin);
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const registerAdmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const verificationCode = generateVerificationCode();
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10); // OTP valid for 10 minutes
    const newAdmin = adminRepository.create({ email, password: hashedPassword, verificationCode, otpExpiresAt });
    yield adminRepository.save(newAdmin);
    yield (0, mailer_1.sendVerificationEmail)(email, verificationCode);
    return { message: "Verification code sent to email!" };
});
exports.registerAdmin = registerAdmin;
const verifyAdmin = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield adminRepository.findOne({ where: { email } });
    if (!admin)
        throw new Error("Admin not found");
    if (!admin.verificationCode || admin.verificationCode !== code)
        throw new Error("Invalid verification code");
    const currentTime = new Date();
    if (!admin.otpExpiresAt || currentTime > admin.otpExpiresAt) {
        throw new Error("OTP has expired. Request a new one.");
    }
    admin.isVerified = true;
    admin.verificationCode = null;
    admin.otpExpiresAt = null; // Clear OTP expiration
    yield adminRepository.save(admin);
    return { message: "Admin verified successfully!" };
});
exports.verifyAdmin = verifyAdmin;
const loginAdmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield adminRepository.findOne({ where: { email } });
    if (!admin || !admin.isVerified)
        throw new Error("Admin not found or not verified");
    const isMatch = yield bcrypt_1.default.compare(password, admin.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: admin.id, email: admin.email, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return { token, message: "Login successful!" };
});
exports.loginAdmin = loginAdmin;
