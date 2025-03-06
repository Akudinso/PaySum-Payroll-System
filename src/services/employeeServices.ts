import { Employee } from "../models/Employee";
import { AppDataSource } from "../config/data-source";
import { Admin } from "../models/Admin";
import { NotFoundError, UnauthorizedError } from "../utils/errors";

const employeeRepository = AppDataSource.getRepository(Employee);

export const addEmployee = async (
  name: string, 
  email: string,
  salary: number,
 
  deductions: Partial<{ tax: number; pension: number; nhis: number }>,
  adminId: number
) => {
  const admin = await AppDataSource.getRepository(Admin).findOne({ where: { id: adminId } });
  if (!admin) throw new UnauthorizedError("Only admins can add employees");

  const newEmployee = employeeRepository.create({ name,email, salary, ...deductions });

  await employeeRepository.save(newEmployee);

  return newEmployee;
};

export const getEmployees = async () => {
  return await employeeRepository.find();
};

export const getEmployeeById = async (id: number) => {
  const employee = await employeeRepository.findOne({ where: { id } });
  if (!employee) throw new NotFoundError("Employee not found");
  return employee;
};

export const updateEmployee = async (
  id: number,
  salary: number,
  deductions: Partial<{ tax: number; pension: number; nhis: number }>
) => {
  const employee = await employeeRepository.findOne({ where: { id } });
  if (!employee) throw new NotFoundError("Employee not found");

  employee.salary = salary;
  Object.assign(employee, deductions);
  await employeeRepository.save(employee);
  return employee;
};

export const deleteEmployee = async (id: number) => {
  const employee = await employeeRepository.findOne({ where: { id } });
  if (!employee) throw new NotFoundError("Employee not found");
  await employeeRepository.remove(employee);
  return { message: "Employee removed successfully" };
};