import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.webp";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  };

  const linkVariants = {
    hover: {
      x: 5,
      color: "#ffffff",
      transition: { duration: 0.2 },
    },
  };

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            className="col-span-1 md:col-span-2"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="EventFlow Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                EventFlow
              </span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Your all-in-one platform for creating, managing, and selling
              tickets for unforgettable events.
            </p>
            <div className="flex space-x-4 mt-6">
              {[Twitter, Facebook, Instagram].map((Icon, index) => (
                <motion.div
                  key={index}
                  variants={socialIconVariants}
                  whileHover="hover"
                  className="bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-primary-600 transition-colors"
                >
                  <Icon className="text-gray-300 w-5 h-5" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 text-white">Platform</h3>
            <ul className="space-y-3 text-gray-400">
              {[
                { name: "Browse Events", href: "#/events" },
                { name: "Create Event", href: "#/create-event" },
                { name: "Pricing", href: "#/pricing" },
                { name: "Features", href: "#/features" },
              ].map((link, index) => (
                <motion.li key={index} whileHover="hover">
                  <motion.a
                    href={link.href}
                    variants={linkVariants}
                    className="inline-block"
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-3 text-gray-400">
              {[
                { name: "Help Center", href: "#/help-center" },
                { name: "Contact Us", href: "#/contact-us" },
                { name: "Privacy Policy", href: "#/privacy-policy" },
                { name: "Terms of Service", href: "#/terms-of-service" },
              ].map((link, index) => (
                <motion.li key={index} whileHover="hover">
                  <motion.a
                    href={link.href}
                    variants={linkVariants}
                    className="inline-block"
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm"
          variants={itemVariants}
        >
          <p>&copy; 2025 EventFlow. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
