import React from "react";
import { Calendar, Ticket, User, Search, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="header-mobile safe-padding">
      <div className="header-content-mobile">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-primary-600 text-white p-2 rounded-lg">
            <Calendar size={20} className="sm:size-24" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-gray-900">
            EventFlow
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button className="mobile-menu-button">
          <Menu size={24} />
        </button>

        {/* Navigation - Hidden on mobile */}
        <nav className="nav-mobile">
          <a
            href="#home"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors text-sm sm:text-base"
          >
            Home
          </a>
          <a
            href="#events"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors text-sm sm:text-base"
          >
            Events
          </a>
          <a
            href="#create"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors text-sm sm:text-base"
          >
            Create Event
          </a>
          <a
            href="#dashboard"
            className="text-gray-700 hover:text-primary-600 font-medium transition-colors text-sm sm:text-base"
          >
            Dashboard
          </a>
        </nav>

        {/* Search and User Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          <div className="mobile-search">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search events..."
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm w-40"
            />
          </div>
          <button className="btn-secondary flex items-center space-x-1 text-sm px-3 py-2">
            <Ticket size={16} />
            <span className="hidden lg:inline">My Tickets</span>
          </button>
          <button className="btn-primary flex items-center space-x-1 text-sm px-3 py-2">
            <User size={16} />
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
