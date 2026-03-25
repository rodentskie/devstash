import Link from 'next/link';
import { Clock } from 'lucide-react';
import { getRecentItems } from '@/lib/db/items';
import { ItemRow } from './ItemRow';

export async function RecentItems() {
  const recentItems = await getRecentItems();

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold">Recent Items</h2>
        </div>
        <Link href="/items" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          View all
        </Link>
      </div>
      <div className="rounded-lg border border-border bg-card divide-y divide-border">
        {recentItems.map((item) => (
          <ItemRow key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
