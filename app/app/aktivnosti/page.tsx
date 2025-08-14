
'use client';

import Header from '@/components/navigation/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Clock, User, FileText } from 'lucide-react';

// Mock podatci za demonstraciju
const activities = [
  {
    id: 1,
    datum: '2024-08-14 14:30',
    tip: 'poziv',
    opis: 'Kontaktiran klijent Nitor Grupa d.o.o. radi praćenja statusa zahtjeva',
    entitet: 'Nitor Grupa d.o.o.',
    agent: 'AG001 - Petar Novak',
    status: 'završeno',
  },
  {
    id: 2,
    datum: '2024-08-14 10:15',
    opis: 'Novi lead kreiran iz web forme: Tech Solutions d.o.o.',
    entitet: 'Tech Solutions d.o.o.',
    tip: 'lead_kreiran',
    agent: 'SYSTEM',
    status: 'automatski',
  },
  {
    id: 3,
    datum: '2024-08-14 09:45',
    tip: 'napomena',
    opis: 'Dodana napomena o potrebi za dodatnom dokumentacijom',
    entitet: 'Digital Marketing Pro d.o.o.',
    agent: 'AG002 - Marija Petić',
    status: 'dodano',
  },
  {
    id: 4,
    datum: '2024-08-13 16:20',
    tip: 'status_promjena',
    opis: 'Status leada promijenjen iz "Novi" u "Zazvati kasnije"',
    entitet: 'Gradnja Plus j.d.o.o.',
    agent: 'AG001 - Petar Novak',
    status: 'ažurirano',
  },
];

const getActivityIcon = (tip: string) => {
  switch (tip) {
    case 'poziv':
      return <Clock className="w-4 h-4 text-blue-500" />;
    case 'lead_kreiran':
      return <User className="w-4 h-4 text-green-500" />;
    case 'napomena':
      return <FileText className="w-4 h-4 text-purple-500" />;
    case 'status_promjena':
      return <Activity className="w-4 h-4 text-orange-500" />;
    default:
      return <Activity className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'završeno':
      return 'bg-green-100 text-green-800';
    case 'automatski':
      return 'bg-blue-100 text-blue-800';
    case 'dodano':
      return 'bg-purple-100 text-purple-800';
    case 'ažurirano':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AktivnostiPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Zaglavlje stranice */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sve aktivnosti</h1>
              <p className="text-sm text-gray-600 mt-1">
                Pregled svih aktivnosti u sustavu u kronološkom redoslijed
              </p>
            </div>
          </div>
        </div>

        {/* Statistike */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ukupno aktivnosti</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activities.length}</div>
              <p className="text-xs text-muted-foreground">Danas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pozivi</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activities.filter(a => a.tip === 'poziv').length}
              </div>
              <p className="text-xs text-muted-foreground">Obavljeno danas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Novi leadovi</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activities.filter(a => a.tip === 'lead_kreiran').length}
              </div>
              <p className="text-xs text-muted-foreground">Dodano danas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Napomene</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {activities.filter(a => a.tip === 'napomena').length}
              </div>
              <p className="text-xs text-muted-foreground">Dodano danas</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista aktivnosti */}
        <Card>
          <CardHeader>
            <CardTitle>Kronološki pregled aktivnosti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.tip)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.opis}
                        </p>
                        <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.datum}
                          </span>
                          <span className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {activity.agent}
                          </span>
                          {activity.entitet && (
                            <span className="font-medium">
                              {activity.entitet}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {activities.length === 0 && (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nema registriranih aktivnosti.</p>
              </div>
            )}

            {/* Paginacija */}
            <div className="mt-6 flex justify-center">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Prethodna
                </Button>
                <Button variant="outline" size="sm" className="bg-nitor-blue text-white" onClick={() => console.log('Page 1')}>
                  1
                </Button>
                <Button variant="outline" size="sm" onClick={() => console.log('Page 2')}>
                  2
                </Button>
                <Button variant="outline" size="sm" onClick={() => console.log('Page 3')}>
                  3
                </Button>
                <Button variant="outline" size="sm" onClick={() => console.log('Next page')}>
                  Sljedeća
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
