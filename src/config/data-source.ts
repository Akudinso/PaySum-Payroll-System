import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false, // Set to false in production and use migrations instead
  logging: false,
  entities: ["src/models/*.js"], 
  migrations: ["src/migrations/*.js"], // Path to migration files
  migrationsTableName: "migrations",
  extra: {
    ssl: {
        rejectUnauthorized: false,  // Required for Render PostgreSQL
    },
},
});
