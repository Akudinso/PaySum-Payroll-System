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
exports.getPayrolls = exports.getPayrollById = exports.getPayrollsByEmployee = exports.createPayroll = void 0;
const data_source_1 = require("../config/data-source");
const payroll_1 = require("../models/payroll");
const employee_1 = require("../models/employee");
const error_1 = require("../utils/error");
const payrollRepository = data_source_1.AppDataSource.getRepository(payroll_1.Payroll);
// Process payroll for an employee
const createPayroll = (employeeId, salary, tax, pension, nhis, payPeriod) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield data_source_1.AppDataSource.getRepository(employee_1.Employee).findOne({ where: { id: employeeId } });
    if (!employee)
        throw new error_1.NotFoundError("Employee not found");
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
    yield payrollRepository.save(payrollEntry);
    return payrollEntry;
});
exports.createPayroll = createPayroll;
// Fetch payroll records for a specific employee
const getPayrollsByEmployee = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield payrollRepository.find({ where: { employee: { id: employeeId } }, relations: ["employee"] });
});
exports.getPayrollsByEmployee = getPayrollsByEmployee;
// Fetch a single payroll record by ID
const getPayrollById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const payroll = yield payrollRepository.findOne({ where: { id }, relations: ["employee"] });
    if (!payroll)
        throw new error_1.NotFoundError("Payroll record not found");
    return payroll;
});
exports.getPayrollById = getPayrollById;
// Fetch all payroll records (For admin view)
const getPayrolls = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield payrollRepository.find({ relations: ["employee"] });
});
exports.getPayrolls = getPayrolls;
