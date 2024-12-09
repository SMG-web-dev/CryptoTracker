import { useEffect, useState } from 'react';
import Atropos from 'atropos/react';
import { Bitcoin, TrendingUp, TrendingDown } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';
import { getBitcoinData } from '../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

interface BitcoinData {
  price: number;
  change_24h: number;
  market_cap: number;
  chart_data: [number, number][];
}

export const BitcoinCard = () => {
  const [data, setData] = useState<BitcoinData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBitcoinData();
      setData(result);
      setLoading(false);
    };
    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: data?.chart_data.map(item =>
      new Date(item[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    ) || [],
    datasets: [
      {
        fill: true,
        label: 'Bitcoin Price',
        data: data?.chart_data.map(item => item[1]) || [],
        borderColor: '#EAB308',
        backgroundColor: 'linear-gradient(to right, rgba(234, 179, 8, 0.3), rgba(234, 179, 8, 0.1))',
        tension: 0.4,
        pointRadius: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: 'white',
        bodyColor: 'white',
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      }
    },
    interaction: {
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-800/80 p-8 rounded-3xl border border-gray-700 h-[400px] shadow-2xl" />
    );
  }

  return (
    <Atropos
      className="atropos-banner w-full"
      highlight={false}
      shadow={false}
    >
      <div className="bg-gradient-to-br from-gray-700/90 to-gray-800/90 p-6 rounded-3xl backdrop-blur-md border border-gray-600 shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Bitcoin className="w-16 h-16 text-yellow-400 animate-pulse" />
            <h2 className="text-2xl font-bold text-white">Bitcoin</h2>
          </div>
          {data?.change_24h && (
            data.change_24h > 0 ? (
              <TrendingUp className="w-10 h-10 text-green-400 animate-bounce" />
            ) : (
              <TrendingDown className="w-10 h-10 text-red-400 animate-bounce" />
            )
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-400 text-sm">Current Price</p>
            <p className="text-4xl font-extrabold text-yellow-300">
              ${data?.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">24h Change</p>
            <p className={`text-3xl font-bold ${data?.change_24h && data.change_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {data?.change_24h?.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-400 text-sm">Market Cap</p>
            <p className="text-2xl font-semibold text-white">
              ${data?.market_cap && (data.market_cap / 1e9).toFixed(2)}B
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm">Last Updated</p>
            <p className="text-xl font-medium text-gray-300">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="h-48 w-full bg-transparent">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </Atropos>
  );
};