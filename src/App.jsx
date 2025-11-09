import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import EventsList from "./components/Events/EventsList";
import Footer from "./components/Footer/Footer";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <EventsList />
      </main>
      <Footer />
    </div>
  );
}

export default App;
