import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'atropos/css';
import 'swiper/css';
import { Header } from './components/Header/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TopCryptos } from './components/TopCryptos';
import { WalletTracker } from './pages/WalletTracker';
import { CryptoExplorer } from './pages/CryptoExplorer';
import { PriceComparison } from './pages/PriceComparison';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900">
        <Header />

        <div className="pt-16"> {/* Add padding to prevent content from being hidden behind fixed header */}
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <TopCryptos />
                <Features />
              </>
            } />
            <Route path="/wallet-tracker" element={<WalletTracker />} />
            <Route path="/explorer" element={<CryptoExplorer />} />
            <Route path="/price-comparison" element={<PriceComparison />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;