'use client';

import { useState, useRef, useEffect } from 'react';
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
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Image,
  LogOut,
  User,
} from 'lucide-react';
import { useSidebar } from './SidebarProvider';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { signOutAction } from '@/actions/auth';
import type { ItemTypeWithCount } from '@/lib/db/items';
import type { CollectionWithStats } from '@/lib/db/collections';
import type { CurrentUser } from '@/lib/db/users';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Code,
  Sparkles,
  Terminal,
  StickyNote,
  File,
  ImageIcon,
  Image,
  Link: LinkIcon,
};

function getInitials(name: string | null): string {
  if (!name) return '?';
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

type SidebarProps = {
  itemTypes: ItemTypeWithCount[];
  favoriteCollections: CollectionWithStats[];
  recentCollections: CollectionWithStats[];
  user: CurrentUser | null;
};

function UserMenu({ user }: { user: CurrentUser | null }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const displayName = user?.name ?? 'Guest';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 rounded-md px-2 py-2 hover:bg-accent transition-colors text-left"
      >
        <Avatar className="size-7">
          <AvatarImage src={user?.image ?? undefined} alt={displayName} />
          <AvatarFallback>{getInitials(user?.name ?? null)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium truncate">{displayName}</p>
          {user?.email && (
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          )}
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-1 rounded-md border border-border bg-card shadow-md overflow-hidden">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
          >
            <User className="h-4 w-4 text-muted-foreground" />
            Profile
          </Link>
          <div className="border-t border-border" />
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors text-destructive"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function CollapsedSidebar({ itemTypes, favoriteCollections, user }: Omit<SidebarProps, 'recentCollections'>) {
  const displayName = user?.name ?? 'Guest';
  return (
    <div className="flex h-full w-14 flex-col items-center bg-card border-r border-border py-3">
      <nav className="flex flex-1 flex-col items-center gap-1 overflow-y-auto w-full px-2">
        {itemTypes.map((type) => {
          const Icon = ICON_MAP[type.icon ?? ''];
          return (
            <Link
              key={type.id}
              href={`/items/${type.slug}`}
              title={type.name}
              className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors"
            >
              {Icon && <Icon className="h-4 w-4" style={{ color: type.color ?? undefined }} />}
            </Link>
          );
        })}

        <div className="my-1 w-6 border-t border-border" />

        {favoriteCollections.map((col) => (
          <Link
            key={col.id}
            href={`/collections/${col.id}`}
            title={col.name}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent transition-colors"
          >
            <FolderOpen className="h-4 w-4 text-yellow-400" />
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-3 border-t border-border w-full flex justify-center">
        <Link href="/profile" title={displayName}>
          <Avatar className="size-7">
            <AvatarImage src={user?.image ?? undefined} alt={displayName} />
            <AvatarFallback>{getInitials(user?.name ?? null)}</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </div>
  );
}

function ExpandedSidebar({ itemTypes, favoriteCollections, recentCollections, user }: SidebarProps) {
  const [typesOpen, setTypesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r border-border">
      <nav className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Types Section */}
        <div>
          <button
            onClick={() => setTypesOpen((v) => !v)}
            className="flex w-full items-center justify-between px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors"
          >
            Types
            {typesOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </button>
          {typesOpen && (
            <ul className="mt-1 space-y-0.5">
              {itemTypes.map((type) => {
                const Icon = ICON_MAP[type.icon ?? ''];
                return (
                  <li key={type.id}>
                    <Link
                      href={`/items/${type.slug}`}
                      className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" style={{ color: type.color ?? undefined }} />}
                        <span className="capitalize">{type.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{type.count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Collections Section */}
        <div>
          <button
            onClick={() => setCollectionsOpen((v) => !v)}
            className="flex w-full items-center justify-between px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground uppercase tracking-wider transition-colors"
          >
            Collections
            {collectionsOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          </button>
          {collectionsOpen && (
            <div className="mt-1 space-y-3">
              {favoriteCollections.length > 0 && (
                <div>
                  <p className="px-2 py-1 text-xs text-muted-foreground uppercase tracking-wider">
                    Favorites
                  </p>
                  <ul className="space-y-0.5">
                    {favoriteCollections.map((col) => (
                      <li key={col.id}>
                        <Link
                          href={`/collections/${col.id}`}
                          className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <span className="truncate">{col.name}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 shrink-0 ml-2" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {recentCollections.length > 0 && (
                <div>
                  <p className="px-2 py-1 text-xs text-muted-foreground uppercase tracking-wider">
                    Recent
                  </p>
                  <ul className="space-y-0.5">
                    {recentCollections.map((col) => (
                      <li key={col.id}>
                        <Link
                          href={`/collections/${col.id}`}
                          className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <span className="truncate">{col.name}</span>
                          <span
                            className="h-2.5 w-2.5 rounded-full shrink-0 ml-2"
                            style={{ backgroundColor: col.dominantType?.color ?? '#6b7280' }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                href="/collections"
                className="block px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                View all collections →
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* User Menu */}
      <div className="border-t border-border p-3">
        <UserMenu user={user} />
      </div>
    </div>
  );
}

export function Sidebar({ itemTypes, favoriteCollections, recentCollections, user }: SidebarProps) {
  const { open, mobileOpen, toggleMobile } = useSidebar();

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className="hidden md:block shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out"
        style={{ width: open ? '256px' : '56px' }}
      >
        {open ? (
          <ExpandedSidebar
            itemTypes={itemTypes}
            favoriteCollections={favoriteCollections}
            recentCollections={recentCollections}
            user={user}
          />
        ) : (
          <CollapsedSidebar itemTypes={itemTypes} favoriteCollections={favoriteCollections} user={user} />
        )}
      </div>

      {/* Mobile drawer overlay */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={toggleMobile}
          />
          <div className="fixed inset-y-0 left-0 z-50 md:hidden">
            <ExpandedSidebar
              itemTypes={itemTypes}
              favoriteCollections={favoriteCollections}
              recentCollections={recentCollections}
              user={user}
            />
          </div>
        </>
      )}
    </>
  );
}
