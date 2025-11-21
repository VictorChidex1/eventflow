// src/components/Tickets/MyTickets.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Download,
  Share2,
  Ticket,
  Loader2,
  QrCode
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

const MyTickets = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const storedTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
        
        const userKey = user?.id || user?.email;
        const myTickets = storedTickets.filter(t => t.userId === userKey);
        
        myTickets.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
        
        setTickets(myTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTickets();
    } else {
      navigate('/login');
    }
  }, [user, navigate]);

  const filterTickets = (status) => {
    const now = new Date();
    return tickets.filter(ticket => {
      const eventDate = new Date(ticket.eventDate);
      if (status === 'upcoming') return eventDate >= now;
      if (status === 'past') return eventDate < now;
      return true;
    });
  };

  const filteredTickets = filterTickets(activeTab);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    /* UI FIX: 
       Changed 'py-12' to 'pt-6 pb-12 md:py-12' 
       This reduces top spacing from 48px to 24px on mobile, 
       bringing "My Tickets" closer to the nav bar.
    */
    <div className="min-h-screen bg-gray-50 pt-6 pb-12 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
          <div>
            {/* Adjusted text size for mobile (2xl) vs desktop (3xl) */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Tickets</h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">Manage your upcoming events and tickets</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/events" className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center w-full md:w-auto">
              <Ticket className="w-5 h-5 mr-2" />
              Browse Events
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 md:mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex-1 py-3 md:py-4 text-sm font-medium text-center transition-colors relative ${
                activeTab === "upcoming" ? "text-primary-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Upcoming Events
              {activeTab === "upcoming" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`flex-1 py-3 md:py-4 text-sm font-medium text-center transition-colors relative ${
                activeTab === "past" ? "text-primary-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Past Events
              {activeTab === "past" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600"></div>
              )}
            </button>
          </div>
        </div>

        {/* Ticket List */}
        {filteredTickets.length > 0 ? (
          <div className="space-y-6">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Event Image */}
                  <div className="md:w-1/3 lg:w-1/4 h-40 md:h-auto relative">
                    <img
                      src={ticket.eventImage || "/api/placeholder/400/300"}
                      alt={ticket.eventTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-700 uppercase tracking-wider shadow-sm">
                      {ticket.ticketType}
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <div className="p-5 md:p-6 md:w-2/3 lg:w-3/4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 line-clamp-1">{ticket.eventTitle}</h3>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ml-2">
                          Confirmed
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-3 md:mt-4">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-3 text-primary-500" />
                          <div>
                            <p className="text-[10px] md:text-xs text-gray-400 uppercase font-semibold">Date</p>
                            <p className="font-medium text-sm md:text-base">
                              {new Date(ticket.eventDate).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                              })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 md:w-5 md:h-5 mr-3 text-primary-500" />
                          <div>
                             <p className="text-[10px] md:text-xs text-gray-400 uppercase font-semibold">Time</p>
                             <p className="font-medium text-sm md:text-base">{ticket.eventTime || "TBA"}</p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 md:w-5 md:h-5 mr-3 text-primary-500" />
                          <div>
                            <p className="text-[10px] md:text-xs text-gray-400 uppercase font-semibold">Location</p>
                            <p className="font-medium text-sm md:text-base truncate max-w-[200px]" title={ticket.eventLocation}>
                              {ticket.eventLocation}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <Ticket className="w-4 h-4 md:w-5 md:h-5 mr-3 text-primary-500" />
                          <div>
                             <p className="text-[10px] md:text-xs text-gray-400 uppercase font-semibold">Quantity</p>
                             <p className="font-medium text-sm md:text-base">{ticket.quantity} Ticket(s)</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 md:pt-6 border-t border-gray-100 flex flex-wrap gap-2 md:gap-3">
                       <button className="flex-1 bg-primary-50 text-primary-700 px-3 py-2 md:px-4 rounded-lg text-sm md:text-base font-medium hover:bg-primary-100 transition-colors flex items-center justify-center">
                         <Download className="w-4 h-4 mr-2" />
                         Download
                       </button>
                       <button className="flex-1 bg-gray-50 text-gray-700 px-3 py-2 md:px-4 rounded-lg text-sm md:text-base font-medium hover:bg-gray-100 transition-colors flex items-center justify-center">
                         <Share2 className="w-4 h-4 mr-2" />
                         Share
                       </button>
                       <button className="flex-none bg-gray-900 text-white p-2 rounded-lg hover:bg-black transition-colors" title="Show QR Code">
                         <QrCode className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 md:py-16 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Ticket className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-500 mb-6 md:mb-8 max-w-md mx-auto text-sm md:text-base px-4">
              {activeTab === "upcoming" 
                ? "You haven't purchased any tickets for upcoming events yet." 
                : "You don't have any past events in your history."}
            </p>
            <Link
              to="/events"
              className="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200 text-sm md:text-base"
            >
              Explore Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;