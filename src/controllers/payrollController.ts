import { Request, Response } from "express";
import {
  createPayroll,
  getPayrolls,
  getPayrollById,
  getPayrollsByEmployee,
} from "../services/payrollService";

// Create Payroll Record
export const createPayrollRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId, salary, tax, pension, nhis, payPeriod } = req.body;
    const payroll = await createPayroll(employeeId, salary, tax, pension, nhis, payPeriod);
    res.status(201).json(payroll);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch All Payrolls (Admin)
export const fetchPayrolls = async (_req: Request, res: Response): Promise<void> => {
  try {
    const payrolls = await getPayrolls();
    res.status(200).json(payrolls);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Payroll by ID
export const fetchPayrollById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const payroll = await getPayrollById(parseInt(id));
    res.status(200).json(payroll);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch Payrolls for a Specific Employee
export const fetchPayrollsByEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const payrolls = await getPayrollsByEmployee(parseInt(employeeId));
    res.status(200).json(payrolls);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
