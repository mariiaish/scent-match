import { create } from 'zustand';
import { Perfume, PerfumeState } from '../types/types';
import allPerfumesData from '../data/perfumes.json';
import getRecs from '../api/getRecs';

export const usePerfumeStore = create<PerfumeState>((set, get) => ({
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
    const { myShelf } = get();
    if (myShelf.length === 0) return;

    set({ isLoading: true });
    const shelfString = myShelf.map((p) => `${p.Brand} ${p.Perfume}`).join(', ');

    try {
      getRecs(shelfString);
      set({ isLoading: false });
    } catch (error) {
      console.error('Ошибка при получении рекомендаций:', error);
      set({ isLoading: false });
    }
  },
}));
