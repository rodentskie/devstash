import { getItemTypesWithCounts } from '@/lib/db/items';
import { getRecentCollections } from '@/lib/db/collections';
import { Sidebar } from './Sidebar';

export async function SidebarWrapper() {
  const [itemTypes, recentCollections] = await Promise.all([
    getItemTypesWithCounts(),
    getRecentCollections(8),
  ]);

  const favoriteCollections = recentCollections.filter((c) => c.isFavorite);
  const otherCollections = recentCollections.filter((c) => !c.isFavorite);

  return (
    <Sidebar
      itemTypes={itemTypes}
      favoriteCollections={favoriteCollections}
      recentCollections={otherCollections}
    />
  );
}
