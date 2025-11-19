'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { register, login } from '@/lib/auth';
import { UserType } from '@/lib/types';
import { User, Briefcase, AlertCircle } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres')
});

const registerSchema = loginSchema.extend({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  type: z.enum(['consumer', 'professional'])
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', type: 'consumer' }
  });

  const handleLogin = async (data: LoginForm) => {
    setLoading(true);
    setError('');

    const result = login(data);
    
    if (result.success) {
      window.location.href = '/';
    } else {
      setError(result.error || 'Erro ao fazer login');
    }
    
    setLoading(false);
  };

  const handleRegister = async (data: RegisterForm) => {
    setLoading(true);
    setError('');

    const result = register(data);
    
    if (result.success) {
      window.location.href = '/';
    } else {
      setError(result.error || 'Erro ao criar conta');
    }
    
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {isLogin ? 'Entrar' : 'Criar Conta'}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin 
            ? 'Entre com suas credenciais para acessar' 
            : 'Preencha os dados para começar'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLogin ? (
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...loginForm.register('email')}
              />
              {loginForm.formState.errors.email && (
                <p className="text-sm text-red-500">{loginForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...loginForm.register('password')}
              />
              {loginForm.formState.errors.password && (
                <p className="text-sm text-red-500">{loginForm.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>
        ) : (
          <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Seu nome"
                {...registerForm.register('name')}
              />
              {registerForm.formState.errors.name && (
                <p className="text-sm text-red-500">{registerForm.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-email">E-mail</Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="seu@email.com"
                {...registerForm.register('email')}
              />
              {registerForm.formState.errors.email && (
                <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reg-password">Senha</Label>
              <Input
                id="reg-password"
                type="password"
                placeholder="••••••••"
                {...registerForm.register('password')}
              />
              {registerForm.formState.errors.password && (
                <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label>Tipo de Conta</Label>
              <RadioGroup
                defaultValue="consumer"
                onValueChange={(value) => registerForm.setValue('type', value as UserType)}
              >
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="consumer" id="consumer" />
                  <Label htmlFor="consumer" className="flex items-center gap-2 cursor-pointer flex-1">
                    <User className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Consumidor</p>
                      <p className="text-xs text-gray-500">Para uso pessoal</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    <div>
                      <p className="font-medium">Profissional</p>
                      <p className="text-xs text-gray-500">Para nutricionistas e personal trainers</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            {isLogin ? 'Não tem conta? Criar agora' : 'Já tem conta? Entrar'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
