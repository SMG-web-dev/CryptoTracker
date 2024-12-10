import { BitcoinCard } from './BitcoinCard';

export const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="relative container mx-auto px-4 py-12 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              The Future of <span className="text-yellow-400">Digital Currency</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0">
              Trade cryptocurrencies with confidence using our advanced platform. Start your journey into the world of digital assets today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button className="bg-yellow-400 text-black px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Get Started
              </button>
              <button className="border border-yellow-400 text-yellow-400 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-400/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="mt-8 lg:mt-0 order-first lg:order-last">
            <BitcoinCard />
          </div>
        </div>
      </div>
    </div>
  );
};