
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Shield, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [agentCode, setAgentCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agentCode.trim()) {
      toast({
        title: 'Greška',
        description: 'Molimo unesite agent kod',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('agent-code', {
        agentCode: agentCode.toUpperCase(),
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: 'Greška prilikom prijave',
          description: result.error,
          variant: 'destructive',
        });
      } else if (result?.ok) {
        toast({
          title: 'Uspješna prijava',
          description: 'Dobrodošli u NITOR CRM!',
        });
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error) {
      toast({
        title: 'Greška',
        description: 'Došlo je do greške prilikom prijave. Pokušajte ponovo.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">NITOR CRM</h1>
          <p className="text-gray-600">Customer Relationship Management</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur animate-slide-in">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-semibold flex items-center justify-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Agent prijava
            </CardTitle>
            <CardDescription>
              Unesite svoj agent kod za pristup sustavu
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="crm-form-group">
                <label htmlFor="agentCode" className="crm-form-label">
                  Agent kod
                </label>
                <Input
                  id="agentCode"
                  type="text"
                  placeholder="AG001, MG001, AD001..."
                  value={agentCode}
                  onChange={(e) => setAgentCode(e.target.value)}
                  className="text-center text-lg font-mono tracking-wider uppercase"
                  maxLength={5}
                  autoFocus
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Prijavljujem...
                  </>
                ) : (
                  'Prijaviť se'
                )}
              </Button>
            </form>
            
            {/* Sample Codes Info */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-xs text-gray-600 mb-2">Primjeri agent kodova:</p>
              <div className="text-xs text-gray-500 space-y-1">
                <div>AD001 - Administrator</div>
                <div>MG001 - Manager</div>
                <div>AG001, AG002 - Agenti</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500 animate-fade-in">
          <p>© 2024 NITOR CRM. Sva prava pridržana.</p>
        </div>
      </div>
    </div>
  );
}
