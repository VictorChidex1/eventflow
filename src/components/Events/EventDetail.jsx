import React from "react";
import {
  Calendar,
  MapPin,
  Users,
  Ticket,
  ArrowLeft,
  Share2,
  Heart,
} from "lucide-react";

const EventDetail = ({ event, onClose, onBack }) => {
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
    if (percentage < 10) return "text-red-600 bg-red-50";
    if (percentage < 30) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header with Back Button */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Events</span>
            </button>
            <div className="flex space-x-3">
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Heart size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                <Share2 size={20} />
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Event Content */}
        <div className="p-6">
          {/* Event Image */}
          <div className="relative mb-6">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-64 md:h-80 object-cover rounded-xl"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                {event.category}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-primary-600 text-white px-4 py-2 rounded-full text-lg font-semibold">
                {formatPrice(event.price)}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {event.title}
              </h1>

              <p className="text-gray-600 text-lg mb-6">{event.description}</p>

              {/* About This Event - UNIQUE CONTENT */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  About This Event
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {event.about ||
                    "Join us for an unforgettable experience! This event brings together like-minded individuals to celebrate, learn, and connect. Don't miss out on this amazing opportunity to be part of something special."}
                </p>
              </div>

              {/* What to Expect - UNIQUE CONTENT */}
              <div className="bg-primary-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  What to Expect
                </h3>
                <ul className="text-gray-600 space-y-3">
                  {event.whatToExpect ? (
                    event.whatToExpect.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-3 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    // Fallback content if whatToExpect is not provided
                    <>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-3 mt-1">•</span>
                        <span>Amazing networking opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-3 mt-1">•</span>
                        <span>Professional speakers and performers</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-3 mt-1">•</span>
                        <span>Delicious food and refreshments</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-3 mt-1">•</span>
                        <span>Memorable experiences and connections</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>

            {/* Sidebar - Ticket Info */}
            <div className="space-y-6">
              {/* Event Details Card */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Event Details
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="text-primary-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">
                        {formatDate(event.date)}
                      </p>
                      <p className="text-gray-600">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="text-primary-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">{event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Ticket className="text-primary-600 mt-1" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Tickets</p>
                      <p className="text-gray-600">
                        {event.availableTickets} of {event.totalTickets}{" "}
                        available
                      </p>
                      <p
                        className={`text-sm font-medium px-2 py-1 rounded-full mt-1 inline-block ${getStatusColor(
                          event.availableTickets,
                          event.totalTickets
                        )}`}
                      >
                        {getTicketStatus(
                          event.availableTickets,
                          event.totalTickets
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="btn-primary w-full text-center py-4 text-lg font-semibold">
                  Get Tickets Now
                </button>

                <button className="btn-secondary w-full text-center py-4">
                  Add to Calendar
                </button>

                <button className="w-full text-center py-3 text-gray-600 hover:text-gray-800 transition-colors">
                  Share with Friends
                </button>
              </div>

              {/* Quick Stats */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Event Stats
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary-600">
                      {event.availableTickets}
                    </p>
                    <p className="text-sm text-gray-600">Tickets Left</p>
                  </div>
                  <div>
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
    </div>
  );
};

export default EventDetail;
