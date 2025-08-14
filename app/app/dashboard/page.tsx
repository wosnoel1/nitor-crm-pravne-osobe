
import { Suspense } from 'react';
import { DashboardLayout } from '@/components/dashboard/layout';
import { DashboardStats } from '@/components/dashboard/stats';
import { RecentLeads } from '@/components/dashboard/recent-leads';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { PerformanceChart } from '@/components/dashboard/performance-chart';
import { Loader2 } from 'lucide-react';

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="crm-grid-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="crm-card h-24 animate-pulse bg-muted" />
        ))}
      </div>
      <div className="crm-grid-2">
        <div className="crm-card h-64 animate-pulse bg-muted" />
        <div className="crm-card h-64 animate-pulse bg-muted" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Pregled vaših aktivnosti i performansi"
    >
      <Suspense fallback={<DashboardSkeleton />}>
        {/* Statistics Cards */}
        <div className="crm-dashboard-stats mb-8">
          <DashboardStats />
        </div>

        {/* Charts and Recent Activity */}
        <div className="crm-grid-2 mb-8">
          <div className="space-y-6">
            <PerformanceChart />
          </div>
          <div className="space-y-6">
            <RecentLeads />
          </div>
        </div>

        {/* Activity Feed */}
        <div className="mb-8">
          <ActivityFeed />
        </div>
      </Suspense>
    </DashboardLayout>
  );
}
