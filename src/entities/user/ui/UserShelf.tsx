import React from 'react';
import { usePerfumeStore } from '@/entities/perfume/model/perfumeSlice';
import { useUserStore } from '@/entities/user/model/userSlice';
import { translations } from '@/shared/i18n/translations';
import { PerfumeCard } from '../../perfume/ui/PerfumeCard';

export const UserShelf: React.FC = () => {
  const { myShelf, removeFromShelf } = usePerfumeStore();
  const { lang, user } = useUserStore();
  const userId = user?.id;

  const t = translations[lang];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium italic">
        {t.myShelf} ({myShelf.length})
      </h2>

      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="grid gap-4">
          {myShelf.length ? (
            myShelf.map((p) => (
              <PerfumeCard
                key={p.id}
                perfume={p}
                onRemove={(id) => removeFromShelf(id, userId)}
                lang={lang}
              />
            ))
          ) : (
            <div className="flex items-center justify-center rounded-2xl text-gray-400">
              {t.emptyShelf}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
