// LocalStorage helpers para persistência de dados

import { User, Assessment } from './types';

const STORAGE_KEYS = {
  USERS: 'bodyassess_users',
  CURRENT_USER: 'bodyassess_current_user',
  ASSESSMENTS: 'bodyassess_assessments'
} as const;

// Usuários
export const saveUser = (user: User): void => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? JSON.parse(data) : [];
};

export const getUserByEmail = (email: string): User | null => {
  const users = getUsers();
  return users.find(u => u.email === email) || null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

// Avaliações
export const saveAssessment = (assessment: Assessment): void => {
  const assessments = getAssessments();
  const existingIndex = assessments.findIndex(a => a.id === assessment.id);
  
  if (existingIndex >= 0) {
    assessments[existingIndex] = assessment;
  } else {
    assessments.push(assessment);
  }
  
  localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(assessments));
};

export const getAssessments = (userId?: string): Assessment[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENTS);
  const allAssessments: Assessment[] = data ? JSON.parse(data) : [];
  
  if (userId) {
    return allAssessments.filter(a => a.userId === userId);
  }
  
  return allAssessments;
};

export const getAssessmentById = (id: string): Assessment | null => {
  const assessments = getAssessments();
  return assessments.find(a => a.id === id) || null;
};

export const deleteAssessment = (id: string): void => {
  const assessments = getAssessments();
  const filtered = assessments.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_KEYS.ASSESSMENTS, JSON.stringify(filtered));
};

// Limpar todos os dados (útil para desenvolvimento)
export const clearAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};
