import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
import "./index.css";

function App() {
  return (
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

          {/* Help Center Route */}
          <Route
            path="/help-center"
            element={
              <main>
                <HelpCenter />
              </main>
            }
          />

          {/* Contact Us Route - ADD THIS */}
          <Route
            path="/contact-us"
            element={
              <main>
                <ContactUs />
              </main>
            }
          />

          {/* Privacy Policy Route - ADD THIS */}
          <Route
            path="/privacy-policy"
            element={
              <main>
                <PrivacyPolicy />
              </main>
            }
          />

          {/* Terms of Service Route - ADD THIS */}
          <Route
            path="/terms-of-service"
            element={
              <main>
                <TermsOfService />
              </main>
            }
          />

          {/* Features Route - ADD THIS */}
          <Route
            path="/features"
            element={
              <main>
                <Features />
              </main>
            }
          />

          {/* Pricing Route - ADD THIS */}
          <Route
            path="/pricing"
            element={
              <main>
                <Pricing />
              </main>
            }
          />

          {/* Create Event Route - ADD THIS */}
          <Route
            path="/create-event"
            element={
              <main>
                <CreateEvent />
              </main>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
