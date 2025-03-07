import { AppDataSource } from "../config/data-source";
import { Payroll } from "../models/payroll";
import { Employee } from "../models/employee";
import { NotFoundError } from "../utils/error";

const payrollRepository = AppDataSource.getRepository(Payroll);


// Process payroll for an employee
export const createPayroll = async (
    employeeId: number,
    salary: number,
    tax: number,
    pension: number,
    nhis: number,
    payPeriod: string
) => {
    const employee = await AppDataSource.getRepository(Employee).findOne({ where: { id: employeeId } });
    if (!employee) throw new NotFoundError("Employee not found");

    const grossPay = salary;
    const netPay = grossPay - (tax + pension + nhis);

    const payrollEntry = payrollRepository.create({
        employee, // Pass the Employee entity
        grossPay,
        tax,
        pension,
        nhis,
        netPay,
        payPeriod,
    });

    await payrollRepository.save(payrollEntry);
    return payrollEntry;
};


// Fetch payroll records for a specific employee
export const getPayrollsByEmployee = async (employeeId: number) => {
    return await payrollRepository.find({ where: { employee: { id: employeeId } }, relations: ["employee"] });
};

// Fetch a single payroll record by ID
export const getPayrollById = async (id: number) => {
    const payroll = await payrollRepository.findOne({ where: { id }, relations: ["employee"] });
    if (!payroll) throw new NotFoundError("Payroll record not found");
    return payroll;
};

// Fetch all payroll records (For admin view)
export const getPayrolls = async () => {
    return await payrollRepository.find({ relations: ["employee"] });
};
