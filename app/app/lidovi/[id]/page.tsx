
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
  UserCheck, 
  Clock, 
  XCircle,
  ChevronDown,
  ChevronRight,
  Plus,
  Upload
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Mock podatci za demonstraciju
const mockLead = {
  id: 1,
  naziv_firme: 'Tech Solutions d.o.o.',
  oib: '12345678901',
  telefon: '01 555 1234',
  email: 'info@techsolutions.hr',
  agent_zaduzeni: 'AG001 - Petar Novak',
  datum_unosa: '2024-08-14',
  izvor_leada: 'web',
  napomena: 'Kompanija traži kredit za proširenje poslovanja',
  status: 'novi',
};

const mockActivities = [
  {
    id: 1,
    datum: '2024-08-14 10:30',
    tip: 'poziv',
    opis: 'Uspostavljen prvi kontakt s klijentom',
    agent: 'AG001',
  },
  {
    id: 2,
    datum: '2024-08-14 09:15',
    tip: 'napomena',
    opis: 'Lead automatski kreiran iz web forme',
    agent: 'SYSTEM',
  },
];

const statusOptions = [
  { value: 'novi', label: 'Novi' },
  { value: 'neodradiv', label: 'Neodradiv' },
  { value: 'zazvati_kasnije', label: 'Zazvati kasnije' },
  { value: 'pretvoren', label: 'Pretvoren u klijenta' },
];

export default function LeadDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState(mockLead);
  const [activities] = useState(mockActivities);
  const [newNote, setNewNote] = useState('');
  const [noteCategory, setNoteCategory] = useState('');
  const [isOpenSections, setIsOpenSections] = useState<{[key: string]: boolean}>({
    'tip-firme': false,
    'vrsta-kredita': false,
    'financije': false,
    'blokade': false,
    'kolaterali': false,
    'dokumenti': false,
    'kontakti': false,
  });

  const handleSaveChanges = () => {
    // Implementirati spremanje promjena
    console.log('Spremam promjene:', lead);
  };

  const handleConvertToClient = () => {
    // Implementirati konverziju u klijenta
    console.log('Konvertiram u klijenta:', lead);
    router.push(`/klijenti/${lead.id}`);
  };

  const handleScheduleCallback = () => {
    // Implementirati zakazivanje ponovnog poziva
    console.log('Zakazujem ponovni poziv');
  };

  const handleMarkAsUnworkable = () => {
    // Implementirati označavanje kao neodradiv
    console.log('Označavam kao neodradiv');
  };

  const handleAddNote = () => {
    if (newNote.trim() && noteCategory) {
      // Dodaj napomenu u aktivnosti
      console.log('Dodajem napomenu:', newNote, noteCategory);
      setNewNote('');
      setNoteCategory('');
    }
  };

  const toggleSection = (section: string) => {
    setIsOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
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
                <h1 className="text-2xl font-bold text-gray-900">
                  Detalji leada: {lead.naziv_firme}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lijeva kolona - osnovni podaci i sekcije */}
          <div className="lg:col-span-2 space-y-6">
            {/* Osnovni podaci o leadu */}
            <Card>
              <CardHeader>
                <CardTitle>Osnovni podaci</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Naziv firme
                    </label>
                    <Input
                      value={lead.naziv_firme}
                      onChange={(e) => setLead(prev => ({ ...prev, naziv_firme: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      OIB <span className="text-gray-400">(read-only)</span>
                    </label>
                    <Input value={lead.oib} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon
                    </label>
                    <Input
                      value={lead.telefon}
                      onChange={(e) => setLead(prev => ({ ...prev, telefon: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      value={lead.email}
                      onChange={(e) => setLead(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Agent zadužen <span className="text-gray-400">(read-only)</span>
                    </label>
                    <Input value={lead.agent_zaduzeni} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Datum unosa <span className="text-gray-400">(read-only)</span>
                    </label>
                    <Input value={lead.datum_unosa} disabled className="bg-gray-50" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Izvor leada
                  </label>
                  <Select value={lead.izvor_leada} onValueChange={(value) => setLead(prev => ({ ...prev, izvor_leada: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web</SelectItem>
                      <SelectItem value="telefon">Telefon</SelectItem>
                      <SelectItem value="preporuka">Preporuka</SelectItem>
                      <SelectItem value="ostalo">Ostalo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Napomena
                  </label>
                  <Textarea
                    value={lead.napomena}
                    onChange={(e) => setLead(prev => ({ ...prev, napomena: e.target.value }))}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Status leada */}
            <Card>
              <CardHeader>
                <CardTitle>Status leada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Trenutni status
                    </label>
                    <Select value={lead.status} onValueChange={(value) => setLead(prev => ({ ...prev, status: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {lead.status === 'neodradiv' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Razlog odbijanja
                      </label>
                      <Textarea placeholder="Unesite razlog zašto lead nije odradiv..." rows={3} />
                    </div>
                  )}

                  {lead.status === 'zazvati_kasnije' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Datum i vrijeme za zakazivanje
                      </label>
                      <Input type="datetime-local" />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Klasifikacijska pitanja - Harmonika sekcije */}
            <Card>
              <CardHeader>
                <CardTitle>Dodatne informacije</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Tip firme */}
                <Collapsible open={isOpenSections['tip-firme']} onOpenChange={() => toggleSection('tip-firme')}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="font-medium">Tip firme</span>
                    {isOpenSections['tip-firme'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tip firme</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Odaberi tip firme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="obrt">Obrt</SelectItem>
                          <SelectItem value="doo">d.o.o.</SelectItem>
                          <SelectItem value="jdoo">j.d.o.o.</SelectItem>
                          <SelectItem value="slobodna">Slobodna djelatnost</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Napomena</label>
                      <Textarea placeholder="Dodatne informacije o tipu firme..." rows={2} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Vrsta kredita */}
                <Collapsible open={isOpenSections['vrsta-kredita']} onOpenChange={() => toggleSection('vrsta-kredita')}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="font-medium">Vrsta kredita</span>
                    {isOpenSections['vrsta-kredita'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vrsta kredita</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Odaberi vrstu kredita" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gotovinski">Gotovinski</SelectItem>
                          <SelectItem value="hipotekarni">Hipotekarni</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="obrtnicki">Obrtnički</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Iznos (EUR)</label>
                      <Input type="number" placeholder="Unesite iznos" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Napomena</label>
                      <Textarea placeholder="Svrha kredita i dodatne informacije..." rows={2} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                {/* Dokumenti sekcija */}
                <Collapsible open={isOpenSections['dokumenti']} onOpenChange={() => toggleSection('dokumenti')}>
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <span className="font-medium">Bankarski obrasci</span>
                    {isOpenSections['dokumenti'] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                        <Upload className="h-6 w-6 mb-1" />
                        <span className="text-xs">Upload BON-2</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                        <Upload className="h-6 w-6 mb-1" />
                        <span className="text-xs">Potvrda o primanjima</span>
                      </Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>

          {/* Desna kolona - aktivnosti i napomene */}
          <div className="space-y-6">
            {/* Timeline aktivnosti */}
            <Card>
              <CardHeader>
                <CardTitle>Aktivnosti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-nitor-blue rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.opis}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.datum} • {activity.agent}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Dodaj napomenu */}
            <Card>
              <CardHeader>
                <CardTitle>Dodaj napomenu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kategorija</label>
                  <Select value={noteCategory} onValueChange={setNoteCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Odaberi kategoriju" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="telefonski_poziv">Telefonski poziv</SelectItem>
                      <SelectItem value="problem">Problem</SelectItem>
                      <SelectItem value="dogovoreno">Dogovoreno</SelectItem>
                      <SelectItem value="osobno_zapazanje">Osobno zapažanje</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Napomena</label>
                  <Textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Unesite napomenu..."
                    rows={3}
                  />
                </div>
                <Button onClick={handleAddNote} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Dodaj napomenu
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Akcije gumbovi na dnu */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Button onClick={handleSaveChanges} className="bg-nitor-blue hover:bg-nitor-light-blue">
            <Save className="w-4 h-4 mr-2" />
            Spremi promjene
          </Button>
          <Button onClick={handleConvertToClient} variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
            <UserCheck className="w-4 h-4 mr-2" />
            Pretvori u klijenta
          </Button>
          <Button onClick={handleScheduleCallback} variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">
            <Clock className="w-4 h-4 mr-2" />
            Zazvati kasnije
          </Button>
          <Button onClick={handleMarkAsUnworkable} variant="outline" className="border-gray-500 text-gray-600 hover:bg-gray-50">
            <XCircle className="w-4 h-4 mr-2" />
            Označi kao neodradivog
          </Button>
          <Button onClick={() => router.back()} variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Nazad
          </Button>
        </div>
      </div>
    </div>
  );
}
