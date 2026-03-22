## Project Overview

**Devstash** is a developer knowledge hub for snippets, commands, prompts, notes, files, images, links, and custom types. It is a Next.js 15 application in an Nx monorepo managed with pnpm.

## Context Files

Read the following to get the full context of the project:

- @context/project-overview.md
- @context/coding-standards.md
- @context/ai-interaction.md
- @context/current-feature.md

## Commands

All tasks are run via Nx. The root `package.json` uses environment variable-based scripts:

```bash
# Dev server
TASK=dev APP=app pnpm run nx-run

# Production build
TASK=build APP=app pnpm run nx-run

# Unit tests (Jest)
TASK=test APP=app pnpm run nx-run

# Run a single test file
TASK=test APP=app pnpm run nx-run --testFile=src/specs/foo.spec.ts

# Lint
TASK=lint APP=app pnpm run nx-run

# E2E tests (Playwright, requires dev server)
TASK=e2e APP=app-e2e pnpm run nx-run
```

## Architecture

New apps and libraries are generated with:
- `APP=app pnpm run nx-next:app-generate` — scaffold a new Next.js app
- `APP=types pnpm run nx-react:lib-generate` — scaffold a new React library

