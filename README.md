# Web App Starter

This repository contains a reusable M0 web-app foundation. Consuming applications add their own domain models, authentication, workflows, integrations, and user experience; none of those product concerns belong here.

## Local development

Requirements: Node.js 20+, npm, and a Docker-compatible runtime such as Docker Desktop, Colima, or Rancher Desktop.

```sh
cp .env.example .env.local
# Use `docker-compose` with standalone Compose, or `docker compose` with the plugin.
docker-compose up -d postgres
npm install
npm run db:migrate
npm run dev
```

Open `http://localhost:3000`. The operational health endpoint is `http://localhost:3000/api/health`.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Pull requests run the same checks against an isolated PostgreSQL service in GitHub Actions. Configure Preview and Production with separate `DATABASE_URL` values; production credentials belong only in approved secret stores.
