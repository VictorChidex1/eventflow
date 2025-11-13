import React from "react";
import TrustMetrics from "./TrustMetrics";
import ClientTestimonials from "./ClientTestimonials";
import TrustBadges from "./TrustBadges";
import ClientLogos from "./ClientLogos"; // Keeping the original import path
import "./SocialProof.css";

const SocialProof = () => {
  return (
    <section className="social-proof-container py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Metrics Section */}
        <div className="mb-20">
          <TrustMetrics />
        </div>

        {/* Client Logos Section */}
        <div className="mb-20">
          <ClientLogos />
        </div>

        {/* Trust Badges Section */}
        <div className="mb-20">
          <TrustBadges />
        </div>

        {/* Testimonials Section */}
        <div>
          <ClientTestimonials />
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
