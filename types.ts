export interface SymptomAnalysis {
  observation: string;
  tips: string[];
}

export interface AnalysisResult {
  swelling: SymptomAnalysis;
  skin: SymptomAnalysis;
  fatigue: SymptomAnalysis;
  stress: SymptomAnalysis;
  overallSummary: string;
}

export interface User {
  name: string;
  email: string;
}

export type AppState = 'dashboard' | 'initial' | 'capturing' | 'analyzing' | 'results' | 'error';
export type AuthView = 'login' | 'signup';