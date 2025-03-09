"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Admin_1 = require("../models/Admin");
const employee_1 = require("../models/employee");
const payroll_1 = require("../models/payroll");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: false, // Set to false in production and use migrations instead
    logging: false,
    entities: [Admin_1.Admin, employee_1.Employee, payroll_1.Payroll],
    migrations: [process.env.NODE_ENV === "production" ? "dist/migrations/*.js" : "src/migrations/*.ts"],
    migrationsTableName: "migrations",
    extra: {
        ssl: {
            rejectUnauthorized: false, // Required for Render PostgreSQL
        },
    },
});
