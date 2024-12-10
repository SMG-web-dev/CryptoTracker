import React from 'react';
import { RefreshCcw } from 'lucide-react'; // Asegúrate de tener esta librería instalada
import { FilterState } from '../../types/crypto'; // Importación de FilterState desde el archivo correspondiente

interface FilterSectionProps {
  filters: FilterState;
  handleFilterChange: (key: keyof FilterState, value: string[] | string) => void;
  resetFilters: () => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ filters, handleFilterChange, resetFilters }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6 relative"> {/* Añadido 'relative' para posicionar el botón */}
      <h2 className="text-xl font-semibold mb-4">Advanced Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-400 mb-1">Sort By</label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full mt-2 py-2 px-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="market_cap">Market Cap</option>
            <option value="price">Price</option>
            <option value="change">24h Change</option>
            <option value="volume">Volume</option>
          </select>
        </div>
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-400 mb-1">Sort Order</label>
          <select
            id="sortOrder"
            value={filters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
            className="w-full mt-2 py-2 px-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end mt-6 gap-4">
        <button
          onClick={resetFilters}
          className="p-2 bg-gray-700 border border-gray-600 rounded-md text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 absolute top-4 right-4" // Posicionamiento absoluto
        >
          <RefreshCcw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
