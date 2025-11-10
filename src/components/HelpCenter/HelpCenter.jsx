import React, { useState } from "react";
import {
  Search,
  ChevronDown,
  ChevronUp,
  Mail,
  MessageCircle,
  Phone,
  FileText,
  Clock,
  Users,
  Shield,
} from "lucide-react";
import "./HelpCenter.css";

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const contactMethods = [
    {
      icon: <MessageCircle className="w-6 h-6 contact-icon" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      link: "#chat",
      availability: "Available 24/7",
    },
    {
      icon: <Mail className="w-6 h-6 contact-icon" />,
      title: "Email Support",
      description: "Send us a message and we'll respond within 24 hours",
      action: "Send Email",
      email: "support@eventflow.com",
      link: "mailto:support@eventflow.com",
      availability: "Response within 24h",
    },
    {
      icon: <Phone className="w-6 h-6 contact-icon" />,
      title: "Phone Support",
      description: "Call us for urgent assistance",
      action: "Call Now",
      phone: "+1 (555) 123-4567",
      link: "tel:+15551234567",
      availability: "Mon-Fri, 9AM-6PM WAT",
    },
  ];

  const faqData = [
    {
      question: "How do I create an event?",
      answer:
        "To create an event, click on the 'Create Event' button in the header, fill in your event details, set up ticket types and pricing, and publish your event. You can manage everything from your dashboard.",
      category: "Event Creation",
    },
    {
      question: "How do ticket sales work?",
      answer:
        "EventFlow handles all ticket sales securely. When attendees purchase tickets, they receive e-tickets via email, and you get real-time updates on sales in your dashboard. We support multiple payment methods including credit cards, PayPal, and bank transfers.",
      category: "Ticketing",
    },
    {
      question: "What fees does EventFlow charge?",
      answer:
        "We charge a small service fee on each ticket sold. The exact percentage depends on your plan. Basic plan: 5% + #3,000 per ticket, Pro plan: 3% + #2,000 per ticket, Enterprise: Custom pricing. There are no setup fees or hidden charges.",
      category: "Pricing",
    },
    {
      question: "Can I customize my event page?",
      answer:
        "Yes! You can customize your event page with your own branding, colors, images, and layout. We offer various templates and customization options to make your event stand out. Pro and Enterprise users get access to advanced customization features.",
      category: "Customization",
    },
    {
      question: "How do attendees receive their tickets?",
      answer:
        "Attendees receive their tickets via email immediately after purchase. They can also access their tickets through their EventFlow account. Each ticket has a unique QR code for easy check-in at your event venue.",
      category: "Attendees",
    },
    {
      question: "What if I need to cancel my event?",
      answer:
        "You can cancel your event from your dashboard. We'll automatically notify all attendees and process refunds according to your refund policy. Our support team is available to help with the process and ensure a smooth experience for everyone involved.",
      category: "Event Management",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, we use bank-level SSL encryption and are PCI DSS compliant. All payment information is processed securely through our certified payment partners. We never store your full credit card details on our servers.",
      category: "Security",
    },
    {
      question: "Can I integrate EventFlow with other tools?",
      answer:
        "Absolutely! We offer integrations with popular tools like Mailchimp, Slack, Google Calendar, and Zapier. Enterprise customers can access our API for custom integrations with their existing systems.",
      category: "Integrations",
    },
  ];

  const supportStats = [
    {
      icon: <Clock className="w-5 h-5" />,
      label: "Average Response Time",
      value: "3 hours",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Support Agents",
      value: "24/7",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: "Customer Satisfaction",
      value: "99%",
    },
  ];

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="help-center" className="help-center-container py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Help Center</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get the support you need to create amazing events. Our team is here
            to help you succeed.
          </p>

          {/* Support Stats - Enhanced Version */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {supportStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 text-white border border-white/30 shadow-lg"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon with enhanced background */}
                  <div className="bg-white/20 rounded-full p-3 mb-4 border border-white/30">
                    {stat.icon}
                  </div>

                  {/* Value - Made much bolder and clearer */}
                  <div className="text-3xl font-extrabold mb-2 text-white drop-shadow-sm">
                    {stat.value}
                  </div>

                  {/* Label - Improved clarity */}
                  <div className="text-lg font-semibold text-white/90 mb-1">
                    {stat.label}
                  </div>

                  {/* Optional subtle description */}
                  <div className="text-sm text-white/70 font-medium">
                    {stat.label === "Average Response Time" &&
                      "Quick support guaranteed"}
                    {stat.label === "Support Agents" &&
                      "Always available to help"}
                    {stat.label === "Customer Satisfaction" &&
                      "Rated by our users"}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, and more..."
              className="w-full pl-12 pr-4 py-4 help-search-input rounded-xl text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content Container */}
        <div className="help-center-content p-8">
          {/* Quick Help Cards */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Get Support
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="help-card p-6">
                  <div className="text-blue-600 mb-4">{method.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>

                  {/* Availability Badge */}
                  <div className="mb-3">
                    <span className="inline-flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {method.availability}
                    </span>
                  </div>

                  {/* Show phone number for Phone Support */}
                  {method.phone && (
                    <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-lg font-bold text-blue-700 text-center">
                        {method.phone}
                      </p>
                    </div>
                  )}

                  {/* Show email for Email Support */}
                  {method.email && !method.phone && (
                    <div className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-700 text-center break-all">
                        {method.email}
                      </p>
                    </div>
                  )}

                  <a
                    href={method.link}
                    className="inline-flex items-center justify-center w-full py-3 px-4 help-button text-white font-semibold rounded-lg transition-all duration-200"
                    onClick={(e) => {
                      if (method.title === "Live Chat") {
                        e.preventDefault();
                        // Add your chat functionality here
                        alert(
                          "Live chat would open here! This would connect you with our support team."
                        );
                      }
                    }}
                  >
                    {method.action}
                    {method.phone && <Phone className="w-4 h-4 ml-2" />}
                    {method.email && <Mail className="w-4 h-4 ml-2" />}
                    {method.title === "Live Chat" && (
                      <MessageCircle className="w-4 h-4 ml-2" />
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <div className="help-card">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {searchQuery
                        ? `Found ${filteredFaqs.length} results for "${searchQuery}"`
                        : "Quick answers to common questions"}
                    </p>
                  </div>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-2 md:mt-0 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              </div>

              {filteredFaqs.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredFaqs.map((faq, index) => (
                    <div key={index} className="faq-item p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                              {faq.category}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleFaq(index)}
                            className="flex justify-between items-center w-full text-left"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 pr-4 faq-question">
                              {faq.question}
                            </h3>
                            {openFaq === index ? (
                              <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            )}
                          </button>
                          {openFaq === index && (
                            <div className="mt-4 text-gray-600 leading-relaxed faq-answer">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or browse all FAQs
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Additional Resources */}
          <div className="text-center">
            <div className="resource-section rounded-xl p-8">
              <FileText className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                Need more help?
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Explore our comprehensive documentation, video tutorials, and
                community forums
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="help-button text-white font-semibold py-3 px-6 rounded-lg">
                  View Documentation
                </button>
                <button className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Video Tutorials
                </button>
                <button className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors">
                  Community Forum
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;
