import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        {/* We'll add Events section next */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              More Components Coming Soon!
            </h2>
            <p className="text-xl text-gray-600">
              Event listings, ticket system, and dashboard are being built next.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
