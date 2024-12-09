import React from 'react';
import { BitcoinCard } from './BitcoinCard';

export const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="relative container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              The Future of <span className="text-yellow-400">Digital Currency</span>
            </h1>
            <p className="text-xl text-gray-300">
              Trade cryptocurrencies with confidence using our advanced platform. Start your journey into the world of digital assets today.
            </p>
            <div className="flex gap-4">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Get Started
              </button>
              <button className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div>
            <BitcoinCard />
          </div>
        </div>
      </div>
    </div>
  );
};