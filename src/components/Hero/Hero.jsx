import React from "react";
import { Calendar, Users, MapPin, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="hero-mobile safe-padding">
      <div className="container-constraint px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="hero-title-mobile text-balance">
            Create Unforgettable
            <span className="text-blue-600 block mt-2">Events</span>
          </h1>

          <p className="hero-subtitle-mobile text-balance">
            From planning to ticket sales and real-time management - EventFlow
            makes event organization seamless and spectacular.
          </p>

          <div className="hero-buttons-mobile">
            <button className="btn-primary hero-button-mobile flex items-center justify-center space-x-2 text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4">
              <span>Create Your Event</span>
              <ArrowRight size={18} className="sm:size-5" />
            </button>
            <button className="btn-secondary hero-button-mobile flex items-center justify-center space-x-2 text-base sm:text-lg px-6 py-3 sm:px-8 sm:py-4">
              <span>Browse Events</span>
            </button>
          </div>

          {/* Stats */}
          <div className="hero-stats-mobile">
            <div className="text-center">
              <div className="bg-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                5,800+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Events Created
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <Users className="text-blue-600" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                650K+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Happy Attendees
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                <MapPin className="text-blue-600" size={20} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                500+
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Cities Covered
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
