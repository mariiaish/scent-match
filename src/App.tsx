import { usePerfumeStore } from './store/usePerfumeStore';
import { Search } from './components/Search';
import { PerfumeCard } from './components/PerfumeCard';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import React from 'react';
import { translations } from './data/translations';
import { supabase } from './lib/supabase';
import { AuthForm } from './components/Auth';

function App() {
  const {
    myShelf,
    recommendations,
    removeFromShelf,
    fetchPerfumes,
    fetchUserShelf,
    lang,
    user,
    setUser,
    signOut,
    fetchAIRecs,
  } = usePerfumeStore();

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
    if (!!user) {
      fetchUserShelf();
    }
  }, [user, fetchUserShelf]);

  React.useEffect(() => {
    fetchPerfumes();
  }, [fetchPerfumes]);

  React.useEffect(() => {
    setIsReady(true);
  }, []);

  const getRecsByShelf = async () => {
    await fetchAIRecs();
  };

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
                  <PerfumeCard key={p.id} perfume={p} onRemove={removeFromShelf} />
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
                <PerfumeCard key={p.id} perfume={p} score={(p as any).score} />
              ))}
            </div>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed text-gray-400">
              {t.emptyShelf}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
