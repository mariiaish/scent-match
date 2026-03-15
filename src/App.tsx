import { usePerfumeStore } from './store/usePerfumeStore';

function App() {
  const { allPerfumes, myShelf, recommendations, addToShelf, calculateRecs, clearShelf } = usePerfumeStore();

  const testAddAndRec = () => {
    // 1. Берем первый попавшийся парфюм из базы для теста
    const testPerfume = allPerfumes[8000];
    if (testPerfume) {
      console.log("Добавляем на полку:", testPerfume.Perfume);
      addToShelf(testPerfume);

      // 2. Сразу запускаем расчет рекомендаций
      calculateRecs();
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>ScentMatch Test 🧪</h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={testAddAndRec} style={buttonStyle}>
          Добавить 1-й аромат и рассчитать
        </button>
        <button onClick={clearShelf} style={{ ...buttonStyle, backgroundColor: '#ff4444' }}>
          Очистить полку
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Секция полки */}
        <section>
          <h2>Моя полка ({myShelf.length})</h2>
          <ul>
            {myShelf.map(p => (
              <li key={p.id}>{p.Brand} - {p.Perfume}</li>
            ))}
          </ul>
        </section>

        {/* Секция рекомендаций */}
        <section>
          <h2>Рекомендации ({recommendations.length})</h2>
          <p style={{ fontSize: '0.8rem', color: '#666' }}>
            (Алгоритм: База=3 балла, Сердце=2, Топ=1)
          </p>
          <ul>
            {recommendations.map(p => (
              <li key={p.id}>
                <strong>{p.Brand} - {p.Perfume}</strong>
                <span style={{ color: 'green', marginLeft: '10px' }}>
                  Score: {(p as any).score}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: '10px 20px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px'
};

export default App;
