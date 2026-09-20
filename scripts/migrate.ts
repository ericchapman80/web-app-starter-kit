import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "../src/db";
await migrate(db, { migrationsFolder: "./drizzle" });
console.log("Database migrations applied.");
