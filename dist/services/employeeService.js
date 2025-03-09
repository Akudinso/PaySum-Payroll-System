"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getEmployees = exports.addEmployee = void 0;
const employee_1 = require("../models/employee");
const data_source_1 = require("../config/data-source");
const Admin_1 = require("../models/Admin");
const error_1 = require("../utils/error");
const employeeRepository = data_source_1.AppDataSource.getRepository(employee_1.Employee);
const addEmployee = (name, email, salary, deductions, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield data_source_1.AppDataSource.getRepository(Admin_1.Admin).findOne({ where: { id: adminId } });
    if (!admin)
        throw new error_1.UnauthorizedError("Only admins can add employees");
    const newEmployee = employeeRepository.create(Object.assign({ name, email, salary }, deductions));
    yield employeeRepository.save(newEmployee);
    return newEmployee;
});
exports.addEmployee = addEmployee;
const getEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield employeeRepository.find();
});
exports.getEmployees = getEmployees;
const getEmployeeById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield employeeRepository.findOne({ where: { id } });
    if (!employee)
        throw new error_1.NotFoundError("Employee not found");
    return employee;
});
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (id, salary, deductions) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield employeeRepository.findOne({ where: { id } });
    if (!employee)
        throw new error_1.NotFoundError("Employee not found");
    employee.salary = salary;
    Object.assign(employee, deductions);
    yield employeeRepository.save(employee);
    return employee;
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield employeeRepository.findOne({ where: { id } });
    if (!employee)
        throw new error_1.NotFoundError("Employee not found");
    yield employeeRepository.remove(employee);
    return { message: "Employee removed successfully" };
});
exports.deleteEmployee = deleteEmployee;
