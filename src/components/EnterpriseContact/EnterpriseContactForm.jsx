// components/EnterpriseContact/EnterpriseContactForm.jsx
import React, { useState } from "react";
import {
  Building,
  Users,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Loader,
  Download,
  Eye,
} from "lucide-react";
import "./EnterpriseContactForm.css";
import LeadsAdminPanel from "./LeadsAdminPanel"; // ADD THIS IMPORT

const EnterpriseContactForm = ({ onClose, initialPlan = "enterprise" }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    companySize: "",
    monthlyEvents: "",
    maxAttendees: "",
    currentPlatform: "",
    timeline: "",
    budget: "",
    requirements: "",
    integrations: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false); // ADD THIS STATE

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ];

  const monthlyEventRanges = [
    "1-5 events",
    "6-15 events",
    "16-30 events",
    "31-50 events",
    "50+ events",
  ];

  const attendeeRanges = [
    "100-500 attendees",
    "501-1,000 attendees",
    "1,001-5,000 attendees",
    "5,001-10,000 attendees",
    "10,000+ attendees",
  ];

  const timelines = [
    "Immediately",
    "Within 2 weeks",
    "Within 1 month",
    "Within 3 months",
    "Just exploring",
  ];

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";
    if (!formData.contactName.trim())
      newErrors.contactName = "Contact name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.companySize)
      newErrors.companySize = "Company size is required";
    if (!formData.monthlyEvents)
      newErrors.monthlyEvents = "Monthly events estimate is required";
    if (!formData.maxAttendees)
      newErrors.maxAttendees = "Attendee range is required";
    if (!formData.timeline) newErrors.timeline = "Timeline is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enhanced frontend-only submission with localStorage
  const submitLeadToFrontend = async (formData) => {
    const leadData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      plan: initialPlan,
      source: "pricing-page",
      leadId: `lead_${Date.now()}`, // Generate unique ID
    };

    // 1. Log to console (for development)
    console.log("📧 Enterprise Lead Captured:", leadData);

    // 2. Save to localStorage (temporary storage)
    const existingLeads = JSON.parse(
      localStorage.getItem("eventflowEnterpriseLeads") || "[]"
    );
    const updatedLeads = [...existingLeads, leadData];
    localStorage.setItem(
      "eventflowEnterpriseLeads",
      JSON.stringify(updatedLeads)
    );

    // 3. Simulate API delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return { success: true, leadId: leadData.leadId, data: leadData };
  };

  // Helper function to download lead as JSON
  const downloadLeadAsJSON = (leadData) => {
    const dataStr = JSON.stringify(leadData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    // Create actual download
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `eventflow-lead-${leadData.leadId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate email fallback link
  const generateEmailLink = () => {
    const subject = `Enterprise Inquiry - ${formData.companyName}`;
    const body = `Hello Eventflow team,%0D%0A%0D%0AI'm interested in your Enterprise solution. Here are my details:%0D%0A%0D%0ACompany: ${
      formData.companyName
    }%0D%0AContact: ${formData.contactName}%0D%0AEmail: ${
      formData.email
    }%0D%0APhone: ${formData.phone}%0D%0ACompany Size: ${
      formData.companySize
    }%0D%0AMonthly Events: ${formData.monthlyEvents}%0D%0AMax Attendees: ${
      formData.maxAttendees
    }%0D%0ATimeline: ${formData.timeline}%0D%0ABudget: ${
      formData.budget || "Not specified"
    }%0D%0AIntegrations: ${
      formData.integrations || "None"
    }%0D%0A%0D%0ARequirements: ${
      formData.requirements || "None"
    }%0D%0A%0D%0ASpecial Requests: ${formData.specialRequests || "None"}`;

    return `mailto:sales@eventflow.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Use enhanced frontend-only submission
      const response = await submitLeadToFrontend(formData);

      console.log("Enterprise lead submitted successfully:", response);

      // Success handling
      setIsSubmitted(true);

      // Optional: Download as JSON file (for manual processing)
      downloadLeadAsJSON(response.data);
    } catch (error) {
      console.error("Error in form submission:", error);
      setErrors({
        submit:
          "Failed to submit form. Please try again or email us directly at sales@eventflow.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleReset = () => {
    setFormData({
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      companySize: "",
      monthlyEvents: "",
      maxAttendees: "",
      currentPlatform: "",
      timeline: "",
      budget: "",
      requirements: "",
      integrations: "",
      specialRequests: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  // ADD THIS: Function to toggle admin panel
  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
  };

  if (isSubmitted) {
    return (
      <div className="enterprise-contact-form success-state">
        <div className="success-icon">🎉</div>
        <h3>Thank You for Your Interest!</h3>
        <p>
          We've received your enterprise inquiry. Our sales team will contact
          you within 24 hours to discuss your custom Eventflow solution.
        </p>

        {/* Development Notice */}
        {process.env.NODE_ENV === "development" && (
          <div className="development-notice">
            <strong>🛠️ Development Mode:</strong> Lead saved to browser storage.
            Check console for details.
            <button onClick={toggleAdminPanel} className="admin-panel-toggle">
              <Eye className="button-icon" />
              View All Leads
            </button>
          </div>
        )}

        <div className="success-actions">
          <button onClick={handleReset} className="secondary-button">
            Submit Another Inquiry
          </button>
          <a
            href={generateEmailLink()}
            className="primary-button email-fallback-button"
          >
            <Mail className="button-icon" />
            Email Us Directly
          </a>
          <button
            onClick={() =>
              downloadLeadAsJSON({
                ...formData,
                submittedAt: new Date().toISOString(),
                leadId: `lead_${Date.now()}`,
              })
            }
            className="secondary-button download-button"
          >
            <Download className="button-icon" />
            Download Data
          </button>
          <button onClick={onClose} className="secondary-button">
            Close
          </button>
        </div>

        {/* ADD THIS: Admin Panel in Success State */}
        {showAdminPanel && (
          <div className="admin-panel-container">
            <LeadsAdminPanel onClose={() => setShowAdminPanel(false)} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="enterprise-contact-form">
      {/* ADD THIS: Admin Panel Toggle Button (Development Only) */}
      {process.env.NODE_ENV === "development" && (
        <button
          onClick={toggleAdminPanel}
          className="admin-panel-floating-button"
        >
          <Eye size={16} />
          Leads
        </button>
      )}

      <div className="form-header">
        <Building className="header-icon" />
        <h2>Enterprise Solutions Inquiry</h2>
        <p>
          Tell us about your needs and we'll create a custom solution for your
          organization
        </p>
      </div>

      <form onSubmit={handleSubmit} className="enterprise-form">
        {/* Company Information */}
        <div className="form-section">
          <h3>Company Information</h3>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="companyName">
                <Building className="input-icon" />
                Company Name *
              </label>
              <input
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange("companyName", e.target.value)}
                className={errors.companyName ? "error" : ""}
                placeholder="Enter your company name"
              />
              {errors.companyName && (
                <span className="error-message">{errors.companyName}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="contactName">
                <Users className="input-icon" />
                Your Name *
              </label>
              <input
                id="contactName"
                type="text"
                value={formData.contactName}
                onChange={(e) => handleChange("contactName", e.target.value)}
                className={errors.contactName ? "error" : ""}
                placeholder="Enter your full name"
              />
              {errors.contactName && (
                <span className="error-message">{errors.contactName}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="email">
                <Mail className="input-icon" />
                Work Email *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "error" : ""}
                placeholder="your@company.com"
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="phone">
                <Phone className="input-icon" />
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className={errors.phone ? "error" : ""}
                placeholder="+234 XXX XXX XXXX"
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="companySize">
                <Users className="input-icon" />
                Company Size *
              </label>
              <select
                id="companySize"
                value={formData.companySize}
                onChange={(e) => handleChange("companySize", e.target.value)}
                className={errors.companySize ? "error" : ""}
              >
                <option value="">Select company size</option>
                {companySizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              {errors.companySize && (
                <span className="error-message">{errors.companySize}</span>
              )}
            </div>
          </div>
        </div>

        {/* Event Requirements */}
        <div className="form-section">
          <h3>Event Requirements</h3>
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="monthlyEvents">
                <Calendar className="input-icon" />
                Monthly Events *
              </label>
              <select
                id="monthlyEvents"
                value={formData.monthlyEvents}
                onChange={(e) => handleChange("monthlyEvents", e.target.value)}
                className={errors.monthlyEvents ? "error" : ""}
              >
                <option value="">Select monthly event range</option>
                {monthlyEventRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              {errors.monthlyEvents && (
                <span className="error-message">{errors.monthlyEvents}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="maxAttendees">
                <Users className="input-icon" />
                Max Attendees Per Event *
              </label>
              <select
                id="maxAttendees"
                value={formData.maxAttendees}
                onChange={(e) => handleChange("maxAttendees", e.target.value)}
                className={errors.maxAttendees ? "error" : ""}
              >
                <option value="">Select attendee range</option>
                {attendeeRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
              {errors.maxAttendees && (
                <span className="error-message">{errors.maxAttendees}</span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="currentPlatform">Current Event Platform</label>
              <input
                id="currentPlatform"
                type="text"
                value={formData.currentPlatform}
                onChange={(e) =>
                  handleChange("currentPlatform", e.target.value)
                }
                placeholder="e.g., Eventbrite, Meetup, Custom"
              />
            </div>

            <div className="input-group">
              <label htmlFor="timeline">Implementation Timeline *</label>
              <select
                id="timeline"
                value={formData.timeline}
                onChange={(e) => handleChange("timeline", e.target.value)}
                className={errors.timeline ? "error" : ""}
              >
                <option value="">Select timeline</option>
                {timelines.map((timeline) => (
                  <option key={timeline} value={timeline}>
                    {timeline}
                  </option>
                ))}
              </select>
              {errors.timeline && (
                <span className="error-message">{errors.timeline}</span>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h3>Additional Information</h3>

          <div className="input-group">
            <label htmlFor="budget">Estimated Budget</label>
            <input
              id="budget"
              type="text"
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              placeholder="e.g., ₦500,000 - ₦1,000,000 annually"
            />
          </div>

          <div className="input-group">
            <label htmlFor="integrations">Required Integrations</label>
            <input
              id="integrations"
              type="text"
              value={formData.integrations}
              onChange={(e) => handleChange("integrations", e.target.value)}
              placeholder="e.g., CRM, Payment Gateway, Analytics"
            />
          </div>

          <div className="input-group">
            <label htmlFor="requirements">
              <MessageSquare className="input-icon" />
              Specific Requirements
            </label>
            <textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleChange("requirements", e.target.value)}
              placeholder="Tell us about your specific event management needs, security requirements, customization needs..."
              rows="4"
            />
          </div>

          <div className="input-group">
            <label htmlFor="specialRequests">Special Requests</label>
            <textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleChange("specialRequests", e.target.value)}
              placeholder="Any other information that would help us understand your needs..."
              rows="3"
            />
          </div>
        </div>

        {errors.submit && (
          <div className="error-message submit-error">{errors.submit}</div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={onClose}
            className="secondary-button"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="primary-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader className="button-loader" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="button-icon" />
                Submit Inquiry
              </>
            )}
          </button>
        </div>
      </form>

      {/* ADD THIS: Admin Panel */}
      {showAdminPanel && (
        <div className="admin-panel-container">
          <LeadsAdminPanel onClose={() => setShowAdminPanel(false)} />
        </div>
      )}
    </div>
  );
};

export default EnterpriseContactForm;
