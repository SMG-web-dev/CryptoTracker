import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CryptoData } from '../../types/crypto';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ComparisonChartProps {
  baseCrypto: CryptoData;
  targetCrypto: CryptoData;
  theoreticalPrice: number;
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({
  baseCrypto,
  targetCrypto,
  theoreticalPrice
}) => {
  const data = {
    labels: ['Current Price', 'Theoretical Price'],
    datasets: [
      {
        label: baseCrypto.name,
        data: [baseCrypto.current_price, theoreticalPrice],
        backgroundColor: ['rgba(234, 179, 8, 0.5)', 'rgba(234, 179, 8, 0.8)'],
        borderColor: ['rgba(234, 179, 8, 1)', 'rgba(234, 179, 8, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: `Price Comparison with ${targetCrypto.name}'s Market Cap`,
        color: 'white',
      },
      tooltip: {
        callbacks: {
          label: function (context: { parsed: { y: number } }) {
            return `$${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
          callback: function (tickValue: number | string) {
            return `$${Number(tickValue).toLocaleString()}`;
          },
        },
      },
      x: {
        type: 'category' as const,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        },
      },
    },
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
      <Bar data={data} options={options} />
    </div>
  );
};