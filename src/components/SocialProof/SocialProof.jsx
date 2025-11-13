import React from "react";
import TrustMetrics from "./TrustMetrics";
import ClientTestimonials from "./ClientTestimonials";
import TrustBadges from "./TrustBadges";
import ClientLogos from "./ClientLogos";
import "./SocialProof.css";

const SocialProof = () => {
  return (
    // Remove the gradient background from the container and let Pricing handle the background
    <section className="social-proof-container mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Trust Metrics */}
        <TrustMetrics />

        {/* Client Logos */}
        <ClientLogos />

        {/* Testimonials */}
        <ClientTestimonials />

        {/* Trust Badges */}
        <TrustBadges />
      </div>
    </section>
  );
};

export default SocialProof;
