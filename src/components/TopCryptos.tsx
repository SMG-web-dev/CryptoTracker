import React, { useEffect, useState } from 'react';
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
    <div className="h-full flex flex-col justify-between bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <img 
            src={crypto.image} 
            alt={crypto.name} 
            className="w-8 h-8 object-contain" 
          />
        </div>
        <div className="flex-grow overflow-hidden">
          <h3 className="text-white font-bold text-lg truncate">{crypto.name}</h3>
          <p className="text-gray-400 text-sm uppercase tracking-wider">{crypto.symbol}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-white text-2xl font-extrabold">
          ${crypto.current_price.toLocaleString()}
        </p>
        <div className="flex items-center space-x-2">
          {crypto.price_change_percentage_30d > 0 ? (
            <TrendingUp className="w-5 h-5 text-green-400" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-400" />
          )}
          <span 
            className={`text-sm font-semibold ${
              crypto.price_change_percentage_30d > 0 
                ? 'text-green-400' 
                : 'text-red-400'
            }`}
          >
            {Math.abs(crypto.price_change_percentage_30d).toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="bg-gray-900 py-6 min-h-[250px] flex items-center justify-center">
        <div className="animate-pulse w-16 h-16 bg-white/10 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          autoplay={{ 
            delay: 3000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }}
          className="crypto-slider"
        >
          {cryptos.map((crypto) => (
            <SwiperSlide 
              key={crypto.id} 
              className="h-auto pb-10"
            >
              {renderCryptoCard(crypto)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

// Add custom styles for the slider
const styles = `
.crypto-slider .swiper-pagination-bullet {
  background-color: rgba(255,255,255,0.3);
  opacity: 1;
  transition: all 0.3s ease;
}
.crypto-slider .swiper-pagination-bullet-active {
  background-color: white;
  width: 12px;
  border-radius: 6px;
}
`;

// Inject styles
const styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

export default TopCryptos;