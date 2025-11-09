import React from "react";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return price === 0 ? "Free" : `$${price}`;
  };

  const getTicketStatus = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage < 10) return "text-red-600";
    if (percentage < 30) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <div className="card p-6 hover:scale-105 transition-transform duration-300">
      {/* Event Image */}
      <div className="relative mb-4">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            {event.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {formatPrice(event.price)}
          </span>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
          {event.title}
        </h3>

        <p className="text-gray-600 line-clamp-2">{event.description}</p>

        {/* Event Info */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2" />
            <span className="text-sm">
              {formatDate(event.date)} • {event.time}
            </span>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Ticket size={16} className="mr-2" />
            <span
              className={`text-sm font-medium ${getTicketStatus(
                event.availableTickets,
                event.totalTickets
              )}`}
            >
              {event.availableTickets} tickets left
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-2">
          <button className="btn-primary flex-1 text-center py-2">
            Get Tickets
          </button>
          <button className="btn-secondary px-4 py-2">
            <Users size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
