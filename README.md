# Web App Starter

This repository contains a reusable M0 web-app foundation. Consuming applications add their own domain models, authentication, workflows, integrations, and user experience; none of those product concerns belong here.

## Local development

Requirements: Node.js 20+, npm, and a Docker-compatible runtime such as Docker Desktop, Colima, or Rancher Desktop.

On macOS with Homebrew, start with:

```sh
./scripts/setup-macos.sh
```

The setup script detects the Mac and selects the container runtime automatically:

| Machine | Runtime | Rationale |
| --- | --- | --- |
| Intel Mac running macOS 12 or earlier | Rancher Desktop | Older macOS versions may not have compatible Homebrew bottles for Colima's Go dependencies, causing slow or failed source builds. |
| Newer Intel Mac or Apple silicon | Colima | Lightweight Docker-compatible runtime with a current Homebrew toolchain. |

The detection can be overridden:

```sh
WEB_APP_STARTER_RUNTIME=rancher ./scripts/setup-macos.sh
WEB_APP_STARTER_RUNTIME=colima ./scripts/setup-macos.sh
```

### Configure Node.js with nvm

Configure nvm once in your shell. Add these lines to `~/.zshrc` manually; do not append them every time you set up the project.

```sh
mkdir -p ~/.nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$(brew --prefix nvm)/nvm.sh" ] && . "$(brew --prefix nvm)/nvm.sh"
source ~/.zshrc
nvm install
nvm use
```

`Brewfile` installs nvm. The selected runtime profile installs the remaining container tools. The `.nvmrc` file keeps local development and CI on the same Node.js major version.

### Start the selected runtime

For Rancher Desktop, use:

- Kubernetes: disabled
- Container engine: `dockerd (Moby)`
- Application → Environment → PATH management: `Automatic`

Restart the terminal and select the Rancher context:

```sh
docker context use rancher-desktop
docker info
```

For Colima:

```sh
colima start
```

Both paths expose a Docker-compatible CLI and Compose interface. The project uses `scripts/compose.sh` so the same commands work with either `docker compose` or standalone `docker-compose`.

### Start the application

```sh
cp .env.example .env.local
./scripts/compose.sh up -d postgres
npm install
npm run db:migrate
npm run dev
```

Open `http://localhost:3000`. The operational health endpoint is `http://localhost:3000/api/health`.

## Stop the local environment

In the terminal running `npm run dev`, press `Ctrl+C` to stop the Next.js development server.

Stop the PostgreSQL container and remove the project network with:

```sh
./scripts/compose.sh down
```

When using Colima, stop the runtime after you are finished with all container-based projects:

```sh
colima stop
```

Stopping Colima is optional if you plan to keep using containers.

When using Rancher Desktop, quit Rancher Desktop from its menu bar application when you want to stop its runtime.

### If Homebrew installation was interrupted

Pressing `Ctrl+C` normally stops the active Homebrew command safely. Check for an active Homebrew process with:

```sh
ps aux | grep '[b]rew'
```

If no install process is listed, rerun `./scripts/setup-macos.sh`. An existing Homebrew `node` installation can remain on the machine; nvm takes precedence after `nvm use` and does not require removing it.

[^1]: The runtime split is intentional. Rancher Desktop provides its Docker CLI and Compose utilities as a prebuilt desktop runtime, while the Colima profile uses Homebrew's Docker CLI and standalone Compose packages. This avoids asking an older Intel/macOS combination to compile current Go-based Homebrew dependencies.

[^2]: The automatic rule is deliberately conservative: it treats Intel macOS 12 and earlier as the legacy path. Use `WEB_APP_STARTER_RUNTIME` to override the choice when a machine has a known-compatible setup.

## Verification

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Pull requests run the same checks against an isolated PostgreSQL service in GitHub Actions. Configure Preview and Production with separate `DATABASE_URL` values; production credentials belong only in approved secret stores.
