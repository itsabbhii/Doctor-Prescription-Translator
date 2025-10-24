'use client';

import DashboardLayout from '@/components/dashboard/dashboard-layout';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { Loader2 } from 'lucide-react';
import ActivityMonitor from '@/components/admin/activity-monitor';
import UserManagement from '@/components/admin/user-management';

export default function AdminDashboardPage() {
  const { user, loading } = useRequireAuth('Admin');

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DashboardLayout pageTitle="Admin Dashboard">
        <div className="space-y-8">
            <ActivityMonitor />
            <UserManagement />
        </div>
    </DashboardLayout>
  );
}
