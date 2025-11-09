import React from "react";
import { Calendar, Users, MapPin, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="bg-gradient-to-br from-primary-50 to-secondary-100 py-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Unforgettable
            <span className="text-primary-600"> Events</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            From planning to ticket sales and real-time management - EventFlow
            makes event organization seamless and spectacular.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4">
              <span>Create Your Event</span>
              <ArrowRight size={20} />
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4">
              <span>Browse Events</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Calendar className="text-primary-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">2000+</h3>
              <p className="text-gray-600">Events Created</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="text-primary-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">500K+</h3>
              <p className="text-gray-600">Happy Attendees</p>
            </div>

            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MapPin className="text-primary-600" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">250+</h3>
              <p className="text-gray-600">Cities Covered</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
