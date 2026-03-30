import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export type CurrentUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, image: true },
  });

  return user ?? null;
}
