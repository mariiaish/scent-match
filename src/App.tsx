import { usePerfumeStore } from './store/usePerfumeStore';
import { Search } from './components/Search';
import { PerfumeCard } from './components/PerfumeCard';

function App() {
  const { myShelf, recommendations, removeFromShelf } = usePerfumeStore();

  return (
    <div className="min-h-screen">
      <header className="py-12 text-center border-b bg-white">
        <h1 className="text-4xl font-serif mb-2 tracking-tight">ScentMatch <span className="text-perfume-gold">AI</span></h1>
        <p className="text-gray-500 text-sm">Find your next signature scent based on your collection</p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

        <aside className="lg:col-span-4 space-y-10">
          <div className="space-y-4">
            <h2 className="text-xl font-medium">Add to collection</h2>
            <Search />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-medium italic">Your Shelf ({myShelf.length})</h2>
            <div className="grid gap-4">
              {myShelf.map(p => (
                <PerfumeCard key={p.id} perfume={p} onRemove={removeFromShelf} />
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <h2 className="text-2xl font-serif mb-8 border-l-4 border-perfume-gold pl-4">Recommended for You</h2>

          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recommendations.map(p => (
                <PerfumeCard key={p.id} perfume={p} score={(p as any).score} />
              ))}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-2xl text-gray-400">
              Add perfumes to see recommendations
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
