import { env } from '../config/environment';
import realPaystackService from './realPaystackService';
import mockPaymentService from './mockPaymentService';

class PaymentService {
  constructor() {
    this.useRealPayments = this.checkPaystackKeys();
  }

  checkPaystackKeys() {
    const hasValidKeys = env.paystackPublicKey && 
                        env.paystackPublicKey.includes('pk_') && 
                        !env.paystackPublicKey.includes('your_paystack_test');
    
    if (hasValidKeys) {
      console.log('💰 Using REAL Paystack Payments');
      return true;
    } else {
      console.warn('⚠️ Using MOCK Payments - Add real Paystack keys to .env');
      return false;
    }
  }

  async initializePaystackPayment(paymentData) {
    if (this.useRealPayments) {
      return await realPaystackService.initializePayment(paymentData);
    } else {
      return await mockPaymentService.initializePaystackPayment(paymentData);
    }
  }

  async verifyPaystackPayment(reference) {
    if (this.useRealPayments) {
      return await realPaystackService.verifyPayment(reference);
    } else {
      return await mockPaymentService.verifyPaystackPayment(reference);
    }
  }
}

export default new PaymentService();