import React, { useState, useEffect } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { getTopCryptos, searchCryptos } from '../services/api';
import { CryptoData, FilterState } from '../types/crypto';
import SearchBar from '../components/Explorer/SearchBar';
import FilterSection from '../components/Explorer/FilterSection';
import CryptoCard from '../components/Explorer/CryptoCard';

export const CryptoExplorer: React.FC = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'market_cap',
    sortOrder: 'desc'
  });

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

  const handleFilterChange = (key: keyof FilterState, value: string[] | string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      sortBy: 'market_cap',
      sortOrder: 'desc'
    });
  };

  const filteredCryptos = cryptos
    .sort((a, b) => {
      const sortValue = filters.sortOrder === 'asc' ? 1 : -1;
      switch (filters.sortBy) {
        case 'price': return (b.current_price - a.current_price) * sortValue;
        case 'change': return (b.price_change_percentage_24h - a.price_change_percentage_24h) * sortValue;
        case 'volume': return (b.total_volume - a.total_volume) * sortValue;
        default: return (a.market_cap - b.market_cap) * sortValue;
      }
    });

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Cryptocurrency Explorer</h1>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2 inline-block" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {showFilters && (
            <FilterSection
              filters={filters}
              handleFilterChange={handleFilterChange}
              resetFilters={resetFilters}
            />
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-800 h-48 rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCryptos.map((crypto) => (
              <CryptoCard key={crypto.id} crypto={crypto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoExplorer;

