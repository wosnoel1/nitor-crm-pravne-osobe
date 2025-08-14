
'use client';

import Header from '@/components/navigation/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User } from 'lucide-react';

export default function ZadaciPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Zadaci</h2>
          <p className="text-gray-600 mb-4">Ova stranica će biti implementirana u sljedećoj fazi.</p>
          <p className="text-sm text-gray-500">
            Ovdje će biti prikazani svi zadaci, podsjetnici i planovi za agente.
          </p>
        </div>
      </div>
    </div>
  );
}
