import { Shield, Zap, BarChart3, Lock } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-yellow-400" />,
      title: 'Secure Trading',
      description: 'Advanced encryption and security measures to protect your assets'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      title: 'Instant Transactions',
      description: 'Lightning-fast trades with minimal processing time'
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-yellow-400" />,
      title: 'Advanced Analytics',
      description: 'Real-time market data and comprehensive trading tools'
    },
    {
      icon: <Lock className="w-8 h-8 text-yellow-400" />,
      title: 'Cold Storage',
      description: 'Majority of assets stored in secure offline wallets'
    }
  ];

  return (
    <div className="bg-gray-900 py-12 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">Why Choose Us</h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Experience the next generation of cryptocurrency trading with our cutting-edge features
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700 hover:border-yellow-400/50 transition-colors"
            >
              <div className="mb-2 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">{feature.title}</h3>
              <p className="text-xs sm:text-base text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};