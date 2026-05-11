import { create } from 'zustand';
import { PerfumeState } from '../types/types';
import getRecs from '../api/getRecs';
import { persist } from 'zustand/middleware';
import { supabase } from '../lib/supabase';
import { formatPerfumeData } from '../utils/utils';

export const usePerfumeStore = create<PerfumeState>()(
  persist(
    (set, get) => ({
      allPerfumes: [],
      myShelf: [],
      recommendations: [],
      lang: 'ru',
      user: null,
      authLoading: false,

      fetchPerfumes: async () => {
        set({ isLoading: true });

        const { data, error } = await supabase.from('perfumes').select('*');

        if (error) {
          console.error('Ошибка загрузки данных:', error);
        } else {
          const formattedData = data.map(formatPerfumeData);

          set({ allPerfumes: formattedData });
        }

        set({ isLoading: false });
      },

      addToShelf: async (perfume) => {
        const { myShelf, user } = get();

        if (myShelf.find((p) => p.id === perfume.id)) return;

        if (user) {
          const { error } = await supabase
            .from('user_perfumes')
            .insert({ user_id: user.id, perfume_id: perfume.id });

          if (error) {
            console.error('Ошибка сохранения:', error.message);
            return;
          }
        }

        set({ myShelf: [...myShelf, perfume] });
      },

      removeFromShelf: async (id) => {
        const { myShelf, user } = get();

        if (user) {
          const { error } = await supabase
            .from('user_perfumes')
            .delete()
            .eq('user_id', user.id)
            .eq('perfume_id', id);

          if (error) {
            console.error('Ошибка удаления:', error.message);
            return;
          }
        }

        set({ myShelf: myShelf.filter((p) => p.id !== id) });
      },

      clearShelf: () => set({ myShelf: [], recommendations: [] }),

      fetchAIRecs: async () => {
        const { myShelf, lang } = get();
        console.log(myShelf.length);
        if (myShelf.length === 0) return;

        set({ isLoading: true });
        const shelfString = myShelf.map((p) => `${p.brand} ${p.perfume}`).join(', ');

        try {
          const res = await getRecs(shelfString, lang);

          set({ recommendations: [...res.recommendations] });

          set({ isLoading: false });
        } catch (error) {
          console.error('Ошибка при получении рекомендаций:', error);
          set({ isLoading: false });
        }
      },

      setUser: (user) => set({ user }),

      signUp: async (email, password) => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
      },

      signIn: async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      },

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, myShelf: [] });
      },

      setLanguage: (lang) =>
        set({
          lang,
        }),

      fetchUserShelf: async () => {
        const { user } = get();
        if (!user) return;

        const { data, error } = await supabase
          .from('user_perfumes')
          .select(
            `
                perfume_id,
                perfumes (*)
            `,
          )
          .eq('user_id', user.id);

        if (error) {
          console.error('Ошибка загрузки полки:', error.message);
        } else {
          const formattedShelf = data.map((item: any) => formatPerfumeData(item.perfumes));
          set({ myShelf: formattedShelf });
        }
      },
    }),
    {
      name: 'scent-match-storage',
      partialize: (state) => ({
        lang: state.lang,
      }),
    },
  ),
);
