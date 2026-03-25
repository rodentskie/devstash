import {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  ImageIcon,
  Link as LinkIcon,
  Pin,
  Star,
} from 'lucide-react';
import type { ItemWithType } from '@/lib/db/items';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  ImageIcon,
  Link: LinkIcon,
};

interface ItemRowProps {
  item: ItemWithType;
}

export function ItemRow({ item }: ItemRowProps) {
  const Icon = item.type.icon ? ICON_MAP[item.type.icon] : null;
  const color = item.type.color ?? '#6b7280';

  const date = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-accent/50 transition-colors cursor-pointer group">
      {/* Type icon */}
      <div
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: `${color}22` }}
      >
        {Icon && <Icon className="h-4 w-4" style={{ color }} />}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium truncate">{item.title}</span>
          {item.isPinned && <Pin className="h-3 w-3 text-muted-foreground shrink-0" />}
          {item.isFavorite && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 shrink-0" />}
        </div>
        {item.tags.length > 0 && (
          <div className="flex items-center gap-1 mt-0.5 flex-wrap">
            {item.tags.map(({ tag }) => (
              <span
                key={tag.name}
                className="text-xs px-1.5 py-0.5 rounded bg-accent text-muted-foreground"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Date */}
      <span className="text-xs text-muted-foreground shrink-0">{date}</span>
    </div>
  );
}
