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

  const handleRealPaystackPayment = async () => {
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
        customerName: user.name || 'Eventflow Customer',
        eventTitle: event.title
        
      };

      console.log('🚀 Starting Paystack payment...', paymentData);

      const response = await paymentService.initializePaystackPayment(paymentData);
      
      if (response.status && response.data.authorization_url) {
        // Redirect to Paystack payment page
        console.log('🔗 Redirecting to Paystack...', response.data.authorization_url);
        window.location.href = response.data.authorization_url;
      } else {
        throw new Error(response.message || 'Failed to initialize payment');
      }
    } catch (err) {
      console.error('💥 Payment error:', err);
      setError(err.message || 'Payment initialization failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStripePayment = async () => {
    alert('Stripe integration coming soon!');
  };

  const handlePayment = () => {
    if (selectedGateway === 'paystack') {
      handleRealPaystackPayment();
    } else {
      handleStripePayment();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Complete Payment</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Payment Error:</strong> {error}
          </div>
        )}

        {/* Payment Summary */}
        <div className="border rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-lg mb-2">{event?.title}</h3>
          <p className="text-gray-600 mb-2">{ticket?.name} × {quantity}</p>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total Amount:</span>
            <span className="text-xl font-bold text-green-600">
              {currencyConfig.symbol}{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-2 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <div>
                  <span className="text-gray-700 font-medium">Paystack</span>
                  <p className="text-sm text-gray-500">Cards, Bank Transfer, USSD</p>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
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
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              `Pay ${currencyConfig.symbol}${totalAmount.toLocaleString()}`
            )}
          </button>
        </div>

        {/* Security Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secure payment · Your data is protected
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;