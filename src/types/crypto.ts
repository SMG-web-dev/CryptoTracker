export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: {
    times: number;
    currency: string;
    percentage: number;
  } | null;
  last_updated: string;
}

export interface FilterState {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}


export interface ComparisonResultData {
  baseCrypto: CryptoData;
  targetCrypto: CryptoData;
  theoreticalPrice: number;
  percentageDifference: number;
  timestamp: number;
}

export interface MarketDataError {
  code: string;
  message: string;
}
