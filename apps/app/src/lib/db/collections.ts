import { prisma } from '@/lib/prisma';

export type CollectionType = {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
};

export type CollectionWithStats = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  dominantType: CollectionType | null;
  allTypes: CollectionType[];
};

export async function getRecentCollections(limit = 6): Promise<CollectionWithStats[]> {
  const collections = await prisma.collection.findMany({
    orderBy: { updatedAt: 'desc' },
    take: limit,
    include: {
      items: {
        include: {
          item: {
            include: { type: true },
          },
        },
      },
    },
  });

  return collections.map((col) => {
    const typeCounts = new Map<string, { count: number; type: CollectionType }>();

    for (const ci of col.items) {
      const t = ci.item.type;
      const existing = typeCounts.get(t.id);
      if (existing) {
        existing.count++;
      } else {
        typeCounts.set(t.id, {
          count: 1,
          type: { id: t.id, name: t.name, icon: t.icon, color: t.color },
        });
      }
    }

    const sorted = Array.from(typeCounts.values()).sort((a, b) => b.count - a.count);

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col.items.length,
      dominantType: sorted[0]?.type ?? null,
      allTypes: sorted.map((s) => s.type),
    };
  });
}
