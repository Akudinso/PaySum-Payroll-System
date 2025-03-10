import { Admin } from "../models/admin";
import { AppDataSource } from "../config/data-source";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "../utils/mailer";
import dotenv from "dotenv";

dotenv.config();

const adminRepository = AppDataSource.getRepository(Admin);

const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const registerAdmin = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationCode = generateVerificationCode();

  const otpExpiresAt = new Date();
  otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10); // OTP valid for 10 minutes


  const newAdmin = adminRepository.create({ email, password: hashedPassword, verificationCode, otpExpiresAt });
  await adminRepository.save(newAdmin);

  await sendVerificationEmail(email, verificationCode);
  return { message: "Verification code sent to email!" };
};



export const verifyAdmin = async (email: string, code: string) => {
  const admin = await adminRepository.findOne({ where: { email } });

  if (!admin) throw new Error("Admin not found");
  if (!admin.verificationCode || admin.verificationCode !== code) throw new Error("Invalid verification code");

  const currentTime = new Date();
  if (!admin.otpExpiresAt || currentTime > admin.otpExpiresAt) {
    throw new Error("OTP has expired. Request a new one.");
  }

  admin.isVerified = true;
  admin.verificationCode = null as any; 
  admin.otpExpiresAt = null as any; // Clear OTP expiration
  await adminRepository.save(admin);

  return { message: "Admin verified successfully!" };
};




export const loginAdmin = async (email: string, password: string) => {
  const admin = await adminRepository.findOne({ where: { email } });

  if (!admin || !admin.isVerified) throw new Error("Admin not found or not verified");
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: admin.id, email: admin.email, role: "admin"}, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return { token, message: "Login successful!" };
};
