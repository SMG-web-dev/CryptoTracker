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
  Filler,
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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detectar si es un dispositivo táctil
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

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
        backgroundColor: (context: { chart: { ctx: CanvasRenderingContext2D; canvas: { height: number } } }) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(234, 179, 8, 0.5)');
          gradient.addColorStop(1, 'rgba(234, 179, 8, 0)');
          return gradient;
        },
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
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
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#EAB308',
        bodyColor: 'white',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 13,
        },
        displayColors: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'category' as const,
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 10,
          },
          maxRotation: 0,
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.5)',
          font: {
            size: 10,
          },
          callback: function (value: number) {
            return `$${value.toLocaleString()}` as string;
          },
        },
      }
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
    elements: {
      line: {
        borderWidth: 2,
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 10,
        left: 10,
        right: 10,
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
      activeOffset={40}
      rotateTouch={!isTouchDevice}
    >
      <div className="bg-gradient-to-br from-gray-700/90 to-gray-800/90 p-6 rounded-3xl backdrop-blur-md border border-gray-600 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:[@media(hover:none)]:scale-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Bitcoin className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold text-white">Bitcoin</h2>
          </div>
          {data?.change_24h && (
            data.change_24h > 0 ? (
              <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-green-400 animate-bounce" />
            ) : (
              <TrendingDown className="w-8 h-8 md:w-10 md:h-10 text-red-400 animate-bounce" />
            )
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs md:text-sm text-gray-400">Current Price</p>
            <p className="text-2xl md:text-4xl font-extrabold text-yellow-300">
              ${data?.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs md:text-sm text-gray-400">24h Change</p>
            <p className={`text-xl md:text-3xl font-bold ${data?.change_24h && data.change_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {data?.change_24h?.toFixed(2)}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs md:text-sm text-gray-400">Market Cap</p>
            <p className="text-xl md:text-3xl font-semibold text-white">
              ${data?.market_cap && (data.market_cap / 1e9).toFixed(2)}B
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs md:text-sm text-gray-400">Last Updated</p>
            <p className="text-sm md:text-base font-medium text-gray-300">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="h-48 w-full bg-transparent">
          <Line
            data={chartData}
            options={{
              ...chartOptions,
              scales: {
                x: chartOptions.scales.x,
                y: {
                  ...chartOptions.scales.y,
                  ticks: {
                    ...chartOptions.scales.y.ticks,
                    callback: function (tickValue: number | string) {
                      return typeof tickValue === 'number' ? tickValue.toString() : tickValue;
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </Atropos>
  );
};