
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface ChartData {
  labels: string[];
  datasets: {
    leads: number[];
    conversions: number[];
    revenue: number[];
  };
}

export function PerformanceChart() {
  const { data: session } = useSession();
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch('/api/dashboard/performance');
        if (response.ok) {
          const data = await response.json();
          setChartData(data);
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchChartData();
    }
  }, [session]);

  if (isLoading || !chartData) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  // Placeholder chart - in Faza 2 we'll implement with recharts
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Performanse (zadnjih 30 dana)
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Grafikon performansi</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Detaljni prikaz će biti implementiran u Fazi 2
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="p-2 bg-white rounded border">
                <div className="text-blue-600 font-semibold">{chartData.datasets.leads.reduce((a, b) => a + b, 0)}</div>
                <div className="text-muted-foreground">Leadovi</div>
              </div>
              <div className="p-2 bg-white rounded border">
                <div className="text-green-600 font-semibold">{chartData.datasets.conversions.reduce((a, b) => a + b, 0)}</div>
                <div className="text-muted-foreground">Konverzije</div>
              </div>
              <div className="p-2 bg-white rounded border">
                <div className="text-purple-600 font-semibold">€{chartData.datasets.revenue.reduce((a, b) => a + b, 0).toLocaleString()}</div>
                <div className="text-muted-foreground">Prihod</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
