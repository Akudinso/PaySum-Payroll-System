import { Router } from "express";
import {
    createPayrollRecord,
    fetchPayrolls,
    fetchPayrollById,
    fetchPayrollsByEmployee
} from "../controllers/payrollController";
import { isAdmin, authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Create a payroll record (Admin only)
router.post("/", authMiddleware, isAdmin, createPayrollRecord);

// Get all payroll records (Admin only)
router.get("/", authMiddleware, isAdmin, fetchPayrolls);

// Get payroll record by ID (Admin only)
router.get("/:id", authMiddleware, isAdmin, fetchPayrollById);

// Get payroll records for a specific employee (Employee/Admin)
router.get("/employee/:employeeId", fetchPayrollsByEmployee);

export default router;

