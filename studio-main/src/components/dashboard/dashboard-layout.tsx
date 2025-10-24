import type { ReactNode } from 'react';
import Sidebar from '@/components/dashboard/sidebar';
import Header from '@/components/dashboard/header';

interface DashboardLayoutProps {
  children: ReactNode;
  pageTitle: string;
}

export default function DashboardLayout({ children, pageTitle }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-transparent">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header pageTitle={pageTitle} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 animate-content-show">
          {children}
        </main>
      </div>
    </div>
  );
}
