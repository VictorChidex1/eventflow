import React, { useState } from "react";
import { Calendar, Ticket, User, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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

        {/* Mobile Menu Button - This changes from ☰ to X */}
        <button
          className="mobile-menu-button md:hidden z-50"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
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

        {/* Desktop Actions */}
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

      {/* Mobile Menu Overlay with Framer Motion Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-white z-40 pt-20 safe-padding"
          >
            <div className="flex flex-col space-y-6 px-4">
              {/* Mobile Navigation Links */}
              <motion.a
                href="#home"
                className="mobile-menu-link"
                onClick={closeMobileMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Home
              </motion.a>
              <motion.a
                href="#events"
                className="mobile-menu-link"
                onClick={closeMobileMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                Events
              </motion.a>
              <motion.a
                href="#create"
                className="mobile-menu-link"
                onClick={closeMobileMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Create Event
              </motion.a>
              <motion.a
                href="#dashboard"
                className="mobile-menu-link"
                onClick={closeMobileMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                Dashboard
              </motion.a>

              {/* Mobile Search */}
              <motion.div
                className="relative mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </motion.div>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col space-y-3 mt-4">
                <motion.button
                  className="btn-secondary flex items-center justify-center space-x-2 text-base py-3"
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Ticket size={20} />
                  <span>My Tickets</span>
                </motion.button>
                <motion.button
                  className="btn-primary flex items-center justify-center space-x-2 text-base py-3"
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <User size={20} />
                  <span>Sign In</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
