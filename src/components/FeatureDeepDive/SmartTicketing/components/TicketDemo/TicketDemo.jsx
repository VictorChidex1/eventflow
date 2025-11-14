import React, { useState } from "react";
import {
  Star,
  Users,
  GraduationCap,
  Clock,
  Check,
  QrCode,
  Smartphone,
  Shield,
} from "lucide-react";
import "./TicketDemo.css";

const TicketDemo = () => {
  const [selectedTicket, setSelectedTicket] = useState("early-bird");

  // Ticket types data
  const ticketTypes = [
    {
      id: "early-bird",
      name: "Early Bird",
      price: "₦15,000",
      originalPrice: "₦25,500",
      description: "Limited time offer for quick buyers",
      icon: <Clock className="ticket-type-icon" />,
      features: ["Save 33%", "Limited quantity", "First access"],
      color: "green",
      sold: 450,
      total: 2000,
    },
    {
      id: "vip",
      name: "VIP Pass",
      price: "₦50,000",
      description: "Premium experience with exclusive benefits",
      icon: <Star className="ticket-type-icon" />,
      features: ["Front row seating", "VIP lounge access", "Meet & greet"],
      color: "gold",
      sold: 230,
      total: 1000,
    },
    {
      id: "regular",
      name: "Regular",
      price: "₦25,500",
      description: "Standard access to all event activities",
      icon: <Users className="ticket-type-icon" />,
      features: ["General admission", "Event access", "Basic amenities"],
      color: "blue",
      sold: 1540,
      total: 5000,
    },
    {
      id: "student",
      name: "Student",
      price: "₦12,000",
      originalPrice: "₦25,500",
      description: "Special pricing for students with valid ID",
      icon: <GraduationCap className="ticket-type-icon" />,
      features: ["Student discount", "Valid ID required", "All event access"],
      color: "purple",
      sold: 670,
      total: 2000,
    },
  ];

  const currentTicket = ticketTypes.find(
    (ticket) => ticket.id === selectedTicket
  );

  // Mobile ticket preview
  const MobileTicketPreview = () => (
    <div className="mobile-ticket-preview">
      <div className="mobile-ticket">
        <div className="ticket-header">
          <div className="event-logo">EF</div>
          <div className="event-info">
            <h4>Tech Conference 2024</h4>
            <p>Lagos Convention Center</p>
          </div>
        </div>

        <div className="ticket-body">
          <div className="ticket-type-badge">
            {currentTicket.icon}
            <span>{currentTicket.name}</span>
          </div>

          <div className="ticket-details">
            <div className="detail-item">
              <span className="label">Attendee:</span>
              <span className="value">Victor Chidex</span>
            </div>
            <div className="detail-item">
              <span className="label">Date:</span>
              <span className="value">July 20, 2026</span>
            </div>
            <div className="detail-item">
              <span className="label">Time:</span>
              <span className="value">6:00 PM - 6:00 AM</span>
            </div>
          </div>

          <div className="qr-code">
            <QrCode className="qr-icon" />
            <p>Scan for entry</p>
          </div>
        </div>

        <div className="ticket-footer">
          <div className="price">{currentTicket.price}</div>
          <div className="security">
            <Shield className="security-icon" />
            <span>Secured by EventFlow</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ticket-demo">
      {/* Header */}
      <div className="demo-header">
        <h3>Create Multiple Ticket Types</h3>
        <p>
          Offer different experiences and pricing to match every attendee's
          needs
        </p>
      </div>

      <div className="demo-content">
        {/* Left Side - Ticket Selection */}
        <div className="ticket-selection">
          <h4>Available Ticket Types</h4>
          <div className="ticket-list">
            {ticketTypes.map((ticket) => (
              <div
                key={ticket.id}
                className={`ticket-option ${
                  selectedTicket === ticket.id ? "selected" : ""
                } ${ticket.color}`}
                onClick={() => setSelectedTicket(ticket.id)}
              >
                <div className="ticket-main">
                  <div className="ticket-icon-wrapper">{ticket.icon}</div>
                  <div className="ticket-info">
                    <h5>{ticket.name}</h5>
                    <div className="price-container">
                      <span className="current-price">{ticket.price}</span>
                      {ticket.originalPrice && (
                        <span className="original-price">
                          {ticket.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="ticket-desc">{ticket.description}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="ticket-progress">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${(ticket.sold / ticket.total) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {ticket.sold} of {ticket.total} sold
                  </div>
                </div>

                {/* Features */}
                <div className="ticket-features">
                  {ticket.features.map((feature, index) => (
                    <div key={index} className="feature-tag">
                      <Check className="feature-check" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Preview */}
        <div className="ticket-preview">
          <div className="preview-header">
            <Smartphone className="preview-icon" />
            <h4>Mobile Ticket Preview</h4>
            <p>This is how your attendees will see their tickets</p>
          </div>

          <MobileTicketPreview />

          <div className="preview-features">
            <div className="preview-feature">
              <Check className="feature-check" />
              <span>Mobile-friendly design</span>
            </div>
            <div className="preview-feature">
              <Check className="feature-check" />
              <span>QR code for quick entry</span>
            </div>
            <div className="preview-feature">
              <Check className="feature-check" />
              <span>Offline access available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="demo-info">
        <div className="info-card">
          <h5>Easy Ticket Creation</h5>
          <p>
            Create unlimited ticket types with different prices, quantities, and
            benefits in minutes.
          </p>
        </div>
        <div className="info-card">
          <h5>Smart Limits</h5>
          <p>
            Set quantity limits and automatic closing times for each ticket
            type.
          </p>
        </div>
        <div className="info-card">
          <h5>Real-time Tracking</h5>
          <p>
            Watch your ticket sales in real-time with live progress indicators.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketDemo;
