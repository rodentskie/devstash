import { Pin } from 'lucide-react';
import { getPinnedItems } from '@/lib/db/items';
import { ItemRow } from './ItemRow';

export async function PinnedItems() {
  const pinnedItems = await getPinnedItems();

  if (pinnedItems.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-2 mb-3">
        <Pin className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-lg font-semibold">Pinned</h2>
      </div>
      <div className="rounded-lg border border-border bg-card divide-y divide-border">
        {pinnedItems.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
