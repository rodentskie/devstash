import { Sidebar } from '@/components/dashboard/Sidebar';

export default function DashboardPage() {
  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Your developer knowledge hub</p>
      </main>
    </>
  );
}
