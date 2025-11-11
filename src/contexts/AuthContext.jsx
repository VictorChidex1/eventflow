import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when app starts
  useEffect(() => {
    const checkAuth = () => {
      // Check localStorage for user data
      const savedUser = localStorage.getItem("eventflow_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("eventflow_user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("eventflow_user");
  };

  // The value that will be available to all components
  const value = {
    user, // Current user data
    login, // Function to log in
    logout, // Function to log out
    loading, // Loading state
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
