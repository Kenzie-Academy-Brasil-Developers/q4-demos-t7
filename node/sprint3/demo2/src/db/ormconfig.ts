import { ConnectionOptions } from "typeorm";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const devConfig = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: false,
  entities: [path.join(__dirname, "../entities/**/*.*")],
  migrations: [path.join(__dirname, "../migrations/**/*.*")],
  cli: {
    entitiesDir: path.join(__dirname, "../entities"),
    migrationsDir: path.join(__dirname, "../migrations"),
  },
} as ConnectionOptions;

const prodConfig = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  logging: false,
  ssl: { rejectUnauthorized: false },
  entities: [path.join(__dirname, "../entities/**/*.*")],
  migrations: [path.join(__dirname, "../migrations/**/*.*")],
  cli: {
    entitiesDir: path.join(__dirname, "../entities"),
    migrationsDir: path.join(__dirname, "../migrations"),
  },
} as ConnectionOptions;

export default process.env.NODE_ENV === "production" ? prodConfig : devConfig;
