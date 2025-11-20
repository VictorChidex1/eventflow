// src/services/realPaystackService.js
import axios from 'axios';

class RealPaystackService {
  constructor() {
    this.publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
    this.secretKey = import.meta.env.VITE_PAYSTACK_SECRET_KEY;
    this.baseUrl = 'https://api.paystack.co';
  }

  async initializePayment(paymentData) {
    try {
      console.log('🔄 Initializing real Paystack payment...', paymentData);
      
      // Construct HashRouter-friendly Callback URL
      const rootUrl = window.location.href.split('#')[0];
      const cleanRoot = rootUrl.endsWith('/') ? rootUrl.slice(0, -1) : rootUrl;
      const callbackUrl = `${cleanRoot}/#/payment-verify`;

      const response = await axios.post(
        `${this.baseUrl}/transaction/initialize`,
        {
          email: paymentData.email,
          amount: paymentData.amount * 100, // Convert to kobo
          currency: 'NGN',
          reference: paymentData.reference,
          callback_url: callbackUrl, // Updated URL
          metadata: {
            event_id: paymentData.eventId,
            ticket_id: paymentData.ticketId,
            quantity: paymentData.quantity,
            customer_name: paymentData.customerName,
            event_title: paymentData.eventTitle
          },
          channels: ['card', 'bank', 'ussd']
        },
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Paystack initialization successful:', response.data);
      return response.data;

    } catch (error) {
      console.error('❌ Paystack initialization failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Payment initialization failed');
    }
  }

  async verifyPayment(reference) {
    try {
      console.log('🔄 Verifying Paystack payment...', reference);
      
      const response = await axios.get(
        `${this.baseUrl}/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`
          }
        }
      );

      return response.data;

    } catch (error) {
      console.error('❌ Paystack verification failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Payment verification failed');
    }
  }
}

export default new RealPaystackService();