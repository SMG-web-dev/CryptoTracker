import { BitcoinCard } from './BitcoinCard';

export const Hero = () => {
  return (
    <div className="relative min-h-[100svh] bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
      <div className="relative container mx-auto px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 py-4 xs:py-6 sm:py-8 md:py-12 lg:py-16 2xl:py-20">
        <div className="flex flex-col h-full gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10 2xl:gap-12">
          <div className="space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center">
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-4xl lg:text-5xl 2xl:text-7xl font-bold leading-tight">
              The Future of <span className="text-yellow-400">Digital Currency</span>
            </h1>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl 2xl:text-2xl max-w-[260px] xs:max-w-[280px] sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto text-gray-300">
              Trade cryptocurrencies with confidence using our advanced platform. Start your journey into the world of digital assets today.
            </p>
            <div className="flex flex-col xs:flex-row justify-center gap-2 xs:gap-3 sm:gap-4 md:gap-5">
              <button className="inline-block text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl bg-yellow-400 text-black px-6 xs:px-8 sm:px-10 md:px-12 py-2 xs:py-2.5 md:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Get Started
              </button>
              <button className="inline-block text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl border border-yellow-400 text-yellow-400 px-6 xs:px-8 sm:px-10 md:px-12 py-2 xs:py-2.5 md:py-3 rounded-lg font-semibold hover:bg-yellow-400/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="flex-1 flex items-end justify-center mt-3 xs:mt-4 sm:mt-6 md:mt-8 lg:mt-10">
            <BitcoinCard />
          </div>
        </div>
      </div>
    </div>
  );
};