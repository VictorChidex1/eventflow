// src/components/Payment/Checkout.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Checkout = () => {
  const { eventId } = useParams(); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderId = 'ORD' + Date.now();
      navigate(`/order-confirmation/${orderId}`);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        
        {/* Added welcome message using the user object */}
        {user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800">Welcome, <span className="font-semibold">{user.name}</span>! Proceeding with checkout for event.</p>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Event Tickets (2)</span>
              <span>$50.00</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>$5.00</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-semibold">
              <span>Total</span>
              <span>$55.00</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            {/* Added email confirmation using user email */}
            {user && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  Tickets will be sent to: <span className="font-semibold">{user.email}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold text-lg"
        >
          {processing ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </span>
          ) : (
            'Complete Purchase - $55.00'
          )}
        </button>
      </div>
    </div>
  );
};

export default Checkout;