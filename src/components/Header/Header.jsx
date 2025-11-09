import React from "react";
import { Calendar, Ticket, User, Search } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-primary-600 text-white p-2 rounded-lg">
              <Calendar size={24} />
            </div>
            <span className="text-2xl font-bold text-gray-900">EventFlow</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#events"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Events
            </a>
            <a
              href="#create"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Create Event
            </a>
            <a
              href="#dashboard"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Dashboard
            </a>
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search events..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button className="btn-secondary flex items-center space-x-2">
              <Ticket size={18} />
              <span>My Tickets</span>
            </button>
            <button className="btn-primary flex items-center space-x-2">
              <User size={18} />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
