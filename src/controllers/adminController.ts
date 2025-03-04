import { Request, Response } from "express";
import { registerAdmin, verifyAdmin, loginAdmin } from "../services/adminService";


// Extend Express Request type for controller
interface CustomRequest extends Request {
    user?: any;
  }

export const adminSignup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await registerAdmin(email, password);
    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyAdminAccount = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;
    const response = await verifyAdmin(email, code);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await loginAdmin(email, password);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
};

export const getAdminDashboard = (req: CustomRequest, res: Response) => {
    res.json({ message: `Welcome, admin ${req.user?.email}!` });
  };
