// src/components/Payment/PaymentModal.jsx
import { useState } from 'react';
import paymentService from '../../services/paymentService';
import { env } from '../../config/environment';

// IMPORT THE IMAGE: Ensure this file exists at src/assets/paystack-logo.png
import paystackLogo from '../../assets/paystack-logo.png'; 

const currencySymbol = '₦'; 

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Complete Payment</h2>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4 flex items-start">
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}

        {/* Payment Summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-1">{event?.title}</h3>
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>{ticket?.name} × {quantity}</span>
          </div>
          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="font-medium text-gray-700">Total Amount:</span>
            <span className="text-xl font-bold text-blue-600">
              {currencySymbol}{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-3 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Payment Method
          </label>
          
          <div className="space-y-3">
            {/* Paystack Option */}
            <label className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${selectedGateway === 'paystack' ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50/30' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
              <input
                type="radio"
                name="paymentGateway"
                value="paystack"
                checked={selectedGateway === 'paystack'}
                onChange={(e) => setSelectedGateway(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3 flex items-center w-full">
                {/* Logo Image from Assets */}
                <img 
                  src={paystackLogo} 
                  alt="Paystack" 
                  className="h-8 w-auto max-w-[50px] object-contain rounded-md mr-3"
                />
                <div>
                  <span className="block text-sm font-medium text-gray-900">Paystack</span>
                  <span className="block text-xs text-gray-500">Cards, Bank Transfer, USSD</span>
                </div>
              </div>
            </label>

            {/* Stripe Option (Conditional) */}
            {env.stripePublicKey && (
               <label className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${selectedGateway === 'stripe' ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50/30' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
               <input
                 type="radio"
                 name="paymentGateway"
                 value="stripe"
                 checked={selectedGateway === 'stripe'}
                 onChange={(e) => setSelectedGateway(e.target.value)}
                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
               />
               <div className="ml-3 flex items-center w-full">
                 <div className="h-8 w-8 bg-[#635BFF] rounded-md flex items-center justify-center mr-3 text-white font-bold text-xs">S</div>
                 <div>
                   <span className="block text-sm font-medium text-gray-900">Stripe</span>
                   <span className="block text-xs text-gray-500">International Cards</span>
                 </div>
               </div>
             </label>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={isProcessing || totalAmount === 0}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              `Pay ${currencySymbol}${totalAmount.toLocaleString()}`
            )}
          </button>
        </div>

        {/* Security Footer */}
        <div className="mt-6 flex items-center justify-center text-xs text-gray-500">
          <span className="mr-1">🔒</span> Secure payment · Your data is protected
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;