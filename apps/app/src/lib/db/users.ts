import { prisma } from '@/lib/prisma';

export type CurrentUser = {
  id: string;
  name: string | null;
  email: string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const user = await prisma.user.findFirst({
    select: { id: true, name: true, email: true },
    orderBy: { createdAt: 'asc' },
  });

  return user ?? null;
}
