'use client';

import Link from 'next/link';
import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  ImageIcon,
  Link as LinkIcon,
  Star,
  MoreHorizontal,
} from 'lucide-react';
import { collections, itemTypes } from '@/lib/mock-data';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  ImageIcon,
  Link: LinkIcon,
};

export function RecentCollections() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Collections</h2>
        <Link href="/collections" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {collections.map((col) => {
          const dominantType = itemTypes.find((t) => t.id === col.dominantTypeId);
          const Icon = dominantType ? ICON_MAP[dominantType.icon] : null;
          const accentColor = dominantType?.color ?? '#6b7280';

          return (
            <Link
              key={col.id}
              href={`/collections/${col.id}`}
              className="group relative rounded-lg border border-border bg-card p-4 hover:border-border/80 hover:bg-accent/30 transition-colors overflow-hidden"
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-lg"
                style={{ backgroundColor: accentColor }}
              />

              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="font-medium text-sm truncate">
                  {col.name}
                  {col.isFavorite && (
                    <Star className="inline ml-1.5 h-3 w-3 fill-yellow-400 text-yellow-400 -mt-0.5" />
                  )}
                </h3>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-0.5 rounded hover:bg-accent"
                >
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground mb-1">{col.itemCount} items</p>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{col.description}</p>

              <div className="flex items-center gap-1.5">
                {Icon && (
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded"
                    style={{ backgroundColor: `${accentColor}22` }}
                  >
                    <Icon className="h-3 w-3" style={{ color: accentColor }} />
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
