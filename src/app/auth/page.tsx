import AuthForm from '@/components/custom/auth-form';
import { Activity } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo e Título */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-xl">
              <Activity className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">BodyAssess AI</h1>
          <p className="text-gray-600">Avaliação corporal inteligente</p>
        </div>

        {/* Formulário */}
        <AuthForm />

        {/* Informações */}
        <div className="text-center text-sm text-gray-500 space-y-1">
          <p>Plano Básico gratuito por 30 dias</p>
          <p className="text-xs">Sem necessidade de cartão de crédito</p>
        </div>
      </div>
    </div>
  );
}
