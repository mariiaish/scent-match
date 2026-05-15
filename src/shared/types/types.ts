import { User } from '@supabase/supabase-js';

export type Language = 'ru' | 'en';

export interface Perfume {
  id: number;
  perfume: string;
  brand: string;
  year?: string;
  top: string[];
  middle: string[];
  base: string[];
  reason?: string;
}

export interface PerfumeState {
  allPerfumes: Perfume[];
  myShelf: Perfume[];
  recommendations: Perfume[];
  isLoading?: boolean;

  addToShelf: (perfume: Perfume) => void;
  removeFromShelf: (id: number) => void;
  clearShelf: () => void;
  fetchAIRecs: () => void;
  fetchPerfumes: () => void;
  fetchUserShelf: () => void;

  lang: Language;
  setLanguage: (lang: Language) => void;

  user: User | null;
  authLoading: boolean;

  setUser: (user: User | null) => void;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
