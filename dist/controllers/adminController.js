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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminDashboard = exports.adminLogin = exports.verifyAdminAccount = exports.adminSignup = void 0;
const adminService_1 = require("../services/adminService");
const adminSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const response = yield (0, adminService_1.registerAdmin)(email, password);
        res.status(201).json(response);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.adminSignup = adminSignup;
const verifyAdminAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, code } = req.body;
        const response = yield (0, adminService_1.verifyAdmin)(email, code);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.verifyAdminAccount = verifyAdminAccount;
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const response = yield (0, adminService_1.loginAdmin)(email, password);
        res.status(200).json(response);
    }
    catch (error) {
        res.status(401).json({ error: error.message });
    }
});
exports.adminLogin = adminLogin;
const getAdminDashboard = (req, res) => {
    var _a;
    res.json({ message: `Welcome, admin ${(_a = req.user) === null || _a === void 0 ? void 0 : _a.email}!` });
};
exports.getAdminDashboard = getAdminDashboard;
