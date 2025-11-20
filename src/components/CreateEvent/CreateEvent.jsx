import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  DollarSign,
  Image,
  Tag,
  Video,
  Upload,
  Plus,
  X,
  Save,
  Eye,
} from "lucide-react";
import "./CreateEvent.css";

const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    eventTitle: "",
    eventDescription: "",
    eventCategory: "",
    eventType: "physical",

    // Date & Time
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timezone: "WAT",

    // Location
    venueName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    onlineLink: "",

    // Tickets
    tickets: [
      {
        id: 1,
        name: "General Admission",
        price: "0",
        quantity: "100",
        description: "Standard entry ticket",
      },
    ],

    // Media
    coverImage: null,
    galleryImages: [],

    // Settings
    isPublic: true,
    allowRegistration: true,
    maxAttendees: "100",
  });

  const eventCategories = [
    "Owambe",
    "Carnival",
    "Afrobeats",
    "Business",
    "Wellness",
    "Food & Drink",
    "Charity",
    "Art",
    "Sports",
    "Technology",
    "Education",
    "Religious",
    "Cultural",
    "Entertainment",
     "Comedy",
  "Gaming",
  "Dating",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = formData.tickets.map((ticket, i) =>
      i === index ? { ...ticket, [field]: value } : ticket
    );
    setFormData((prev) => ({ ...prev, tickets: updatedTickets }));
  };

  const addTicket = () => {
    const newTicket = {
      id: formData.tickets.length + 1,
      name: "",
      price: "0",
      quantity: "100",
      description: "",
    };
    setFormData((prev) => ({
      ...prev,
      tickets: [...prev.tickets, newTicket],
    }));
  };

  const removeTicket = (index) => {
    if (formData.tickets.length > 1) {
      const updatedTickets = formData.tickets.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, tickets: updatedTickets }));
    }
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "cover") {
        setFormData((prev) => ({
          ...prev,
          coverImage: URL.createObjectURL(file),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          galleryImages: [...prev.galleryImages, URL.createObjectURL(file)],
        }));
      }
    }
  };

  const removeGalleryImage = (index) => {
    const updatedImages = formData.galleryImages.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, galleryImages: updatedImages }));
  };

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Event created:", formData);
    alert("Event created successfully!");
  };

  const steps = [
    { number: 1, title: "Basic Info", icon: <Calendar className="w-4 h-4" /> },
    { number: 2, title: "Date & Time", icon: <Clock className="w-4 h-4" /> },
    { number: 3, title: "Location", icon: <MapPin className="w-4 h-4" /> },
    {
      number: 4,
      title: "Tickets",
      icon: (
        <span className="w-4 h-4 flex items-center justify-center font-bold">
          ₦
        </span>
      ),
    },
    { number: 5, title: "Media", icon: <Image className="w-4 h-4" /> },
  ];

  return (
    <section className="create-event-container">
      {/* Header Section */}
      <div className="create-event-header">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Calendar className="w-12 h-12 text-white" />
          </div>
          <h1 className="create-event-title">Create Your Event</h1>
          <p className="create-event-subtitle">
            Fill in the details below to create an amazing event that stands out
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="progress-steps-container">
          <div className="progress-steps">
            {steps.map((step, index) => (
              <div key={step.number} className="step-item">
                <div
                  className={`step-number ${
                    currentStep > step.number
                      ? "completed"
                      : currentStep === step.number
                      ? "active"
                      : ""
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`step-title ${
                    currentStep >= step.number ? "active" : ""
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`step-connector ${
                      currentStep > step.number ? "completed" : ""
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="create-event-content">
          <form onSubmit={handleSubmit} className="event-form">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="form-step">
                <h2 className="step-title">Basic Information</h2>
                <p className="step-description">Tell us about your event</p>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <Calendar className="w-4 h-4" />
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="eventTitle"
                      value={formData.eventTitle}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                      placeholder="Enter event title"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Tag className="w-4 h-4" />
                      Category *
                    </label>
                    <select
                      name="eventCategory"
                      value={formData.eventCategory}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    >
                      <option value="">Select a category</option>
                      {eventCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group col-span-2">
                    <label className="form-label">Event Description *</label>
                    <textarea
                      name="eventDescription"
                      value={formData.eventDescription}
                      onChange={handleInputChange}
                      required
                      rows="6"
                      className="form-textarea"
                      placeholder="Describe your event in detail..."
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Event Type *</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="eventType"
                          value="physical"
                          checked={formData.eventType === "physical"}
                          onChange={handleInputChange}
                        />
                        <span>Physical Event</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="eventType"
                          value="online"
                          checked={formData.eventType === "online"}
                          onChange={handleInputChange}
                        />
                        <span>Online Event</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="eventType"
                          value="hybrid"
                          checked={formData.eventType === "hybrid"}
                          onChange={handleInputChange}
                        />
                        <span>Hybrid Event</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {currentStep === 2 && (
              <div className="form-step">
                <h2 className="step-title">Date & Time</h2>
                <p className="step-description">
                  When is your event happening?
                </p>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Start Date *</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">End Date *</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Start Time *</label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">End Time *</label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Timezone</label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleInputChange}
                      className="form-input"
                    >
                      <option value="WAT">West Africa Time (WAT)</option>
                      <option value="GMT">Greenwich Mean Time (GMT)</option>
                      <option value="EST">Eastern Standard Time (EST)</option>
                      <option value="PST">Pacific Standard Time (PST)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="form-step">
                <h2 className="step-title">Location</h2>
                <p className="step-description">
                  Where is your event taking place?
                </p>

                {formData.eventType !== "online" && (
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Venue Name *</label>
                      <input
                        type="text"
                        name="venueName"
                        value={formData.venueName}
                        onChange={handleInputChange}
                        required={formData.eventType !== "online"}
                        className="form-input"
                        placeholder="Enter venue name"
                      />
                    </div>

                    <div className="form-group col-span-2">
                      <label className="form-label">Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required={formData.eventType !== "online"}
                        className="form-input"
                        placeholder="Enter full address"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required={formData.eventType !== "online"}
                        className="form-input"
                        placeholder="Enter city"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required={formData.eventType !== "online"}
                        className="form-input"
                        placeholder="Enter state"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="Enter ZIP code"
                      />
                    </div>
                  </div>
                )}

                {formData.eventType !== "physical" && (
                  <div className="form-group">
                    <label className="form-label">Online Event Link</label>
                    <input
                      type="url"
                      name="onlineLink"
                      value={formData.onlineLink}
                      onChange={handleInputChange}
                      required={formData.eventType === "online"}
                      className="form-input"
                      placeholder="https://meet.google.com/your-event"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Tickets */}
            {currentStep === 4 && (
              <div className="form-step">
                <h2 className="step-title">Tickets & Pricing</h2>
                <p className="step-description">
                  Set up your ticket types and pricing
                </p>

                <div className="tickets-section">
                  {formData.tickets.map((ticket, index) => (
                    <div key={ticket.id} className="ticket-card">
                      <div className="ticket-header">
                        <h4>Ticket Type {index + 1}</h4>
                        {formData.tickets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTicket(index)}
                            className="remove-ticket-btn"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="ticket-form-grid">
                        <div className="form-group">
                          <label className="form-label">Ticket Name *</label>
                          <input
                            type="text"
                            value={ticket.name}
                            onChange={(e) =>
                              handleTicketChange(index, "name", e.target.value)
                            }
                            required
                            className="form-input"
                            placeholder="General Admission"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Price (#) *</label>
                          <input
                            type="number"
                            value={ticket.price}
                            onChange={(e) =>
                              handleTicketChange(index, "price", e.target.value)
                            }
                            required
                            min="0"
                            step="0.01"
                            className="form-input"
                            placeholder="0.00"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Quantity *</label>
                          <input
                            type="number"
                            value={ticket.quantity}
                            onChange={(e) =>
                              handleTicketChange(
                                index,
                                "quantity",
                                e.target.value
                              )
                            }
                            required
                            min="1"
                            className="form-input"
                            placeholder="100"
                          />
                        </div>

                        <div className="form-group col-span-2">
                          <label className="form-label">Description</label>
                          <input
                            type="text"
                            value={ticket.description}
                            onChange={(e) =>
                              handleTicketChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            className="form-input"
                            placeholder="Describe this ticket type"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addTicket}
                    className="add-ticket-btn"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Ticket Type
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Media */}
            {currentStep === 5 && (
              <div className="form-step">
                <h2 className="step-title">Media & Settings</h2>
                <p className="step-description">
                  Add images and configure event settings
                </p>

                <div className="form-grid">
                  <div className="form-group col-span-2">
                    <label className="form-label">Cover Image *</label>
                    <div className="image-upload-container">
                      {formData.coverImage ? (
                        <div className="image-preview">
                          <img src={formData.coverImage} alt="Cover preview" />
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                coverImage: null,
                              }))
                            }
                            className="remove-image-btn"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="upload-area">
                          <Upload className="w-8 h-8 text-gray-400" />
                          <span>Click to upload cover image</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, "cover")}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="form-group col-span-2">
                    <label className="form-label">Gallery Images</label>
                    <div className="gallery-upload">
                      <div className="gallery-grid">
                        {formData.galleryImages.map((image, index) => (
                          <div key={index} className="gallery-image">
                            <img src={image} alt={`Gallery ${index + 1}`} />
                            <button
                              type="button"
                              onClick={() => removeGalleryImage(index)}
                              className="remove-gallery-image"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                        {formData.galleryImages.length < 5 && (
                          <label className="gallery-upload-btn">
                            <Plus className="w-6 h-6" />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, "gallery")}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="isPublic"
                        checked={formData.isPublic}
                        onChange={handleInputChange}
                      />
                      <span>Make event public</span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="allowRegistration"
                        checked={formData.allowRegistration}
                        onChange={handleInputChange}
                      />
                      <span>Allow registration</span>
                    </label>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Users className="w-4 h-4" />
                      Maximum Attendees
                    </label>
                    <input
                      type="number"
                      name="maxAttendees"
                      value={formData.maxAttendees}
                      onChange={handleInputChange}
                      className="form-input"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="form-navigation">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="nav-button secondary"
                >
                  Previous
                </button>
              )}

              <div className="navigation-right">
                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="nav-button primary"
                  >
                    Next Step
                  </button>
                ) : (
                  <button type="submit" className="nav-button success">
                    <Save className="w-4 h-4" />
                    Create Event
                  </button>
                )}
              </div>
            </div>
          </form>

          {/* Event Preview Sidebar */}
          <div className="event-preview">
            <h3 className="preview-title">
              <Eye className="w-4 h-4" />
              Event Preview
            </h3>
            <div className="preview-content">
              <div className="preview-card">
                {formData.coverImage && (
                  <img
                    src={formData.coverImage}
                    alt="Event cover"
                    className="preview-cover"
                  />
                )}
                <div className="preview-details">
                  <h4 className="preview-event-title">
                    {formData.eventTitle || "Your Event Title"}
                  </h4>
                  <p className="preview-event-description">
                    {formData.eventDescription ||
                      "Event description will appear here..."}
                  </p>

                  <div className="preview-meta">
                    {formData.startDate && (
                      <div className="preview-meta-item">
                        <Calendar className="w-4 h-4" />
                        <span>{formData.startDate}</span>
                      </div>
                    )}

                    {formData.venueName && (
                      <div className="preview-meta-item">
                        <MapPin className="w-4 h-4" />
                        <span>{formData.venueName}</span>
                      </div>
                    )}

                    {formData.tickets.length > 0 && (
                      <div className="preview-meta-item">
                        <span className="text-gray-600 font-bold">₦</span>
                        <span>
                          {formData.tickets[0].price === "0"
                            ? "Free"
                            : `From ₦${formData.tickets[0].price}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEvent;
