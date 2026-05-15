import { create } from 'zustand';
import { User } from '@supabase/supabase-js';
import { Language } from '@/shared/types/types';
import { supabase } from '@/shared/lib/supabase';

interface UserState {
  user: User | null;
  lang: Language;

  setUser: (user: User | null) => void;
  setLanguage: (lang: Language) => void;
  signOut: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  lang: 'ru',

  setUser: (user) => set({ user }),

  setLanguage: (lang) => set({ lang }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
