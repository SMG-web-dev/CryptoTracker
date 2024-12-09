import { CryptoData, ComparisonResultData } from '../types/crypto';

export class InvalidInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidInputError';
  }
}

export const validateInputs = (baseCrypto: CryptoData, targetCrypto: CryptoData): void => {
  if (!baseCrypto.circulating_supply || baseCrypto.circulating_supply <= 0) {
    throw new InvalidInputError('Base cryptocurrency must have a valid circulating supply');
  }
  if (!targetCrypto.market_cap || targetCrypto.market_cap <= 0) {
    throw new InvalidInputError('Target cryptocurrency must have a valid market cap');
  }
};

export const calculateTheoreticalPrice = (
  baseCrypto: CryptoData,
  targetCrypto: CryptoData
): ComparisonResultData => {
  validateInputs(baseCrypto, targetCrypto);

  const theoreticalPrice = (targetCrypto.market_cap / baseCrypto.circulating_supply);
  const percentageDifference = ((theoreticalPrice - baseCrypto.current_price) / baseCrypto.current_price) * 100;

  return {
    baseCrypto,
    targetCrypto,
    theoreticalPrice,
    percentageDifference,
    timestamp: Date.now()
  };
};