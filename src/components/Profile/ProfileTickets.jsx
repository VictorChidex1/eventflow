// src/components/Profile/ProfileTickets.jsx
import React, { useEffect, useState } from "react";
import { 
  Ticket, 
  Calendar, 
  MapPin, 
  Clock, 
  Download, 
  Loader2,
  QrCode
} from "lucide-react";
// Adjusted import path based on new file location
import { generateReceipt } from "../../utils/pdfGenerator"; 

const ProfileTickets = ({ user }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const storedTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
        const userKey = user?.id || user?.email;
        const myTickets = storedTickets.filter(t => t.userId === userKey);
        
        // Sort by purchase date (newest first)
        myTickets.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
        setTickets(myTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchTickets();
  }, [user]);

  const handleDownloadTicket = async (ticket) => {
    const ticketForPdf = {
      reference: ticket.paymentReference || ticket.id.split('_')[1] || 'FREE',
      paymentDate: ticket.purchaseDate,
      eventTitle: ticket.eventTitle,
      eventImage: ticket.eventImage, 
      tickets: ticket.quantity,
      amount: ticket.price,
      customerName: user?.name,
      customerEmail: user?.email
    };

    try {
      await generateReceipt(ticketForPdf, user);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Could not download ticket. Please try again.");
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const now = new Date();
    const eventDate = new Date(ticket.eventDate);
    if (activeTab === 'upcoming') return eventDate >= now;
    if (activeTab === 'past') return eventDate < now;
    return true;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="profile-content animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-900">My Tickets</h2>
        
        <div className="bg-gray-100 p-1 rounded-lg flex text-sm">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "upcoming" 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-1.5 rounded-md font-medium transition-all ${
              activeTab === "past" 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Past
          </button>
        </div>
      </div>

      {filteredTickets.length > 0 ? (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Image Thumbnail */}
                <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 relative group">
                  <img 
                    src={ticket.eventImage || "/api/placeholder/150/150"} 
                    alt={ticket.eventTitle} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-bold text-blue-700 uppercase shadow-sm">
                    {ticket.ticketType}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-900 text-lg line-clamp-1">{ticket.eventTitle}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 flex-shrink-0 ml-2">
                        Confirmed
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mt-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        {new Date(ticket.eventDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        {ticket.eventTime}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 col-span-1 sm:col-span-2">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        <span className="truncate">{ticket.eventLocation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
                    <button 
                      onClick={() => handleDownloadTicket(ticket)}
                      className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    <button className="flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors" title="Show QR">
                      <QrCode className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl border-dashed">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
            <Ticket className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-medium mb-1">No tickets found</h3>
          <p className="text-gray-500 text-sm px-4">
            {activeTab === 'upcoming' 
              ? "You don't have any upcoming events scheduled." 
              : "No past event history found."}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileTickets;