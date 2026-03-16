import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search as SearchIcon, Sparkles } from 'lucide-react';
import { usePerfumeStore } from '../store/usePerfumeStore';
import { Perfume } from '../types/types';

export const Search = () => {
    const [query, setQuery] = useState('');
    const { allPerfumes, addToShelf, calculateRecs } = usePerfumeStore();

    const fuse = useMemo(() => {
        return new Fuse(allPerfumes, {
            keys: ['Perfume', 'Brand'],
            threshold: 0.3,
        });
    }, [allPerfumes]);

    const results = query
        ? fuse.search(query, { limit: 8 }).map(r => r.item)
        : [];

    const handleSelect = (perfume: Perfume) => {
        addToShelf(perfume);
        calculateRecs();
        setQuery('');
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <div className="relative group">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors w-5 h-5" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Find your favorite fragrance..."
                    className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-100 focus:border-amber-200 transition-all text-gray-700 placeholder:text-gray-400"
                />
            </div>

            {results.length > 0 && (
                <ul className="absolute top-full left-0 right-0 mt-2 bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {results.map((p) => (
                        <li
                            key={p.id}
                            onClick={() => handleSelect(p)}
                            className="px-5 py-3 hover:bg-amber-50/50 cursor-pointer flex items-center justify-between group transition-colors"
                        >
                            <div>
                                <div className="font-medium text-gray-900 group-hover:text-amber-700">{p.Perfume}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">{p.Brand}</div>
                            </div>
                            <Sparkles className="w-4 h-4 text-amber-200 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
