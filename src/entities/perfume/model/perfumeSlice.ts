import { create } from 'zustand';
import {
  fetchAllPerfumes,
  fetchUserShelf,
  addToShelfApi,
  removeFromShelfApi,
} from '../api/perfumeApi';
import { Perfume } from '../../../shared/types/types';

interface PerfumeState {
  allPerfumes: Perfume[];
  myShelf: Perfume[];
  isLoading: boolean;

  fetchPerfumes: () => Promise<void>;
  fetchUserShelf: (userId: string) => Promise<void>;
  addToShelf: (perfume: Perfume, userId?: string) => Promise<void>;
  removeFromShelf: (id: number, userId?: string) => Promise<void>;
  clearShelf: () => void;
}

export const usePerfumeStore = create<PerfumeState>((set, get) => ({
  allPerfumes: [],
  myShelf: [],
  isLoading: false,

  fetchPerfumes: async () => {
    set({ isLoading: true });
    const perfumes = await fetchAllPerfumes();
    set({ allPerfumes: perfumes, isLoading: false });
  },

  fetchUserShelf: async (userId: string) => {
    const shelf = await fetchUserShelf(userId);
    set({ myShelf: shelf });
  },

  addToShelf: async (perfume, userId?: string) => {
    const { myShelf } = get();

    if (myShelf.find((p) => p.id === perfume.id)) return;

    if (userId) {
      const result = await addToShelfApi(userId, perfume.id);
      if (!result.success) return;
    }

    set({ myShelf: [...myShelf, perfume] });
  },

  removeFromShelf: async (id, userId?: string) => {
    const { myShelf } = get();

    if (userId) {
      const result = await removeFromShelfApi(userId, id);
      if (!result.success) return;
    }

    set({ myShelf: myShelf.filter((p) => p.id !== id) });
  },

  clearShelf: () => set({ myShelf: [] }),
}));
