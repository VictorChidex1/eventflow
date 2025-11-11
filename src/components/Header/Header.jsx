import React, { useState } from "react";
import { Calendar, Ticket, User, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // ADD THIS IMPORT

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Header - This will definitely stick */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - UPDATE THIS TO USE LINK */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <Calendar size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900">EventFlow</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation - UPDATE THESE TO USE LINK */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Home
              </Link>
              <a
                href="#events"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Events
              </a>
              <a
                href="#create"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Create Event
              </a>
              <a
                href="#dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Dashboard
              </a>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-40"
                />
              </div>
              <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-2 px-4 rounded-lg border border-gray-300">
                <Ticket size={16} className="inline mr-1" />
                <span className="hidden lg:inline">My Tickets</span>
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
                <User size={16} className="inline mr-1" />
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay with Framer Motion - UPDATE THESE TO USE LINK */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 pt-16 md:hidden"
          >
            <div className="flex flex-col space-y-4 p-6">
              {/* Animated Menu Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2 border-b border-gray-200 block"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </motion.div>

              <motion.a
                href="#events"
                className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2 border-b border-gray-200"
                onClick={closeMobileMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                Events
              </motion.a>

              <motion.a
                href="#create"
                className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2 border-b border-gray-200"
                onClick={closeMobileMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Create Event
              </motion.a>

              <motion.a
                href="#dashboard"
                className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2 border-b border-gray-200"
                onClick={closeMobileMenu}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                Dashboard
              </motion.a>

              {/* Animated Search Bar */}
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </motion.div>

              {/* Animated Action Buttons */}
              <div className="flex flex-col space-y-3 mt-4">
                <motion.button
                  className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 rounded-lg border border-gray-300 flex items-center justify-center space-x-2"
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Ticket size={20} />
                  <span>My Tickets</span>
                </motion.button>

                <motion.button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center space-x-2"
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

      {/* Spacer to push content down */}
      <div className="h-16"></div>
    </>
  );
};

export default Header;
