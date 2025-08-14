
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/navigation/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Eye, Pencil, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

// Mock podatci za demonstraciju
const mockLeads = [
  {
    id: 1,
    naziv_firme: 'Tech Solutions d.o.o.',
    oib: '12345678901',
    status: 'novi',
    datum_unosa: '2024-08-14',
  },
  {
    id: 2,
    naziv_firme: 'Gradnja Plus j.d.o.o.',
    oib: '09876543210',
    status: 'zazvati_kasnije',
    datum_unosa: '2024-08-13',
  },
];

const statusColors = {
  novi: 'bg-green-100 text-green-800',
  zazvati_kasnije: 'bg-yellow-100 text-yellow-800',
  neodradiv: 'bg-gray-100 text-gray-800',
  pretvoren: 'bg-blue-100 text-blue-800',
};

const statusLabels = {
  novi: 'Novi',
  zazvati_kasnije: 'Zazvati kasnije',
  neodradiv: 'Neodradiv',
  pretvoren: 'Pretvoren u klijenta',
};

export default function LidoviPage() {
  const [leads, setLeads] = useState(mockLeads);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  
  // Statistike za informativne panele
  const todayStats = {
    novi: leads.filter(lead => lead.status === 'novi').length,
    zazvati_kasnije: leads.filter(lead => lead.status === 'zazvati_kasnije').length,
    ukupno: leads.length,
  };

  const filteredLeads = leads.filter(lead => {
    // Filter po statusu
    if (statusFilter && statusFilter !== 'all' && statusFilter !== 'svi' && lead.status !== statusFilter) {
      return false;
    }
    
    // Filter po pretraživanju
    if (searchType && searchType !== 'all' && searchValue) {
      switch (searchType) {
        case 'naziv':
          return lead.naziv_firme.toLowerCase().includes(searchValue.toLowerCase());
        case 'oib':
          return lead.oib.includes(searchValue);
        default:
          return true;
      }
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Informativni panel - 3 statusna info-bloka */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Novi</p>
                <p className="text-2xl font-semibold text-gray-900">{todayStats.novi}</p>
                <p className="text-xs text-gray-400">Broj novih leadova za danas</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Zazvati kasnije</p>
                <p className="text-2xl font-semibold text-gray-900">{todayStats.zazvati_kasnije}</p>
                <p className="text-xs text-gray-400">Broj leadova označenih za poziv</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Ukupno danas</p>
                <p className="text-2xl font-semibold text-gray-900">{todayStats.ukupno}</p>
                <p className="text-xs text-gray-400">Zbroj svih leadova za današnji dan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter sekcija */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            {/* Filter #1 - Status leadova */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status leadova
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Odaberi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Odaberi</SelectItem>
                  <SelectItem value="svi">Svi</SelectItem>
                  <SelectItem value="novi">Novi</SelectItem>
                  <SelectItem value="zazvati_kasnije">Zazvati kasnije</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter #2 - Po kriteriju pretrage */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Po kriteriju pretrage
              </label>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger>
                  <SelectValue placeholder="Odaberi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Odaberi</SelectItem>
                  <SelectItem value="naziv">Naziv firme</SelectItem>
                  <SelectItem value="oib">OIB</SelectItem>
                  <SelectItem value="datum">Datum</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dinamičko polje za pretraživanje */}
            {searchType && searchType !== 'datum' && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vrijednost za pretraživanje
                </label>
                <Input
                  placeholder={searchType === 'naziv' ? 'Unesite naziv firme' : 'Unesite OIB'}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            )}

            {/* Gumb: + Dodaj novi lead */}
            <div className="flex-shrink-0">
              <Button className="bg-nitor-blue hover:bg-nitor-light-blue" onClick={() => console.log('Dodaj novi lead modal')}>
                <Plus className="w-4 h-4 mr-2" />
                Dodaj novi lead
              </Button>
            </div>
          </div>
        </div>

        {/* Grid prikaza leadova */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Naziv firme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    OIB
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Datum unosa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcije
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {lead.naziv_firme}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lead.oib}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={statusColors[lead.status as keyof typeof statusColors]}>
                        {statusLabels[lead.status as keyof typeof statusLabels]}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.datum_unosa).toLocaleDateString('hr-HR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link href={`/lidovi/${lead.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nema pronađenih leadova prema zadanim kriterijima.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
