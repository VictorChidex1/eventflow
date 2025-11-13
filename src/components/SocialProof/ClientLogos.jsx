import React from "react";

const ClientLogos = () => {
  // Using placeholder Nigerian company names - replace with actual logos when available
  const clients = [
    { name: "TechPoint Africa", logo: "🏆" },
    { name: "Lagos Startup Week", logo: "🚀" },
    { name: "Naija Tech Summit", logo: "💻" },
    { name: "Abuja Business Forum", logo: "🏛️" },
    { name: "Port Harcourt Innovate", logo: "⚡" },
    { name: "Ibadan Tech Hub", logo: "🎯" },
  ];

  return (
    <div className="social-proof-section">
      <div className="text-center mb-12">
        <h2 className="section-title">Trusted by Leading Organizations</h2>
        <p className="section-subtitle">
          From tech conferences to corporate events across Nigeria
        </p>
      </div>

      <div className="logos-container">
        <div className="logos-scroll">
          {clients.concat(clients).map(
            (
              client,
              index // Duplicate for seamless loop
            ) => (
              <div key={index} className="logo-item">
                <div className="logo-placeholder">{client.logo}</div>
                <span className="logo-name">{client.name}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
