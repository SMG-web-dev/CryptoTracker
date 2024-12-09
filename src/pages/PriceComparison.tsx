import React, { useState, useEffect, useMemo } from 'react';
import { Calculator, RefreshCw } from 'lucide-react';
import { CryptoSelector } from '../components/PriceComparison/CryptoSelector';
import { ComparisonResult } from '../components/PriceComparison/ComparisonResult';
import { ComparisonChart } from '../components/PriceComparison/ComparisonChart';
import { useMarketData } from '../hooks/useMarketData';
import { CryptoData } from '../types/crypto';
import { calculateTheoreticalPrice } from '../utils/priceCalculations';

export const PriceComparison = () => {
  const { cryptos, loading, error, refreshData } = useMarketData();
  const [baseCrypto, setBaseCrypto] = useState<CryptoData | null>(null);
  const [targetCrypto, setTargetCrypto] = useState<CryptoData | null>(null);

  const comparisonResult = useMemo(() => {
    if (!baseCrypto || !targetCrypto) return null;
    return calculateTheoreticalPrice(baseCrypto, targetCrypto);
  }, [baseCrypto, targetCrypto]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error loading market data</h2>
            <button
              onClick={refreshData}
              className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Calculator className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold">Price Comparison Calculator</h1>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <CryptoSelector
              label="Base Cryptocurrency"
              value={baseCrypto}
              options={cryptos}
              onChange={setBaseCrypto}
              loading={loading}
            />
            <CryptoSelector
              label="Target Cryptocurrency"
              value={targetCrypto}
              options={cryptos}
              onChange={setTargetCrypto}
              loading={loading}
            />
          </div>

          {comparisonResult && (
            <>
              <ComparisonResult result={comparisonResult} />
              <ComparisonChart 
                baseCrypto={baseCrypto!}
                targetCrypto={targetCrypto!}
                theoreticalPrice={comparisonResult.theoreticalPrice}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};