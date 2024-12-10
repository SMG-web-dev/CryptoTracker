import { Link } from 'react-router-dom';
import { Wallet, Search, Menu, X, Calculator } from 'lucide-react';
import { useState } from 'react';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-800/50 border-b border-gray-700 fixed top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16 relative">
                    <Link to="/" className="text-yellow-400 font-bold text-lg md:text-xl">
                        CryptoTracker
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-yellow-400 transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/explorer"
                            className="flex items-center gap-2 px-4 py-2 text-white hover:text-yellow-400 transition-colors"
                        >
                            <Search className="w-5 h-5" />
                            <span className="hidden md:inline">Explorer</span>
                        </Link>
                        <Link
                            to="/price-comparison"
                            className="flex items-center gap-2 px-4 py-2 text-white hover:text-yellow-400 transition-colors"
                        >
                            <Calculator className="w-5 h-5" />
                            <span className="hidden md:inline">Compare</span>
                        </Link>
                        <Link
                            to="/wallet-tracker"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition-colors"
                        >
                            <Wallet className="w-5 h-5" />
                            <span className="hidden md:inline">Track Wallet</span>
                        </Link>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute top-full left-0 right-0 bg-gray-800 md:hidden">
                            <div className="flex flex-col">
                                <Link
                                    to="/explorer"
                                    onClick={toggleMenu}
                                    className="flex items-center gap-2 px-4 py-3 text-white hover:text-yellow-400 transition-colors border-b border-gray-700"
                                >
                                    <Search className="w-5 h-5" />
                                    Explorer
                                </Link>
                                <Link
                                    to="/price-comparison"
                                    onClick={toggleMenu}
                                    className="flex items-center gap-2 px-4 py-3 text-white hover:text-yellow-400 transition-colors border-b border-gray-700"
                                >
                                    <Calculator className="w-5 h-5" />
                                    Compare
                                </Link>
                                <Link
                                    to="/wallet-tracker"
                                    onClick={toggleMenu}
                                    className="flex items-center gap-2 px-4 py-3 text-black bg-yellow-400 hover:bg-yellow-300 transition-colors"
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