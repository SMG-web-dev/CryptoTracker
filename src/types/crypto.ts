export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  circulating_supply: number;
  total_volume: number;
  price_change_percentage_24h: number;
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