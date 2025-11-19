// Tipos do sistema de avaliação corporal

export type UserType = 'consumer' | 'professional';

export type SubscriptionPlan = 'pro' | 'premium';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  type: UserType;
  plan: SubscriptionPlan;
  createdAt: string;
}

export interface Assessment {
  id: string;
  userId: string;
  date: string;
  photos: string[]; // Base64 ou URLs
  measurements: {
    weight?: number;
    height?: number;
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    legs?: number;
  };
  aiAnalysis: {
    bodyFatPercentage?: number;
    muscleMass?: number;
    recommendations: string[];
    overallScore: number;
  };
  notes?: string;
}

export interface PlanFeatures {
  name: string;
  price: number;
  features: string[];
  maxAssessments: number;
  aiAnalysis: boolean;
  pdfReports: boolean;
  historicalData: boolean;
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlan, PlanFeatures> = {
  pro: {
    name: 'PRO',
    price: 79.90,
    features: [
      'Avaliações ilimitadas',
      'Análise com IA avançada',
      'Relatórios em PDF',
      'Histórico completo',
      'Gráficos de desempenho',
      'Suporte prioritário'
    ],
    maxAssessments: -1, // ilimitado
    aiAnalysis: true,
    pdfReports: true,
    historicalData: true
  },
  premium: {
    name: 'Premium',
    price: 149.90,
    features: [
      'Tudo do PRO',
      'Análise de composição corporal',
      'Recomendações personalizadas',
      'Comparação de fotos',
      'API para integração',
      'Suporte 24/7'
    ],
    maxAssessments: -1,
    aiAnalysis: true,
    pdfReports: true,
    historicalData: true
  }
};
