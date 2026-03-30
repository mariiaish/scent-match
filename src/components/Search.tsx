import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Search as SearchIcon, Sparkles } from 'lucide-react';
import { usePerfumeStore } from '../store/usePerfumeStore';
import { Perfume } from '../types/types';
import { translations } from '../data/translations';

// TODO: add ability to create new fragnansec into database
export const Search = () => {
  const [query, setQuery] = useState('');
  const { allPerfumes, addToShelf, fetchAIRecs, lang } = usePerfumeStore();
  const t = translations[lang];

  const fuse = useMemo(() => {
    return new Fuse(allPerfumes, {
      keys: ['perfume', 'brand'],
      threshold: 0.3,
    });
  }, [allPerfumes]);

  const results = query ? fuse.search(query, { limit: 8 }).map((r) => r.item) : [];

  const handleSelect = async (perfume: Perfume) => {
    setQuery('');
    addToShelf(perfume);
    await fetchAIRecs();
  };

  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="group relative">
        <SearchIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-amber-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.placeholder}
          className="w-full rounded-2xl border border-gray-100 bg-white py-4 pr-4 pl-12 text-gray-700 shadow-sm transition-all placeholder:text-gray-400 focus:border-amber-200 focus:ring-2 focus:ring-amber-100 focus:outline-none"
        />
      </div>

      {results.length > 0 && (
        <ul className="animate-in fade-in slide-in-from-top-2 absolute top-full right-0 left-0 z-50 mt-2 overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-xl duration-200">
          {results.map((p) => (
            <li
              key={p.id}
              onClick={() => handleSelect(p)}
              className="group flex cursor-pointer items-center justify-between px-5 py-3 transition-colors hover:bg-amber-50/50"
            >
              <div>
                <div className="font-medium text-gray-900 group-hover:text-amber-700">
                  {p.perfume}
                </div>
                <div className="text-xs tracking-wider text-gray-500 uppercase">{p.brand}</div>
              </div>
              <Sparkles className="h-4 w-4 text-amber-200 opacity-0 transition-opacity group-hover:opacity-100" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
