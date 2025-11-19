// Lógica de autenticação

import { User, UserType, SubscriptionPlan } from './types';
import { saveUser, getUserByEmail, setCurrentUser } from './storage';

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  type: UserType;
  plan?: SubscriptionPlan;
}

export interface LoginData {
  email: string;
  password: string;
}

export const register = (data: RegisterData): { success: boolean; error?: string; user?: User } => {
  // Validações
  if (!data.name || data.name.length < 3) {
    return { success: false, error: 'Nome deve ter pelo menos 3 caracteres' };
  }

  if (!data.email || !data.email.includes('@')) {
    return { success: false, error: 'E-mail inválido' };
  }

  if (!data.password || data.password.length < 6) {
    return { success: false, error: 'Senha deve ter pelo menos 6 caracteres' };
  }

  // Verificar se usuário já existe
  const existingUser = getUserByEmail(data.email);
  if (existingUser) {
    return { success: false, error: 'E-mail já cadastrado' };
  }

  // Criar novo usuário
  const newUser: User = {
    id: crypto.randomUUID(),
    name: data.name,
    email: data.email,
    password: data.password, // Em produção, usar hash
    type: data.type,
    plan: data.plan || 'basic',
    createdAt: new Date().toISOString()
  };

  saveUser(newUser);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
};

export const login = (data: LoginData): { success: boolean; error?: string; user?: User } => {
  const user = getUserByEmail(data.email);

  if (!user) {
    return { success: false, error: 'Usuário não encontrado' };
  }

  if (user.password !== data.password) {
    return { success: false, error: 'Senha incorreta' };
  }

  setCurrentUser(user);
  return { success: true, user };
};

export const logout = (): void => {
  setCurrentUser(null);
};
