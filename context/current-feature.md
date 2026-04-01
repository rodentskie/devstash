# Current Feature: Forgot Password

## Status

In Progress

## Goals

- Add a "Forgot password?" link to the sign-in page
- Create a `/forgot-password` page with an email input form
- API route `POST /api/auth/forgot-password` that generates a reset token (using existing `VerificationToken` model) and sends a password reset email via Resend
- Create a `/reset-password?token=...` page with a new password + confirm password form
- API route `POST /api/auth/reset-password` that validates the token, updates the user's hashed password, and deletes the used token
- Show appropriate success/error states on both pages

## Notes

- Reuse the existing `VerificationToken` model — use `password-reset:${email}` as the `identifier` to distinguish from email verification tokens
- Token expires in 1 hour (shorter window than email verification's 24h)
- Hash the new password with `bcryptjs` before saving (same as registration)
- No schema migration needed — `VerificationToken` already exists
- Follow existing auth UI patterns: `components/auth/` for form components, page files in `app/`
- Add `sendPasswordResetEmail` to `lib/email.ts` alongside the existing `sendVerificationEmail`
- Only send the email if the user exists AND has a password (don't reveal whether an email is registered — always show "if an account exists, you'll receive an email")

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
- **2026-03-30** — Email Verification on Registration (Resend)
- **2026-03-30** — Email Verification Flag (SKIP_EMAIL_VERIFICATION env var)
