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
  Music,
  Heart,
  Palette,
  Code,
  Briefcase,
  Camera,
  Activity,
  Utensils,
  Church,
  Film,
  Sparkles,
  Gamepad2,
  Mic2,
  Coffee,
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

// Centralized category configuration - EASY TO MAINTAIN AND EXTEND
const categoryConfig = {
  // Existing categories
  Owambe: {
    icon: <Star className="ticket-type-icon" />,
    color: "gold",
    emoji: "🎉",
  },
  Afrobeats: {
    icon: <Music className="ticket-type-icon" />,
    color: "purple",
    emoji: "🎵",
  },
  Business: {
    icon: <Briefcase className="ticket-type-icon" />,
    color: "blue",
    emoji: "💼",
  },
  Education: {
    icon: <GraduationCap className="ticket-type-icon" />,
    color: "indigo",
    emoji: "📚",
  },
  Carnival: {
    icon: <Users className="ticket-type-icon" />,
    color: "green",
    emoji: "🎭",
  },
  Cultural: {
    icon: <Heart className="ticket-type-icon" />,
    color: "red",
    emoji: "🎪",
  },
  Technology: {
    icon: <Code className="ticket-type-icon" />,
    color: "blue",
    emoji: "💻",
  },
  Art: {
    icon: <Palette className="ticket-type-icon" />,
    color: "purple",
    emoji: "🎨",
  },
  Sports: {
    icon: <Activity className="ticket-type-icon" />,
    color: "orange",
    emoji: "⚽",
  },
  Wellness: {
    icon: <Sparkles className="ticket-type-icon" />,
    color: "teal",
    emoji: "🧘",
  },
  "Food & Drink": {
    icon: <Utensils className="ticket-type-icon" />,
    color: "amber",
    emoji: "🍴",
  },
  Charity: {
    icon: <Heart className="ticket-type-icon" />,
    color: "pink",
    emoji: "🤝",
  },
  Religious: {
    icon: <Church className="ticket-type-icon" />,
    color: "violet",
    emoji: "⛪",
  },
  Entertainment: {
    icon: <Film className="ticket-type-icon" />,
    color: "cyan",
    emoji: "🎬",
  },
  Comedy: {
    icon: <Mic2 className="ticket-type-icon" />,
    color: "yellow",
    emoji: "😂",
  },

  // NEW CATEGORIES ADDED HERE:
  Gaming: {
    icon: <Gamepad2 className="ticket-type-icon" />,
    color: "lime",
    emoji: "🎮",
  },
  // Note: Dating category doesn't exist in your events.js yet, but adding for future use
  Dating: {
    icon: <Heart className="ticket-type-icon" />,
    color: "rose",
    emoji: "💑",
  },
};

// Ticket Types Demo Component - USING REAL EVENTS DATA
const TicketTypesDemo = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0].id);

  // Get 4 sample events from your real data for demonstration
  const sampleEvents = events.slice(0, 4);

  const currentEvent =
    events.find((event) => event.id === selectedEvent) || events[0];

  // Format price for display
  const formatPrice = (price) => {
    if (price === 0) return "FREE";
    return `₦${price.toLocaleString()}`;
  };

  // Get category configuration - SIMPLIFIED APPROACH
  const getCategoryConfig = (category) => {
    return categoryConfig[category] || categoryConfig.Business; // fallback to Business
  };

  // Get event logo based on event title and category
  const getEventLogo = (event) => {
    const { title, category } = event;
    const config = getCategoryConfig(category);

    // Use emoji from config if available
    if (config.emoji) {
      return config.emoji;
    }

    // Fallback to initials
    const getInitials = (title) => {
      const words = title.split(" ");
      if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
      }
      return title.substring(0, 2).toUpperCase();
    };

    return getInitials(title);
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
            {sampleEvents.map((event) => {
              const config = getCategoryConfig(event.category);
              return (
                <div
                  key={event.id}
                  className={`ticket-card ${
                    selectedEvent === event.id ? "selected" : ""
                  } ${config.color}`}
                  onClick={() => setSelectedEvent(event.id)}
                >
                  <div className="ticket-header">
                    <div className="ticket-icon">{config.icon}</div>
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
              );
            })}
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
                <div
                  className={`event-logo ${
                    getCategoryConfig(currentEvent.category).color
                  }`}
                  data-category={currentEvent.category}
                >
                  {getEventLogo(currentEvent)}
                </div>
                <div className="event-details">
                  <h4>{currentEvent.title}</h4>
                  <p>{currentEvent.location}</p>
                </div>
              </div>
            </div>

            <div className="ticket-middle">
              <div className="ticket-type-badge">
                {getCategoryConfig(currentEvent.category).icon}
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
