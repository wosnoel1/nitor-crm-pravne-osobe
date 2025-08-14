
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Lidovi', href: '/lidovi' },
  { name: 'Klijenti', href: '/klijenti' },
  { name: 'Zadaci', href: '/zadaci' },
  { name: 'Banke', href: '/banke' },
  { name: 'Postavke', href: '/postavke' },
];

export default function Header() {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo lijevo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="Nitor Grupa" 
                width={120} 
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigacijski tabovi desno */}
          <div className="flex items-center space-x-8">
            <nav className="flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-nitor-blue',
                    pathname === item.href
                      ? 'text-nitor-blue border-b-2 border-nitor-blue pb-4 -mb-[1px]'
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Odjava gumb */}
            <button
              onClick={handleSignOut}
              className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
            >
              Odjava
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
