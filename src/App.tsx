import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'atropos/css';
import 'swiper/css';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { TopCryptos } from './components/TopCryptos';
import { WalletTracker } from './pages/WalletTracker';
import { CryptoExplorer } from './pages/CryptoExplorer';
import { PriceComparison } from './pages/PriceComparison';
import { Footer } from './components/Footer/Footer';
import { Wallet, Search, Calculator } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900">
        <nav className="bg-gray-800/50 border-b border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="text-yellow-400 font-bold text-xl">CryptoTracker</Link>
              <div className="flex items-center gap-4">
                <Link
                  to="/explorer"
                  className="flex items-center gap-2 px-4 py-2 text-white hover:text-yellow-400 transition-colors"
                >
                  <Search className="w-5 h-5" />
                  Explorer
                </Link>
                <Link
                  to="/price-comparison"
                  className="flex items-center gap-2 px-4 py-2 text-white hover:text-yellow-400 transition-colors"
                >
                  <Calculator className="w-5 h-5" />
                  Compare
                </Link>
                <Link
                  to="/wallet-tracker"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors"
                >
                  <Wallet className="w-5 h-5" />
                  Track Wallet
                </Link>
              </div>
            </div>
          </div>
        </nav>

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
    </BrowserRouter>
  );
}

export default App;