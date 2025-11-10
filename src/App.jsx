import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import EventsList from "./components/Events/EventsList";
import Footer from "./components/Footer/Footer";
import HelpCenter from "./components/HelpCenter/HelpCenter";
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
