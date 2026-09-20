# Consuming the starter: Phase 0 handoff

This guide is for a developer creating a new application from `web-app-starter-kit`. The starter provides the engineering baseline; the consuming application owns its product name, domain schema, authentication, workflows, and UI.

## 1. Create the application repository

Create an empty GitHub repository for the new application. Do not initialize it with a README, `.gitignore`, or license because the starter already contains those files.

Clone the starter into a new local directory:

```sh
git clone https://github.com/ericchapman80/web-app-starter-kit.git my-app
cd my-app
```

Replace the starter remote with the consuming application's repository:

```sh
git remote remove origin
git remote add origin https://github.com/YOUR_ACCOUNT/my-app.git
git push -u origin main
```

Keep the starter history unless the project owner specifically wants a fresh history. The history documents the M0 engineering decisions and can be useful during maintenance.

## 2. Set up the developer workstation

On macOS with Homebrew:

```sh
./scripts/setup-macos.sh
```

The setup script selects Rancher Desktop for older Intel Macs running macOS 12 or earlier, and Colima for newer Intel Macs and Apple silicon. Follow the runtime-specific instructions printed by the script and in the main README.

Configure nvm once in the shell, then select the project version:

```sh
nvm install
nvm use
```

## 3. Start and verify the application locally

```sh
cp .env.example .env.local
npm install
./scripts/compose.sh up -d postgres
npm run db:migrate
npm run dev
```

Verify the application at `http://localhost:3000` and the database-backed health endpoint at `http://localhost:3000/api/health`.

Run the quality gates before opening the first application pull request:

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

## 4. Establish the Phase 0 checkpoint

Phase 0 is complete for the consuming application when:

- the application runs locally without production infrastructure
- local PostgreSQL starts through the selected runtime
- migrations apply successfully
- the health endpoint reports application and database availability
- lint, typecheck, tests, and production build pass
- the application repository has its own GitHub remote
- the initial `main` branch is pushed
- the first feature branch and pull request can run the GitHub Actions checks

At this point, the application is ready for Phase 1 product work. Product-specific changes should be made in the consuming repository, not back in `web-app-starter-kit`.

## 5. First consumer-owned changes

Before beginning product work, update the consuming repository's:

- `package.json` name
- application metadata in `app/layout.tsx`
- `README.md`
- `.env.example` database name and product-specific variables
- initial domain migration when the product schema is defined

Do not add authentication, product tables, or product workflows to the generic starter unless they are independently reusable M0 capabilities.
