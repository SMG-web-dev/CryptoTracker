import React from 'react';
import { CryptoData } from '../../types/crypto';

interface CryptoCardProps {
  crypto: CryptoData;
}

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="p-4 cursor-pointer hover:bg-gray-700">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
            <div>
              <h3 className="font-semibold">{crypto.name}</h3>
              <p className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">${crypto.current_price.toLocaleString()}</p>
            <p className={`text-sm ${crypto.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {crypto.price_change_percentage_24h.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Market Cap</p>
            <p>${crypto.market_cap.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400">24h Volume</p>
            <p>${crypto.total_volume.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400">Circulating Supply</p>
            <p>{crypto.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-gray-400">Total Supply</p>
            <p>{crypto.total_supply ? crypto.total_supply.toLocaleString() : 'N/A'} {crypto.symbol.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-gray-400">Max Supply</p>
            <p>{crypto.max_supply ? crypto.max_supply.toLocaleString() : 'N/A'} {crypto.symbol.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-gray-400">All Time High</p>
            <p>${crypto.ath.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-400">ATH Change</p>
            <p className={crypto.ath_change_percentage > 0 ? 'text-green-400' : 'text-red-400'}>
              {crypto.ath_change_percentage.toFixed(2)}%
            </p>
          </div>
          <div>
            <p className="text-gray-400">ATH Date</p>
            <p>{new Date(crypto.ath_date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;

