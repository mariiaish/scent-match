import { Perfume } from '../types/types';

interface Props {
    perfume: Perfume;
    score?: number;
    onRemove?: (id: number) => void;
}

export const PerfumeCard = ({ perfume, score, onRemove }: Props) => {
    return (
        <div className="relative group bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {score && (
                <span className="absolute top-4 right-4 text-xs font-bold text-perfume-gold bg-amber-50 px-2 py-1 rounded">
                    Score: {score}
                </span>
            )}

            <div className="mb-4">
                <h3 className="font-serif text-lg font-semibold leading-tight">{perfume.Perfume}</h3>
                <p className="text-sm text-gray-500 uppercase tracking-widest">{perfume.Brand}</p>
            </div>

            <div className="space-y-3">
                <div>
                    <span className="text-[10px] uppercase text-gray-400 font-bold">Base Notes</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {perfume.Base.slice(0, 3).map((note) => (
                            <span key={note} className="text-xs bg-gray-50 px-2 py-0.5 rounded-full border border-gray-100">
                                {note}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {onRemove && (
                <button
                    onClick={() => onRemove(perfume.id)}
                    className="mt-6 w-full py-2 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
                >
                    Remove from shelf
                </button>
            )}
        </div>
    );
};
