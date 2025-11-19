import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import EventsList from "./components/Events/EventsList";
import Footer from "./components/Footer/Footer";
import HelpCenter from "./components/HelpCenter/HelpCenter";
import ContactUs from "./components/ContactUs/ContactUs";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import TermsOfService from "./components/TermsofService/TermsofService";
import Features from "./components/Features/Features";
import Pricing from "./components/Pricing/Pricing";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile/Profile";
import Events from "./pages/Events/Events";
import EnvironmentBanner from './components/App/EnvironmentBanner';
import PaymentVerification from './components/Payment/PaymentVerification';
import "./index.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white flex flex-col">
          <EnvironmentBanner />
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Home Page Route */}
              <Route
                path="/"
                element={
                  <>
                    <Hero />
                    <EventsList />
                  </>
                }
              />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />

              {/* Public Routes */}
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/events" element={<Events />} />

              {/* Payment Verification Route */}
              <Route path="/payment-verify" element={<PaymentVerification />} />

              {/* Protected Routes */}
              <Route
                path="/create-event"
                element={
                  <ProtectedRoute>
                    <CreateEvent />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Add a catch-all route for 404 pages */}
              <Route path="*" element={
                <div className="container mx-auto px-4 py-16 text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                  <p className="text-gray-600">The page you're looking for doesn't exist.</p>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;