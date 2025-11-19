class MockPaymentService {
  async initializePaystackPayment(paymentData) {
    console.log('Mock Paystack Payment Initialized:', paymentData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock success response
    return {
      status: true,
      message: 'Authorization URL created',
      data: {
        authorization_url: `${window.location.origin}/payment-verify?reference=mock_${Date.now()}`,
        access_code: 'mock_access_code',
        reference: paymentData.reference
      }
    };
  }

  async verifyPaystackPayment(reference) {
    console.log('Mock Paystack Verification:', reference);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return mock success verification
    return {
      status: true,
      message: 'Verification successful',
      data: {
        id: Math.floor(Math.random() * 1000000),
        status: 'success',
        reference: reference,
        amount: 500000, // 5000 Naira in kobo
        currency: 'NGN',
        metadata: {
          event_id: 'mock_event_123',
          ticket_id: 'mock_ticket_456',
          quantity: 2
        }
      }
    };
  }

  async createStripePaymentIntent(paymentData) {
    console.log('Mock Stripe Payment Intent:', paymentData);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      client_secret: 'mock_client_secret_' + Date.now(),
      id: 'pi_mock_' + Math.random().toString(36).substr(2, 9)
    };
  }
}

export default new MockPaymentService();