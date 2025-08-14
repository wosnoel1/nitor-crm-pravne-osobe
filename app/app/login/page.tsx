
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const [agentCode, setAgentCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    // Validacija prema specifikaciji
    if (!agentCode.trim()) {
      setErrorMessage('Unesite šifru agenta.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('agent-code', {
        agentCode: agentCode.toUpperCase(),
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage('Neispravan kod agenta ili korisnik nije aktivan.');
        setAgentCode(''); // Prazni input za novi unos
      } else if (result?.ok) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      setErrorMessage('Neispravan kod agenta ili korisnik nije aktivan.');
      setAgentCode('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm">
        {/* Naslov - opcionalno prema specifikaciji */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Dobrodošli u Nitor CRM
          </h1>
        </div>

        {/* Glavni dio login forme - minimalistički prema specifikaciji */}
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input polje za šifru agenta */}
            <div>
              <Input
                id="agentCode"
                type="text"
                placeholder="Unesi šifru agenta"
                value={agentCode}
                onChange={(e) => {
                  setAgentCode(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                className="text-center text-lg font-mono tracking-wider uppercase"
                maxLength={10}
                autoFocus
                disabled={isLoading}
              />
              
              {/* Poruke greške ispod input polja, crvenom bojom */}
              {errorMessage && (
                <p className="mt-2 text-sm text-red-600 text-center">
                  {errorMessage}
                </p>
              )}
            </div>
            
            {/* Gumb za prijavu - uvijek aktivan prema specifikaciji */}
            <Button 
              type="submit" 
              className="w-full h-11 text-base font-medium bg-nitor-blue hover:bg-nitor-light-blue"
              disabled={isLoading}
            >
              {isLoading ? 'Prijavljujem...' : 'Prijavi se'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
