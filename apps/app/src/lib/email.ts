import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, token: string, baseUrl: string) {
  const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'DevStash <onboarding@resend.dev>',
    to,
    subject: 'Verify your email — DevStash',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom: 8px;">Verify your email</h2>
        <p style="color: #555; margin-bottom: 24px;">
          Thanks for signing up for DevStash! Click the button below to verify your email address and activate your account.
        </p>
        <a href="${verifyUrl}" style="display: inline-block; background: #3b82f6; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600;">
          Verify Email
        </a>
        <p style="color: #888; font-size: 13px; margin-top: 24px;">
          This link expires in 24 hours. If you didn't create a DevStash account, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}

export async function sendPasswordResetEmail(to: string, token: string, baseUrl: string) {
  const resetUrl = `${baseUrl}/reset-password?token=${token}`;

  await resend.emails.send({
    from: 'DevStash <onboarding@resend.dev>',
    to,
    subject: 'Reset your password — DevStash',
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
        <h2 style="margin-bottom: 8px;">Reset your password</h2>
        <p style="color: #555; margin-bottom: 24px;">
          We received a request to reset your DevStash password. Click the button below to choose a new password.
        </p>
        <a href="${resetUrl}" style="display: inline-block; background: #3b82f6; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600;">
          Reset Password
        </a>
        <p style="color: #888; font-size: 13px; margin-top: 24px;">
          This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.
        </p>
      </div>
    `,
  });
}
