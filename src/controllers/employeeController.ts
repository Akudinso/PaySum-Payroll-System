import { Request, Response } from "express";
import {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeServices";

// Add a new employee
export const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {


    const {name, email, salary, deductions, adminId } = req.body;
    if (!name||!email || !salary || !adminId) {
      res.status(400).json({ error: "Email, salary, and adminId are required" });
      return;
    }

    const employee = await addEmployee(name,email, salary, deductions || {}, adminId);
    res.status(201).json(employee);
  } catch (error: any) {

    res.status(500).json({ error: error.message });
  }
};

// Get all employees
export const fetchEmployees = async (_req: Request, res: Response): Promise<void> => {
  try {
    const employees = await getEmployees();
    res.status(200).json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single employee by ID
export const fetchEmployeeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const employee = await getEmployeeById(parseInt(id));
    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }
    res.status(200).json(employee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update an employee's details
export const modifyEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { salary, deductions } = req.body;

    if (!salary) {
      res.status(400).json({ error: "Salary is required for updating an employee" });
      return;
    }

    const updatedEmployee = await updateEmployee(parseInt(id), salary, deductions || {});
    res.status(200).json(updatedEmployee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an employee
export const removeEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await deleteEmployee(parseInt(id));
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};