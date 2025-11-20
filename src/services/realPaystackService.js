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
      
      const response = await axios.post(
        `${this.baseUrl}/transaction/initialize`,
        {
          email: paymentData.email,
          amount: paymentData.amount * 100, // Convert to kobo
          currency: 'NGN',
          reference: paymentData.reference,
          callback_url: `${window.location.origin}/payment-verify`,
          metadata: {
            event_id: paymentData.eventId,
            ticket_id: paymentData.ticketId,
            quantity: paymentData.quantity,
            customer_name: paymentData.customerName,
            event_title: paymentData.eventTitle
          },
          channels: ['card', 'bank', 'ussd'] // Enable multiple payment channels
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

      console.log('✅ Paystack verification result:', response.data);
      return response.data;

    } catch (error) {
      console.error('❌ Paystack verification failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Payment verification failed');
    }
  }

  // Get list of banks for transfer
  async getBanks() {
    try {
      const response = await axios.get(
        `${this.baseUrl}/bank`,
        {
          headers: {
            Authorization: `Bearer ${this.secretKey}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch banks:', error);
      throw error;
    }
  }
}

export default new RealPaystackService();