import { env } from '../config/environment';
import mockPaymentService from './mockPaymentService';

// Use mock service in development, real service in production
const getPaymentService = () => {
  if (env.isDevelopment) {
    console.log('💰 Using Mock Payment Service (Development Mode)');
    return mockPaymentService;
  }
  
  // In production, we'll use the real service
  return realPaymentService;
};

// Real payment service (for when you have backend)
class RealPaymentService {
  async initializePaystackPayment(paymentData) {
    try {
      const response = await fetch('/api/payments/paystack/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error('Payment initialization failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Paystack initialization error:', error);
      throw error;
    }
  }

  async verifyPaystackPayment(reference) {
    try {
      const response = await fetch(`/api/payments/paystack/verify/${reference}`);

      if (!response.ok) {
        throw new Error('Payment verification failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Paystack verification error:', error);
      throw error;
    }
  }

  async createStripePaymentIntent(paymentData) {
    try {
      const response = await fetch('/api/payments/stripe/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      if (!response.ok) {
        throw new Error('Stripe payment intent creation failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Stripe payment intent error:', error);
      throw error;
    }
  }
}

const realPaymentService = new RealPaymentService();
const paymentService = getPaymentService();

export default paymentService;