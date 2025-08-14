
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { cn, hasPermission, canViewAllLeads } from '@/lib/utils';
import { 
  LayoutDashboard,
  Users,
  FileText,
  Activity,
  BarChart3,
  Settings,
  UserPlus,
  Calendar,
  Target,
  Database
} from 'lucide-react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  if (!session?.user) return null;

  const { role } = session.user;

  const navigationItems = [
    {
      title: 'Glavno',
      items: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          icon: LayoutDashboard,
          active: pathname === '/dashboard',
        },
        {
          href: '/leads',
          label: 'Leadovi',
          icon: Users,
          active: pathname?.startsWith('/leads'),
        },
        {
          href: '/activities',
          label: 'Aktivnosti',
          icon: Activity,
          active: pathname?.startsWith('/activities'),
        },
        {
          href: '/documents',
          label: 'Dokumenti',
          icon: FileText,
          active: pathname?.startsWith('/documents'),
        },
        {
          href: '/calendar',
          label: 'Kalendar',
          icon: Calendar,
          active: pathname?.startsWith('/calendar'),
        },
      ],
    },
    {
      title: 'Analitika',
      items: [
        {
          href: '/reports',
          label: 'Izvještaji',
          icon: BarChart3,
          active: pathname?.startsWith('/reports'),
          permission: 'view_reports',
        },
        {
          href: '/analytics',
          label: 'Analitika',
          icon: Target,
          active: pathname?.startsWith('/analytics'),
          permission: 'view_reports',
        },
      ],
    },
    {
      title: 'Upravljanje',
      items: [
        {
          href: '/agents',
          label: 'Agenti',
          icon: UserPlus,
          active: pathname?.startsWith('/agents'),
          permission: 'manage_agents',
        },
        {
          href: '/data',
          label: 'Podaci',
          icon: Database,
          active: pathname?.startsWith('/data'),
          permission: 'manage_agents',
        },
        {
          href: '/settings',
          label: 'Postavke',
          icon: Settings,
          active: pathname?.startsWith('/settings'),
        },
      ],
    },
  ];

  return (
    <div className={cn('pb-12 crm-sidebar', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-8">
            {navigationItems.map((section) => (
              <div key={section.title}>
                <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground uppercase">
                  {section.title}
                </h2>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    // Check permissions
                    if (item.permission && !hasPermission(role, item.permission)) {
                      return null;
                    }

                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          'crm-nav-link',
                          item.active && 'active'
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
