import React, { useState } from "react";
import { Ticket, Shield, TrendingUp, Zap, Check, Play } from "lucide-react";
import "./SmartTicketing.css";

const SmartTicketing = () => {
  const [activeTab, setActiveTab] = useState("ticket-types");

  // Feature highlights
  const features = [
    {
      icon: <Zap className="feature-icon" />,
      title: "Lightning Fast",
      description: "Sell tickets in seconds with our optimized checkout",
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Fraud Proof",
      description: "Advanced security to prevent ticket scams",
    },
    {
      icon: <TrendingUp className="feature-icon" />,
      title: "Smart Pricing",
      description: "Dynamic pricing that maximizes your revenue",
    },
  ];

  // Demo sections
  const demoContent = {
    "ticket-types": {
      title: "Multiple Ticket Types",
      description: "Create different ticket options for every attendee need",
      features: [
        "Early Bird & VIP Tickets",
        "Group & Family Packages",
        "Student & Corporate Discounts",
        "Free vs Paid Options",
      ],
      video: "/demos/ticket-types.mp4",
      preview: "/images/ticket-types-preview.png",
    },
    "dynamic-pricing": {
      title: "Smart Dynamic Pricing",
      description: "Prices that adapt to demand and time automatically",
      features: [
        "Automatic Early Bird Expiry",
        "Demand-Based Price Adjustments",
        "Group Discount Rules",
        "Last-Minute Pricing",
      ],
      video: "/demos/dynamic-pricing.mp4",
      preview: "/images/pricing-preview.png",
    },
    security: {
      title: "Military-Grade Security",
      description: "Protect your events from fraud and scams",
      features: [
        "Unique QR Code Generation",
        "Real-time Ticket Validation",
        "Duplicate Ticket Prevention",
        "Secure Payment Processing",
      ],
      video: "/demos/security.mp4",
      preview: "/images/security-preview.png",
    },
  };

  const currentDemo = demoContent[activeTab];

  return (
    <div className="smart-ticketing">
      {/* Header Section */}
      <div className="ticketing-header">
        <div className="header-icon">
          <Ticket className="main-icon" />
        </div>
        <h2>Smart Ticketing System</h2>
        <p className="header-description">
          The most advanced ticketing platform in Nigeria. Sell more tickets,
          prevent fraud, and grow your events effortlessly.
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

      {/* Main Demo Area */}
      <div className="demo-container">
        {/* Navigation Tabs */}
        <div className="demo-tabs">
          <button
            className={`tab-button ${
              activeTab === "ticket-types" ? "active" : ""
            }`}
            onClick={() => setActiveTab("ticket-types")}
          >
            <Ticket className="tab-icon" />
            Ticket Types
          </button>
          <button
            className={`tab-button ${
              activeTab === "dynamic-pricing" ? "active" : ""
            }`}
            onClick={() => setActiveTab("dynamic-pricing")}
          >
            <TrendingUp className="tab-icon" />
            Smart Pricing
          </button>
          <button
            className={`tab-button ${activeTab === "security" ? "active" : ""}`}
            onClick={() => setActiveTab("security")}
          >
            <Shield className="tab-icon" />
            Security
          </button>
        </div>

        {/* Demo Content */}
        <div className="demo-content">
          {/* Left Side - Text Content */}
          <div className="demo-text">
            <h3>{currentDemo.title}</h3>
            <p className="demo-description">{currentDemo.description}</p>

            <div className="feature-list">
              {currentDemo.features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <Check className="check-icon" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="demo-actions">
              <button className="primary-button">
                <Play className="button-icon" />
                Watch Live Demo
              </button>
              <button className="secondary-button">Try It Yourself</button>
            </div>
          </div>

          {/* Right Side - Visual Demo */}
          <div className="demo-visual">
            <div className="demo-placeholder">
              <div className="placeholder-content">
                <Ticket className="placeholder-icon" />
                <p>Live Demo Coming Soon</p>
                <small>
                  Interactive demonstration of {currentDemo.title.toLowerCase()}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="ticketing-cta">
        <h3>Ready to Transform Your Ticket Sales?</h3>
        <p>
          Join thousands of event organizers using EventFlow's smart ticketing
        </p>
        <div className="cta-buttons">
          <button className="cta-primary">Start Free Trial</button>
          <button className="cta-secondary">View Pricing</button>
        </div>
      </div>
    </div>
  );
};

export default SmartTicketing;
