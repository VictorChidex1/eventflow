import React, { useState } from "react";
import { Calendar, Menu, X, LogOut, User } from "lucide-react";
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

  return (
    <>
      {/* Fixed Header - STREAMLINED */}
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

            {/* Desktop Navigation - STREAMLINED */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/#events"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                Events
              </Link>

              {/* Conditional navigation based on auth */}
              {user ? (
                <>
                  <Link
                    to="/create-event"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Create Event
                  </Link>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  to="/pricing"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Pricing
                </Link>
              )}
            </nav>

            {/* Desktop Actions - STREAMLINED WITH PROFILE LINK */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                // Logged in user - UPDATED WITH PROFILE LINK
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </Link>
                  <span className="text-sm text-gray-600">
                    Hello, {user.name}!
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                // Not logged in
                <button
                  onClick={handleLogin}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - STREAMLINED WITH PROFILE LINK */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-40 pt-16 md:hidden"
          >
            <div className="flex flex-col space-y-1 p-6">
              {/* Mobile Menu Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg py-4 border-b border-gray-100 block"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Link
                  to="/#events"
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg py-4 border-b border-gray-100 block"
                  onClick={closeMobileMenu}
                >
                  Events
                </Link>
              </motion.div>

              {/* Conditional mobile navigation */}
              {user ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      to="/create-event"
                      className="text-gray-700 hover:text-blue-600 font-medium text-lg py-4 border-b border-gray-100 block"
                      onClick={closeMobileMenu}
                    >
                      Create Event
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <Link
                      to="/dashboard"
                      className="text-gray-700 hover:text-blue-600 font-medium text-lg py-4 border-b border-gray-100 block"
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>
                  </motion.div>

                  {/* PROFILE LINK ADDED TO MOBILE */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Link
                      to="/profile"
                      className="text-gray-700 hover:text-blue-600 font-medium text-lg py-4 border-b border-gray-100 block"
                      onClick={closeMobileMenu}
                    >
                      Profile
                    </Link>
                  </motion.div>

                  {/* User info */}
                  <motion.div
                    className="bg-blue-50 p-4 rounded-lg mt-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <p className="text-sm text-blue-800 font-medium">
                      Welcome back, {user.name}!
                    </p>
                    <p className="text-xs text-blue-600">{user.email}</p>
                  </motion.div>

                  <motion.button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white font-medium py-4 rounded-lg flex items-center justify-center space-x-2 mt-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      to="/pricing"
                      className="text-gray-700 hover:text-blue-600 font-medium text-lg py-4 border-b border-gray-100 block"
                      onClick={closeMobileMenu}
                    >
                      Pricing
                    </Link>
                  </motion.div>

                  <motion.button
                    onClick={handleLogin}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg flex items-center justify-center space-x-2 mt-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <span>Sign In</span>
                  </motion.button>
                </>
              )}
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
