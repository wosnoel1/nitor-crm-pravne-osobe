
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import { 
  Users, 
  TrendingUp, 
  Target, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight 
} from 'lucide-react';

interface StatsData {
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
  totalValue: number;
  convertedValue: number;
  activeLeads: number;
  monthlyGrowth?: {
    leads: number;
    revenue: number;
    conversion: number;
  };
}

export function DashboardStats() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchStats();
    }
  }, [session]);

  if (isLoading || !stats) {
    return (
      <div className="crm-grid-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: 'Ukupno leadova',
      value: stats.totalLeads.toString(),
      description: `${stats.activeLeads} aktivnih`,
      icon: Users,
      trend: stats.monthlyGrowth?.leads,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Konvertirani leadovi',
      value: stats.convertedLeads.toString(),
      description: `${stats.conversionRate.toFixed(1)}% stopa konverzije`,
      icon: Target,
      trend: stats.monthlyGrowth?.conversion,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Ukupna vrijednost',
      value: formatCurrency(stats.totalValue),
      description: 'Svi leadovi',
      icon: DollarSign,
      trend: stats.monthlyGrowth?.revenue,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Konvertirana vrijednost',
      value: formatCurrency(stats.convertedValue),
      description: 'Zatvoreni poslovi',
      icon: TrendingUp,
      trend: stats.monthlyGrowth?.revenue,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="crm-grid-4">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        const hasTrend = stat.trend !== undefined;
        const isPositiveTrend = (stat.trend ?? 0) > 0;
        
        return (
          <Card key={index} className="crm-card hover:shadow-lg transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">
                {stat.value}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                {hasTrend && (
                  <div className={`flex items-center text-xs ${
                    isPositiveTrend ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isPositiveTrend ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(stat.trend!).toFixed(1)}%
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
