import axios from 'axios';
import { CryptoData } from '../types/crypto';

const COINGECKO_API = 'https://api.coingecko.com/api/v3';

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
          days: 30,
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

    // Explicitly map and serialize the response data
    return response.data.map((crypto: any) => ({
      id: String(crypto.id),
      symbol: String(crypto.symbol),
      name: String(crypto.name),
      image: String(crypto.image),
      current_price: Number(crypto.current_price),
      market_cap: Number(crypto.market_cap),
      circulating_supply: Number(crypto.circulating_supply),
      total_volume: Number(crypto.total_volume),
      price_change_percentage_24h: Number(crypto.price_change_percentage_24h)
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

    const ids = response.data.coins.slice(0, 10).map((coin: any) => coin.id).join(',');
    
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

    return marketsResponse.data.map((crypto: any) => ({
      id: String(crypto.id),
      symbol: String(crypto.symbol),
      name: String(crypto.name),
      image: String(crypto.image),
      current_price: Number(crypto.current_price),
      market_cap: Number(crypto.market_cap),
      circulating_supply: Number(crypto.circulating_supply),
      total_volume: Number(crypto.total_volume),
      price_change_percentage_24h: Number(crypto.price_change_percentage_24h)
    }));
  } catch (error) {
    console.error('Error searching cryptos:', error);
    return [];
  }
};

export const getWalletBalance = async (address: string, chain: string) => {
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