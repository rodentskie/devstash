'use server';

import bcrypt from 'bcryptjs';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ error?: string; success?: boolean }> {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true },
  });

  if (!user?.password) return { error: 'No password set for this account' };

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) return { error: 'Current password is incorrect' };

  if (newPassword.length < 8) return { error: 'Password must be at least 8 characters' };

  const hashed = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });

  return { success: true };
}

export async function deleteAccount(): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) return { error: 'Unauthorized' };

  await prisma.user.delete({ where: { id: session.user.id } });

  return {};
}
