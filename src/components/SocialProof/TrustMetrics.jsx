import React from "react";
import { Users, Calendar, Ticket, TrendingUp } from "lucide-react";

const TrustMetrics = () => {
  const metrics = [
    {
      icon: <Calendar className="metric-icon" />,
      value: "5,800+",
      label: "Events Hosted",
      description: "Successful events across Nigeria",
    },
    {
      icon: <Users className="metric-icon" />,
      value: "650,000+",
      label: "Tickets Sold",
      description: "Happy attendees and counting",
    },
    {
      icon: <Ticket className="metric-icon" />,
      value: "98%",
      label: "Event Success Rate",
      description: "Smooth event execution",
    },
    {
      icon: <TrendingUp className="metric-icon" />,
      value: "3,000+",
      label: "Organizers",
      description: "Trusting us with their events",
    },
  ];

  return (
    <div className="social-proof-section">
      <div className="text-center mb-12">
        <h2 className="section-title">
          Trusted by Event Organizers Across Nigeria
        </h2>
        <p className="section-subtitle">
          Join hundreds of successful event organizers who trust EventFlow with
          their most important events
        </p>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <div className="metric-icon-container">{metric.icon}</div>
            <div className="metric-content">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
              <div className="metric-description">{metric.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustMetrics;
