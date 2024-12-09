import React from 'react';
import { ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { ComparisonResultData } from '../../types/crypto';

interface ComparisonResultProps {
  result: ComparisonResultData;
}

export const ComparisonResult: React.FC<ComparisonResultProps> = ({ result }) => {
  const {
    baseCrypto,
    targetCrypto,
    theoreticalPrice,
    percentageDifference,
    timestamp
  } = result;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Price Comparison</h2>
        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Last updated: {formatTime(timestamp)}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Current Metrics</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Price</p>
              <p className="text-2xl font-bold">${baseCrypto.current_price.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Market Cap</p>
              <p className="text-xl font-semibold">${(baseCrypto.market_cap / 1e9).toFixed(2)}B</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Supply</p>
              <p className="text-xl font-semibold">{baseCrypto.circulating_supply.toLocaleString()} {baseCrypto.symbol.toUpperCase()}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-300 mb-4">With {targetCrypto.name}'s Market Cap</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Theoretical Price</p>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-bold text-yellow-400">
                  ${theoreticalPrice.toLocaleString()}
                </p>
                <span className={`flex items-center ${percentageDifference >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {percentageDifference >= 0 ? (
                    <ArrowUpRight className="w-5 h-5" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5" />
                  )}
                  {Math.abs(percentageDifference).toFixed(2)}%
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-400">Target Market Cap</p>
              <p className="text-xl font-semibold">${(targetCrypto.market_cap / 1e9).toFixed(2)}B</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Current Supply</p>
              <p className="text-xl font-semibold">{baseCrypto.circulating_supply.toLocaleString()} {baseCrypto.symbol.toUpperCase()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};