// components/FeatureDeepDive/SmartTicketing/SmartTicketing.jsx
import React, { useState } from "react";
import {
  Ticket,
  Shield,
  TrendingUp,
  Zap,
  Check,
  Play,
  Star,
  Users,
  GraduationCap,
  Clock,
} from "lucide-react";
import "./SmartTicketing.css";
import { events } from "../../../data/events.js";

const SmartTicketing = () => {
  const [activeTab, setActiveTab] = useState("ticket-types");

  // Feature highlights
  const features = [
    {
      icon: <Zap className="feature-icon" />,
      title: "Lightning Fast",
      description: "Sell tickets in seconds",
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Fraud Proof",
      description: "Advanced security features",
    },
    {
      icon: <TrendingUp className="feature-icon" />,
      title: "Smart Pricing",
      description: "Maximize your revenue",
    },
  ];

  return (
    <div className="smart-ticketing">
      {/* Header Section */}
      <div className="ticketing-header">
        <div className="header-icon">
          <Ticket className="main-icon" />
        </div>
        <h2>Smart Ticketing System</h2>
        <p className="header-description">
          Create multiple ticket types, set dynamic pricing, and prevent fraud
          with our advanced ticketing platform.
        </p>

        {/* Feature Highlights */}
        <div className="feature-highlights">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              {feature.icon}
              <h4>{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="ticketing-main">
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button
            className={`tab-btn ${
              activeTab === "ticket-types" ? "active" : ""
            }`}
            onClick={() => setActiveTab("ticket-types")}
          >
            <Ticket className="tab-btn-icon" />
            Ticket Types
          </button>
          <button
            className={`tab-btn ${
              activeTab === "dynamic-pricing" ? "active" : ""
            }`}
            onClick={() => setActiveTab("dynamic-pricing")}
          >
            <TrendingUp className="tab-btn-icon" />
            Smart Pricing
          </button>
          <button
            className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <Shield className="tab-btn-icon" />
            Security
          </button>
        </div>

        {/* Content Area */}
        <div className="tab-content">
          {activeTab === "ticket-types" && <TicketTypesDemo />}
          {activeTab === "dynamic-pricing" && (
            <ComingSoonDemo icon={<TrendingUp />} title="Smart Pricing" />
          )}
          {activeTab === "security" && (
            <ComingSoonDemo icon={<Shield />} title="Security Features" />
          )}
        </div>
      </div>
    </div>
  );
};

// Ticket Types Demo Component - USING REAL EVENTS DATA
const TicketTypesDemo = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0].id); // Start with first real event

  // Get 4 sample events from your real data for demonstration
  const sampleEvents = events.slice(0, 4); // Get first 4 real events

  const currentEvent =
    events.find((event) => event.id === selectedEvent) || events[0];

  // Format price for display
  const formatPrice = (price) => {
    if (price === 0) return "FREE";
    return `₦${price.toLocaleString()}`;
  };

  // Get appropriate icon based on event category
  const getEventIcon = (category) => {
    switch (category) {
      case "Owambe":
        return <Star className="ticket-type-icon" />;
      case "Afrobeats":
        return <Users className="ticket-type-icon" />;
      case "Business":
      case "Education":
        return <GraduationCap className="ticket-type-icon" />;
      case "Carnival":
      case "Cultural":
        return <Clock className="ticket-type-icon" />;
      case "Technology":
        return <Zap className="ticket-type-icon" />;
      case "Art":
        return <Ticket className="ticket-type-icon" />;
      default:
        return <Ticket className="ticket-type-icon" />;
    }
  };

  // Get color based on event category
  const getEventColor = (category) => {
    switch (category) {
      case "Owambe":
        return "gold";
      case "Afrobeats":
        return "purple";
      case "Business":
      case "Education":
        return "blue";
      case "Carnival":
      case "Cultural":
        return "green";
      case "Technology":
        return "blue";
      case "Art":
        return "purple";
      default:
        return "blue";
    }
  };

  return (
    <div className="ticket-types-demo">
      <div className="demo-grid">
        {/* Event Selection Sidebar */}
        <div className="ticket-sidebar">
          <h3>Available Events</h3>
          <p className="sidebar-description">
            Choose an event to see ticket details
          </p>

          <div className="ticket-list">
            {sampleEvents.map((event) => (
              <div
                key={event.id}
                className={`ticket-card ${
                  selectedEvent === event.id ? "selected" : ""
                } ${getEventColor(event.category)}`}
                onClick={() => setSelectedEvent(event.id)}
              >
                <div className="ticket-header">
                  <div className="ticket-icon">
                    {getEventIcon(event.category)}
                  </div>
                  <div className="ticket-info">
                    <h4>{event.title}</h4>
                    <div className="price">
                      <span className="current">
                        {formatPrice(event.price)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="ticket-desc">{event.description}</p>

                {/* Progress Bar - Using real ticket data */}
                <div className="progress-section">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${
                          ((event.totalTickets - event.availableTickets) /
                            event.totalTickets) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {event.totalTickets - event.availableTickets} of{" "}
                    {event.totalTickets} sold
                  </div>
                </div>

                {/* Event Features */}
                <div className="ticket-features">
                  {event.whatToExpect.slice(0, 2).map((feature, index) => (
                    <div key={index} className="feature-tag">
                      <Check className="feature-check" />
                      {feature}
                    </div>
                  ))}
                  {event.whatToExpect.length > 2 && (
                    <div className="feature-tag">
                      <Check className="feature-check" />+
                      {event.whatToExpect.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Preview */}
        <div className="ticket-preview">
          <div className="preview-header">
            <h3>Mobile Ticket Preview</h3>
            <p>This is how attendees will see their tickets</p>
          </div>

          <div className="mobile-ticket">
            <div className="ticket-top">
              <div className="event-brand">
                <div className="event-logo">EF</div>
                <div className="event-details">
                  <h4>{currentEvent.title}</h4>
                  <p>{currentEvent.location}</p>
                </div>
              </div>
            </div>

            <div className="ticket-middle">
              <div className="ticket-type-badge">
                {getEventIcon(currentEvent.category)}
                <span>{currentEvent.category}</span>
              </div>

              <div className="attendee-info">
                <div className="info-row">
                  <span>Attendee:</span>
                  <span>Victor Chidex</span>
                </div>
                <div className="info-row">
                  <span>Date:</span>
                  <span>
                    {new Date(currentEvent.date).toLocaleDateString("en-NG", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="info-row">
                  <span>Time:</span>
                  <span>{currentEvent.time}</span>
                </div>
                <div className="info-row">
                  <span>Ticket Type:</span>
                  <span>General Admission</span>
                </div>
              </div>

              <div className="qr-section">
                <div className="qr-placeholder">
                  <div className="qr-lines">
                    <div className="qr-line"></div>
                    <div className="qr-line"></div>
                    <div className="qr-line"></div>
                  </div>
                  <span>QR Code</span>
                </div>
              </div>
            </div>

            <div className="ticket-bottom">
              <div className="ticket-price">
                {formatPrice(currentEvent.price)}
              </div>
              <div className="security-badge">
                <Shield className="security-icon" />
                <span>Secured by EventFlow</span>
              </div>
            </div>
          </div>

          {/* Event Features List */}
          <div className="preview-features">
            <h4>What to Expect:</h4>
            <div className="features-grid">
              {currentEvent.whatToExpect.slice(0, 4).map((feature, index) => (
                <div key={index} className="feature-item">
                  <Check className="check-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Event Stats */}
          <div className="event-stats">
            <div className="stat-item">
              <span className="stat-label">Available Tickets:</span>
              <span className="stat-value">
                {currentEvent.availableTickets.toLocaleString()}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total Capacity:</span>
              <span className="stat-value">
                {currentEvent.totalTickets.toLocaleString()}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Category:</span>
              <span className="stat-value">{currentEvent.category}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Coming Soon Placeholder (unchanged)
const ComingSoonDemo = ({ icon, title }) => (
  <div className="coming-soon-demo">
    <div className="coming-soon-icon">{icon}</div>
    <h3>{title} Demo</h3>
    <p>Interactive demonstration coming soon</p>
    <div className="coming-soon-features">
      <div className="feature">
        <Check className="check-icon" />
        <span>Live preview of {title.toLowerCase()} features</span>
      </div>
      <div className="feature">
        <Check className="check-icon" />
        <span>Real-time demonstrations</span>
      </div>
      <div className="feature">
        <Check className="check-icon" />
        <span>Interactive examples</span>
      </div>
    </div>
  </div>
);

export default SmartTicketing;
