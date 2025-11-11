import React from "react";
import {
  Calendar,
  Ticket,
  Users,
  BarChart3,
  Smartphone,
  Shield,
  Zap,
  MessageCircle,
  CreditCard,
  Settings,
  Bell,
  Download,
} from "lucide-react";
import "./Features.css";

const Features = () => {
  const mainFeatures = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Event Creation & Management",
      description:
        "Create stunning events with our intuitive event builder. Manage all aspects of your event from one dashboard.",
      features: [
        "Drag & drop event builder",
        "Real-time attendee tracking",
        "Custom registration forms",
        "Multi-day event support",
      ],
    },
    {
      icon: <Ticket className="w-8 h-8" />,
      title: "Ticketing & Registration",
      description:
        "Sell tickets with multiple pricing tiers, early bird discounts, and secure payment processing.",
      features: [
        "Multiple ticket types",
        "Early bird & group pricing",
        "QR code tickets",
        "Seat selection",
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Attendee Management",
      description:
        "Manage your attendees with powerful tools for communication, check-in, and engagement.",
      features: [
        "Real-time check-in",
        "Attendee messaging",
        "Badge printing",
        "Networking features",
      ],
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Analytics & Reporting",
      description:
        "Gain insights into your event performance with comprehensive analytics and reporting tools.",
      features: [
        "Real-time dashboards",
        "Revenue tracking",
        "Attendance analytics",
        "Exportable reports",
      ],
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Mobile Experience",
      description:
        "Provide seamless experiences with our dedicated mobile apps for organizers and attendees.",
      features: [
        "EventFlow Organizer App",
        "Attendee mobile app",
        "Offline capabilities",
        "Push notifications",
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security & Reliability",
      description:
        "Enterprise-grade security and 99.9% uptime guarantee for your most important events.",
      features: [
        "SSL encryption",
        "GDPR compliance",
        "Backup systems",
        "24/7 monitoring",
      ],
    },
  ];

  const additionalFeatures = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Instant sync across all devices and platforms",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Integrated Communication",
      description: "Email, SMS, and in-app messaging",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Flexible Payments",
      description: "Multiple payment methods and currencies",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Custom Branding",
      description: "White-label solutions for your brand",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Notifications",
      description: "Automated reminders and updates",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Data Export",
      description: "Export all your data in multiple formats",
    },
  ];

  return (
    <section className="features-container">
      {/* Header Section */}
      <div className="features-header">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Calendar className="w-12 h-12 text-white" />
          </div>
          <h1 className="features-title">Powerful Features</h1>
          <p className="features-subtitle">
            Everything you need to create, manage, and grow successful events.
            From small gatherings to large conferences, EventFlow has you
            covered.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Features Grid */}
        <div className="features-grid">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-container">
                <div className="feature-icon">{feature.icon}</div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <ul className="feature-list">
                {feature.features.map((item, itemIndex) => (
                  <li key={itemIndex} className="feature-list-item">
                    <div className="checkmark">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Features Section */}
        <div className="additional-features-section">
          <div className="text-center mb-12">
            <h2 className="section-title">And So Much More...</h2>
            <p className="section-subtitle">
              EventFlow comes packed with features designed to make event
              management effortless
            </p>
          </div>

          <div className="additional-features-grid">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="additional-feature-card">
                <div className="additional-feature-icon">{feature.icon}</div>
                <h4 className="additional-feature-title">{feature.title}</h4>
                <p className="additional-feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-description">
              Join thousands of event organizers who trust EventFlow to power
              their events.
            </p>
            <div className="cta-buttons">
              <button className="cta-button primary">
                Create Your First Event
              </button>
              <button className="cta-button secondary">Schedule a Demo</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
