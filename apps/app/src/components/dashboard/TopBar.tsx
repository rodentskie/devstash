'use client';

import { Search, Plus, Database, FolderPlus, PanelLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSidebar } from './SidebarProvider';

export function TopBar() {
  const { toggle, toggleMobile } = useSidebar();

  return (
    <header className="grid h-14 grid-cols-3 items-center border-b border-border px-4 shrink-0">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobile}
          className="md:hidden h-7 w-7"
          aria-label="Toggle menu"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggle}
          className="hidden md:flex h-7 w-7"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="h-4 w-4" />
        </Button>
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
          <Database className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-sm">DevStash</span>
      </div>
      <div className="relative w-full max-w-sm justify-self-center">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search items..." />
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="outline" size="sm">
          <FolderPlus className="h-4 w-4" />
          New Collection
        </Button>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          New Item
        </Button>
      </div>
    </header>
  );
}
