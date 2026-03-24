import { Search, Plus, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

function TopBar() {
  return (
    <header className="grid h-14 grid-cols-3 items-center border-b border-border px-4 shrink-0">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
          <Database className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold text-sm">DevStash</span>
      </div>
      <div className="relative w-full max-w-sm justify-self-center">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search items..." />
      </div>
      <div className="flex justify-end">
        <Button size="sm">
          <Plus className="h-4 w-4" />
          New Item
        </Button>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
