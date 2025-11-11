import React, { useState } from "react";
import { Calendar, Ticket, User, Search, Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobileMenu();
    navigate("/");
  };

  const handleLogin = () => {
    closeMobileMenu();
    navigate("/login");
  };

  const handleSignup = () => {
    closeMobileMenu();
    navigate("/signup");
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
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

            {/* Desktop Navigation - UPDATED WITH PRICING */}
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
              <Link
                to="/pricing"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Pricing
              </Link>

              {/* Show Create Event only when logged in */}
              {user && (
                <Link
                  to="/create-event"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Create Event
                </Link>
              )}

              {/* Show Dashboard only when logged in */}
              {user && (
                <a
                  href="#dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                >
                  Dashboard
                </a>
              )}
            </nav>

            {/* Desktop Actions - UPDATED FOR AUTH */}
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

              {user ? (
                // Logged in user menu
                <div className="flex items-center space-x-3">
                  {/* User welcome message */}
                  <span className="text-sm text-gray-600 hidden lg:block">
                    Hello, {user.name}
                  </span>

                  {/* Logout button */}
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg flex items-center space-x-1"
                  >
                    <LogOut size={16} />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </div>
              ) : (
                // Not logged in - show auth buttons
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center space-x-1"
                >
                  <User size={16} />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay with Framer Motion - UPDATED WITH PRICING */}
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

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/pricing"
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2 border-b border-gray-200 block"
                  onClick={closeMobileMenu}
                >
                  Pricing
                </Link>
              </motion.div>

              {/* Show Create Event only when logged in */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <Link
                    to="/create-event"
                    className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2 border-b border-gray-200 block"
                    onClick={closeMobileMenu}
                  >
                    Create Event
                  </Link>
                </motion.div>
              )}

              {/* Show Dashboard only when logged in */}
              {user && (
                <motion.a
                  href="#dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg py-2 border-b border-gray-200"
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Dashboard
                </motion.a>
              )}

              {/* User info when logged in */}
              {user && (
                <motion.div
                  className="bg-blue-50 p-3 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <p className="text-sm text-blue-800 font-medium">
                    Welcome back, {user.name}!
                  </p>
                  <p className="text-xs text-blue-600">{user.email}</p>
                </motion.div>
              )}

              {/* Animated Search Bar */}
              <motion.div
                className="relative mt-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: user ? 0.4 : 0.35 }}
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

              {/* Animated Action Buttons - UPDATED FOR AUTH */}
              <div className="flex flex-col space-y-3 mt-4">
                <motion.button
                  className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 rounded-lg border border-gray-300 flex items-center justify-center space-x-2"
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: user ? 0.45 : 0.4 }}
                >
                  <Ticket size={20} />
                  <span>My Tickets</span>
                </motion.button>

                {user ? (
                  // Logged in - show logout
                  <motion.button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg flex items-center justify-center space-x-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </motion.button>
                ) : (
                  // Not logged in - show auth buttons
                  <>
                    <motion.button
                      onClick={handleLogin}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 }}
                    >
                      <User size={20} />
                      <span>Sign In</span>
                    </motion.button>

                    <motion.button
                      onClick={handleSignup}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg flex items-center justify-center space-x-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <User size={20} />
                      <span>Sign Up</span>
                    </motion.button>
                  </>
                )}
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
