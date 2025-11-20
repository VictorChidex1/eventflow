// src/components/Events/EventDetail.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  ArrowLeft,
  Share2,
  Heart,
  Minus,
  Plus,
  Check,
  Shield,
  Clock,
  Star,
  Zap,
  Crown
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import PaymentModal from "../Payment/PaymentModal";
import "./EventDetail.css";

const EventDetail = ({ event, onClose, onBack, user }) => {
  const [showTicketPurchase, setShowTicketPurchase] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedTicketType, setSelectedTicketType] = useState('general');
  const { user: authUser } = useAuth();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatPrice = (price) => {
    return price === 0 ? "Free" : `₦${price.toLocaleString()}`;
  };

  const getTicketStatus = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage < 10) return "Almost Sold Out!";
    if (percentage < 30) return "Limited Tickets Available";
    return "Tickets Available";
  };

  const getStatusColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage < 10) return "text-red-600 bg-red-50 border-red-200";
    if (percentage < 30) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  // Dynamic ticket types based on event category and price
  const getTicketTypes = () => {
    const basePrice = event.price;
    
    // Different ticket structures based on event category
    if (event.category === "Owambe" || event.category === "Carnival") {
      return [
        {
          id: 'general',
          name: 'General Admission',
          price: basePrice,
          description: 'Standard event access',
          icon: <Ticket className="w-4 h-4" />,
          features: ['Event Entry', 'Basic Seating', 'Event Materials'],
          available: Math.floor(event.availableTickets * 0.7)
        },
        {
          id: 'vip',
          name: 'VIP Access',
          price: Math.floor(basePrice * 1.8),
          description: 'Premium experience with extra benefits',
          icon: <Crown className="w-4 h-4" />,
          features: ['Priority Entry', 'VIP Lounge', 'Premium Seating', 'Complimentary Drinks'],
          available: Math.floor(event.availableTickets * 0.2)
        },
        {
          id: 'early_bird',
          name: 'Early Bird',
          price: Math.floor(basePrice * 0.7),
          description: 'Limited time discounted tickets',
          icon: <Zap className="w-4 h-4" />,
          features: ['Event Entry', 'Basic Seating', 'Early Bird Pricing'],
          available: Math.floor(event.availableTickets * 0.1)
        }
      ];
    } else if (event.category === "Afrobeats" || event.category === "Concert") {
      return [
        {
          id: 'general',
          name: 'General Admission',
          price: basePrice,
          description: 'Standing area access',
          icon: <Ticket className="w-4 h-4" />,
          features: ['Event Entry', 'Standing Area', 'Basic Facilities'],
          available: Math.floor(event.availableTickets * 0.6)
        },
        {
          id: 'vip',
          name: 'VIP Experience',
          price: Math.floor(basePrice * 2.5),
          description: 'Premium concert experience',
          icon: <Crown className="w-4 h-4" />,
          features: ['VIP Section', 'Premium View', 'Private Bar', 'Meet & Greet'],
          available: Math.floor(event.availableTickets * 0.3)
        },
        {
          id: 'vvip',
          name: 'VVIP Package',
          price: Math.floor(basePrice * 4),
          description: 'Ultimate concert package',
          icon: <Star className="w-4 h-4" />,
          features: ['Front Row', 'Backstage Access', 'Artist Meet', 'Gift Package'],
          available: Math.floor(event.availableTickets * 0.1)
        }
      ];
    } else if (event.category === "Business" || event.category === "Education") {
      return [
        {
          id: 'general',
          name: 'Standard Pass',
          price: basePrice,
          description: 'Full conference access',
          icon: <Ticket className="w-4 h-4" />,
          features: ['Conference Access', 'Session Materials', 'Networking'],
          available: Math.floor(event.availableTickets * 0.8)
        },
        {
          id: 'premium',
          name: 'Premium Pass',
          price: Math.floor(basePrice * 1.5),
          description: 'Enhanced learning experience',
          icon: <Star className="w-4 h-4" />,
          features: ['Premium Seating', 'Lunch Included', 'Resource Kit', 'Mentorship'],
          available: Math.floor(event.availableTickets * 0.2)
        }
      ];
    } else {
      // Default ticket structure for other categories
      return [
        {
          id: 'general',
          name: 'General Admission',
          price: basePrice,
          description: 'Standard event access',
          icon: <Ticket className="w-4 h-4" />,
          features: ['Event Entry', 'Basic Access', 'Standard Amenities'],
          available: event.availableTickets
        }
      ];
    }
  };

  const ticketTypes = getTicketTypes();
  const selectedTicket = ticketTypes.find(ticket => ticket.id === selectedTicketType);
  const totalAmount = selectedTicket ? selectedTicket.price * quantity : 0;
  const serviceFee = Math.round(totalAmount * 0.029); // 2.9% service fee
  const finalTotal = totalAmount + serviceFee;

  const handleGetTickets = () => {
    // Check if user is authenticated
    if (!authUser) {
      // Redirect to login page with return URL
      navigate('/login', { 
        state: { from: `/event/${event.id}` } 
      });
      return;
    }
    
    // User is authenticated, show payment modal
    setShowTicketPurchase(true);
  };

  // Use authenticated user or fallback to prop
  const currentUser = authUser || user;

  const getCategoryColor = (category) => {
    const colors = {
      'Owambe': 'bg-purple-100 text-purple-800 border-purple-200',
      'Carnival': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Afrobeats': 'bg-green-100 text-green-800 border-green-200',
      'Business': 'bg-blue-100 text-blue-800 border-blue-200',
      'Education': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Wellness': 'bg-teal-100 text-teal-800 border-teal-200',
      'Food & Drink': 'bg-red-100 text-red-800 border-red-200',
      'Art': 'bg-pink-100 text-pink-800 border-pink-200',
      'Sports': 'bg-orange-100 text-orange-800 border-orange-200',
      'Technology': 'bg-cyan-100 text-cyan-800 border-cyan-200',
      'Religious': 'bg-gray-100 text-gray-800 border-gray-200',
      'Cultural': 'bg-amber-100 text-amber-800 border-amber-200',
      'Entertainment': 'bg-rose-100 text-rose-800 border-rose-200',
      'Comedy': 'bg-lime-100 text-lime-800 border-lime-200',
      'Gaming': 'bg-violet-100 text-violet-800 border-violet-200',
      'Dating': 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header with Back Button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Events</span>
            </button>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-gray-50">
                <Heart size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors rounded-lg hover:bg-gray-50">
                <Share2 size={20} />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Event Image */}
              <div className="relative mb-6 rounded-xl overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(event.category)}`}>
                    {event.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-lg">
                    Starting from {formatPrice(event.price)}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {event.description}
              </p>

              {/* About This Event */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  About This Event
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {event.about}
                </p>
              </div>

              {/* What to Expect */}
              {event.whatToExpect && event.whatToExpect.length > 0 && (
                <div className="bg-primary-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    What to Expect
                  </h3>
                  <ul className="text-gray-600 space-y-3">
                    {event.whatToExpect.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="text-primary-600 mr-3 mt-1 flex-shrink-0" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Ticket Types Section */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Available Tickets
                </h3>
                <div className="space-y-4">
                  {ticketTypes.map((ticket) => (
                    <div
                      key={ticket.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedTicketType === ticket.id
                          ? 'border-primary-500 bg-primary-50 shadow-sm'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedTicketType(ticket.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                            {ticket.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg">
                              {ticket.name}
                            </h4>
                            <p className="text-gray-600 text-sm mt-1">
                              {ticket.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary-600">
                            {formatPrice(ticket.price)}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {ticket.available} available
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                        {ticket.features.map((feature, index) => (
                          <span key={index} className="flex items-center bg-white px-2 py-1 rounded border">
                            <Check size={14} className="text-green-500 mr-1" />
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Ticket Purchase */}
            <div className="space-y-6">
              {/* Event Details Card */}
              <div className="card p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Event Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="text-primary-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">
                        {formatDate(event.date)}
                      </p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="text-primary-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Ticket className="text-primary-600 mt-1 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Tickets</p>
                      <p className="text-gray-600">
                        {event.availableTickets} of {event.totalTickets} available
                      </p>
                      <p
                        className={`text-sm font-medium px-3 py-1 rounded-full mt-2 inline-block border ${getStatusColor(
                          event.availableTickets,
                          event.totalTickets
                        )}`}
                      >
                        {getTicketStatus(event.availableTickets, event.totalTickets)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ticket Purchase Card */}
              <div className="card p-6 sticky top-96">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Get Your Tickets
                </h3>

                {/* Selected Ticket Info */}
                {selectedTicket && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4 p-3 bg-primary-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {selectedTicket.name}
                        </h4>
                        <p className="text-primary-600 font-bold text-lg">
                          {formatPrice(selectedTicket.price)} each
                        </p>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700 font-medium">Quantity</span>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-semibold text-lg">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(Math.min(selectedTicket.available, quantity + 1))}
                          disabled={quantity >= selectedTicket.available}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="space-y-3 border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Tickets × {quantity}</span>
                        <span className="font-medium">{formatPrice(selectedTicket.price * quantity)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Service Fee</span>
                        <span className="font-medium">₦{serviceFee.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-primary-600">
                            ₦{finalTotal.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleGetTickets}
                    disabled={event.availableTickets === 0}
                    className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-lg"
                  >
                    <Ticket size={20} className="mr-2" />
                    {!authUser ? 'Login to Buy Tickets' : event.availableTickets === 0 ? 'Sold Out' : 'Get Tickets Now'}
                  </button>

                  <button className="w-full border border-primary-600 text-primary-600 py-3 px-6 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center">
                    <Calendar size={18} className="mr-2" />
                    Add to Calendar
                  </button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mt-4 p-2 bg-gray-50 rounded-lg">
                    <Shield size={16} className="text-green-500" />
                    <span>Secure payment · 24/7 support</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Event Stats
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary-600">
                      {event.availableTickets}
                    </p>
                    <p className="text-sm text-gray-600">Tickets Left</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-primary-600">
                      {event.totalTickets - event.availableTickets}
                    </p>
                    <p className="text-sm text-gray-600">Already Booked</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Purchase & Payment Flow - Only show if user is authenticated */}
      {showTicketPurchase && selectedTicket && authUser && (
        <PaymentModal
          isOpen={showTicketPurchase}
          onClose={() => setShowTicketPurchase(false)}
          event={event}
          ticket={selectedTicket}
          quantity={quantity}
          user={currentUser}
        />
      )}
    </div>
  );
};

export default EventDetail;