// src/components/Payment/OrderConfirmation.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 mb-2">Thank you for your purchase, {user?.name}!</p>
          <p className="text-gray-600 mb-6">Your order has been confirmed and tickets have been sent to your email.</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order ID: <span className="font-mono font-semibold">{orderId}</span></p>
            <p className="text-sm text-gray-600">Date: {new Date().toLocaleDateString()}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/my-tickets"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              View My Tickets
            </Link>
            <Link
              to="/events"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              Browse More Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;