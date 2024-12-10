import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { getTopCryptos } from '../services/api';
import 'swiper/css';
import 'swiper/css/pagination';

interface Crypto {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_30d: number;
  image: string;
}

export const TopCryptos = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setIsLoading(true);
        const data = await getTopCryptos();
        setCryptos(data);
      } catch (error) {
        console.error('Failed to fetch cryptocurrencies:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCryptos();
  }, []);

  const renderCryptoCard = (crypto: Crypto) => (
    <div className="h-full flex flex-col justify-between bg-white/10 backdrop-blur-md p-3 sm:p-4 md:p-5 rounded-2xl border border-white/10 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 mb-2 sm:mb-3 md:mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center">
          <img
            src={crypto.image}
            alt={crypto.name}
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 object-contain"
          />
        </div>
        <div className="flex-grow overflow-hidden">
          <h3 className="text-xs sm:text-sm md:text-lg font-bold text-white truncate">
            {crypto.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider">
            {crypto.symbol}
          </p>
        </div>
      </div>

      <div className="space-y-1 md:space-y-2">
        <p className="text-sm sm:text-lg md:text-2xl font-extrabold text-white">
          ${crypto.current_price.toLocaleString()}
        </p>
        <div className="flex items-center space-x-2">
          {crypto.price_change_percentage_30d > 0 ? (
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-400" />
          ) : (
            <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-red-400" />
          )}
          <span
            className={`text-[10px] sm:text-xs md:text-sm font-semibold ${crypto.price_change_percentage_30d > 0 ? 'text-green-400' : 'text-red-400'}`}
          >
            {crypto.price_change_percentage_30d.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <p className="text-white">Loading cryptocurrencies...</p>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-10 text-center">
          Top Cryptocurrencies
        </h2>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          className="w-full"
        >
          {cryptos.map((crypto) => (
            <SwiperSlide key={crypto.id} className="pb-10">
              {renderCryptoCard(crypto)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};