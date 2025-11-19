'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, getAssessments } from '@/lib/storage';
import { SUBSCRIPTION_PLANS } from '@/lib/types';
import type { User, Assessment } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  FileText, 
  TrendingUp, 
  Zap, 
  CheckCircle2,
  ArrowRight,
  MessageCircle
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      router.push('/auth');
      return;
    }
    
    setCurrentUser(user);
    setAssessments(getAssessments(user.id));
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentUser) return null;

  const currentPlan = SUBSCRIPTION_PLANS[currentUser.plan];
  
  // Verificação de segurança robusta para evitar erro de undefined
  if (!currentPlan || typeof currentPlan !== 'object') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar plano de assinatura</p>
          <Button onClick={() => router.push('/auth')}>Voltar</Button>
        </div>
      </div>
    );
  }

  const assessmentCount = assessments.length;
  // Verificação adicional antes de acessar maxAssessments
  const maxAssessments = currentPlan.maxAssessments ?? -1;
  const canCreateAssessment = maxAssessments === -1 || assessmentCount < maxAssessments;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Olá, {currentUser.name}! 👋
          </h1>
          <p className="text-gray-600">
            {currentUser.type === 'professional' 
              ? 'Gerencie as avaliações dos seus clientes' 
              : 'Acompanhe sua evolução corporal'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Avaliações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{assessmentCount}</div>
              <p className="text-xs opacity-75 mt-1">Ilimitadas</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Plano Atual</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentPlan.name || 'N/A'}</div>
              <p className="text-xs opacity-75 mt-1">R$ {(currentPlan.price ?? 0).toFixed(2)}/mês</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">IA Avançada</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ativa</div>
              <p className="text-xs opacity-75 mt-1">Análise completa</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Relatórios PDF</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Sim</div>
              <p className="text-xs opacity-75 mt-1">Disponível</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Camera className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Nova Avaliação</CardTitle>
                  <CardDescription>Capture fotos e receba análise instantânea</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                onClick={() => alert('Módulo 2 - Avaliação será implementado em seguida!')}
              >
                Iniciar Avaliação
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Histórico</CardTitle>
                  <CardDescription>Veja sua evolução ao longo do tempo</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('Módulo 3 - Histórico será implementado em seguida!')}
              >
                Ver Histórico
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              Recursos do seu Plano {currentPlan.name || 'Atual'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(currentPlan.features || []).map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upgrade CTA (apenas se for PRO) */}
        {currentUser.plan === 'pro' && (
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl">Desbloqueie Todo o Potencial</CardTitle>
              <CardDescription className="text-white/80">
                Faça upgrade para Premium e tenha acesso completo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => alert('Módulo 4 - Planos será implementado em seguida!')}
                >
                  Ver Planos
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white border-white/30"
                  onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os planos.', '_blank')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Falar no WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* WhatsApp Support Button (Fixed) */}
        <a
          href="https://wa.me/5511999999999?text=Olá! Preciso de ajuda com o EVOFIT IA."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
