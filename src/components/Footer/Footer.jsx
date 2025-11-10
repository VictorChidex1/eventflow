import React from "react";
import { Calendar, Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <Calendar size={24} />
              </div>
              <span className="text-2xl font-bold">EventFlow</span>
            </div>
            <p className="text-gray-400 max-w-md">
              Your all-in-one platform for creating, managing, and selling
              tickets for unforgettable events.
            </p>
            <div className="flex space-x-4 mt-4">
              <Twitter className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Facebook className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Browse Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Create Event
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#/help-center"
                  className="hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#/contact-us"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 EventFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
