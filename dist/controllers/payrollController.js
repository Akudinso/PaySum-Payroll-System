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
exports.fetchPayrollsByEmployee = exports.fetchPayrollById = exports.fetchPayrolls = exports.createPayrollRecord = void 0;
const payrollService_1 = require("../services/payrollService");
// Create Payroll Record
const createPayrollRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId, salary, tax, pension, nhis, payPeriod } = req.body;
        const payroll = yield (0, payrollService_1.createPayroll)(employeeId, salary, tax, pension, nhis, payPeriod);
        res.status(201).json(payroll);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createPayrollRecord = createPayrollRecord;
// Fetch All Payrolls (Admin)
const fetchPayrolls = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payrolls = yield (0, payrollService_1.getPayrolls)();
        res.status(200).json(payrolls);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchPayrolls = fetchPayrolls;
// Fetch Payroll by ID
const fetchPayrollById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const payroll = yield (0, payrollService_1.getPayrollById)(parseInt(id));
        res.status(200).json(payroll);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchPayrollById = fetchPayrollById;
// Fetch Payrolls for a Specific Employee
const fetchPayrollsByEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        const payrolls = yield (0, payrollService_1.getPayrollsByEmployee)(parseInt(employeeId));
        res.status(200).json(payrolls);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchPayrollsByEmployee = fetchPayrollsByEmployee;
