import React from 'react';

import { usePerfumeStore } from '@/entities/perfume/model/perfumeSlice';
import { PerfumeCard } from '@/entities/perfume/ui/PerfumeCard';

import { useRecsStore } from '../model/recsSlice';

import { useUserStore } from '@/entities/user/model/userSlice';
import { translations } from '@/shared/i18n/translations';

import { Button } from '@/shared/ui/elements/button';

export const RecommendationsList = () => {
  const { myShelf } = usePerfumeStore();

  const { recommendations, fetchAIRecs, isLoading } = useRecsStore();

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
          <Button
            variant="primary"
            onClick={getRecsByShelf}
            disabled={isLoading}
            className="mt-4 max-w-max"
          >
            {t.getRecsByShelf}
          </Button>
        )}
      </h2>

      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {recommendations.map((p) => (
            <PerfumeCard key={p.id} perfume={p} score={(p as any).score} lang={lang} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 px-6 text-center text-gray-400">
          {isLoading ? (
            <>
              <p className="text-perfume-gold mb-3 text-lg font-medium">{t.loadingRecs}</p>

              <p className="max-w-md text-sm leading-relaxed text-gray-400">
                {t.loadingRecsDescription}
              </p>
            </>
          ) : (
            t.emptyRecs
          )}
        </div>
      )}
    </div>
  );
};
