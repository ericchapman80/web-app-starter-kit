import { config } from "dotenv";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "../src/db";

config({ path: ".env.local" });
config({ path: ".env" });

async function main() {
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Database migrations applied.");
}

main().catch((error) => {
  console.error("Database migration failed.", error);
  process.exitCode = 1;
});
