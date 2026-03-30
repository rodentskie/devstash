# Current Feature — Auth UI (Sign In, Register & Sign Out)

## Status

In Progress

## Goals

- Replace NextAuth default pages with custom `/sign-in` and `/register` pages
- Sign-in page: email/password fields, "Sign in with GitHub" button, link to register, form validation
- Register page: name, email, password, confirm password, validation, submit to `/api/auth/register`, redirect to sign-in
- Bottom of sidebar: user avatar (GitHub image or initials), user name, dropdown with "Sign out" link, click navigates to `/profile`
- Reusable avatar component handling both GitHub image and initials fallback

## Notes

- Avatar logic: use `image` field if present (GitHub), else generate initials from `name` (e.g. "Brad Traversy" → "BT")
- All changes under `apps/app`
- Custom sign-in page replaces NextAuth default

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
- **2026-03-30** — Auth Setup (NextAuth v5 + GitHub OAuth + route protection)
- **2026-03-30** — Auth Credentials (Email/Password provider + registration API)
