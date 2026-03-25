import { getItemTypesWithCounts } from '@/lib/db/items';
import { getRecentCollections } from '@/lib/db/collections';
import { getCurrentUser } from '@/lib/db/users';
import { Sidebar } from './Sidebar';

export async function SidebarWrapper() {
  const [itemTypes, recentCollections, user] = await Promise.all([
    getItemTypesWithCounts(),
    getRecentCollections(8),
    getCurrentUser(),
  ]);

  const favoriteCollections = recentCollections.filter((c) => c.isFavorite);
  const otherCollections = recentCollections.filter((c) => !c.isFavorite);

  return (
    <Sidebar
      itemTypes={itemTypes}
      favoriteCollections={favoriteCollections}
      recentCollections={otherCollections}
      user={user}
    />
  );
}
