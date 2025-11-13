import React, { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const ClientTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Agbaho Victor",
      company: "Tech Conference NG",
      role: "Event Director",
      image: "/images/agbaho-victor.png", // Updated path
      content:
        "EventFlow transformed how we manage our annual tech conference. The ticketing system is seamless, and the real-time analytics helped us make data-driven decisions. Our attendees loved the smooth experience!",
      rating: 5,
    },
    {
      name: "Miriam Nwakama",
      company: "Lagos Wedding Expo",
      role: "Organizer",
      image: "/images/miriam-nwakama.png", // Updated path
      content:
        "As a wedding planner, I needed a reliable platform for my expos. EventFlow's professional features and excellent support made managing 2,000+ attendees effortless. Highly recommended!",
      rating: 5,
    },
    {
      name: "Esther Onyinye",
      company: "Startup Grind Abuja",
      role: "Community Lead",
      image: "/images/esther-onyinye.jpg", // Updated path
      content:
        "The payment processing in Naira without extra fees was a game-changer for our community events. EventFlow understands the Nigerian market perfectly.",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <div className="social-proof-section">
      <div className="text-center mb-12">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">
          Hear from event organizers who have transformed their events with
          EventFlow
        </p>
      </div>

      <div className="testimonials-container">
        <div className="testimonial-card">
          <Quote className="quote-icon" />

          <div className="testimonial-content">
            <p>"{testimonials[currentTestimonial].content}"</p>
          </div>

          <div className="rating-stars">
            {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
              <Star key={i} className="star-icon" fill="currentColor" />
            ))}
          </div>

          <div className="testimonial-author">
            <div className="author-avatar">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="author-image"
                onError={(e) => {
                  // Fallback in case image doesn't load
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              {/* Fallback emoji - hidden by default */}
              <div className="author-fallback" style={{ display: "none" }}>
                {testimonials[currentTestimonial].name.includes("Adebayo")
                  ? "👨🏾‍💼"
                  : testimonials[currentTestimonial].name.includes("Chiamaka")
                  ? "👩🏾‍💼"
                  : "👨🏾‍🎓"}
              </div>
            </div>
            <div className="author-info">
              <div className="author-name">
                {testimonials[currentTestimonial].name}
              </div>
              <div className="author-company">
                {testimonials[currentTestimonial].company}
              </div>
              <div className="author-role">
                {testimonials[currentTestimonial].role}
              </div>
            </div>
          </div>

          <div className="testimonial-nav">
            <button onClick={prevTestimonial} className="nav-button">
              <ChevronLeft className="nav-icon" />
            </button>
            <div className="nav-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`dot ${
                    index === currentTestimonial ? "active" : ""
                  }`}
                />
              ))}
            </div>
            <button onClick={nextTestimonial} className="nav-button">
              <ChevronRight className="nav-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientTestimonials;
