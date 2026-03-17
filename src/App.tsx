import { usePerfumeStore } from './store/usePerfumeStore';
import { Search } from './components/Search';
import { PerfumeCard } from './components/PerfumeCard';

function App() {
  const { myShelf, recommendations, removeFromShelf } = usePerfumeStore();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white py-12 text-center">
        <h1 className="mb-2 font-serif text-4xl tracking-tight">
          ScentMatch <span className="text-perfume-gold">AI</span>
        </h1>
        <p className="text-sm text-gray-500">
          Find your next signature scent based on your collection
        </p>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-12">
        <aside className="space-y-10 lg:col-span-4">
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Add to collection</h2>
            <Search />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium italic">Your Shelf ({myShelf.length})</h2>
            <div className="grid gap-4">
              {myShelf.map((p) => (
                <PerfumeCard key={p.id} perfume={p} onRemove={removeFromShelf} />
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <h2 className="border-perfume-gold mb-8 border-l-4 pl-4 font-serif text-2xl">
            Recommended for You
          </h2>

          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {recommendations.map((p) => (
                <PerfumeCard key={p.id} perfume={p} score={(p as any).score} />
              ))}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-2xl border-2 border-dashed text-gray-400">
              Add perfumes to see recommendations
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
