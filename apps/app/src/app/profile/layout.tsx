import { SidebarProvider } from '@/components/dashboard/SidebarProvider';
import { TopBar } from '@/components/dashboard/TopBar';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col bg-background">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">{children}</div>
      </div>
    </SidebarProvider>
  );
}
