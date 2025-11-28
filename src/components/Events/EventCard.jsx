import React from "react";
import { Calendar, MapPin, Ticket, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import "./EventCard.css"; // Import from same folder

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatPrice = (price) => {
    return price === 0 ? "Free" : `#${price.toLocaleString()}`;
  };

  const getTicketStatus = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage < 10) return "text-red-600 bg-red-50";
    if (percentage < 30) return "text-orange-600 bg-orange-50";
    return "text-green-600 bg-green-50";
  };

  const getStatusText = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage < 10) return "Almost Sold Out!";
    if (percentage < 30) return "Limited Tickets";
    return "Available";
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="card p-6 cursor-pointer group h-full flex flex-col"
    >
      {/* Event Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
            {event.category}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {formatPrice(event.price)}
          </span>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="bg-white text-primary-600 px-4 py-2 rounded-full font-semibold flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </motion.div>
        </div>
      </div>

      {/* Event Details */}
      <div className="space-y-4 flex-grow flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {event.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 line-clamp-2">{event.description}</p>

        {/* Event Info */}
        <div className="space-y-3 mt-auto">
          {/* Date & Time */}
          <div className="flex items-center text-gray-600">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm">
              {formatDate(event.date)} • {event.time}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{event.location}</span>
          </div>

          {/* Ticket Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-600">
              <Ticket size={16} className="mr-2 flex-shrink-0" />
              <span className="text-sm">
                {event.availableTickets} of {event.totalTickets} left
              </span>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${getTicketStatus(
                event.availableTickets,
                event.totalTickets
              )}`}
            >
              {getStatusText(event.availableTickets, event.totalTickets)}
            </span>
          </div>
        </div>

        {/* Click Indicator */}
        <div className="pt-2 border-t border-gray-100 mt-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Click to view details</span>
            <div className="flex items-center space-x-1 text-primary-600">
              <span>Explore</span>
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;

