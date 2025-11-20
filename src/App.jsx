// src/App.jsx
import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
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

// Import ticket purchase components
import TicketPurchase from './components/Tickets/TicketPurchase';
import Checkout from './components/Payment/Checkout';
import OrderConfirmation from './components/Payment/OrderConfirmation';
import MyTickets from './pages/MyTickets/MyTickets';
import EventDetail from './components/Events/EventDetail'; // Fixed import - singular

// Public Route component - redirects to home if user is already logged in
const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

// Organizer Route component - for event creation
const OrganizerRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

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

              {/* Auth Routes - Public only (redirect if logged in) */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/forgot-password" 
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                } 
              />

              {/* Public Routes */}
              <Route path="/help-center" element={<HelpCenter />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/events" element={<Events />} />
              <Route path="/event/:eventId" element={<EventDetail />} /> {/* Fixed route */}

              {/* Payment Routes */}
              <Route path="/payment-verify" element={<PaymentVerification />} />

              {/* ===== PROTECTED TICKET PURCHASE ROUTES ===== */}
              {/* Ticket Purchase Flow - All require authentication */}
              <Route
                path="/tickets/:eventId/purchase"
                element={
                  <ProtectedRoute>
                    <TicketPurchase />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/checkout/:eventId"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/order-confirmation/:orderId"
                element={
                  <ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/my-tickets"
                element={
                  <ProtectedRoute>
                    <MyTickets />
                  </ProtectedRoute>
                }
              />

              {/* User Profile - Protected */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              {/* Event Management - Protected */}
              <Route
                path="/create-event"
                element={
                  <OrganizerRoute>
                    <CreateEvent />
                  </OrganizerRoute>
                }
              />

              {/* Redirect routes for better UX */}
              <Route path="/tickets" element={<Navigate to="/my-tickets" replace />} />
              <Route path="/dashboard" element={<Navigate to="/profile" replace />} />

              {/* 404 Page */}
              <Route path="*" element={
                <div className="container mx-auto px-4 py-16 text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                  <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                  <button 
                    onClick={() => window.history.back()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    Go Back
                  </button>
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