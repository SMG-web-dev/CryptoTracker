import axios from 'axios';
import { CryptoData } from '../types/crypto';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

interface CoinGeckoMarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  total_volume: number;
  price_change_percentage_24h: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
}

interface CoinGeckoSearchResult {
  id: string;
  // otros campos no son necesarios para nuestro uso
}

export const getBitcoinData = async () => {
  try {
    const [priceData, chartData] = await Promise.all([
      axios.get(`${COINGECKO_API}/simple/price`, {
        params: {
          ids: 'bitcoin',
          vs_currencies: 'usd',
          include_24hr_change: true,
          include_market_cap: true,
        }
      }),
      axios.get(`${COINGECKO_API}/coins/bitcoin/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: 365,
          interval: 'daily'
        }
      })
    ]);

    return {
      price: Number(priceData.data.bitcoin.usd),
      change_24h: Number(priceData.data.bitcoin.usd_24h_change),
      market_cap: Number(priceData.data.bitcoin.usd_market_cap),
      chart_data: chartData.data.prices.map((item: [number, number]) => [
        Number(item[0]),
        Number(item[1])
      ])
    };
  } catch (error) {
    console.error('Error fetching Bitcoin data:', error);
    return {
      price: 0,
      change_24h: 0,
      market_cap: 0,
      chart_data: []
    };
  }
};

export const getTopCryptos = async (): Promise<CryptoData[]> => {
  try {
    const response = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        sparkline: false,
        price_change_percentage: '24h'
      }
    });

    return response.data.map((crypto: CoinGeckoMarketData) => ({
      id: String(crypto.id),
      symbol: String(crypto.symbol),
      name: String(crypto.name),
      image: String(crypto.image),
      current_price: Number(crypto.current_price),
      market_cap: Number(crypto.market_cap),
      circulating_supply: Number(crypto.circulating_supply),
      total_supply: Number(crypto.total_supply),
      max_supply: Number(crypto.max_supply),
      total_volume: Number(crypto.total_volume),
      price_change_percentage_24h: Number(crypto.price_change_percentage_24h),
      ath: Number(crypto.ath),
      ath_change_percentage: Number(crypto.ath_change_percentage),
      ath_date: String(crypto.ath_date)
    }));
  } catch (error) {
    console.error('Error fetching top cryptos:', error);
    return [];
  }
};

export const searchCryptos = async (query: string): Promise<CryptoData[]> => {
  try {
    const response = await axios.get(`${COINGECKO_API}/search`, {
      params: { query }
    });

    const ids = response.data.coins.slice(0, 10).map((coin: CoinGeckoSearchResult) => coin.id).join(',');

    if (!ids) return [];

    const marketsResponse = await axios.get(`${COINGECKO_API}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        ids,
        order: 'market_cap_desc',
        sparkline: false,
        price_change_percentage: '24h'
      }
    });

    return marketsResponse.data.map((crypto: CoinGeckoMarketData) => ({
      id: String(crypto.id),
      symbol: String(crypto.symbol),
      name: String(crypto.name),
      image: String(crypto.image),
      current_price: Number(crypto.current_price),
      market_cap: Number(crypto.market_cap),
      circulating_supply: Number(crypto.circulating_supply),
      total_supply: Number(crypto.total_supply),
      max_supply: Number(crypto.max_supply),
      total_volume: Number(crypto.total_volume),
      price_change_percentage_24h: Number(crypto.price_change_percentage_24h),
      ath: Number(crypto.ath),
      ath_change_percentage: Number(crypto.ath_change_percentage),
      ath_date: String(crypto.ath_date)
    }));
  } catch (error) {
    console.error('Error searching cryptos:', error);
    return [];
  }
};

export const getWalletBalance = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _address: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _chain: string
) => {
  // Mock data implementation
  return {
    balance: Number((Math.random() * 10).toFixed(8)),
    transactions: Array(5).fill(null).map((_, i) => ({
      id: i,
      type: Math.random() > 0.5 ? 'send' : 'receive',
      amount: Number((Math.random() * 2).toFixed(8)),
      timestamp: Date.now() - i * 86400000,
      status: 'confirmed'
    }))
  };
};

