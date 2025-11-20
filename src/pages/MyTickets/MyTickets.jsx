// src/pages/MyTickets/MyTickets.jsx
import React, { useState, useEffect } from 'react';
import { Ticket, Calendar, Download, ArrowRight } from 'lucide-react';
import { paymentTracker } from '../../utils/paymentTracker';
import { Link } from 'react-router-dom';

const MyTickets = () => {
  // Use state to ensure we get the latest data on render
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setPayments(paymentTracker.getPayments());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
          <Link to="/events" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
            Browse Events <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        
        {payments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Ticket className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets yet</h3>
            <p className="text-gray-500 mb-6">Purchase tickets for events to see them here.</p>
            <Link to="/events" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Find an Event
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {payments.map((payment) => (
              <div key={payment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-50 rounded-md border border-green-100">
                          CONFIRMED
                        </span>
                        <span className="text-xs text-gray-500 font-mono">#{payment.reference.slice(-8)}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{payment.eventTitle}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">₦{payment.amount.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{payment.tickets} ticket(s)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-4">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                        {/* Fixed: using 'trackedAt' instead of 'timestamp' */}
                        {new Date(payment.trackedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Ticket className="w-4 h-4 mr-2 text-blue-600" />
                        {payment.tickets} Admission(s)
                      </div>
                    </div>
                    
                    <button className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors font-medium text-sm">
                      <Download className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;