import { Link } from 'react-router-dom';
import { Bitcoin } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { FooterLinks } from './FooterLinks';
import { Newsletter } from './Newsletter';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Bitcoin className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
              <span className="text-lg sm:text-xl font-bold text-white">CryptoTracker</span>
            </Link>
            <p className="text-sm sm:text-base text-gray-400">
              Track and analyze cryptocurrency portfolios with real-time data and advanced analytics.
            </p>
            <SocialLinks />
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-1 lg:col-span-2">
            <FooterLinks />
          </div>

          {/* Newsletter Section */}
          <div>
            <Newsletter />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-400">
              © {currentYear} CryptoTracker. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link to="/privacy" className="text-xs sm:text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs sm:text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-xs sm:text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};