// Simple local storage tracking for successful payments
export const paymentTracker = {
  savePayment: (paymentData) => {
    try {
      const payments = JSON.parse(localStorage.getItem('eventflow_payments') || '[]');
      
      // Check if payment already exists (prevent duplicates)
      const existingPayment = payments.find(p => p.reference === paymentData.reference);
      if (!existingPayment) {
        const paymentWithId = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          ...paymentData,
          trackedAt: new Date().toISOString()
        };
        
        payments.unshift(paymentWithId); // Add to beginning of array
        localStorage.setItem('eventflow_payments', JSON.stringify(payments));
        
        console.log('💾 Payment saved to tracker:', paymentWithId);
        return paymentWithId;
      } else {
        console.log('📝 Payment already tracked:', paymentData.reference);
        return existingPayment;
      }
    } catch (error) {
      console.error('❌ Error saving payment:', error);
      return null;
    }
  },

  getPayments: () => {
    try {
      return JSON.parse(localStorage.getItem('eventflow_payments') || '[]');
    } catch (error) {
      console.error('❌ Error reading payments:', error);
      return [];
    }
  },

  getPaymentByReference: (reference) => {
    const payments = paymentTracker.getPayments();
    return payments.find(p => p.reference === reference);
  },

  getPaymentsByEvent: (eventId) => {
    const payments = paymentTracker.getPayments();
    return payments.filter(p => p.eventId === eventId);
  },

  clearPayments: () => {
    localStorage.removeItem('eventflow_payments');
    console.log('🗑️ All payments cleared from tracker');
  },

  getTotalRevenue: () => {
    const payments = paymentTracker.getPayments();
    return payments.reduce((total, payment) => total + payment.amount, 0);
  },

  getTicketsSold: () => {
    const payments = paymentTracker.getPayments();
    return payments.reduce((total, payment) => total + payment.tickets, 0);
  }
};