import { Perfume } from '@/shared/types/types';
import { create } from 'zustand';
import getRecs from '../api/getRecs';

interface RecsState {
  recommendations: Perfume[];
  isLoading: boolean;

  fetchAIRecs: (myShelf: Perfume[], lang: string) => Promise<void>;
  clearRecommendations: () => void;
}

export const useRecsStore = create<RecsState>((set) => ({
  recommendations: [],
  isLoading: false,

  fetchAIRecs: async (myShelf, lang) => {
    if (myShelf.length === 0) return;

    set({ isLoading: true });
    const shelfString = myShelf.map((p) => `${p.brand} ${p.perfume}`).join(', ');

    try {
      const result = await getRecs(shelfString, lang);
      set({ recommendations: result.recommendations || [] });
    } catch (error) {
      console.error('Ошибка при получении рекомендаций:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  clearRecommendations: () => set({ recommendations: [] }),
}));
