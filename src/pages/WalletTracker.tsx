import { useState } from 'react';
import { Search, Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { getWalletBalance } from '../services/api';

interface Transaction {
  id: number;
  type: string;
  amount: number;
  timestamp: number;
  status: string;
}

export const WalletTracker = () => {
  const [address, setAddress] = useState('');
  const [chain, setChain] = useState('ethereum');
  const [balance, setBalance] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    try {
      const data = await getWalletBalance(address, chain);
      setBalance(data.balance);
      setTransactions(data.transactions);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900 text-white py-6 sm:py-8 md:py-12 lg:py-16 overflow-x-hidden">
      <div className="w-[min(100%-2rem,1200px)] mx-auto">
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center">
            Wallet Tracker
          </h1>

          <form onSubmit={handleSearch} className="w-full mb-6 sm:mb-8 lg:mb-10">
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:gap-6 w-full">
              <div className="w-full md:col-span-2">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter wallet address"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 focus:outline-none text-sm sm:text-base"
                />
              </div>
              <select
                value={chain}
                onChange={(e) => setChain(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 focus:outline-none text-sm sm:text-base"
              >
                <option value="ethereum">Ethereum</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="binance">Binance Smart Chain</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Search className="w-4 sm:w-5 h-4 sm:h-5" />
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {balance !== null && (
            <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
              <div className="w-full bg-gray-800/50 p-4 sm:p-6 lg:p-8 rounded-xl border border-gray-700">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <Wallet className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-400" />
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">Wallet Balance</h2>
                </div>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold break-all">
                  {balance.toFixed(8)} {chain === 'ethereum' ? 'ETH' : chain === 'bitcoin' ? 'BTC' : 'BNB'}
                </p>
              </div>

              <div className="w-full bg-gray-800/50 p-4 sm:p-6 lg:p-8 rounded-xl border border-gray-700">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">Recent Transactions</h2>
                <div className="w-full space-y-3 sm:space-y-4">
                  {transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-900/50 rounded-lg gap-2 sm:gap-4"
                    >
                      <div className="flex items-center gap-3">
                        {tx.type === 'receive' ? (
                          <ArrowDownLeft className="w-5 sm:w-6 h-5 sm:h-6 text-green-400 flex-shrink-0" />
                        ) : (
                          <ArrowUpRight className="w-5 sm:w-6 h-5 sm:h-6 text-red-400 flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm sm:text-base font-semibold truncate">
                            {tx.type === 'receive' ? 'Received' : 'Sent'}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-400">
                            {new Date(tx.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="w-full sm:w-auto text-left sm:text-right">
                        <p className={`text-sm sm:text-base font-bold ${tx.type === 'receive' ? 'text-green-400' : 'text-red-400'} break-all`}>
                          {tx.type === 'receive' ? '+' : '-'}{tx.amount.toFixed(8)}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-400">{tx.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};