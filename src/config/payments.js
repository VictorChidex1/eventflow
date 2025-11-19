import { env } from './environment';

export const paymentConfig = {
  paystack: {
    publicKey: env.paystackPublicKey,
    baseUrl: 'https://api.paystack.co',
  },
  stripe: {
    publicKey: env.stripePublicKey,
  }
};

export const currencyConfig = {
  currency: 'NGN',
  symbol: '₦'
};

// Initialize environment validation
export const initPayments = () => {
  return env.paystackPublicKey && env.stripePublicKey;
};