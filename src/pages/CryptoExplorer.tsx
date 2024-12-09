import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { getTopCryptos, searchCryptos } from '../services/api';

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

export const CryptoExplorer = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');
  const [filterMinPrice, setFilterMinPrice] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    setLoading(true);
    const data = await getTopCryptos();
    setCryptos(data);
    setLoading(false);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchCryptos();
      return;
    }
    setLoading(true);
    const results = await searchCryptos(searchQuery);
    setCryptos(results);
    setLoading(false);
  };

  const filteredCryptos = cryptos
    .filter(crypto => {
      const matchesSearch = !searchQuery || 
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMinPrice = !filterMinPrice || crypto.current_price >= Number(filterMinPrice);
      const matchesMaxPrice = !filterMaxPrice || crypto.current_price <= Number(filterMaxPrice);
      return matchesSearch && matchesMinPrice && matchesMaxPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price': return b.current_price - a.current_price;
        case 'change': return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case 'volume': return b.total_volume - a.total_volume;
        default: return b.market_cap - a.market_cap;
      }
    });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Cryptocurrency Explorer</h1>
          
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex gap-4 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cryptocurrencies..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 hover:border-yellow-400"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </form>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-800/50 rounded-lg">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
                  >
                    <option value="market_cap">Market Cap</option>
                    <option value="price">Price</option>
                    <option value="change">24h Change</option>
                    <option value="volume">Volume</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Min Price ($)</label>
                  <input
                    type="number"
                    value={filterMinPrice}
                    onChange={(e) => setFilterMinPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Max Price ($)</label>
                  <input
                    type="number"
                    value={filterMaxPrice}
                    onChange={(e) => setFilterMaxPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600"
                  />
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-800/50 h-20 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCryptos.map((crypto) => (
                <div
                  key={crypto.id}
                  className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-yellow-400/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
                      <div>
                        <h3 className="font-semibold">{crypto.name}</h3>
                        <p className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${crypto.current_price.toLocaleString()}</p>
                      <p className={`text-sm ${
                        crypto.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};