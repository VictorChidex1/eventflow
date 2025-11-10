import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  User,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Send us an email anytime",
      details: "support@eventflow.com",
      link: "mailto:support@eventflow.com",
      color: "bg-blue-500",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Mon-Fri, 9AM-6PM EST",
      details: "+234 (803) 123-4567",
      link: "tel:+2348031234567",
      color: "bg-green-500",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Instant help from our team",
      details: "Start a conversation",
      link: "#chat",
      color: "bg-purple-500",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      description: "Come say hello at our office",
      details: "4 Babatope Bejide Crescent. Lekki Phase 1",
      link: "https://maps.google.com",
      color: "bg-red-500",
    },
  ];

  const faqItems = [
    {
      question: "What's your typical response time?",
      answer:
        "We respond to all emails within 2-4 hours during business hours. Live chat responses are instant.",
    },
    {
      question: "Do you offer emergency support?",
      answer:
        "Yes! For urgent issues during events, call our emergency support line available 24/7.",
    },
    {
      question: "Can I schedule a demo?",
      answer:
        "Absolutely! Contact us to schedule a personalized demo of EventFlow's features.",
    },
  ];

  return (
    <section className="contact-us-container">
      {/* Header Section */}
      <div className="contact-header">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="contact-title">Get In Touch</h1>
          <p className="contact-subtitle">
            Have questions about EventFlow? We're here to help you create
            amazing events. Reach out to our friendly support team.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information Sidebar */}
          <div className="lg:col-span-1">
            <div className="contact-sidebar">
              <h2 className="sidebar-title">Contact Information</h2>
              <p className="sidebar-subtitle">
                Choose your preferred method to reach out to us. We're always
                happy to help!
              </p>

              {/* Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    className="contact-method-card"
                    onClick={(e) => {
                      if (method.title === "Live Chat") {
                        e.preventDefault();
                        alert(
                          "Live chat would open here! Our team is ready to help."
                        );
                      }
                    }}
                  >
                    <div className={`contact-icon-container ${method.color}`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="contact-method-title">{method.title}</h3>
                      <p className="contact-method-desc">
                        {method.description}
                      </p>
                      <p className="contact-method-details">{method.details}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Business Hours */}
              <div className="business-hours">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Business Hours
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between gap-4">
                    <span className="whitespace-nowrap">Monday - Friday</span>
                    <span className="font-medium text-right whitespace-nowrap">
                      9:00 AM - 6:00 PM WAT
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="whitespace-nowrap">Saturday</span>
                    <span className="font-medium text-right whitespace-nowrap">
                      10:00 AM - 4:00 PM WAT
                    </span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="whitespace-nowrap">Sunday</span>
                    <span className="font-medium text-right">
                      Emergency Support Only
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="contact-form-container">
              <div className="text-center mb-8">
                <h2 className="form-title">Send us a Message</h2>
                <p className="form-subtitle">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              {/* Submission Status */}
              {submitStatus === "success" && (
                <div className="success-message">
                  <CheckCircle className="w-5 h-5" />
                  <span>
                    Thank you! Your message has been sent successfully.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">
                      <User className="w-4 h-4" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="form-label">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">
                    <MessageCircle className="w-4 h-4" />
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing QuWATion</option>
                    <option value="feature">Feature Request</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">
                    <MessageCircle className="w-4 h-4" />
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="form-textarea"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-button"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Frequently Asked Questions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqItems.map((item, index) => (
                  <div key={index} className="faq-card">
                    <h4 className="faq-question">{item.question}</h4>
                    <p className="faq-answer">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
