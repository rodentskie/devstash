import './global.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'DevStash',
  description: 'Your developer knowledge hub',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-foreground antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
