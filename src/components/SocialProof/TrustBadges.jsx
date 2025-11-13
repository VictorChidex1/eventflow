import React from "react";
import { Shield, Lock, CheckCircle, Award } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: <Shield className="badge-icon" />,
      title: "PCI DSS Compliant",
      description: "Secure payment processing",
    },
    {
      icon: <Lock className="badge-icon" />,
      title: "Data Encrypted",
      description: "256-bit SSL encryption",
    },
    {
      icon: <CheckCircle className="badge-icon" />,
      title: "CBN Licensed",
      description: "Approved payment partners",
    },
    {
      icon: <Award className="badge-icon" />,
      title: "24/7 Support",
      description: "Dedicated customer care",
    },
  ];

  return (
    <div className="social-proof-section">
      <div className="text-center mb-12">
        <h2 className="section-title">Your Security is Our Priority</h2>
        <p className="section-subtitle">
          Built with enterprise-grade security to protect your events and
          payments
        </p>
      </div>

      <div className="badges-grid">
        {badges.map((badge, index) => (
          <div key={index} className="badge-card">
            <div className="badge-icon-container">{badge.icon}</div>
            <div className="badge-content">
              <h4 className="badge-title">{badge.title}</h4>
              <p className="badge-description">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadges;
