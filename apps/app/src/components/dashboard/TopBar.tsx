'use client';

import { Search, Plus, Database, FolderPlus, PanelLeft, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSidebar } from './SidebarProvider';

export function TopBar() {
  const { toggle, toggleMobile } = useSidebar();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function openMobileSearch() {
    setMobileSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  if (mobileSearchOpen) {
    return (
      <header className="flex h-14 items-center gap-2 border-b border-border px-4 shrink-0 md:hidden">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input ref={inputRef} className="pl-9 w-full" placeholder="Search items..." />
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => setMobileSearchOpen(false)} aria-label="Close search">
          <X className="h-4 w-4" />
        </Button>
      </header>
    );
  }

  return (
    <header className="flex h-14 items-center justify-between gap-2 border-b border-border px-4 shrink-0">
      <div className="flex items-center gap-2 shrink-0">
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
      <div className="relative hidden md:block w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search items..." />
      </div>
      <div className="flex items-center justify-end gap-2 shrink-0">
        <Button variant="ghost" size="icon" className="md:hidden h-7 w-7" aria-label="Search" onClick={openMobileSearch}>
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="hidden md:flex">
          <FolderPlus className="h-4 w-4" />
          New Collection
        </Button>
        <Button variant="outline" size="icon" className="md:hidden h-7 w-7" aria-label="New Collection">
          <FolderPlus className="h-4 w-4" />
        </Button>
        <Button size="sm" className="hidden md:flex">
          <Plus className="h-4 w-4" />
          New Item
        </Button>
        <Button size="icon" className="md:hidden h-7 w-7" aria-label="New Item">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
