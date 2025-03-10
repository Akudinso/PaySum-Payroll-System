import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Admin } from "../models/admin";
import { Employee } from "../models/employee";
import { Payroll } from "../models/payroll";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false, // Set to false in production and use migrations instead
  logging: false,
  entities: [Admin, Employee, Payroll],
  migrations: [process.env.NODE_ENV === "production" ? "dist/migrations/*.js" : "src/migrations/*.ts"],
  migrationsTableName: "migrations",
  extra: {
    ssl: {
        rejectUnauthorized: false,  // Required for Render PostgreSQL
    },
},
});
