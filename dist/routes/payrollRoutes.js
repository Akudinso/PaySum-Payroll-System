"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payrollController_1 = require("../controllers/payrollController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
// Create a payroll record (Admin only)
router.post("/", authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, payrollController_1.createPayrollRecord);
// Get all payroll records (Admin only)
router.get("/", authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, payrollController_1.fetchPayrolls);
// Get payroll record by ID (Admin only)
router.get("/:id", authMiddleware_1.authMiddleware, authMiddleware_1.isAdmin, payrollController_1.fetchPayrollById);
// Get payroll records for a specific employee (Employee/Admin)
router.get("/employee/:employeeId", payrollController_1.fetchPayrollsByEmployee);
exports.default = router;
