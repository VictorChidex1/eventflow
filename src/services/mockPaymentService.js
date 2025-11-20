// src/services/mockPaymentService.js

const PENDING_PAYMENT_KEY = 'eventflow_pending_payment';

class MockPaymentService {
  async initializePaystackPayment(paymentData) {
    console.log('🎭 MOCK: Initializing payment for:', paymentData.eventTitle);
    
    // 1. Save payment intent
    localStorage.setItem(PENDING_PAYMENT_KEY, JSON.stringify(paymentData));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 2. Construct robust HashRouter URL using window.location.origin
    // This ensures we build: http://localhost:5173/#/payment-verify?reference=...
    const origin = window.location.origin;
    const pathname = window.location.pathname === '/' ? '' : window.location.pathname;
    
    // Ensure the reference is properly encoded
    const verifyUrl = `${origin}${pathname}#/payment-verify?reference=${encodeURIComponent(paymentData.reference)}`;
    
    console.log('🔗 Generated Verify URL:', verifyUrl);

    return {
      status: true,
      message: 'Authorization URL created',
      data: {
        authorization_url: verifyUrl,
        access_code: 'mock_' + Date.now(),
        reference: paymentData.reference
      }
    };
  }

  async verifyPaystackPayment(reference) {
    console.log('🎭 MOCK: Verifying reference:', reference);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const pendingDataString = localStorage.getItem(PENDING_PAYMENT_KEY);
    let metadata = {};
    let amount = 500000; // Fallback (5000 NGN)
    let customer = { email: 'user@example.com', first_name: 'Guest' };

    if (pendingDataString) {
      const pendingData = JSON.parse(pendingDataString);
      // Loose comparison to handle potential string/cleanup diffs
      if (pendingData.reference === reference) {
        amount = pendingData.amount * 100; // Ensure Kobo
        metadata = {
          event_id: pendingData.eventId,
          event_title: pendingData.eventTitle,
          ticket_id: pendingData.ticketId,
          quantity: pendingData.quantity,
          customer_name: pendingData.customerName
        };
        customer = {
          email: pendingData.email,
          first_name: pendingData.customerName
        };
      }
      // Clean up
      localStorage.removeItem(PENDING_PAYMENT_KEY);
    }
    
    return {
      status: true,
      message: 'Verification successful',
      data: {
        status: 'success',
        reference: reference,
        amount: amount,
        currency: 'NGN',
        paid_at: new Date().toISOString(),
        metadata: metadata,
        customer: customer
      }
    };
  }
}

export default new MockPaymentService();