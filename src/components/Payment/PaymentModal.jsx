// src/components/Payment/PaymentModal.jsx
import React, { useState } from 'react';
import { Loader2, Shield, AlertCircle, CreditCard, CheckCircle } from 'lucide-react';
import paymentService from '../../services/paymentService';
import { env } from '../../config/environment';
import { useAuth } from '../../contexts/AuthContext';

// IMPORT THE IMAGE: Ensure this file exists at src/assets/paystack-logo.png
import paystackLogo from '../../assets/paystack-logo.png'; 

const currencySymbol = '₦'; 

const PaymentModal = ({ isOpen, onClose, event, ticket, quantity, user }) => {
  const [selectedGateway, setSelectedGateway] = useState('paystack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  // We need the auth context to ensure we have the correct User ID for binding the ticket
  const { user: authUser } = useAuth();
  const currentUser = user || authUser;

  if (!isOpen) return null;

  const totalAmount = ticket ? ticket.price * quantity : 0;

  const generateReference = () => {
    return `EVT_${event?.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // --- ARCHITECTURAL FIX: CENTRALIZED TICKET SAVING ---
  const persistTicketToStorage = (paymentRef, method) => {
    try {
      // 1. Construct the ticket object exactly matching EventDetail.jsx structure
      const newTicket = {
        id: `tkt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        eventId: event.id,
        userId: currentUser.id || currentUser.email || 'guest',
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        eventLocation: event.location,
        eventImage: event.image,
        ticketType: ticket.name,
        quantity: quantity,
        price: totalAmount,
        purchaseDate: new Date().toISOString(),
        status: 'confirmed', // Optimistically confirming for this prototype flow
        paymentMethod: method,
        paymentReference: paymentRef
      };

      // 2. Fetch existing tickets
      const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      
      // 3. Append and Save
      const updatedTickets = [...existingTickets, newTicket];
      localStorage.setItem('userTickets', JSON.stringify(updatedTickets));
      
      console.log("✅ Ticket persisted successfully:", newTicket);
      return true;
    } catch (err) {
      console.error("❌ Failed to save ticket locally:", err);
      return false;
    }
  };

  const handleRealPaystackPayment = async () => {
    if (!currentUser?.email) {
      setError('Please provide your email address associated with your account.');
      return;
    }

    setIsProcessing(true);
    setError('');

    const reference = generateReference();

    try {
      const paymentData = {
        email: currentUser.email,
        amount: totalAmount,
        reference: reference,
        eventId: event.id,
        ticketId: ticket.id,
        quantity: quantity,
        customerName: currentUser.name || 'EventFlow User',
        eventTitle: event.title
      };

      console.log('🚀 Starting Paystack payment flow...', paymentData);

      // 1. Initialize Payment with Service
      const response = await paymentService.initializePaystackPayment(paymentData);
      
      if (response.status && response.data.authorization_url) {
        // 2. CRITICAL FIX: Save Ticket BEFORE Redirect
        // In a real production app, this happens via Webhook. 
        // For this prototype/mock, we save it now so it appears in "My Tickets".
        persistTicketToStorage(reference, 'Paystack');

        // 3. Redirect user to Paystack
        window.location.href = response.data.authorization_url;
      } else {
        throw new Error(response.message || 'Failed to initialize payment gateway.');
      }
    } catch (err) {
      console.error('💥 Payment error:', err);
      setError(err.message || 'Payment initialization failed. Please check your network.');
    } finally {
      // Note: We might not reach here if redirect is fast, which is fine.
      setIsProcessing(false);
    }
  };

  const handleStripePayment = async () => {
    // Placeholder for future integration
    alert('Stripe integration coming soon! Please use Paystack for now.');
  };

  const handlePayment = () => {
    if (selectedGateway === 'paystack') {
      handleRealPaystackPayment();
    } else {
      handleStripePayment();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all scale-100">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary-600" />
            Checkout
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4 flex items-start animate-pulse">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2 truncate">{event?.title}</h3>
          
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Ticket Type</span>
            <span className="font-medium text-gray-900">{ticket?.name}</span>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Quantity</span>
            <span className="font-medium text-gray-900">× {quantity}</span>
          </div>

          <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
            <span className="font-medium text-gray-700">Total to Pay</span>
            <span className="text-2xl font-bold text-primary-600">
              {currencySymbol}{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="space-y-4 mb-8">
          <label className="block text-sm font-medium text-gray-700">
            Select Payment Method
          </label>
          
          <div className="space-y-3">
            {/* Paystack Option */}
            <label 
              className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                selectedGateway === 'paystack' 
                  ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="paymentGateway"
                value="paystack"
                checked={selectedGateway === 'paystack'}
                onChange={(e) => setSelectedGateway(e.target.value)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3 flex items-center w-full justify-between">
                <div className="flex items-center">
                  <img 
                    src={paystackLogo} 
                    alt="Paystack" 
                    className="h-6 w-auto object-contain mr-3"
                  />
                  <div>
                    <span className="block text-sm font-bold text-gray-900">Pay with Paystack</span>
                    <span className="block text-xs text-gray-500">Card, Bank Transfer, USSD</span>
                  </div>
                </div>
                {selectedGateway === 'paystack' && <CheckCircle className="w-5 h-5 text-blue-600" />}
              </div>
            </label>

            {/* Stripe Option (Conditional) */}
            {env.stripePublicKey && (
               <label 
                 className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                   selectedGateway === 'stripe' 
                     ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-20 bg-blue-50' 
                     : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                 }`}
               >
               <input
                 type="radio"
                 name="paymentGateway"
                 value="stripe"
                 checked={selectedGateway === 'stripe'}
                 onChange={(e) => setSelectedGateway(e.target.value)}
                 className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
               />
               <div className="ml-3 flex items-center w-full justify-between">
                 <div className="flex items-center">
                    <div className="h-6 w-8 bg-[#635BFF] rounded flex items-center justify-center mr-3 text-white font-bold text-[10px]">
                        Stripe
                    </div>
                   <div>
                     <span className="block text-sm font-bold text-gray-900">Pay with Stripe</span>
                     <span className="block text-xs text-gray-500">International Cards</span>
                   </div>
                 </div>
                 {selectedGateway === 'stripe' && <CheckCircle className="w-5 h-5 text-blue-600" />}
               </div>
             </label>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-col-reverse sm:flex-row">
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
            className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 font-medium shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              `Pay ${currencySymbol}${totalAmount.toLocaleString()}`
            )}
          </button>
        </div>

        {/* Security Footer */}
        <div className="mt-6 flex items-center justify-center text-xs text-gray-500 gap-2">
          <Shield className="w-4 h-4 text-green-600" />
          <span>Secured by Paystack · End-to-end encryption</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;