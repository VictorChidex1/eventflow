import React, { useState,} from "react";
import {
  Calendar, MapPin, Clock, Users, Image as ImageIcon,
  Tag, Upload, Plus, X, Save, Eye, ChevronRight,
  ChevronLeft, CheckCircle2, AlertCircle, Globe, Ticket,
  Sparkles
} from "lucide-react";
import "./CreateEvent.css";

// --- Constants & Data ---
const STEPS = [
  { number: 1, title: "Event Details", subtitle: "Title, category & description" },
  { number: 2, title: "Date & Time", subtitle: "When is it happening?" },
  { number: 3, title: "Location", subtitle: "Physical or Online" },
  { number: 4, title: "Tickets", subtitle: "Pricing & Quantity" },
  { number: 5, title: "Media", subtitle: "Cover & Gallery" },
];

const CATEGORIES = [
  "Owambe", "Carnival", "Afrobeats", "Business", "Wellness",
  "Food & Drink", "Charity", "Art", "Sports", "Technology",
  "Education", "Religious", "Cultural", "Entertainment",
  "Comedy", "Gaming", "Dating",
];

// --- Sub-Components ---

const FormSection = ({ title, description, children }) => (
  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 fade-in">
    <div className="mb-6 border-b border-gray-100 pb-4">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-500 mt-1">{description}</p>
    </div>
    <div className="space-y-6">{children}</div>
  </div>
);

const InputGroup = ({ label, required, error, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <span className="text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} /> {error}</span>}
  </div>
);

const LivePreview = ({ formData }) => {
  const minPrice = formData.tickets.length > 0 
    ? Math.min(...formData.tickets.map(t => Number(t.price))) 
    : 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 sticky top-8">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
        <Eye size={16} className="text-gray-500" />
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Preview</span>
      </div>
      
      {/* Cover Image */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden group">
        {formData.coverImage ? (
          <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-50">
            <ImageIcon size={32} className="mb-2 opacity-50" />
            <span className="text-sm">Cover Image</span>
          </div>
        )}
        <div className="absolute top-4 left-4">
           <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm">
             {formData.eventCategory || "Category"}
           </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 line-clamp-2">
            {formData.eventTitle || "Untitled Event"}
          </h3>
          <div className="flex items-center text-sm text-gray-500 gap-4">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{formData.startDate || "Date"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{formData.startTime || "Time"}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-dashed border-gray-200">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <MapPin size={16} className="mt-0.5 shrink-0 text-gray-400" />
            <span className="line-clamp-2">
              {formData.eventType === 'online' 
                ? "Online Event" 
                : (formData.venueName || formData.address ? `${formData.venueName}, ${formData.city}` : "Location TBD")}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase font-bold">Starting From</p>
            <p className="text-lg font-bold text-blue-600">
              {minPrice === 0 ? "Free" : `₦${minPrice.toLocaleString()}`}
            </p>
          </div>
          <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-50 cursor-not-allowed">
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventTitle: "",
    eventDescription: "",
    eventCategory: "",
    eventType: "physical",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timezone: "WAT",
    venueName: "",
    address: "",
    city: "",
    state: "",
    onlineLink: "",
    tickets: [{ id: 1, name: "General Admission", price: "0", quantity: "100", description: "" }],
    coverImage: null,
    galleryImages: [],
    isPublic: true,
    allowRegistration: true,
    maxAttendees: "100",
  });

  // --- Handlers ---

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === "cover") {
        setFormData(prev => ({ ...prev, coverImage: url }));
      } else {
        setFormData(prev => ({ ...prev, galleryImages: [...prev.galleryImages, url] }));
      }
    }
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = formData.tickets.map((ticket, i) =>
      i === index ? { ...ticket, [field]: value } : ticket
    );
    setFormData(prev => ({ ...prev, tickets: updatedTickets }));
  };

  const addTicket = () => {
    setFormData(prev => ({
      ...prev,
      tickets: [...prev.tickets, { id: Date.now(), name: "", price: "0", quantity: "100", description: "" }]
    }));
  };

  const removeTicket = (index) => {
    if (formData.tickets.length > 1) {
      setFormData(prev => ({
        ...prev,
        tickets: prev.tickets.filter((_, i) => i !== index)
      }));
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 400, behavior: 'smooth' });

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
    scrollToTop();
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    scrollToTop();
  };

  // --- Step Renders ---

  const renderStep1 = () => (
    <FormSection title="Event Basics" description="Let's start with the core details of your event.">
      <InputGroup label="Event Title" required>
        <input
          type="text"
          name="eventTitle"
          value={formData.eventTitle}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="e.g., Tech Summit Lagos 2025"
        />
      </InputGroup>

      <div className="grid md:grid-cols-2 gap-6">
        <InputGroup label="Category" required>
          <select
            name="eventCategory"
            value={formData.eventCategory}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">Select Category</option>
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </InputGroup>
        
        <InputGroup label="Event Type" required>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {['physical', 'online', 'hybrid'].map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, eventType: type }))}
                className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${
                  formData.eventType === type ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </InputGroup>
      </div>

      <InputGroup label="Description" required>
        <textarea
          name="eventDescription"
          value={formData.eventDescription}
          onChange={handleInputChange}
          rows={6}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tell people what makes your event special..."
        />
      </InputGroup>
    </FormSection>
  );

  const renderStep2 = () => (
    <FormSection title="Date & Time" description="When should guests mark their calendars?">
      <div className="grid md:grid-cols-2 gap-6">
        <InputGroup label="Start Date" required>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </InputGroup>
        <InputGroup label="Start Time" required>
          <div className="relative">
            <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </InputGroup>
        <InputGroup label="End Date" required>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </InputGroup>
        <InputGroup label="End Time" required>
          <div className="relative">
            <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </InputGroup>
      </div>
      <InputGroup label="Timezone">
        <select
          name="timezone"
          value={formData.timezone}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="WAT">West Africa Time (WAT)</option>
          <option value="GMT">Greenwich Mean Time (GMT)</option>
        </select>
      </InputGroup>
    </FormSection>
  );

  const renderStep3 = () => (
    <FormSection title="Location" description="Where is the magic happening?">
      {formData.eventType === 'online' ? (
         <InputGroup label="Online Event Link" required>
            <div className="relative">
              <Globe className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="url"
                name="onlineLink"
                value={formData.onlineLink}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="https://zoom.us/j/..."
              />
            </div>
         </InputGroup>
      ) : (
        <div className="space-y-6">
          <InputGroup label="Venue Name" required>
            <input
              type="text"
              name="venueName"
              value={formData.venueName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Eko Hotel & Suites"
            />
          </InputGroup>
          <InputGroup label="Address" required>
             <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Street address"
              />
             </div>
          </InputGroup>
          <div className="grid md:grid-cols-2 gap-6">
             <InputGroup label="City" required>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
             </InputGroup>
             <InputGroup label="State" required>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
             </InputGroup>
          </div>
        </div>
      )}
    </FormSection>
  );

  const renderStep4 = () => (
    <FormSection title="Tickets" description="Create your ticket types and pricing.">
      <div className="space-y-4">
        {formData.tickets.map((ticket, index) => (
          <div key={ticket.id} className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative group transition-all hover:border-blue-300">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                  <Ticket size={18} />
                </div>
                <h4 className="font-bold text-gray-700">Ticket #{index + 1}</h4>
              </div>
              {formData.tickets.length > 1 && (
                <button onClick={() => removeTicket(index)} className="text-gray-400 hover:text-red-500 transition-colors">
                  <X size={20} />
                </button>
              )}
            </div>
            
            <div className="grid md:grid-cols-12 gap-4">
               <div className="md:col-span-5">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Name</label>
                  <input
                    type="text"
                    value={ticket.name}
                    onChange={(e) => handleTicketChange(index, "name", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
                    placeholder="e.g. General Admission"
                  />
               </div>
               <div className="md:col-span-3">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Price (₦)</label>
                  <input
                    type="number"
                    value={ticket.price}
                    onChange={(e) => handleTicketChange(index, "price", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
                    placeholder="0"
                  />
               </div>
               <div className="md:col-span-4">
                  <label className="text-xs font-semibold text-gray-500 uppercase mb-1 block">Quantity</label>
                  <input
                    type="number"
                    value={ticket.quantity}
                    onChange={(e) => handleTicketChange(index, "quantity", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 outline-none"
                    placeholder="100"
                  />
               </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={addTicket}
        className="mt-4 w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center justify-center gap-2 font-medium"
      >
        <Plus size={20} />
        Add Another Ticket Type
      </button>
    </FormSection>
  );

  const renderStep5 = () => (
    <FormSection title="Media" description="Visuals make your event stand out.">
       <InputGroup label="Cover Image" required>
          <label className="block w-full cursor-pointer group">
             <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${formData.coverImage ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}>
                {formData.coverImage ? (
                   <div className="relative">
                      <img src={formData.coverImage} alt="Preview" className="max-h-64 mx-auto rounded-lg shadow-sm" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white font-medium">
                         Click to Change
                      </div>
                   </div>
                ) : (
                   <div className="space-y-2">
                      <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-blue-600">
                         <Upload size={24} />
                      </div>
                      <p className="font-medium text-gray-700">Click to upload cover image</p>
                      <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max. 2MB)</p>
                   </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "cover")} className="hidden" />
             </div>
          </label>
       </InputGroup>

       <InputGroup label="Gallery (Optional)">
         <div className="grid grid-cols-4 gap-4 mt-2">
            {formData.galleryImages.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setFormData(prev => ({ ...prev, galleryImages: prev.galleryImages.filter((_, i) => i !== idx) }))}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
            {formData.galleryImages.length < 5 && (
              <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                 <Plus size={24} className="text-gray-400" />
                 <span className="text-xs text-gray-500 mt-1">Add Photo</span>
                 <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "gallery")} className="hidden" />
              </label>
            )}
         </div>
       </InputGroup>
    </FormSection>
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
    {/* --- NEW HERO SECTION (ALL GRAY) --- */}
     <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-gray-900 py-20 relative overflow-hidden">
        {/* 1. Background Texture (Subtle Grid) */}
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)" />
        </svg>

        {/* 2. Subtle Gradient Glow (Top Center) - Adjusted to be dark */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.slate.800),theme(colors.slate.900))] opacity-50" />
        
        {/* 3. Aurora Blob (Right Side) - Kept for premium feel */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 blur-3xl opacity-30 pointer-events-none">
            <div className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]" 
                 style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} 
            />
        </div>
        
         <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-slate-800/50 backdrop-blur-md border border-slate-700 text-indigo-200 px-4 py-1.5 rounded-full text-sm font-medium mb-6 shadow-lg">
               <Sparkles size={16} className="text-yellow-400" />
               <span className="tracking-wide">Host Your Experience</span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
               Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Event</span>
            </h1>
            
            <p className="text-xl text-white max-w-2xl mx-auto leading-relaxed">
  Bring your vision to life. Fill in the details below to start selling tickets and managing attendees in minutes.
</p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-12 gap-8 -mt-8 relative z-20">
        {/* Left Sidebar - Navigation */}
        <div className="lg:col-span-3 hidden lg:block">
           <div className="sticky top-8 space-y-2 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">Progress</h3>
             {STEPS.map((step) => (
               <div 
                 key={step.number}
                 className={`flex items-center p-3 rounded-xl transition-all ${
                   currentStep === step.number ? 'bg-blue-50 border border-blue-100 shadow-sm' : 'hover:bg-gray-50 border border-transparent'
                 }`}
               >
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 transition-colors ${
                    currentStep === step.number ? 'bg-blue-600 text-white' : 
                    currentStep > step.number ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'
                 }`}>
                    {currentStep > step.number ? <CheckCircle2 size={16} /> : step.number}
                 </div>
                 <div>
                   <p className={`text-sm font-bold ${currentStep === step.number ? 'text-gray-900' : 'text-gray-500'}`}>{step.title}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>

        {/* Center - Form */}
        <div className="lg:col-span-6">
          <form onSubmit={(e) => e.preventDefault()}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                   currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <ChevronLeft size={20} /> Back
              </button>

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all transform active:scale-95"
                >
                  Next Step <ChevronRight size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-green-600/20 flex items-center gap-2 transition-all transform active:scale-95"
                  onClick={() => alert("Event Created! (Check Console)")}
                >
                  <Save size={20} /> Publish Event
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right - Preview */}
        <div className="lg:col-span-3 hidden lg:block">
           <LivePreview formData={formData} />
           
           <div className="mt-6 bg-indigo-50 p-5 rounded-2xl border border-indigo-100">
              <div className="flex items-start gap-3">
                 <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 mt-1">
                    <Users size={16} />
                 </div>
                 <div>
                    <h4 className="text-sm font-bold text-indigo-900">Pro Tip</h4>
                    <p className="text-xs text-indigo-700 mt-1 leading-relaxed">
                       Events with cover images get <strong>2x more engagement</strong>. Add a high-quality image to stand out!
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;