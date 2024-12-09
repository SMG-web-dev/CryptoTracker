import { useState, useEffect, useCallback } from 'react';
import { getTopCryptos } from '../services/api';
import { CryptoData } from '../types/crypto';

const CACHE_DURATION = 60000; // 1 minute cache duration
const REFRESH_INTERVAL = 60000; // 1 minute refresh interval

interface CacheItem {
  data: CryptoData[];
  timestamp: number;
}

let cache: CacheItem | null = null;

export const useMarketData = () => {
  const [cryptos, setCryptos] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const isCacheValid = useCallback(() => {
    return cache && (Date.now() - cache.timestamp) < CACHE_DURATION;
  }, []);

  const fetchData = useCallback(async (force = false) => {
    try {
      if (!force && isCacheValid()) {
        setCryptos(cache!.data);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      const data = await getTopCryptos();
      
      // Update cache
      cache = {
        data,
        timestamp: Date.now()
      };
      
      setCryptos(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch market data'));
      // If cache exists, use it as fallback during errors
      if (cache) {
        setCryptos(cache.data);
      }
    } finally {
      setLoading(false);
    }
  }, [isCacheValid]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => fetchData(true), REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    cryptos,
    loading,
    error,
    refreshData: () => fetchData(true)
  };
};