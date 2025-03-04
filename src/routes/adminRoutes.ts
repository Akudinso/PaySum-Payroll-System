import express, { Request, Response } from "express";
import { adminSignup, verifyAdminAccount, adminLogin, getAdminDashboard } from "../controllers/adminController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();
router.post("/signup", adminSignup);
router.post("/verify", verifyAdminAccount);
router.post("/login", adminLogin);

// Example protected route
router.get("/dashboard", authMiddleware, getAdminDashboard);
  

export default router;
