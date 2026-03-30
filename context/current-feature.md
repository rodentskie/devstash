# Current Feature: Email Verification on Registration

## Status

In Progress

## Goals

- Send a verification email via Resend when a new user registers with email/password
- Email contains a unique, time-limited verification link
- Clicking the link marks `emailVerified` on the User record and activates the account
- Unverified users are blocked from accessing the app and shown a "check your email" screen
- Resend the verification email if requested

## Notes

- Email provider: **Resend** (API key already in `.env` as `RESEND_API_KEY`)
- App: `apps/app`
- The `VerificationToken` model (NextAuth standard) already exists in schema — no migration needed
- `User.emailVerified` field already exists — no migration needed
- Token flow: generate token on register → store in `VerificationToken` → email link → verify route sets `emailVerified` and deletes token
- Verification link format: `/auth/verify-email?token=<token>`
- Token should expire after 24 hours
- After verification, redirect user to sign-in page with a success message
- GitHub OAuth users skip email verification (they're pre-verified)

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
- **2026-03-30** — Auth UI (Custom sign-in/register pages + sidebar user menu with avatar & sign-out)
