import React from 'react';
import { CryptoData } from '../../types/crypto';

interface CryptoSelectorProps {
  label: string;
  value: CryptoData | null;
  options: CryptoData[];
  onChange: (crypto: CryptoData | null) => void;
  loading: boolean;
}

export const CryptoSelector: React.FC<CryptoSelectorProps> = ({
  label,
  value,
  options,
  onChange,
  loading
}) => {
  if (loading) {
    return (
      <div className="space-y-2">
        <div className="h-6 bg-gray-800 rounded w-1/3 animate-pulse" />
        <div className="h-12 bg-gray-800 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative">
        <select
          value={value?.id || ''}
          onChange={(e) => {
            const selected = options.find(crypto => crypto.id === e.target.value);
            onChange(selected || null);
          }}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 focus:outline-none appearance-none"
        >
          <option value="">Select a cryptocurrency</option>
          {options.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};