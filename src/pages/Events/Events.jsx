import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Search,
  Filter,
  Calendar,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  MapPin,
  Wallet,
  Users,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Tag,
  Clock,
} from "lucide-react";
import { events, categories } from "../../data/events";
import EventCard from "../../components/Events/EventCard";
import EventDetail from "../../components/Events/EventDetail";
import "./Events.css";

const Events = () => {
  // State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState(["All"]);
  const [selectedLocations, setSelectedLocations] = useState(["All"]);
  const [selectedDateRanges, setSelectedDateRanges] = useState(["All"]);
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Dropdown states
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const eventsPerPage = 9;

  // Refs
  const categoriesRef = useRef(null);
  const priceRef = useRef(null);
  const locationRef = useRef(null);
  const dateRef = useRef(null);
  const sortRef = useRef(null);
  const mobileFiltersRef = useRef(null);
  const mobileSearchInputRef = useRef(null);
  const containerRef = useRef(null);

  // Filter options
  const priceRanges = [
    { id: "All", label: "All Prices", min: null, max: null },
    { id: "free", label: "Free", min: 0, max: 0 },
    { id: "budget", label: "₦1K - ₦5K", min: 1000, max: 5000 },
    { id: "medium", label: "₦5K - ₦20K", min: 5000, max: 20000 },
    { id: "premium", label: "₦20K - ₦50K", min: 20000, max: 50000 },
    { id: "vip", label: "₦50K+", min: 50000, max: null },
  ];

  const locations = [
    { id: "All", label: "All Locations" },
    { id: "lagos", label: "Lagos" },
    { id: "abuja", label: "Abuja" },
    { id: "port-harcourt", label: "Port Harcourt" },
    { id: "ibadan", label: "Ibadan" },
    { id: "online", label: "Online" },
    { id: "others", label: "Other Cities" },
  ];

  const dateRanges = [
    { id: "All", label: "Any Date" },
    { id: "today", label: "Today" },
    { id: "tomorrow", label: "Tomorrow" },
    { id: "weekend", label: "This Weekend" },
    { id: "next-week", label: "Next 7 Days" },
    { id: "this-month", label: "This Month" },
  ];

  const safeEvents = events || [];
  const safeCategories = categories || ["All"];

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  // Click outside handler for desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setShowCategoriesDropdown(false);
      }
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setShowPriceDropdown(false);
      }
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setShowDateDropdown(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Mobile filters click-outside handler
  useEffect(() => {
    if (!isMobileFiltersOpen) return;

    const handler = (event) => {
      const target = event.target;

      if (
        mobileFiltersRef.current &&
        mobileFiltersRef.current.contains(target)
      ) {
        return;
      }

      if (target.closest(".mobile-filters-trigger")) {
        return;
      }

      setIsMobileFiltersOpen(false);
    };

    document.addEventListener("mousedown", handler, true);
    document.addEventListener("touchstart", handler, true);

    return () => {
      document.removeEventListener("mousedown", handler, true);
      document.removeEventListener("touchstart", handler, true);
    };
  }, [isMobileFiltersOpen]);

  // Utility toggles
  const toggleOnly = (setter, id) => {
    if (id === "All") return setter(["All"]);
    setter((prev) => {
      const withoutAll = prev.filter((p) => p !== "All");
      if (withoutAll.includes(id)) return withoutAll.filter((p) => p !== id);
      return [...withoutAll, id];
    });
  };

  const handleCategoryToggle = (id) => toggleOnly(setSelectedCategories, id);
  const handlePriceToggle = (id) => toggleOnly(setSelectedPriceRanges, id);
  const handleLocationToggle = (id) => toggleOnly(setSelectedLocations, id);
  const handleDateToggle = (id) => toggleOnly(setSelectedDateRanges, id);

  const clearAllFilters = () => {
    setSelectedCategories(["All"]);
    setSelectedPriceRanges(["All"]);
    setSelectedLocations(["All"]);
    setSelectedDateRanges(["All"]);
    setSearchTerm("");
    setShowCategoriesDropdown(false);
    setShowPriceDropdown(false);
    setShowLocationDropdown(false);
    setShowDateDropdown(false);
    setShowSortDropdown(false);
  };

  // Mobile filters
  const openMobileFilters = () => {
    setIsMobileFiltersOpen(true);
    setTimeout(
      () =>
        mobileSearchInputRef.current && mobileSearchInputRef.current.focus(),
      100
    );
  };
  const closeMobileFilters = () => setIsMobileFiltersOpen(false);

  // Search handler
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  // Filtering & sorting
  const filteredEvents = useMemo(() => {
    const q = (searchTerm || "").trim().toLowerCase();
    return safeEvents
      .filter((ev) => {
        if (!ev) return false;
        const matchesSearch =
          !q ||
          (ev.title && ev.title.toLowerCase().includes(q)) ||
          (ev.description && ev.description.toLowerCase().includes(q)) ||
          (ev.category && ev.category.toLowerCase().includes(q));

        const matchesCategory =
          selectedCategories.includes("All") ||
          selectedCategories.includes(ev.category);

        const matchesPrice =
          selectedPriceRanges.includes("All") ||
          selectedPriceRanges.some((pr) => {
            const range = priceRanges.find((p) => p.id === pr);
            if (!range) return false;
            if (range.id === "free") return ev.price === 0;
            if (range.min !== null && ev.price < range.min) return false;
            if (range.max !== null && ev.price > range.max) return false;
            return true;
          });

        const matchesLocation =
          selectedLocations.includes("All") ||
          selectedLocations.includes(ev.location);

        const matchesDate =
          selectedDateRanges.includes("All") ||
          selectedDateRanges.includes(ev.dateRange || "All");

        return (
          matchesSearch &&
          matchesCategory &&
          matchesPrice &&
          matchesLocation &&
          matchesDate
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "date":
            return new Date(a.date) - new Date(b.date);
          case "price":
            return (a.price || 0) - (b.price || 0);
          case "name":
            return (a.title || "").localeCompare(b.title || "");
          default:
            return 0;
        }
      });
  }, [
    safeEvents,
    searchTerm,
    selectedCategories,
    selectedPriceRanges,
    selectedLocations,
    selectedDateRanges,
    sortBy,
  ]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEvents.length / eventsPerPage)
  );
  const currentEvents = useMemo(() => {
    const last = currentPage * eventsPerPage;
    const first = last - eventsPerPage;
    return filteredEvents.slice(first, last);
  }, [filteredEvents, currentPage]);

  useEffect(
    () => setCurrentPage(1),
    [
      searchTerm,
      selectedCategories,
      selectedPriceRanges,
      selectedLocations,
      selectedDateRanges,
      sortBy,
    ]
  );

  const activeFiltersCount = useMemo(() => {
    let c = 0;
    if (!selectedCategories.includes("All")) c += selectedCategories.length;
    if (!selectedPriceRanges.includes("All")) c += selectedPriceRanges.length;
    if (!selectedLocations.includes("All")) c += selectedLocations.length;
    if (!selectedDateRanges.includes("All")) c += selectedDateRanges.length;
    if (searchTerm) c += 1;
    return c;
  }, [
    selectedCategories,
    selectedPriceRanges,
    selectedLocations,
    selectedDateRanges,
    searchTerm,
  ]);

  // UI components
  const FilterItem = ({ checked, onClick, label }) => (
    <div
      onClick={onClick}
      className={`flex items-center px-3 py-3 rounded-lg cursor-pointer transition-colors ${
        checked ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
      }`}
    >
      <div
        className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${
          checked ? "bg-blue-600 border-blue-600" : "border-gray-300"
        }`}
      >
        {checked && <Check size={14} className="text-white" />}
      </div>
      <div className="text-sm">{label}</div>
    </div>
  );

  const EventCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
      </div>
      <div className="p-6 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );

  // Pagination helpers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages)
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  // Popular categories
  const popularCategories = safeCategories
    .filter((c) => c !== "All")
    .slice(0, 6);

  return (
    <section
      id="events"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30"
    >
      {/* Header - UPDATED to "Midnight Professional" Theme */}
      <div className="relative bg-slate-900 pt-20 pb-32 lg:pt-24 lg:pb-40 overflow-hidden">
        {/* Decorative Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-blue-100 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
               <span>Live Events Happening Now</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Trending Events</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed px-4 max-w-2xl mx-auto">
              Find your next unforgettable experience. From intimate workshops to massive music festivals, it's all happening on EventFlow.
            </p>
            
            {/* Stats Row */}
            <div className="flex justify-center items-center gap-8 lg:gap-12 pt-4 border-t border-white/10 max-w-lg mx-auto">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  {safeEvents.length}+
                </div>
                <div className="text-slate-400 text-xs lg:text-sm font-medium uppercase tracking-wide">
                  Events
                </div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  {Math.max(0, safeCategories.length - 1)}
                </div>
                <div className="text-slate-400 text-xs lg:text-sm font-medium uppercase tracking-wide">
                  Categories
                </div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  {safeEvents.filter((e) => e.price === 0).length}
                </div>
                <div className="text-slate-400 text-xs lg:text-sm font-medium uppercase tracking-wide">
                  Free Entry
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- NEW STICKY GLASS FILTER BAR --- */}
      <div className="sticky top-0 z-40 glass-panel shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* 1. Compact Search Input */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search events..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all text-sm"
              />
            </div>

            {/* 2. Horizontal Filter Pills (Scrollable) */}
            <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto scrollbar-hide pb-1 lg:pb-0">
              
              {/* Mobile Trigger (Visible only on mobile) */}
              <button
                onClick={openMobileFilters}
                className="lg:hidden flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap"
              >
                <SlidersHorizontal size={16} />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-1">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Desktop Dropdowns (Converted to Pills) */}
              <div className="hidden lg:flex items-center gap-2">
                {/* Categories Pill */}
                <div className="relative" ref={categoriesRef}>
                  <button
                    onClick={() => setShowCategoriesDropdown(!showCategoriesDropdown)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      selectedCategories.includes("All") 
                        ? "bg-white border-gray-200 text-gray-700 hover:border-gray-300" 
                        : "bg-blue-50 border-blue-200 text-blue-700"
                    }`}
                  >
                    <span>Category</span>
                    <ChevronDown size={14} />
                  </button>
                  {showCategoriesDropdown && (
                    <div className="absolute top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <div className="max-h-64 overflow-y-auto">
                        {[{ id: "All", label: "All Categories" }, ...safeCategories.map(c => ({ id: c, label: c }))].map(opt => (
                          <FilterItem key={opt.id} checked={selectedCategories.includes(opt.id)} onClick={() => handleCategoryToggle(opt.id)} label={opt.label} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Price Pill */}
                <div className="relative" ref={priceRef}>
                  <button
                    onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      selectedPriceRanges.includes("All") 
                        ? "bg-white border-gray-200 text-gray-700 hover:border-gray-300" 
                        : "bg-blue-50 border-blue-200 text-blue-700"
                    }`}
                  >
                    <span>Price</span>
                    <ChevronDown size={14} />
                  </button>
                  {showPriceDropdown && (
                    <div className="absolute top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50">
                      {priceRanges.map(opt => (
                        <FilterItem key={opt.id} checked={selectedPriceRanges.includes(opt.id)} onClick={() => handlePriceToggle(opt.id)} label={opt.label} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Pill */}
                <div className="relative" ref={locationRef}>
                  <button
                    onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      selectedLocations.includes("All") 
                        ? "bg-white border-gray-200 text-gray-700 hover:border-gray-300" 
                        : "bg-blue-50 border-blue-200 text-blue-700"
                    }`}
                  >
                    <span>Location</span>
                    <ChevronDown size={14} />
                  </button>
                  {showLocationDropdown && (
                    <div className="absolute top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50">
                      {locations.map(opt => (
                        <FilterItem key={opt.id} checked={selectedLocations.includes(opt.id)} onClick={() => handleLocationToggle(opt.id)} label={opt.label} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Date Pill */}
                <div className="relative" ref={dateRef}>
                  <button
                    onClick={() => setShowDateDropdown(!showDateDropdown)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      selectedDateRanges.includes("All") 
                        ? "bg-white border-gray-200 text-gray-700 hover:border-gray-300" 
                        : "bg-blue-50 border-blue-200 text-blue-700"
                    }`}
                  >
                    <span>Date</span>
                    <ChevronDown size={14} />
                  </button>
                  {showDateDropdown && (
                    <div className="absolute top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50">
                      {dateRanges.map(opt => (
                        <FilterItem key={opt.id} checked={selectedDateRanges.includes(opt.id)} onClick={() => handleDateToggle(opt.id)} label={opt.label} />
                      ))}
                    </div>
                  )}
                </div>
              
                <div className="w-px h-6 bg-gray-300 mx-2"></div>

                {/* Sort Dropdown (Text only) */}
                <div className="relative" ref={sortRef}>
                   <button 
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
                   >
                      <TrendingUp size={16} />
                      <span className="capitalize">{sortBy}</span>
                      <ChevronDown size={12} />
                   </button>
                   {showSortDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50">
                      {["date", "price", "name"].map((option) => (
                        <div
                          key={option}
                          onClick={() => { setSortBy(option); setShowSortDropdown(false); }}
                          className={`px-3 py-2 rounded-lg cursor-pointer text-sm capitalize transition-colors ${
                            sortBy === option ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div
        className="container mx-auto px-4 lg:-mt-8 relative z-10"
        ref={containerRef}
      >


        {/* Desktop: Top Card Filters */}
        <div className="hidden lg:block mb-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            {/* Search Row */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Search Events
              </label>
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search by event name, description, or category..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                />
              </div>
            </div>

            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              {/* Categories */}
              <div className="relative" ref={categoriesRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categories
                </label>
                <button
                  onClick={() =>
                    setShowCategoriesDropdown(!showCategoriesDropdown)
                  }
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Tag size={18} className="text-gray-500" />
                    <span className="text-gray-700">
                      {selectedCategories.includes("All")
                        ? "All Categories"
                        : `${selectedCategories.length} selected`}
                    </span>
                  </div>
                  <ChevronDown size={18} className="text-gray-500" />
                </button>
                {showCategoriesDropdown && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
                    <div className="p-2">
                      {[
                        { id: "All", label: "All Categories" },
                        ...safeCategories
                          .filter((c) => c !== "All")
                          .map((c) => ({ id: c, label: c })),
                      ].map((opt) => (
                        <FilterItem
                          key={opt.id}
                          checked={selectedCategories.includes(opt.id)}
                          onClick={() => handleCategoryToggle(opt.id)}
                          label={opt.label}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="relative" ref={priceRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price
                </label>
                <button
                  onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Wallet size={18} className="text-gray-500" />
                    <span className="text-gray-700">
                      {selectedPriceRanges.includes("All")
                        ? "All Price"
                        : `${selectedPriceRanges.length} selected`}
                    </span>
                  </div>
                  <ChevronDown size={18} className="text-gray-500" />
                </button>
                {showPriceDropdown && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
                    <div className="p-2">
                      {priceRanges.map((opt) => (
                        <FilterItem
                          key={opt.id}
                          checked={selectedPriceRanges.includes(opt.id)}
                          onClick={() => handlePriceToggle(opt.id)}
                          label={opt.label}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="relative" ref={locationRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <button
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <MapPin size={18} className="text-gray-500" />
                    <span className="text-gray-700">
                      {selectedLocations.includes("All")
                        ? "All Location"
                        : `${selectedLocations.length} selected`}
                    </span>
                  </div>
                  <ChevronDown size={18} className="text-gray-500" />
                </button>
                {showLocationDropdown && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
                    <div className="p-2">
                      {locations.map((opt) => (
                        <FilterItem
                          key={opt.id}
                          checked={selectedLocations.includes(opt.id)}
                          onClick={() => handleLocationToggle(opt.id)}
                          label={opt.label}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Date */}
              <div className="relative" ref={dateRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <button
                  onClick={() => setShowDateDropdown(!showDateDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <Calendar size={18} className="text-gray-500" />
                    <span className="text-gray-700">
                      {selectedDateRanges.includes("All")
                        ? "All Date"
                        : `${selectedDateRanges.length} selected`}
                    </span>
                  </div>
                  <ChevronDown size={18} className="text-gray-500" />
                </button>
                {showDateDropdown && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto">
                    <div className="p-2">
                      {dateRanges.map((opt) => (
                        <FilterItem
                          key={opt.id}
                          checked={selectedDateRanges.includes(opt.id)}
                          onClick={() => handleDateToggle(opt.id)}
                          label={opt.label}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sort By Row */}
            <div className="flex items-end justify-between">
              <div className="flex-1 max-w-xs relative" ref={sortRef}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-xl hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <TrendingUp size={18} className="text-gray-500" />
                    <span className="text-gray-700 capitalize">{sortBy}</span>
                  </div>
                  <ChevronDown size={18} className="text-gray-500" />
                </button>
                {showSortDropdown && (
                  <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-2xl">
                    <div className="p-2">
                      {["date", "price", "name"].map((option) => (
                        <div
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setShowSortDropdown(false);
                          }}
                          className={`px-4 py-3 rounded-lg cursor-pointer transition-colors capitalize ${
                            sortBy === option
                              ? "bg-blue-50 text-blue-700"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-medium hover:bg-red-100 transition-colors border border-red-200"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Popular Categories */}
            {popularCategories.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Popular Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategories([cat]);
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors text-sm font-medium"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-12">
          {/* Active filters bar */}
          {activeFiltersCount > 0 && (
            <div className="hidden lg:flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Filter size={16} className="text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  {activeFiltersCount} active filter
                  {activeFiltersCount !== 1 ? "s" : ""}
                </span>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center"
              >
                <X size={16} className="mr-1" /> Clear all
              </button>
            </div>
          )}

          {/* Header + summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {filteredEvents.length === 0
                  ? "No Events Found"
                  : selectedCategories.includes("All")
                  ? "All Events"
                  : selectedCategories.length === 1
                  ? `${selectedCategories[0]} Events`
                  : `${selectedCategories.length} Categories`}
              </h2>
              <p className="text-gray-600 mt-2 text-sm lg:text-base">
                Page {currentPage}/{totalPages} • {currentEvents.length} events
                • {filteredEvents.length} total
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            {filteredEvents.length > 0 && (
              <div className="mt-4 sm:mt-0 bg-blue-50 text-blue-700 px-3 lg:px-4 py-2 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Filter size={14} />
                  <span className="text-xs lg:text-sm font-medium">
                    {filteredEvents.length} events match your criteria
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {Array.from({ length: eventsPerPage }).map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : currentEvents.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                {currentEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => setSelectedEvent(ev)}
                    className="group cursor-pointer transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
                  >
                    <EventCard event={ev} />
                  </div>
                ))}
              </div>

              {/* Single Pagination Component - Works for both desktop and mobile */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-1 lg:space-x-2 mb-12">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center px-3 lg:px-4 py-2 rounded-lg border transition-all duration-200 text-sm lg:text-base ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    <ChevronLeft size={16} className="mr-1" /> Previous
                  </button>

                  {getPageNumbers().map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 lg:px-4 py-2 rounded-lg border transition-all duration-200 text-sm lg:text-base ${
                        currentPage === pageNumber
                          ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-3 lg:px-4 py-2 rounded-lg border transition-all duration-200 text-sm lg:text-base ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    Next <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 lg:py-16 bg-white rounded-2xl shadow-sm border border-gray-100 mb-12">
              <div className="text-gray-300 mb-6">
                <Filter size={60} className="lg:size-80 mx-auto" />
              </div>
              <h3 className="text-xl lg:text-2xl font-semibold text-gray-600 mb-3">
                No events found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm lg:text-base">
                We couldn't find any events matching your search criteria. Try
                adjusting your filters or search terms.
              </p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-sm lg:text-base"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Mobile: Filters Modal */}
        {isMobileFiltersOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center">
            <div
              ref={mobileFiltersRef}
              className="bg-white w-full max-h-[80vh] rounded-t-3xl overflow-y-auto animate-slide-up"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                  <button
                    onClick={closeMobileFilters}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Mobile Search */}
                  <div>
                    <details open className="group">
                      <summary className="flex items-center justify-between px-3 py-3 bg-white border border-gray-200 rounded-md cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <Search size={18} className="text-gray-500" />
                          <div className="text-sm font-semibold text-gray-700">
                            Search
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {searchTerm ? `for "${searchTerm}"` : ""}
                        </div>
                      </summary>
                      <div className="mt-3">
                        <div className="relative">
                          <Search
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                          />
                          <input
                            ref={mobileSearchInputRef}
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search events..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </details>
                  </div>

                  {/* Mobile Categories */}
                  <div>
                    <details className="group">
                      <summary className="flex items-center justify-between px-3 py-3 bg-white border border-gray-200 rounded-md cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <Tag size={18} className="text-gray-500" />
                          <div className="text-sm font-semibold text-gray-700">
                            Categories
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {selectedCategories.includes("All")
                            ? "All"
                            : `${selectedCategories.length} selected`}
                        </div>
                      </summary>
                      <div className="mt-3 space-y-2">
                        {[
                          { id: "All", label: "All Categories" },
                          ...safeCategories
                            .filter((c) => c !== "All")
                            .map((c) => ({ id: c, label: c })),
                        ].map((opt) => (
                          <FilterItem
                            key={opt.id}
                            checked={selectedCategories.includes(opt.id)}
                            onClick={() => handleCategoryToggle(opt.id)}
                            label={opt.label}
                          />
                        ))}
                      </div>
                    </details>
                  </div>

                  {/* Mobile Price */}
                  <div>
                    <details className="group">
                      <summary className="flex items-center justify-between px-3 py-3 bg-white border border-gray-200 rounded-md cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <Wallet size={18} className="text-gray-500" />
                          <div className="text-sm font-semibold text-gray-700">
                            Price
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {selectedPriceRanges.includes("All")
                            ? "All"
                            : `${selectedPriceRanges.length} selected`}
                        </div>
                      </summary>
                      <div className="mt-3 space-y-2">
                        {priceRanges.map((opt) => (
                          <FilterItem
                            key={opt.id}
                            checked={selectedPriceRanges.includes(opt.id)}
                            onClick={() => handlePriceToggle(opt.id)}
                            label={opt.label}
                          />
                        ))}
                      </div>
                    </details>
                  </div>

                  {/* Mobile Location */}
                  <div>
                    <details className="group">
                      <summary className="flex items-center justify-between px-3 py-3 bg-white border border-gray-200 rounded-md cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <MapPin size={18} className="text-gray-500" />
                          <div className="text-sm font-semibold text-gray-700">
                            Location
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {selectedLocations.includes("All")
                            ? "All"
                            : `${selectedLocations.length} selected`}
                        </div>
                      </summary>
                      <div className="mt-3 space-y-2">
                        {locations.map((opt) => (
                          <FilterItem
                            key={opt.id}
                            checked={selectedLocations.includes(opt.id)}
                            onClick={() => handleLocationToggle(opt.id)}
                            label={opt.label}
                          />
                        ))}
                      </div>
                    </details>
                  </div>

                  {/* Mobile Date */}
                  <div>
                    <details className="group">
                      <summary className="flex items-center justify-between px-3 py-3 bg-white border border-gray-200 rounded-md cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <Calendar size={18} className="text-gray-500" />
                          <div className="text-sm font-semibold text-gray-700">
                            Date
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs">
                          {selectedDateRanges.includes("All")
                            ? "Any"
                            : `${selectedDateRanges.length} selected`}
                        </div>
                      </summary>
                      <div className="mt-3 space-y-2">
                        {dateRanges.map((opt) => (
                          <FilterItem
                            key={opt.id}
                            checked={selectedDateRanges.includes(opt.id)}
                            onClick={() => handleDateToggle(opt.id)}
                            label={opt.label}
                          />
                        ))}
                      </div>
                    </details>
                  </div>

                  {/* Mobile Sort By */}
                  <div>
                    <details className="group">
                      <summary className="flex items-center justify-between px-3 py-3 bg-white border border-gray-200 rounded-md cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <TrendingUp size={18} className="text-gray-500" />
                          <div className="text-sm font-semibold text-gray-700">
                            Sort By
                          </div>
                        </div>
                        <div className="text-gray-500 text-xs capitalize">
                          {sortBy}
                        </div>
                      </summary>
                      <div className="mt-3">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none"
                        >
                          <option value="date">Date</option>
                          <option value="price">Price</option>
                          <option value="name">Name</option>
                        </select>
                      </div>
                    </details>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="flex space-x-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={clearAllFilters}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={closeMobileFilters}
                      className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <EventDetail
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onBack={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Events;