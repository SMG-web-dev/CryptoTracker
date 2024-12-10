import { Link } from 'react-router-dom';
import { Wallet, Search, Menu, X, Calculator } from 'lucide-react';
import { useState } from 'react';
import favicon from '/favicon.ico';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="backdrop-blur-md bg-gray-900/80 border-b border-gray-800/50 fixed top-0 left-0 right-0 z-50 shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 relative">
                    <Link to="/" className="flex items-center gap-2 sm:gap-3">
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 p-1 rounded-lg">
                            <img src={favicon} alt="Logo" className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                        </div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 font-bold text-lg sm:text-xl lg:text-2xl">
                            CryptoTracker
                        </span>
                    </Link>

                    {/* Desktop/Tablet Navigation */}
                    <div className="hidden sm:flex items-center gap-3 lg:gap-6">
                        <Link
                            to="/explorer"
                            className="group flex items-center gap-2 px-3 lg:px-4 py-2 text-gray-300 hover:text-yellow-400 transition-all duration-300"
                        >
                            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="hidden lg:inline">Explorer</span>
                        </Link>
                        <Link
                            to="/price-comparison"
                            className="group flex items-center gap-2 px-3 lg:px-4 py-2 text-gray-300 hover:text-yellow-400 transition-all duration-300"
                        >
                            <Calculator className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span className="hidden lg:inline">Compare</span>
                        </Link>
                        <Link
                            to="/wallet-tracker"
                            className="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-400/20 transform hover:-translate-y-0.5"
                        >
                            <Wallet className="w-5 h-5" />
                            <span className="hidden lg:inline">Track Wallet</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-300 hover:text-yellow-400 transition-colors p-2 rounded-lg hover:bg-gray-800/50"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute top-full left-0 right-0 backdrop-blur-lg bg-gray-900/95 sm:hidden rounded-b-xl shadow-xl border-t border-gray-800/50">
                            <div className="flex flex-col p-2">
                                <Link
                                    to="/explorer"
                                    onClick={toggleMenu}
                                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                                >
                                    <Search className="w-5 h-5" />
                                    Explorer
                                </Link>
                                <Link
                                    to="/price-comparison"
                                    onClick={toggleMenu}
                                    className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 rounded-lg transition-all duration-300"
                                >
                                    <Calculator className="w-5 h-5" />
                                    Compare
                                </Link>
                                <Link
                                    to="/wallet-tracker"
                                    onClick={toggleMenu}
                                    className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
                                >
                                    <Wallet className="w-5 h-5" />
                                    Track Wallet
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};