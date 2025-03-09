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
exports.removeEmployee = exports.modifyEmployee = exports.fetchEmployeeById = exports.fetchEmployees = exports.createEmployee = void 0;
const employeeService_1 = require("../services/employeeService");
// Add a new employee
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, salary, deductions, adminId } = req.body;
        if (!name || !email || !salary || !adminId) {
            res.status(400).json({ error: "Email, salary, and adminId are required" });
            return;
        }
        const employee = yield (0, employeeService_1.addEmployee)(name, email, salary, deductions || {}, adminId);
        res.status(201).json(employee);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createEmployee = createEmployee;
// Get all employees
const fetchEmployees = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield (0, employeeService_1.getEmployees)();
        res.status(200).json(employees);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchEmployees = fetchEmployees;
// Get a single employee by ID
const fetchEmployeeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const employee = yield (0, employeeService_1.getEmployeeById)(parseInt(id));
        if (!employee) {
            res.status(404).json({ error: "Employee not found" });
            return;
        }
        res.status(200).json(employee);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.fetchEmployeeById = fetchEmployeeById;
// Update an employee's details
const modifyEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { salary, deductions } = req.body;
        if (!salary) {
            res.status(400).json({ error: "Salary is required for updating an employee" });
            return;
        }
        const updatedEmployee = yield (0, employeeService_1.updateEmployee)(parseInt(id), salary, deductions || {});
        res.status(200).json(updatedEmployee);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.modifyEmployee = modifyEmployee;
// Delete an employee
const removeEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, employeeService_1.deleteEmployee)(parseInt(id));
        res.status(200).json({ message: "Employee deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.removeEmployee = removeEmployee;
