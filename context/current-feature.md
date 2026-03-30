# Current Feature: Auth Setup - NextAuth + GitHub Provider

## Status

In Progress

## Goals

- Install NextAuth v5 (`next-auth@beta`) and `@auth/prisma-adapter`
- Set up split auth config pattern for edge compatibility
- Add GitHub OAuth provider
- Protect `/dashboard/*` routes using Next.js middleware proxy
- Redirect unauthenticated users to sign-in

## Notes

### Files to Create (under `apps/app`)

1. `src/auth.config.ts` — Edge-compatible config (providers only, no adapter)
2. `src/auth.ts` — Full config with Prisma adapter and JWT strategy
3. `src/app/api/auth/[...nextauth]/route.ts` — Export handlers from auth.ts
4. `src/proxy.ts` — Route protection with redirect logic
5. `src/types/next-auth.d.ts` — Extend Session type with user.id

### Key Gotchas

- Use `next-auth@beta` (not `@latest` which installs v4)
- Proxy file must be at `src/proxy.ts` (same level as `app/`)
- Use named export: `export const proxy = auth(...)` not default export
- Use `session: { strategy: 'jwt' }` with split config pattern
- Don't set custom `pages.signIn` — use NextAuth's default page

### Environment Variables

```
AUTH_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

### Testing

1. Go to `/dashboard` — should redirect to sign-in
2. Click "Sign in with GitHub"
3. Verify redirect back to `/dashboard` after auth

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-03-23** — Initial Setup & GitHub Connection
- **2026-03-24** — Dashboard UI Phase 1
- **2026-03-24** — Dashboard UI Phase 2
- **2026-03-24** — Dashboard UI Phase 3
- **2026-03-24** — Prisma 7 + Neon PostgreSQL Setup
- **2026-03-25** — Seed Data
- **2026-03-25** — Dashboard Collections (real DB data)
- **2026-03-25** — Dashboard Items (real DB data)
- **2026-03-25** — Stats & Sidebar (real DB data)
- **2026-03-25** — Dashboard Avatar (real DB data)
- **2026-03-25** — Dashboard Header Mobile Fix
