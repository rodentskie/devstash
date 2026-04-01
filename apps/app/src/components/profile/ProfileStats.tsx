import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  ImageIcon,
  Link as LinkIcon,
} from 'lucide-react';
import type { ProfileData } from '@/lib/db/users';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  Image,
  ImageIcon,
  Link: LinkIcon,
};

interface ProfileStatsProps {
  stats: ProfileData['stats'];
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-sm font-medium text-muted-foreground mb-4">Usage</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-md bg-accent/50 px-4 py-3">
          <p className="text-2xl font-bold">{stats.totalItems}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total items</p>
        </div>
        <div className="rounded-md bg-accent/50 px-4 py-3">
          <p className="text-2xl font-bold">{stats.totalCollections}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Collections</p>
        </div>
      </div>

      <div className="space-y-2">
        {stats.itemsByType.map((type) => {
          const Icon = type.icon ? ICON_MAP[type.icon] : null;
          const color = type.color ?? '#6b7280';
          return (
            <div key={type.name} className="flex items-center gap-3">
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
                style={{ backgroundColor: `${color}22` }}
              >
                {Icon && <Icon className="h-3.5 w-3.5" style={{ color }} />}
              </div>
              <span className="flex-1 text-sm capitalize">{type.name}s</span>
              <span className="text-sm font-medium tabular-nums">{type.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
