# ADR 0001: M0 foundation choices

## Status

Accepted

## Decision

Use Next.js with TypeScript, PostgreSQL, Drizzle ORM, version-controlled migrations, Vitest, and Playwright. Local development runs against PostgreSQL supplied by Docker Compose. Preview and production database URLs are injected by the deployment environment and are never committed.

Authentication, authorization, notifications, analytics, and product domain tables remain outside M0.

## Consequences

The repository is small and locally reproducible. The placeholder migration demonstrates the persistence seam; each consuming application may replace it with domain-specific schema. Deployment wiring can be added per hosting provider without changing application code.
