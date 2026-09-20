import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
/** Placeholder table proves the migration seam without imposing product domain. */
export const applicationChecks = pgTable("application_checks", { id: uuid("id").defaultRandom().primaryKey(), createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull() });
