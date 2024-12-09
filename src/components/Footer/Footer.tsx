import React from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin } from 'lucide-react';
import { SocialLinks } from './SocialLinks';
import { FooterLinks } from './FooterLinks';
import { Newsletter } from './Newsletter';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Bitcoin className="w-8 h-8 text-yellow-400" />
              <span className="text-xl font-bold text-white">CryptoTracker</span>
            </Link>
            <p className="text-gray-400">
              Track and analyze cryptocurrency portfolios with real-time data and advanced analytics.
            </p>
            <SocialLinks />
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <FooterLinks />
          </div>

          {/* Newsletter Section */}
          <div>
            <Newsletter />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} CryptoTracker. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-yellow-400 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};