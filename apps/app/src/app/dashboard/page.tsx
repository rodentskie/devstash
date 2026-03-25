import { SidebarWrapper } from '@/components/dashboard/SidebarWrapper';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentCollections } from '@/components/dashboard/RecentCollections';
import { PinnedItems } from '@/components/dashboard/PinnedItems';
import { RecentItems } from '@/components/dashboard/RecentItems';

export default function DashboardPage() {
  return (
    <>
      <SidebarWrapper />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Your developer knowledge hub</p>
        </div>
        <StatsCards />
        <RecentCollections />
        <PinnedItems />
        <RecentItems />
        </div>
      </main>
    </>
  );
}
