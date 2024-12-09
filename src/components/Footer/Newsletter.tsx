import React, { useState } from 'react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-white font-semibold">Stay Updated</h3>
      <p className="text-gray-400">Get the latest crypto news and updates delivered to your inbox.</p>
      
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-yellow-400 focus:outline-none text-white"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>
        
        {status === 'success' && (
          <p className="text-green-400 text-sm animate-fade-in">
            Thanks for subscribing!
          </p>
        )}
        
        {status === 'error' && (
          <p className="text-red-400 text-sm animate-fade-in">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};