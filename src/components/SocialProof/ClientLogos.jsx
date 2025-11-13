import React from "react";

const ClientLogos = () => {
  // Use relative paths for better compatibility
  const clients = [
    {
      name: "Paystack",
      logo: "./images/Paystack-logo.png",
      width: 160,
      height: 60,
    },
    {
      name: "Flutterwave",
      logo: "./images/flutterwave-logo.png",
      width: 180,
      height: 50,
    },
    {
      name: "Moniepoint Inc",
      logo: "./images/moniepoint-inc-logo.png",
      width: 170,
      height: 55,
    },
    {
      name: "Mavins Record",
      logo: "./images/mavin-records-logo.jpg",
      width: 160,
      height: 60,
    },
    {
      name: "Livespot 360",
      logo: "./images/livespot360.png",
      width: 175,
      height: 52,
    },
    {
      name: "Osas Didit",
      logo: "./images/osas-didit.png",
      width: 165,
      height: 58,
    },
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
          {clients.concat(clients).map((client, index) => (
            <div key={index} className="logo-item">
              <div className="logo-image-container">
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="logo-image"
                  width={client.width}
                  height={client.height}
                  loading="lazy"
                  onError={(e) => {
                    console.error(`Failed to load image: ${client.logo}`);
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <span className="logo-name">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogos;
