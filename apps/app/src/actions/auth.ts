'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function signInWithCredentials(
  email: string,
  password: string
): Promise<{ error: string } | undefined> {
  try {
    await signIn('credentials', { email, password, redirectTo: '/dashboard' });
    return undefined;
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: 'Invalid email or password' };
    }
    throw error;
  }
}

export async function signInWithGitHub() {
  await signIn('github', { redirectTo: '/dashboard' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/sign-in' });
}
