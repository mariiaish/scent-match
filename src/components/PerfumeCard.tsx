import { translations } from '../data/translations';
import { usePerfumeStore } from '../store/usePerfumeStore';
import { Perfume } from '../types/types';

interface Props {
  perfume: Perfume;
  score?: number;
  onRemove?: (id: number) => void;
}

export const PerfumeCard = ({ perfume, score, onRemove }: Props) => {
  const { lang } = usePerfumeStore();
  const t = translations[lang];

  return (
    <div className="group relative rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {score && (
        <span className="text-perfume-gold absolute top-4 right-4 rounded bg-amber-50 px-2 py-1 text-xs font-bold">
          Score: {score}
        </span>
      )}

      <div className="mb-4">
        <h3 className="font-serif text-lg leading-tight font-semibold">{perfume.perfume}</h3>
        <p className="text-sm tracking-widest text-gray-500 uppercase">{perfume.brand}</p>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-[10px] font-bold text-gray-400 uppercase">{t.baseNotes}</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {perfume.base.slice(0, 3).map((note) => (
              <span
                key={note}
                className="rounded-full border border-gray-100 bg-gray-50 px-2 py-0.5 text-xs"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 mb-4">
        <p className="text-sm tracking-widest text-gray-500">{perfume.reason}</p>
      </div>

      {onRemove && (
        <button
          onClick={() => onRemove(perfume.id)}
          className="mt-6 w-full py-2 text-xs text-red-400 opacity-0 transition-opacity group-hover:opacity-100 hover:underline"
        >
          {t.remove}
        </button>
      )}
    </div>
  );
};
