'use client';

import DashboardLayout from '@/components/dashboard/dashboard-layout';
import PrescriptionUploader from '@/components/patient/prescription-uploader';
import UploadHistory from '@/components/patient/upload-history';
import PageTitle from '@/components/shared/page-title';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { Loader2 } from 'lucide-react';

export default function PatientDashboardPage() {
  const { user, loading } = useRequireAuth('Patient');

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <DashboardLayout pageTitle="Patient Dashboard">
      <div className="space-y-8">
        <div>
          <PageTitle title={`Welcome, ${user.name}!`} />
          <p className="mt-1 text-muted-foreground">
            Upload your prescription to get started.
          </p>
        </div>
        <PrescriptionUploader />
        <UploadHistory />
      </div>
    </DashboardLayout>
  );
}
