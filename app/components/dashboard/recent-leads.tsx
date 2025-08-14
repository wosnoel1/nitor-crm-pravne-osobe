
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatCurrency, getStatusColor } from '@/lib/utils';
import { Plus, ArrowRight, User, Building2, Phone } from 'lucide-react';
import type { LeadWithRelations } from '@/lib/types';

export function RecentLeads() {
  const { data: session } = useSession();
  const [leads, setLeads] = useState<LeadWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentLeads = async () => {
      try {
        const response = await fetch('/api/leads?limit=5&recent=true');
        if (response.ok) {
          const data = await response.json();
          setLeads(data.leads || []);
        }
      } catch (error) {
        console.error('Error fetching recent leads:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchRecentLeads();
    }
  }, [session]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-muted rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-1" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
                <div className="h-6 w-16 bg-muted rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Najnoviji leadovi</CardTitle>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild>
            <Link href="/leads/new">
              <Plus className="h-4 w-4 mr-1" />
              Dodaj lead
            </Link>
          </Button>
          <Button size="sm" variant="ghost" asChild>
            <Link href="/leads">
              Svi leadovi
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {leads?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Nema leadova</p>
            <p className="text-sm">Dodajte svoj prvi lead da biste počeli pratiti potencijalne klijente.</p>
            <Button className="mt-4" asChild>
              <Link href="/leads/new">
                <Plus className="h-4 w-4 mr-2" />
                Dodaj prvi lead
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {leads?.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link 
                        href={`/leads/${lead.id}`}
                        className="font-medium hover:underline"
                      >
                        {lead.firstName} {lead.lastName}
                      </Link>
                      {lead.company && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Building2 className="h-3 w-3 mr-1" />
                          {lead.company}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{formatDate(lead.createdAt)}</span>
                      {lead.phone && (
                        <div className="flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {lead.phone}
                        </div>
                      )}
                      {lead.value && (
                        <span className="font-medium text-green-600">
                          {formatCurrency(Number(lead.value))}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant="secondary" 
                    className={getStatusColor(lead.status?.name || '')}
                  >
                    {lead.status?.name}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
