import Link from 'next/link';
import { getRecentCollections } from '@/lib/db/collections';
import { CollectionCard } from './CollectionCard';

export async function RecentCollections() {
  const collections = await getRecentCollections();

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Collections</h2>
        <Link href="/collections" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {collections.map((col) => (
          <CollectionCard key={col.id} col={col} />
        ))}
      </div>
    </section>
  );
}
