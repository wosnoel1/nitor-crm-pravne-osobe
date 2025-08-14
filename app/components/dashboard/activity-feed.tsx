
'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDateTime, getAgentFullName } from '@/lib/utils';
import { 
  Phone, 
  Mail, 
  Calendar,
  FileText,
  User,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import type { ActivityWithRelations } from '@/lib/types';

const activityIcons = {
  CALL: Phone,
  EMAIL: Mail,
  MEETING: Calendar,
  FOLLOW_UP: Clock,
  DOCUMENT_UPLOAD: FileText,
  STATUS_CHANGE: TrendingUp,
  NOTE: FileText,
  SYSTEM: CheckCircle2,
};

const activityColors = {
  CALL: 'text-blue-600 bg-blue-50',
  EMAIL: 'text-green-600 bg-green-50',
  MEETING: 'text-purple-600 bg-purple-50',
  FOLLOW_UP: 'text-orange-600 bg-orange-50',
  DOCUMENT_UPLOAD: 'text-indigo-600 bg-indigo-50',
  STATUS_CHANGE: 'text-emerald-600 bg-emerald-50',
  NOTE: 'text-gray-600 bg-gray-50',
  SYSTEM: 'text-slate-600 bg-slate-50',
};

export function ActivityFeed() {
  const { data: session } = useSession();
  const [activities, setActivities] = useState<ActivityWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/activities?limit=10&recent=true');
        if (response.ok) {
          const data = await response.json();
          setActivities(data.activities || []);
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user) {
      fetchActivities();
    }
  }, [session]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-6 bg-muted rounded w-1/3" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="h-8 w-8 bg-muted rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
                <div className="h-3 w-16 bg-muted rounded" />
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
        <CardTitle className="text-lg font-semibold">Nedavne aktivnosti</CardTitle>
        <Link 
          href="/activities"
          className="text-sm text-primary hover:underline flex items-center"
        >
          Sve aktivnosti
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </CardHeader>
      
      <CardContent>
        {activities?.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Nema aktivnosti</p>
            <p className="text-sm">Aktivnosti će se prikazati kada počnete raditi s leadovima.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities?.map((activity) => {
              const Icon = activityIcons[activity.type] || User;
              const colorClass = activityColors[activity.type] || 'text-gray-600 bg-gray-50';
              const isCompleted = activity.completedAt !== null;
              
              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-full ${colorClass.split(' ')[1]} flex-shrink-0`}>
                    <Icon className={`h-4 w-4 ${colorClass.split(' ')[0]}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground">
                        {activity.title}
                      </p>
                      <Badge 
                        variant={isCompleted ? 'default' : 'secondary'} 
                        className="text-xs"
                      >
                        {isCompleted ? 'Završeno' : 'Planirano'}
                      </Badge>
                    </div>
                    
                    {activity.description && (
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {activity.agent && (
                        <span>
                          {getAgentFullName(activity.agent.firstName, activity.agent.lastName)}
                        </span>
                      )}
                      
                      {activity.lead && (
                        <Link 
                          href={`/leads/${activity.lead.id}`}
                          className="hover:underline"
                        >
                          {activity.lead.firstName} {activity.lead.lastName}
                        </Link>
                      )}
                      
                      <span>
                        {formatDateTime(activity.completedAt || activity.scheduledAt || activity.createdAt)}
                      </span>
                    </div>
                  </div>
                  
                  {activity.scheduledAt && !activity.completedAt && (
                    <div className="text-xs text-orange-600 font-medium">
                      {formatDateTime(activity.scheduledAt)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
