import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // ← ADD THIS IMPORT
import ProtectedRoute from "./components/ProtectedRoute"; // ← ADD THIS IMPORT
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
import Login from "./pages/Login"; // ← WE'LL CREATE THIS NEXT
import Signup from "./pages/Signup"; // ← WE'LL CREATE THIS NEXT
import Profile from "./pages/Profile/Profile";
import Events from "./pages/Events/Events";
import "./index.css";

function App() {
  return (
    <AuthProvider>
      {" "}
      {/* ← WRAP EVERYTHING WITH AuthProvider */}
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <Routes>
            {/* Home Page Route */}
            <Route
              path="/"
              element={
                <main>
                  <Hero />
                  <EventsList />
                </main>
              }
            />

            {/* ADD LOGIN AND SIGNUP ROUTES */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Help Center Route */}
            <Route
              path="/help-center"
              element={
                <main>
                  <HelpCenter />
                </main>
              }
            />

            {/* Contact Us Route */}
            <Route
              path="/contact-us"
              element={
                <main>
                  <ContactUs />
                </main>
              }
            />

            {/* Privacy Policy Route */}
            <Route
              path="/privacy-policy"
              element={
                <main>
                  <PrivacyPolicy />
                </main>
              }
            />

            {/* Terms of Service Route */}
            <Route
              path="/terms-of-service"
              element={
                <main>
                  <TermsOfService />
                </main>
              }
            />

            {/* Features Route */}
            <Route
              path="/features"
              element={
                <main>
                  <Features />
                </main>
              }
            />

            {/* Pricing Route */}
            <Route
              path="/pricing"
              element={
                <main>
                  <Pricing />
                </main>
              }
            />

            {/* PROTECTED Create Event Route */}
            <Route
              path="/create-event"
              element={
                <ProtectedRoute>
                  {" "}
                  {/* ← WRAP WITH ProtectedRoute */}
                  <main>
                    <CreateEvent />
                  </main>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <main>
                    <Profile />
                  </main>
                </ProtectedRoute>
              }
            />

            {/* Added Events Route */}
            <Route
              path="/events"
              element={
                <main>
                  <Events />
                </main>
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
