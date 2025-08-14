
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DashboardHeader } from './header';
import { Sidebar } from './sidebar';
import { Loader2 } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function DashboardLayout({ children, title, description }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Učitavanje...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader 
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden lg:block" />
        
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="fixed inset-0 bg-black/50" 
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="crm-mobile-menu w-64">
              <div className="h-16 flex items-center px-4 border-b">
                <h2 className="text-lg font-semibold">Navigacija</h2>
              </div>
              <Sidebar />
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <main className="crm-container py-6">
            {(title || description) && (
              <div className="crm-dashboard-header">
                <div>
                  {title && (
                    <h1 className="crm-dashboard-title">{title}</h1>
                  )}
                  {description && (
                    <p className="text-muted-foreground mt-2">{description}</p>
                  )}
                </div>
              </div>
            )}
            
            <div className="animate-fade-in">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
