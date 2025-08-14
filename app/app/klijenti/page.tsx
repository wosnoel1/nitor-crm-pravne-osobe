
'use client';

import { useState } from 'react';
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
import { Eye } from 'lucide-react';
import Link from 'next/link';

// Mock podatci za demonstraciju
const mockClients = [
  {
    id: 1,
    naziv_firme: 'Nitor Grupa d.o.o.',
    odgovorna_osoba: 'Ivana Novak',
    email: 'ivana@nitor.hr',
    telefon: '091 555 3333',
    faza: 'ceka_odluku_banke',
    zadnja_aktivnost: '2024-08-13',
  },
  {
    id: 2,
    naziv_firme: 'Digital Marketing Pro d.o.o.',
    odgovorna_osoba: 'Marko Petric',
    email: 'marko@dmpro.hr',
    telefon: '098 123 4567',
    faza: 'dokumentacija_poslana',
    zadnja_aktivnost: '2024-08-14',
  },
];

const phaseColors = {
  ceka_dokumentaciju: 'bg-orange-100 text-orange-800',
  dokumentacija_poslana: 'bg-blue-100 text-blue-800',
  ceka_odluku_banke: 'bg-purple-100 text-purple-800',
  odobrenje_zaprimljeno: 'bg-green-100 text-green-800',
  potpis_ugovora: 'bg-indigo-100 text-indigo-800',
  isplata_u_tijeku: 'bg-yellow-100 text-yellow-800',
  odbijen: 'bg-red-100 text-red-800',
  zatvoren: 'bg-gray-100 text-gray-800',
};

const phaseLabels = {
  ceka_dokumentaciju: 'Čeka dokumentaciju',
  dokumentacija_poslana: 'Dokumentacija poslana',
  ceka_odluku_banke: 'Čeka odluku banke',
  odobrenje_zaprimljeno: 'Odobrenje zaprimljeno',
  potpis_ugovora: 'Potpis ugovora u tijeku',
  isplata_u_tijeku: 'Isplata u tijeku',
  odbijen: 'Odbijen',
  zatvoren: 'Zatvoren / realiziran',
};

export default function KlijentiPage() {
  const [clients, setClients] = useState(mockClients);
  const [phaseFilter, setPhaseFilter] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchValue, setSearchValue] = useState('');
  
  // Statistike za gornje pregledne brojače
  const clientStats = {
    aktivni: clients.filter(client => !['odbijen', 'zatvoren'].includes(client.faza)).length,
    za_zvati_danas: clients.filter(client => {
      const today = new Date().toISOString().split('T')[0];
      return client.zadnja_aktivnost === today;
    }).length,
    ukupno: clients.length,
  };

  const filteredClients = clients.filter(client => {
    // Filter po fazi
    if (phaseFilter && phaseFilter !== 'all' && client.faza !== phaseFilter) {
      return false;
    }
    
    // Filter po pretraživanju
    if (searchType && searchType !== 'all' && searchValue) {
      switch (searchType) {
        case 'naziv':
          return client.naziv_firme.toLowerCase().includes(searchValue.toLowerCase());
        case 'email':
          return client.email.toLowerCase().includes(searchValue.toLowerCase());
        case 'telefon':
          return client.telefon.includes(searchValue);
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
        {/* Gornji pregledni brojači (status kartice) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Aktivni</p>
                <p className="text-2xl font-semibold text-gray-900">{clientStats.aktivni}</p>
                <p className="text-xs text-gray-400">Ukupan broj klijenata u tijeku obrade</p>
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
                <p className="text-sm font-medium text-gray-500">Za zvati danas</p>
                <p className="text-2xl font-semibold text-gray-900">{clientStats.za_zvati_danas}</p>
                <p className="text-xs text-gray-400">Klijenti kod kojih je zakazan kontakt za danas</p>
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
                <p className="text-sm font-medium text-gray-500">Ukupno</p>
                <p className="text-2xl font-semibold text-gray-900">{clientStats.ukupno}</p>
                <p className="text-xs text-gray-400">Sveukupni broj klijenata u sustavu</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter sekcija */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            {/* Filter po fazi (statusu klijenta) */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtar po fazi
              </label>
              <Select value={phaseFilter} onValueChange={setPhaseFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Odaberi fazu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Sve faze</SelectItem>
                  <SelectItem value="ceka_dokumentaciju">Čeka dokumentaciju</SelectItem>
                  <SelectItem value="dokumentacija_poslana">Dokumentacija poslana</SelectItem>
                  <SelectItem value="ceka_odluku_banke">Čeka odluku banke</SelectItem>
                  <SelectItem value="odobrenje_zaprimljeno">Odobrenje zaprimljeno</SelectItem>
                  <SelectItem value="potpis_ugovora">Potpis ugovora u tijeku</SelectItem>
                  <SelectItem value="isplata_u_tijeku">Isplata u tijeku</SelectItem>
                  <SelectItem value="odbijen">Odbijen</SelectItem>
                  <SelectItem value="zatvoren">Zatvoren / realiziran</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Filter po tipu pretrage */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtar po tipu pretrage
              </label>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger>
                  <SelectValue placeholder="Odaberi tip pretrage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Odaberi</SelectItem>
                  <SelectItem value="naziv">Naziv firme</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="telefon">Telefon</SelectItem>
                  <SelectItem value="datum">Datum unosa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Polje za unos tekstualne vrijednosti */}
            {searchType && searchType !== 'datum' && (
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vrijednost za pretraživanje
                </label>
                <Input
                  placeholder={`Unesite ${searchType}`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Grid - Popis klijenata */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Naziv firme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Odgovorna osoba
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Faza
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zadnja aktivnost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcija
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {client.naziv_firme}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.odgovorna_osoba}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {client.telefon}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={phaseColors[client.faza as keyof typeof phaseColors]}>
                        {phaseLabels[client.faza as keyof typeof phaseLabels]}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(client.zadnja_aktivnost).toLocaleDateString('hr-HR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/klijenti/${client.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Detalji
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nema pronađenih klijenata prema zadanim kriterijima.</p>
            </div>
          )}
        </div>

        {/* Napomena o dodavanju klijenta */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Napomena:</strong> Klijenti se dodaju automatski konverzijom iz leadova. 
            Nema direktnog unosa klijenata.
          </p>
        </div>
      </div>
    </div>
  );
}
