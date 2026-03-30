'use client';

import { useState, useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CheckEmailCard() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleResend() {
    if (!email) return;
    setError('');

    startTransition(async () => {
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error ?? 'Something went wrong');
      }
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a verification link to{' '}
            {email ? <span className="font-medium text-foreground">{email}</span> : 'your email address'}.
            Click the link to activate your account.
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm space-y-4">
          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive the email? Check your spam folder or resend below.
          </p>

          {error && (
            <div className="rounded-md bg-destructive/10 border border-destructive/20 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          {sent ? (
            <p className="text-sm text-green-500">Verification email resent!</p>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResend}
              disabled={isPending || !email}
            >
              {isPending ? 'Sending…' : 'Resend verification email'}
            </Button>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground">
          <Link href="/sign-in" className="font-medium text-foreground hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
