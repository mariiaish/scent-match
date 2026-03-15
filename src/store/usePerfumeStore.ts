import { create } from 'zustand';
import { Perfume, PerfumeState } from './types';
import allPerfumesData from '../data/perfumes.json';

export const usePerfumeStore = create<PerfumeState>((set, get) => ({
    // Приводим данные к типу Perfume[]
    allPerfumes: allPerfumesData as Perfume[],
    myShelf: [],
    recommendations: [],

    addToShelf: (perfume) => {
        const { myShelf } = get();
        // Проверяем, нет ли уже такого парфюма по ID
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

    calculateRecs: () => {
        const { myShelf, allPerfumes } = get();

        if (myShelf.length === 0) {
            set({ recommendations: [] });
            return;
        }

        // 1. Собираем все ноты из коллекции пользователя в один "профиль"
        const userNotes = new Set<string>();
        myShelf.forEach(p => {
            [...p.Top, ...p.Middle, ...p.Base].forEach(note => userNotes.add(note.toLowerCase()));
        });

        // 2. Считаем баллы для каждого парфюма из общей базы
        const scoredRecipes = allPerfumes
            .filter(p => !myShelf.find(owned => owned.id === p.id)) // Исключаем то, что уже есть
            .map(p => {
                let score = 0;

                // Начисляем баллы за совпадения (база важнее всего)
                p.Top.forEach(n => { if (userNotes.has(n.toLowerCase())) score += 1 });
                p.Middle.forEach(n => { if (userNotes.has(n.toLowerCase())) score += 2 });
                p.Base.forEach(n => { if (userNotes.has(n.toLowerCase())) score += 3 });

                // Доп. баллы за совпадение брендов (лояльность)
                if (myShelf.some(owned => owned.Brand === p.Brand)) score += 5;

                return { ...p, score };
            })
            .filter(p => p.score > 0) // Убираем совсем непохожие
            .sort((a, b) => b.score - a.score) // Сортируем: самые релевантные вверху
            .slice(0, 12); // Берем топ-12

        set({ recommendations: scoredRecipes });
    }
}));
