'use client';

import StatsCard from '@/components/shared/stats-card';
import { Users, FileText, Beaker } from 'lucide-react';

export default function ActivityMonitor() {
  return (
    <div>
        <h2 className="text-2xl font-headline mb-4">System Activity</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatsCard
                title="Total Users"
                value="1,245"
                description="+20.1% from last month"
                icon={<Users className="h-4 w-4" />}
            />
            <StatsCard
                title="Prescriptions Analyzed"
                value="8,321"
                description="+180.1% from last month"
                icon={<FileText className="h-4 w-4" />}
            />
            <StatsCard
                title="Medicines in Catalog"
                value="489"
                description="+19 from last month"
                icon={<Beaker className="h-4 w-4" />}
            />
        </div>
    </div>
  );
}
