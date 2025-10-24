
'use client';

import DashboardLayout from '@/components/dashboard/dashboard-layout';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { Loader2 } from 'lucide-react';
import AppointmentList from '@/components/pharmacist/appointment-list';

export default function PharmacistAppointmentsPage() {
  const { user, loading } = useRequireAuth('Pharmacist');

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DashboardLayout pageTitle="Appointments">
      <AppointmentList />
    </DashboardLayout>
  );
}
