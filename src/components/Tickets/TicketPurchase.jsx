import React, { useState } from 'react';
import { Calendar, MapPin, Users, Ticket, Minus, Plus } from 'lucide-react';
import PaymentModal from '../Payment/PaymentModal';

const TicketPurchase = ({ event, isOpen, onClose, user }) => {
  const [quantity, setQuantity] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  if (!isOpen) return null;

  const ticket = {
    id: `ticket_${event.id}`,
    name: 'General Admission',
    price: event.price,
    type: 'general'
  };

  const totalAmount = ticket.price * quantity;

  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `₦${price.toLocaleString()}`;
  };

  return (
    <>
      {/* Ticket Purchase Modal */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Get Tickets</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Event Summary */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>

          {/* Ticket Selection */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Tickets</h3>
            
            <div className="space-y-4">
              {/* Ticket Type */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">General Admission</h4>
                  <p className="text-sm text-gray-600">Standard event access</p>
                  <p className="text-lg font-bold text-primary-600 mt-1">
                    {formatPrice(ticket.price)}
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">Quantity</span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(event.availableTickets, quantity + 1))}
                    disabled={quantity >= event.availableTickets}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Available Tickets */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800 text-center">
                  {event.availableTickets} tickets available
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-6">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Ticket Price × {quantity}</span>
                <span>{formatPrice(ticket.price * quantity)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Fee</span>
                <span>₦{Math.round(ticket.price * quantity * 0.029).toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    ₦{Math.round(ticket.price * quantity * 1.029).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => setShowPaymentModal(true)}
              disabled={event.availableTickets === 0}
              className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {event.availableTickets === 0 ? 'Sold Out' : `Continue to Payment`}
            </button>

            {/* Security Notice */}
            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Secure payment processed by Paystack
            </p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        event={event}
        ticket={ticket}
        quantity={quantity}
        user={user}
      />
    </>
  );
};

export default TicketPurchase;