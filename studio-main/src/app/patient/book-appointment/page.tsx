'use client';

import DashboardLayout from '@/components/dashboard/dashboard-layout';
import AppointmentBooking from '@/components/patient/appointment-booking';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { Loader2 } from 'lucide-react';

export default function BookAppointmentPage() {
  const { user, loading } = useRequireAuth('Patient');

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DashboardLayout pageTitle="Book an Appointment">
      <p className="mb-6 text-muted-foreground">
        Find an available specialist and book your appointment.
      </p>
      <AppointmentBooking patientId={user.id} />
    </DashboardLayout>
  );
}
