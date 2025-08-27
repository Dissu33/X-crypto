import { useEffect, useState } from 'react';
import './index.css';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
      .then(res => res.json())
      .then(data => setCoins(data));
  }, []);

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Crypto Tracker</h1>
          <button
         onClick={toggleDarkMode}
         className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
         >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
         </button>

        </div>

        <input
          type="text"
          placeholder="Search cryptocurrency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-2 mb-4 border dark:bg-gray-800 rounded"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {filteredCoins.map((coin) => (
            <div key={coin.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <div className="flex items-center gap-4">
                <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                <div>
                  <h2 className="font-semibold text-lg">{coin.name}</h2>
                  <p className="text-sm uppercase text-gray-500">{coin.symbol}</p>
                </div>
              </div>
              <div className="mt-2">
                <p>💲 Price: ${coin.current_price.toLocaleString()}</p>
                <p>📈 Market Cap: ${coin.market_cap.toLocaleString()}</p>
                <p className={coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}>
                  ⏳ 24h: {coin.price_change_percentage_24h.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
