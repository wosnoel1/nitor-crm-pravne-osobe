
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/navigation/header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Save, 
  Calendar,
  Upload,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Mock podatci za demonstraciju
const mockClient = {
  id: 1,
  naziv_firme: 'Nitor Grupa d.o.o.',
  odgovorna_osoba: 'Ivana Novak',
  email: 'ivana@nitor.hr',
  telefon: '091 555 3333',
  oib: '12345678901',
  adresa: 'Ilica 1, 10000 Zagreb',
  datum_unosa: '2024-08-10',
  vrsta_klijenta: 'pravna_osoba',
  vrsta_firme: 'doo',
  status_klijenta: 'aktivan',
  trenutna_faza: 'ceka_odluku_banke',
  sljedeci_kontakt: '2024-08-15',
};

const phaseLabels = {
  ceka_dokumentaciju: 'Čeka dokumentaciju',
  dokumentacija_zaprimljena: 'Dokumentacija zaprimljena',
  ceka_odluku_banke: 'Čeka odluku banke',
  odluka_pozitivna: 'Odluka banke pozitivna',
  odluka_negativna: 'Odluka banke negativna',
  klijent_potpisao: 'Klijent potpisao ugovor',
};

const dokumenti = [
  { naziv: 'BON 1', status: 'ucitano', datum: '2024-08-12' },
  { naziv: 'BON 2', status: 'ucitano', datum: '2024-08-12' },
  { naziv: 'GFI', status: 'u_obradi', datum: '2024-08-13' },
  { naziv: 'Platne liste', status: 'nedostaje', datum: null },
  { naziv: 'Solventnost', status: 'ucitano', datum: '2024-08-11' },
];

const napomene = [
  {
    id: 1,
    datum: '2024-08-13 14:30',
    tekst: 'Klijent je poslao dodatnu dokumentaciju za GFI izvještaj',
    agent: 'AG001',
  },
  {
    id: 2,
    datum: '2024-08-12 09:15',
    tekst: 'Kontaktiran radi praćenja statusa zahtjeva',
    agent: 'AG001',
  },
];

export default function ClientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState(mockClient);
  const [newNote, setNewNote] = useState('');
  const [isOpenSections, setIsOpenSections] = useState<{[key: string]: boolean}>({
    'opci-podaci': true,
    'kreditni-zahtjev': false,
    'financijska-dokumentacija': true,
    'povratna-informacija': false,
    'kolaterali': false,
    'napomene': true,
  });

  const handleSaveChanges = () => {
    console.log('Spremam promjene:', client);
  };

  const handleMarkAsRealized = () => {
    console.log('Označavam kao realizirano');
  };

  const toggleSection = (section: string) => {
    setIsOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ucitano':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'u_obradi':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'nedostaje':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'ucitano':
        return 'Učitano';
      case 'u_obradi':
        return 'U obradi';
      case 'nedostaje':
        return 'Nedostaje';
      default:
        return 'Nepoznato';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Zaglavlje stranice */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Nazad
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Detalji klijenta</h1>
                <p className="text-sm text-gray-600">Pregled i ažuriranje svih informacija vezanih uz aktivnog klijenta</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lijeva kolona - glavni sadržaj */}
          <div className="lg:col-span-2 space-y-6">
            {/* Klijent kartica (osnovni podaci) */}
            <Card>
              <CardHeader>
                <CardTitle>Osnovni podaci klijenta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Naziv firme</label>
                    <Input
                      value={client.naziv_firme}
                      onChange={(e) => setClient(prev => ({ ...prev, naziv_firme: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Odgovorna osoba</label>
                    <Input
                      value={client.odgovorna_osoba}
                      onChange={(e) => setClient(prev => ({ ...prev, odgovorna_osoba: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <Input
                      value={client.email}
                      onChange={(e) => setClient(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <Input
                      value={client.telefon}
                      onChange={(e) => setClient(prev => ({ ...prev, telefon: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">OIB</label>
                    <Input value={client.oib} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Datum unosa</label>
                    <Input value={client.datum_unosa} disabled className="bg-gray-50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adresa</label>
                  <Input
                    value={client.adresa}
                    onChange={(e) => setClient(prev => ({ ...prev, adresa: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vrsta klijenta</label>
                    <Select value={client.vrsta_klijenta} onValueChange={(value) => setClient(prev => ({ ...prev, vrsta_klijenta: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pravna_osoba">Pravna osoba</SelectItem>
                        <SelectItem value="fizicka_osoba">Fizička osoba</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vrsta firme</label>
                    <Select value={client.vrsta_firme} onValueChange={(value) => setClient(prev => ({ ...prev, vrsta_firme: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="doo">d.o.o.</SelectItem>
                        <SelectItem value="jdoo">j.d.o.o.</SelectItem>
                        <SelectItem value="obrt">Obrt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trenutna faza procesa</label>
                  <Select value={client.trenutna_faza} onValueChange={(value) => setClient(prev => ({ ...prev, trenutna_faza: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(phaseLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Accordion sekcije */}
            <Card>
              <CardHeader>
                <CardTitle>Detaljne informacije</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Kreditni zahtjev */}
                <Collapsible open={isOpenSections['kreditni-zahtjev']} onOpenChange={() => toggleSection('kreditni-zahtjev')}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="font-medium">Kreditni zahtjev</span>
                    {isOpenSections['kreditni-zahtjev'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vrsta kredita</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Odaberi vrstu kredita" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hipotekarni">Hipotekarni</SelectItem>
                            <SelectItem value="gotovinski">Gotovinski</SelectItem>
                            <SelectItem value="namjenski">Namjenski</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Iznos traženog kredita (EUR)</label>
                        <Input type="number" placeholder="100000" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Svrha kredita</label>
                      <Textarea placeholder="Opišite svrhu kredita..." rows={2} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rok otplate (mjeseci)</label>
                      <Input type="number" placeholder="60" />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Financijska dokumentacija */}
                <Collapsible open={isOpenSections['financijska-dokumentacija']} onOpenChange={() => toggleSection('financijska-dokumentacija')}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="font-medium">Financijska dokumentacija</span>
                    {isOpenSections['financijska-dokumentacija'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div className="space-y-3">
                      {dokumenti.map((dok, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(dok.status)}
                            <div>
                              <span className="font-medium">{dok.naziv}</span>
                              <p className="text-xs text-gray-500">{getStatusLabel(dok.status)}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {dok.datum && (
                              <span className="text-xs text-gray-500">{dok.datum}</span>
                            )}
                            {dok.status === 'nedostaje' ? (
                              <Button size="sm" variant="outline" onClick={() => console.log('Upload dokument:', dok.naziv)}>
                                <Upload className="w-4 h-4 mr-1" />
                                Upload
                              </Button>
                            ) : (
                              <Button size="sm" variant="ghost">
                                <Download className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Povratna informacija iz banke */}
                <Collapsible open={isOpenSections['povratna-informacija']} onOpenChange={() => toggleSection('povratna-informacija')}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="font-medium">Povratna informacija iz banke</span>
                    {isOpenSections['povratna-informacija'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Odabrana banka</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Odaberi banku" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="privredna">Privredna banka Zagreb</SelectItem>
                            <SelectItem value="erste">Erste banka</SelectItem>
                            <SelectItem value="raiffeisen">Raiffeisen bank</SelectItem>
                            <SelectItem value="zagrebacka">Zagrebačka banka</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Datum predaje dokumentacije</label>
                        <Input type="date" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Odluka banke</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Status odluke" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="u_obradi">U obradi</SelectItem>
                          <SelectItem value="prihvaceno">Prihvaćeno</SelectItem>
                          <SelectItem value="odbijeno">Odbijeno</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Napomena</label>
                      <Textarea placeholder="Povratna informacija od banke..." rows={3} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Kolaterali */}
                <Collapsible open={isOpenSections['kolaterali']} onOpenChange={() => toggleSection('kolaterali')}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="font-medium">Kolaterali</span>
                    {isOpenSections['kolaterali'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vrsta kolaterala</label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Odaberi vrstu" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nekretnina">Nekretnina</SelectItem>
                            <SelectItem value="vozilo">Vozilo</SelectItem>
                            <SelectItem value="jamac">Jamac</SelectItem>
                            <SelectItem value="depozit">Depozit</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Procijenjena vrijednost (EUR)</label>
                        <Input type="number" placeholder="250000" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Opis kolaterala</label>
                      <Textarea placeholder="Detaljni opis kolaterala..." rows={2} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lokacija</label>
                      <Input placeholder="Adresa ili lokacija kolaterala" />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>

          {/* Desna kolona */}
          <div className="space-y-6">
            {/* Zakaži kontakt i status */}
            <Card>
              <CardHeader>
                <CardTitle>Zakaži kontakt i status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sljedeći kontakt</label>
                  <Input
                    type="datetime-local"
                    value={client.sljedeci_kontakt}
                    onChange={(e) => setClient(prev => ({ ...prev, sljedeci_kontakt: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Napomena za kontakt</label>
                  <Textarea placeholder="Razlog kontakta..." rows={3} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mikrostatus</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Odaberi status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="poziv_u_tijeku">Poziv u tijeku</SelectItem>
                      <SelectItem value="dogovoreni_uvjeti">Dogovoreni uvjeti</SelectItem>
                      <SelectItem value="ceka_dokumentaciju">Čeka dokumentaciju</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-nitor-blue hover:bg-nitor-light-blue" onClick={handleSaveChanges}>
                  <Save className="w-4 h-4 mr-2" />
                  Spremi promjene
                </Button>
              </CardContent>
            </Card>

            {/* Napomene */}
            <Card>
              <CardHeader>
                <CardTitle>Napomene</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nova napomena</label>
                  <Textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Unesite napomenu..."
                    rows={3}
                  />
                  <Button className="w-full mt-2" onClick={() => setNewNote('')}>
                    Dodaj napomenu
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Prethodne napomene</h4>
                  {napomene.map((napomena) => (
                    <div key={napomena.id} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-900">{napomena.tekst}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {napomena.datum} • {napomena.agent}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Akcijski gumbi na dnu */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button onClick={handleSaveChanges} className="bg-nitor-blue hover:bg-nitor-light-blue">
            <Save className="w-4 h-4 mr-2" />
            Spremi promjene
          </Button>
          <Button onClick={() => router.push('/klijenti')} variant="outline">
            Vrati se na popis klijenata
          </Button>
          <Button onClick={handleMarkAsRealized} variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
            <CheckCircle className="w-4 h-4 mr-2" />
            Označi kao realizirano
          </Button>
        </div>
      </div>
    </div>
  );
}
