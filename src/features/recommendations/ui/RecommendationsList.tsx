import React from 'react';
import { useRecsStore } from '../model/recsSlice';
import { usePerfumeStore } from '../../../entities/perfume/model/perfumeSlice';
import { useUserStore } from '../../../entities/user/model/userSlice';
import { translations } from '../../../shared/i18n/translations';
import { PerfumeCard } from '../../../entities/perfume/ui/PerfumeCard';

export const RecommendationsList = () => {
  const { myShelf } = usePerfumeStore();
  const { recommendations, fetchAIRecs } = useRecsStore();
  const { lang } = useUserStore();

  const [isReady, setIsReady] = React.useState(false);
  const t = translations[lang];

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  const getRecsByShelf = async () => {
    await fetchAIRecs(myShelf, lang);
  };

  if (!isReady) {
    return <div className="bg-perfume-bg min-h-screen" />;
  }

  return (
    <div className="lg:col-span-8">
      <h2 className="border-perfume-gold mb-8 flex flex-col border-l-4 pl-4 font-serif text-2xl">
        {t.recommendations}

        {!!myShelf.length && (
          <button
            onClick={getRecsByShelf}
            className="bg-perfume-gold hover:bg-perfume-dark-gold mt-4 max-w-max rounded px-4 py-2 text-lg font-semibold text-white shadow transition-colors hover:cursor-pointer"
          >
            {t.getRecsByShelf}
          </button>
        )}
      </h2>

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recommendations.map((p) => (
            <PerfumeCard key={p.id} perfume={p} score={(p as any).score} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed text-gray-400">
          {t.emptyShelf}
        </div>
      )}
    </div>
  );
};
