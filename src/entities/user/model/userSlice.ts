import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { Language } from '../../../shared/types/types';

interface UserState {
  user: User | null;
  lang: Language;

  setUser: (user: User | null) => void;
  setLanguage: (lang: Language) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  lang: 'ru',

  setUser: (user) => set({ user }),

  setLanguage: (lang) => set({ lang }),

  signOut: () => set({ user: null }),
}));
