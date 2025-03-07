import express from "express";
import {
  createEmployee,
  fetchEmployees,
  fetchEmployeeById,
  modifyEmployee,
  removeEmployee,
} from "../controllers/employeeController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

// Protected routes: Only accessible by authenticated admins
router.post("/", authMiddleware, createEmployee);
router.get("/", authMiddleware, fetchEmployees);
router.get("/:id", authMiddleware, fetchEmployeeById);
router.put("/:id", authMiddleware, modifyEmployee);
router.delete("/:id", authMiddleware, removeEmployee);

export default router;
