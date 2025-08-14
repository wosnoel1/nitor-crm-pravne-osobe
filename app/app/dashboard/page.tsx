
'use client';

import Header from '@/components/navigation/header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  Calendar,
  Bell,
  BarChart3 
} from 'lucide-react';
import Link from 'next/link';

// Mock podatci za demonstraciju
const dashboardStats = {
  leads: {
    novi: 12,
    zazvati_kasnije: 8,
    ukupno_mjesec: 45,
  },
  clients: {
    aktivni: 23,
    za_zvati_danas: 5,
    ukupno: 67,
  },
  conversion_rate: 65.4,
  agent_performance: 85.2,
};

const recentActivities = [
  {
    id: 1,
    type: 'lead_created',
    description: 'Novi lead dodan: Tech Solutions d.o.o.',
    time: '10:30',
    status: 'novi',
  },
  {
    id: 2,
    type: 'client_updated',
    description: 'Klijent ažuriran: Gradnja Plus - faza promjenjena',
    time: '09:15',
    status: 'ažurirano',
  },
  {
    id: 3,
    type: 'call_scheduled',
    description: 'Zakazan poziv: Marketing Pro d.o.o.',
    time: '08:45',
    status: 'zakazano',
  },
];

const todayTasks = [
  {
    id: 1,
    task: 'Pozvati: Digital Solutions d.o.o.',
    time: '14:00',
    priority: 'visoka',
  },
  {
    id: 2,
    task: 'Poslati dokumentaciju: Nitor Grupa',
    time: '15:30',
    priority: 'srednja',
  },
  {
    id: 3,
    task: 'Follow-up: Tech Innovations',
    time: '16:00',
    priority: 'niska',
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* KPI kartice */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novi Leadovi</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.leads.novi}</div>
              <p className="text-xs text-muted-foreground">
                +12% od prošlog tjedna
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktivni Klijenti</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.clients.aktivni}</div>
              <p className="text-xs text-muted-foreground">
                {dashboardStats.clients.za_zvati_danas} za pozvati danas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.conversion_rate}%</div>
              <p className="text-xs text-muted-foreground">
                +5.2% od prošlog mjeseca
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Agent Performance</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.agent_performance}%</div>
              <p className="text-xs text-muted-foreground">
                Mjesečni prosjek
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Zadnji događaji */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Najnovije aktivnosti
              </CardTitle>
              <CardDescription>
                Pregled najnovijih aktivnosti u sustavu
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                    <Badge 
                      variant={activity.status === 'novi' ? 'default' : 'secondary'}
                      className="ml-2"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/aktivnosti">
                  <Button variant="outline" className="w-full">
                    Prikaži sve aktivnosti
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Zadaci za danas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Zadaci za danas
              </CardTitle>
              <CardDescription>
                Planirane aktivnosti i podsjetnici
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayTasks.map((task) => (
                  <div key={task.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {task.task}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {task.time}
                      </p>
                    </div>
                    <Badge 
                      variant={
                        task.priority === 'visoka' ? 'destructive' : 
                        task.priority === 'srednja' ? 'default' : 'secondary'
                      }
                      className="ml-2"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/zadaci">
                  <Button variant="outline" className="w-full">
                    Prikaži sve zadatke
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Brzi filteri leadova */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Brzi pristupi</CardTitle>
              <CardDescription>
                Direktni linkovi na najčešće korišćene sekcije
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/lidovi?status=novi">
                  <Button variant="outline" className="w-full justify-start">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    Novi leadovi ({dashboardStats.leads.novi})
                  </Button>
                </Link>
                <Link href="/lidovi?status=zazvati_kasnije">
                  <Button variant="outline" className="w-full justify-start">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    Za pozvati ({dashboardStats.leads.zazvati_kasnije})
                  </Button>
                </Link>
                <Link href="/klijenti?filter=za_zvati_danas">
                  <Button variant="outline" className="w-full justify-start">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    Klijenti za danas ({dashboardStats.clients.za_zvati_danas})
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
