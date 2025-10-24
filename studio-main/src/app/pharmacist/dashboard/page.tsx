'use client';

import DashboardLayout from '@/components/dashboard/dashboard-layout';
import MedicineCatalog from '@/components/pharmacist/medicine-catalog';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { Loader2 } from 'lucide-react';

export default function PharmacistDashboardPage() {
  const { user, loading } = useRequireAuth('Pharmacist');

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DashboardLayout pageTitle="Medicine Catalog">
      <MedicineCatalog />
    </DashboardLayout>
  );
}
