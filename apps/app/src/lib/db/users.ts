import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export type CurrentUser = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
};

export type ProfileData = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    hasPassword: boolean;
    hasGitHub: boolean;
    createdAt: Date;
  };
  stats: {
    totalItems: number;
    totalCollections: number;
    itemsByType: { name: string; icon: string | null; color: string | null; count: number }[];
  };
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

export async function getProfileData(): Promise<ProfileData | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const [user, totalCollections, itemTypes] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        password: true,
        createdAt: true,
        accounts: { select: { provider: true } },
      },
    }),
    prisma.collection.count({ where: { userId } }),
    prisma.itemType.findMany({
      where: { isSystem: true },
      select: {
        name: true,
        icon: true,
        color: true,
        _count: { select: { items: { where: { userId } } } },
      },
    }),
  ]);

  if (!user) return null;

  const totalItems = itemTypes.reduce((sum, t) => sum + t._count.items, 0);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      hasPassword: !!user.password,
      hasGitHub: user.accounts.some((a) => a.provider === 'github'),
      createdAt: user.createdAt,
    },
    stats: {
      totalItems,
      totalCollections,
      itemsByType: itemTypes.map((t) => ({
        name: t.name,
        icon: t.icon,
        color: t.color,
        count: t._count.items,
      })),
    },
  };
}
