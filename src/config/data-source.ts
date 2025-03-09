import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false, // Set to false in production and use migrations instead
  logging: false,
  entities: [process.env.NODE_ENV === "production" ? "dist/models/*.js" : "src/models/*.ts"], 
  migrations: [process.env.NODE_ENV === "production" ? "dist/migrations/*.js" : "src/migrations/*.ts"],
  migrationsTableName: "migrations",
  extra: {
    ssl: {
        rejectUnauthorized: false,  // Required for Render PostgreSQL
    },
},
});
