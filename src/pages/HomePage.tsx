import React from 'react';
import { usePerfumeStore } from '../entities/perfume/model/perfumeSlice';
import { useUserStore } from '../entities/user/model/userSlice';
import { translations } from '../shared/i18n/translations';
import { supabase } from '../shared/lib/supabase';
import { LanguageSwitcher } from '../shared/ui/LanguageSwitcher';
import { PerfumeCard } from '../entities/perfume/ui/PerfumeCard';
import { AuthForm } from '../features/auth/ui/AuthForm';
import { RecommendationsList } from '../features/recommendations/ui/RecommendationsList';
import { Search } from '../features/search/ui/Search';

export const HomePage = () => {
  const { myShelf, removeFromShelf, fetchPerfumes, fetchUserShelf } = usePerfumeStore();
  const { lang, user, setUser, signOut } = useUserStore();
  const userId = user?.id;

  const [isReady, setIsReady] = React.useState(false);
  const t = translations[lang];

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  React.useEffect(() => {
    if (user) {
      fetchUserShelf(user.id);
    }
  }, [user, fetchUserShelf]);

  React.useEffect(() => {
    fetchPerfumes();
  }, [fetchPerfumes]);

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return <div className="bg-perfume-bg min-h-screen" />;
  }

  return (
    <div className="bg-perfume-bg min-h-screen">
      <div className="mx-auto flex max-w-7xl justify-between px-6 pt-4">
        <LanguageSwitcher />
        {user && (
          <button
            onClick={() => signOut()}
            className="text-xs tracking-widest text-gray-400 uppercase transition-colors hover:text-red-500"
          >
            {user.email} (t.signOut)
          </button>
        )}
      </div>

      <header className="bg-transparent py-12 text-center">
        <h1 className="mb-2 font-serif text-4xl tracking-tight">
          ScentMatch <span className="text-perfume-gold">AI</span>
        </h1>
        <p className="text-sm text-gray-500">{t.subtitle}</p>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-12">
        <aside className="space-y-10 lg:col-span-4">
          <div className="space-y-4">
            <h2 className="text-xl font-medium">{t.searchPlaceholder}</h2>
            <Search />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium italic">
              {t.myShelf} ({myShelf.length})
            </h2>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="grid gap-4">
                {myShelf.map((p) => (
                  <PerfumeCard
                    key={p.id}
                    perfume={p}
                    onRemove={(id) => removeFromShelf(id, userId)}
                    lang={lang}
                  />
                ))}
                {!user && (
                  <>
                    <p className="mb-4 text-center text-sm text-gray-500 italic">
                      Sign in to save your collection
                    </p>
                    <AuthForm />
                  </>
                )}
              </div>
            </div>
          </div>
        </aside>

        <RecommendationsList />
      </main>
    </div>
  );
};
