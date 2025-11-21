// src/components/Tickets/TicketPurchase.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Ticket, Minus, Plus, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PaymentModal from '../Payment/PaymentModal';

// Import your events data
import { events } from '../../data/events'; 

const TicketPurchase = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // New state
  const [isProcessing, setIsProcessing] = useState(false); // New state
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the event from your events data
    const foundEvent = events.find(e => e.id === eventId || e.id === parseInt(eventId));
    
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      // Event not found, redirect to events page
      navigate('/events');
    }
    setLoading(false);
  }, [eventId, navigate]);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user && !loading) {
      navigate('/login', { 
        state: { from: `/tickets/${eventId}/purchase` } 
      });
    }
  }, [user, loading, navigate, eventId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
          <Link to="/events" className="text-blue-600 hover:text-blue-700">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-4">Please log in to purchase tickets.</p>
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const ticket = {
    id: `ticket_${event.id}`,
    name: 'General Admission',
    price: event.price,
    type: 'general'
  };

  const totalAmount = ticket.price * quantity;
  const serviceFee = Math.round(ticket.price * quantity * 0.029);
  const grandTotal = totalAmount + serviceFee;

  const formatPrice = (price) => {
    return price === 0 ? 'Free' : `₦${price.toLocaleString()}`;
  };

  const handleBackToEvents = () => {
    navigate('/events');
  };

  // --- UPDATED PURCHASE HANDLER WITH PERSISTENCE ---
  const handlePurchase = () => {
    if (grandTotal === 0) {
        // Process Free Ticket
        setIsProcessing(true);

        // 1. Create the Ticket Object
        const newTicket = {
          id: `tkt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          eventId: event.id,
          userId: user.id || user.email || 'guest', // Fallback
          eventTitle: event.title,
          eventDate: event.date,
          eventTime: event.time,
          eventLocation: event.location,
          eventImage: event.image,
          ticketType: ticket.name,
          quantity: quantity,
          price: 0,
          purchaseDate: new Date().toISOString(),
          status: 'confirmed',
          paymentMethod: 'Free Registration'
        };

        setTimeout(() => {
            // 2. Save to LocalStorage (Simulating DB)
            try {
              const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
              const updatedTickets = [...existingTickets, newTicket];
              localStorage.setItem('userTickets', JSON.stringify(updatedTickets));
            } catch (error) {
              console.error("Failed to save ticket", error);
            }

            setIsProcessing(false);
            setShowSuccessModal(true);
        }, 1500);
    } else {
        // Process Payment
        setShowPaymentModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={handleBackToEvents}
            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Events
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Get Tickets</h1>
        </div>

        {/* Welcome Message for Authenticated User */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-800">
            Welcome, <span className="font-semibold">{user.name || user.email}</span>! You're purchasing tickets for:
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Event Summary */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>{event.location}</span>
              </div>
              {event.description && (
                <p className="text-gray-700 mt-3">{event.description}</p>
              )}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Ticket Price × {quantity}</span>
                <span>{formatPrice(ticket.price * quantity)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Service Fee</span>
                <span>₦{serviceFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    ₦{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handlePurchase}
              disabled={event.availableTickets === 0 || isProcessing}
              className={`w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center ${isProcessing ? 'opacity-75 cursor-wait' : ''}`}
            >
              {isProcessing ? (
                  <>
                     <Loader2 size={20} className="mr-2 animate-spin" /> Processing...
                  </>
              ) : (
                  event.availableTickets === 0 ? 'Sold Out' : grandTotal === 0 ? 'Get Free Tickets' : 'Continue to Payment'
              )}
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

      {/* Success Modal For Free Tickets */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center shadow-2xl transform scale-100 transition-all">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-8">
              You have successfully registered for <span className="font-semibold text-gray-900">{event.title}</span>.
              <br/>Your ticket has been sent to your email.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/my-tickets'); // Redirect to tickets page
                }}
                className="w-full bg-primary-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                View My Tickets
              </button>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketPurchase;