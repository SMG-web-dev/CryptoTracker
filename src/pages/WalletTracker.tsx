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
    <div className="min-h-screen bg-gray-900 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Wallet Tracker</h1>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter wallet address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 focus:outline-none"
                />
              </div>
              <select
                value={chain}
                onChange={(e) => setChain(e.target.value)}
                className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 focus:outline-none"
              >
                <option value="ethereum">Ethereum</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="binance">Binance Smart Chain</option>
              </select>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {balance !== null && (
            <div className="space-y-8">
              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <div className="flex items-center gap-4 mb-4">
                  <Wallet className="w-8 h-8 text-yellow-400" />
                  <h2 className="text-2xl font-bold">Wallet Balance</h2>
                </div>
                <p className="text-3xl font-bold">{balance.toFixed(8)} {chain === 'ethereum' ? 'ETH' : chain === 'bitcoin' ? 'BTC' : 'BNB'}</p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
                <div className="space-y-4">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {tx.type === 'receive' ? (
                          <ArrowDownLeft className="w-6 h-6 text-green-400" />
                        ) : (
                          <ArrowUpRight className="w-6 h-6 text-red-400" />
                        )}
                        <div>
                          <p className="font-semibold">{tx.type === 'receive' ? 'Received' : 'Sent'}</p>
                          <p className="text-sm text-gray-400">
                            {new Date(tx.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${tx.type === 'receive' ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.type === 'receive' ? '+' : '-'}{tx.amount.toFixed(8)}
                        </p>
                        <p className="text-sm text-gray-400">{tx.status}</p>
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