# Sovereign Green Infrastructure Fund (SGIF)

Bridging GCC capital to global carbon markets. SGIF is a $500M (expandable to $2B) closed-end, sovereign co-investment vehicle transforming green infrastructure into dual-revenue assets: Energy Yield + Carbon Credits.

Fund targets: 22% net IRR (14% yield + 8% carbon alpha), 7-year duration (3 deploy / 4 harvest), 3.2x multiplier via sovereign co-invest.

Repo: https://github.com/arazik-code/SOVEREIGN-GREEN-INFRASTRUCTURE-FUND

![CI](https://github.com/arazik-code/SOVEREIGN-GREEN-INFRASTRUCTURE-FUND/actions/workflows/ci.yml/badge.svg)

## Overview

- **Monorepo** (pnpm + Turbo): Next.js app + shared packages
- **App**: `apps/web` (Next.js 14, Tailwind, next-intl, Zustand, Vitest, Playwright)
- **Packages**: `packages/config`, `packages/lib`, `packages/types`, `packages/ui`, `packages/mock-server`
- **Design**: Futuristic, sovereign-grade glass/holo visuals; fully dark-mode optimized

## Tech Stack

- Next.js 14, TypeScript, Tailwind CSS
- Turbo + pnpm workspaces
- Vitest + Testing Library (unit) | Playwright (e2e)
- next-intl (i18n), Zustand (state), TanStack Query (data)

## Monorepo Structure

```
apps/
	web/                 # Next.js app (landing + investor portal)
packages/
	config/              # Shared ESLint/Prettier/Tailwind presets
	lib/                 # API/auth/RBAC/services
	types/               # Shared TypeScript types
	ui/                  # Shared UI primitives
	mock-server/         # Local mock server
```

## Quick Start

Prereqs: Node 20.x (>=18), pnpm 8+, Git

```bash
pnpm install
pnpm dev
```

App runs in `apps/web` (Next.js dev server). If mono commands are needed per app:

```bash
cd apps/web
pnpm dev
```

## Common Scripts (root)

```bash
pnpm dev           # turbo run dev (all apps)
pnpm build         # turbo run build
pnpm lint          # turbo run lint
pnpm -w test       # run tests across workspace (if configured in packages)
```

Per app (web):

```bash
pnpm --filter web lint
pnpm --filter web typecheck
pnpm --filter web test
pnpm --filter web test:coverage
# e2e (requires Playwright browsers):
pnpm --filter web test:e2e
```

## Environment

Root `.env` (not committed). Useful vars consumed by web:

```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_APP_URL=
```

Copy `.env.example` when added in the future.

## CI

GitHub Actions runs on PRs and pushes to `main`:

- Setup Node + pnpm
- Install deps with cache
- Lint, Typecheck, Build, Unit Test

Workflow: `.github/workflows/ci.yml`

## Testing & QA

- Unit: Vitest (`apps/web/test/setup.ts` configured with jsdom)
- E2E: Playwright (`apps/web/e2e`) — optional in CI; run locally or in a separate job

## Contributing

1. Create feature branch from `main`
2. Commit with clear messages
3. Open PR; ensure CI passes

## License

Internal/private use. Do not distribute without permission.
