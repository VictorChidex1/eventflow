import { useState } from 'react';
import paymentService from '../../services/paymentService';
import { currencyConfig } from '../../config/payments';

const PaymentModal = ({ isOpen, onClose, event, ticket, quantity, user }) => {
  const [selectedGateway, setSelectedGateway] = useState('paystack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const totalAmount = ticket ? ticket.price * quantity : 0;

  const generateReference = () => {
    return `EVT_${event?.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handlePaystackPayment = async () => {
    if (!user?.email) {
      setError('Please provide your email address');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const paymentData = {
        email: user.email,
        amount: totalAmount,
        reference: generateReference(),
        eventId: event.id,
        ticketId: ticket.id,
        quantity: quantity,
        customerName: user.name || 'Eventflow Customer'
      };

      const response = await paymentService.initializePaystackPayment(paymentData);
      
      if (response.status && response.data.authorization_url) {
        // Redirect to Paystack payment page
        window.location.href = response.data.authorization_url;
      } else {
        throw new Error('Failed to initialize payment');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment initialization failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStripePayment = async () => {
    // Implement Stripe payment logic
    alert('Stripe integration coming soon!');
  };

  const handlePayment = () => {
    if (selectedGateway === 'paystack') {
      handlePaystackPayment();
    } else {
      handleStripePayment();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Complete Your Purchase</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Event Summary */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">{event?.title}</h3>
            <p className="text-gray-600 mb-2">{ticket?.name} × {quantity}</p>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Total Amount:</span>
              <span className="text-xl font-bold text-green-600">
                {currencyConfig.symbol}{totalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment Gateway Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Select Payment Method
            </label>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentGateway"
                  value="paystack"
                  checked={selectedGateway === 'paystack'}
                  onChange={(e) => setSelectedGateway(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <img 
                    src="/paystack-logo.png" 
                    alt="Paystack" 
                    className="h-6"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="text-gray-700">Paystack (Cards, Bank Transfer, USSD)</span>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentGateway"
                  value="stripe"
                  checked={selectedGateway === 'stripe'}
                  onChange={(e) => setSelectedGateway(e.target.value)}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <div className="flex items-center space-x-2">
                  <img 
                    src="/stripe-logo.png" 
                    alt="Stripe" 
                    className="h-6"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="text-gray-700">Stripe (International Cards)</span>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={isProcessing || totalAmount === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : `Pay ${currencyConfig.symbol}${totalAmount.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;