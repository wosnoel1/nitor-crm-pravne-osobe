
'use client';

import Header from '@/components/navigation/header';
import { Settings } from 'lucide-react';

export default function PostavkePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center py-12">
          <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Postavke</h2>
          <p className="text-gray-600 mb-4">Ova stranica će biti implementirana u sljedećoj fazi.</p>
          <p className="text-sm text-gray-500">
            Ovdje će biti sistemske postavke i konfiguracije.
          </p>
        </div>
      </div>
    </div>
  );
}
