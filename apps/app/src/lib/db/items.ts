import { prisma } from '@/lib/prisma';

export type ItemWithType = {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
  type: {
    name: string;
    icon: string | null;
    color: string | null;
  };
  tags: {
    tag: {
      name: string;
    };
  }[];
};

export type DashboardStats = {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
};

const itemInclude = {
  type: { select: { name: true, icon: true, color: true } },
  tags: { include: { tag: { select: { name: true } } } },
} as const;

export async function getPinnedItems(): Promise<ItemWithType[]> {
  return prisma.item.findMany({
    where: { isPinned: true },
    orderBy: { updatedAt: 'desc' },
    include: itemInclude,
  });
}

export async function getRecentItems(limit = 10): Promise<ItemWithType[]> {
  return prisma.item.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: itemInclude,
  });
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [totalItems, totalCollections, favoriteItems, favoriteCollections] = await Promise.all([
    prisma.item.count(),
    prisma.collection.count(),
    prisma.item.count({ where: { isFavorite: true } }),
    prisma.collection.count({ where: { isFavorite: true } }),
  ]);

  return { totalItems, totalCollections, favoriteItems, favoriteCollections };
}
