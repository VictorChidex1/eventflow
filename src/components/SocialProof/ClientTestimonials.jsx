import React, { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

const ClientTestimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Adebayo Johnson",
      company: "Tech Conference NG",
      role: "Event Director",
      image: "👨🏾‍💼",
      content:
        "EventFlow transformed how we manage our annual tech conference. The ticketing system is seamless, and the real-time analytics helped us make data-driven decisions. Our attendees loved the smooth experience!",
      rating: 5,
    },
    {
      name: "Chiamaka Okoro",
      company: "Lagos Wedding Expo",
      role: "Organizer",
      image: "👩🏾‍💼",
      content:
        "As a wedding planner, I needed a reliable platform for my expos. EventFlow's professional features and excellent support made managing 2,000+ attendees effortless. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emeka Nwankwo",
      company: "Startup Grind Abuja",
      role: "Community Lead",
      image: "👨🏾‍🎓",
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
              {testimonials[currentTestimonial].image}
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
