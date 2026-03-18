import { create } from 'zustand';
import { Perfume, PerfumeState } from '../types/types';
import allPerfumesData from '../data/perfumes.json';
import getRecs from '../api/getRecs';
import { persist } from 'zustand/middleware';

export const usePerfumeStore = create<PerfumeState>()(
  persist(
    (set, get) => ({
      allPerfumes: allPerfumesData as Perfume[],
      myShelf: [],
      recommendations: [],

      addToShelf: (perfume) => {
        const { myShelf } = get();
        if (!myShelf.find((p) => p.id === perfume.id)) {
          set({ myShelf: [...myShelf, perfume] });
        }
      },

      removeFromShelf: (id) => {
        set((state) => ({
          myShelf: state.myShelf.filter((p) => p.id !== id),
        }));
      },

      clearShelf: () => set({ myShelf: [], recommendations: [] }),

      fetchAIRecs: async () => {
        const { myShelf, lang } = get();
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

      lang: 'ru',
      setLanguage: (lang) =>
        set({
          lang,
        }),
    }),
    {
      name: 'scent-match-storage',
      partialize: (state) => ({
        // myShelf: state.myShelf,
        lang: state.lang,
      }),
    },
  ),
);
