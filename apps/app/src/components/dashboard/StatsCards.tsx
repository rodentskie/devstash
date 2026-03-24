import { Package, FolderOpen, Star, Bookmark } from 'lucide-react';
import { collections, items, typeCounts } from '@/lib/mock-data';

const totalItems = Object.values(typeCounts).reduce((a, b) => a + b, 0);
const totalCollections = collections.length;
const favoriteItems = items.filter((i) => i.isFavorite).length;
const favoriteCollections = collections.filter((c) => c.isFavorite).length;

const stats = [
  { label: 'Total Items', value: totalItems, icon: Package, color: '#3b82f6' },
  { label: 'Collections', value: totalCollections, icon: FolderOpen, color: '#8b5cf6' },
  { label: 'Favorite Items', value: favoriteItems, icon: Star, color: '#fde047' },
  { label: 'Favorite Collections', value: favoriteCollections, icon: Bookmark, color: '#f97316' },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-card p-4 flex items-center gap-4"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md"
              style={{ backgroundColor: `${stat.color}1a` }}
            >
              <Icon className="h-5 w-5" style={{ color: stat.color }} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
