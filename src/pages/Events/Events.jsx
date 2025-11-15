// Events.jsx - COMPLETE REVAMP with Robust Click-Outside & Mobile Responsiveness
import React, { useState, useMemo, useEffect, useRef } from "react";
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
  Clock,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import { events, categories } from "../../data/events";
import EventCard from "../../components/Events/EventCard";
import EventDetail from "../../components/Events/EventDetail";
import "./Events.css";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState(["All"]);
  const [selectedLocations, setSelectedLocations] = useState(["All"]);
  const [selectedDateRanges, setSelectedDateRanges] = useState(["All"]);
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const eventsPerPage = 9; // Reduced for better mobile experience

  // Refs for click-outside detection
  const categoryDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);
  const mobileFiltersRef = useRef(null);

  // Nigerian-specific filter options
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

  // Safe data access with fallbacks
  const safeEvents = events || [];
  const safeCategories = categories || ["All"];

  // Enhanced Click Outside Handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close category dropdown
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryDropdownOpen(false);
      }

      // Close price dropdown
      if (
        priceDropdownRef.current &&
        !priceDropdownRef.current.contains(event.target)
      ) {
        setIsPriceDropdownOpen(false);
      }

      // Close location dropdown
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setIsLocationDropdownOpen(false);
      }

      // Close date dropdown
      if (
        dateDropdownRef.current &&
        !dateDropdownRef.current.contains(event.target)
      ) {
        setIsDateDropdownOpen(false);
      }

      // Close mobile filters
      if (
        mobileFiltersRef.current &&
        !mobileFiltersRef.current.contains(event.target) &&
        !event.target.closest(".mobile-filters-trigger")
      ) {
        setIsMobileFiltersOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // Mobile support

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Close all dropdowns function
  const closeAllDropdowns = () => {
    setIsCategoryDropdownOpen(false);
    setIsPriceDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsDateDropdownOpen(false);
  };

  // Enhanced dropdown toggle with close others
  const createDropdownToggle = (setter) => () => {
    closeAllDropdowns();
    setter(true);
  };

  const eventsWithCorrectedImages = safeEvents.map((event) => ({
    ...event,
    image: event.image,
  }));

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced multi-select handlers
  const createMultiSelectHandler =
    (setSelected, allValue = "All") =>
    (itemId) => {
      if (itemId === allValue) {
        setSelected([allValue]);
      } else {
        setSelected((prev) => {
          const newSelection = prev.filter((item) => item !== allValue);
          if (newSelection.includes(itemId)) {
            return newSelection.filter((item) => item !== itemId);
          } else {
            return [...newSelection, itemId];
          }
        });
      }
    };

  const handleCategoryToggle = createMultiSelectHandler(setSelectedCategories);
  const handlePriceToggle = createMultiSelectHandler(setSelectedPriceRanges);
  const handleLocationToggle = createMultiSelectHandler(setSelectedLocations);
  const handleDateToggle = createMultiSelectHandler(setSelectedDateRanges);

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedCategories(["All"]);
    setSelectedPriceRanges(["All"]);
    setSelectedLocations(["All"]);
    setSelectedDateRanges(["All"]);
    setSearchTerm("");
    closeAllDropdowns();
  };

  // Filter and sort events with multi-select support
  const filteredEvents = useMemo(() => {
    return eventsWithCorrectedImages
      .filter((event) => {
        if (!event) return false;

        // Search filter
        const matchesSearch =
          !searchTerm ||
          event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase());

        // Category filter
        const matchesCategory =
          selectedCategories.includes("All") ||
          selectedCategories.includes(event.category);

        // Price filter
        const matchesPrice =
          selectedPriceRanges.includes("All") ||
          selectedPriceRanges.some((priceRange) => {
            const range = priceRanges.find((p) => p.id === priceRange);
            if (!range) return false;
            if (range.id === "free") return event.price === 0;
            if (range.min !== null && event.price < range.min) return false;
            if (range.max !== null && event.price > range.max) return false;
            return true;
          });

        // Location filter
        const matchesLocation = selectedLocations.includes("All");
        // Date filter
        const matchesDate = selectedDateRanges.includes("All");

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
    eventsWithCorrectedImages,
    searchTerm,
    selectedCategories,
    selectedPriceRanges,
    selectedLocations,
    selectedDateRanges,
    sortBy,
  ]);

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (!selectedCategories.includes("All")) count += selectedCategories.length;
    if (!selectedPriceRanges.includes("All"))
      count += selectedPriceRanges.length;
    if (!selectedLocations.includes("All")) count += selectedLocations.length;
    if (!selectedDateRanges.includes("All")) count += selectedDateRanges.length;
    if (searchTerm) count += 1;
    return count;
  }, [
    selectedCategories,
    selectedPriceRanges,
    selectedLocations,
    selectedDateRanges,
    searchTerm,
  ]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = useMemo(() => {
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    return filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  }, [filteredEvents, currentPage, eventsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedCategories,
    selectedPriceRanges,
    selectedLocations,
    selectedDateRanges,
    sortBy,
  ]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get popular categories (top 5)
  const popularCategories = safeCategories
    .filter((cat) => cat !== "All")
    .slice(0, 5);

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Reusable Multi-Select Dropdown Component with proper ref handling
  const MultiSelectDropdown = ({
    isOpen,
    setIsOpen,
    selectedItems,
    handleToggle,
    options,
    label,
    icon: Icon,
    dropdownRef,
  }) => (
    <div className="w-full lg:w-64" ref={dropdownRef}>
      <label className="block text-sm font-semibold text-gray-700 mb-3">
        {label}
      </label>
      <div className="relative">
        <button
          onClick={createDropdownToggle(setIsOpen)}
          className="w-full px-4 py-3 lg:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 transition-all duration-200 font-medium text-left flex justify-between items-center"
        >
          <span className="truncate flex items-center">
            <Icon size={18} className="mr-2 text-gray-500 flex-shrink-0" />
            {selectedItems.includes("All")
              ? `All ${label}`
              : `${selectedItems.length} selected`}
          </span>
          <svg
            className={`h-5 w-5 transform transition-transform flex-shrink-0 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="category-dropdown absolute z-50 w-full mt-2 bg-white/95 border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
            <div className="p-2">
              {options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleToggle(option.id)}
                  className={`flex items-center px-3 py-3 rounded-lg cursor-pointer transition-colors ${
                    selectedItems.includes(option.id)
                      ? "bg-blue-50 text-blue-700"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div
                    className={`w-5 h-5 border rounded mr-3 flex items-center justify-center flex-shrink-0 ${
                      selectedItems.includes(option.id)
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedItems.includes(option.id) && (
                      <Check size={14} className="text-white" />
                    )}
                  </div>
                  <span className="text-sm">{option.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Filter Chips Component
  const FilterChips = ({ selectedItems, handleToggle, getLabel }) => (
    <div className="flex flex-wrap gap-2">
      {selectedItems
        .filter((item) => item !== "All")
        .map((item) => (
          <div
            key={item}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
          >
            {getLabel(item)}
            <button
              onClick={() => handleToggle(item)}
              className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
            >
              <X size={14} />
            </button>
          </div>
        ))}
    </div>
  );

  // Skeleton Loader Component
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
        <div className="flex justify-between items-center pt-2">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );

  // Mobile Filters Component
  const MobileFilters = () => (
    <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center">
      <div
        ref={mobileFiltersRef}
        className="bg-white w-full max-h-[80vh] rounded-t-3xl overflow-y-auto animate-slide-up"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Filters</h3>
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Search Bar */}
            <div>
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
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50"
                />
              </div>
            </div>

            {/* Mobile Filter Dropdowns */}
            <MultiSelectDropdown
              isOpen={isCategoryDropdownOpen}
              setIsOpen={setIsCategoryDropdownOpen}
              selectedItems={selectedCategories}
              handleToggle={handleCategoryToggle}
              options={[
                { id: "All", label: "All Categories" },
                ...safeCategories
                  .filter((cat) => cat !== "All")
                  .map((cat) => ({ id: cat, label: cat })),
              ]}
              label="Categories"
              icon={Users}
              dropdownRef={categoryDropdownRef}
            />

            <MultiSelectDropdown
              isOpen={isPriceDropdownOpen}
              setIsOpen={setIsPriceDropdownOpen}
              selectedItems={selectedPriceRanges}
              handleToggle={handlePriceToggle}
              options={priceRanges}
              label="Price"
              icon={Wallet}
              dropdownRef={priceDropdownRef}
            />

            <MultiSelectDropdown
              isOpen={isLocationDropdownOpen}
              setIsOpen={setIsLocationDropdownOpen}
              selectedItems={selectedLocations}
              handleToggle={handleLocationToggle}
              options={locations}
              label="Location"
              icon={MapPin}
              dropdownRef={locationDropdownRef}
            />

            <MultiSelectDropdown
              isOpen={isDateDropdownOpen}
              setIsOpen={setIsDateDropdownOpen}
              selectedItems={selectedDateRanges}
              handleToggle={handleDateToggle}
              options={dateRanges}
              label="Date"
              icon={Calendar}
              dropdownRef={dateDropdownRef}
            />

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 font-medium"
                >
                  <option value="date">Date</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <TrendingUp size={18} />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button
                onClick={clearAllFilters}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="events"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30"
    >
      {/* Enhanced Header with Background */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Discover Events
            </h1>
            <p className="text-lg lg:text-xl xl:text-2xl text-blue-100 mb-6 lg:mb-8 leading-relaxed px-4">
              Find your next unforgettable experience. From cultural festivals
              to tech conferences, we've got something for everyone.
            </p>

            {/* Quick Stats */}
            <div className="flex justify-center space-x-6 lg:space-x-8 text-center">
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  {safeEvents.length}+
                </div>
                <div className="text-blue-200 text-xs lg:text-sm">
                  Total Events
                </div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  {safeCategories.length - 1}
                </div>
                <div className="text-blue-200 text-xs lg:text-sm">
                  Categories
                </div>
              </div>
              <div>
                <div className="text-2xl lg:text-3xl font-bold text-white">
                  {safeEvents.filter((e) => e.price === 0).length}
                </div>
                <div className="text-blue-200 text-xs lg:text-sm">
                  Free Events
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:-mt-8 relative z-10">
        {/* Mobile Filters Trigger */}
        <div className="lg:hidden flex items-center justify-between mb-6 pt-4">
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="mobile-filters-trigger flex items-center space-x-2 bg-white px-4 py-3 rounded-2xl shadow-lg border border-gray-200 font-medium"
          >
            <SlidersHorizontal size={20} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-red-600 text-sm font-medium"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Enhanced Search and Filters Card - Desktop */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8 lg:mb-12">
          {/* Active Filters Bar */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
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
                <X size={16} className="mr-1" />
                Clear all
              </button>
            </div>
          )}

          <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full">
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
                  placeholder="Search by event name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 transition-all duration-200"
                />
              </div>
            </div>

            {/* Category Multi-Select */}
            <MultiSelectDropdown
              isOpen={isCategoryDropdownOpen}
              setIsOpen={setIsCategoryDropdownOpen}
              selectedItems={selectedCategories}
              handleToggle={handleCategoryToggle}
              options={[
                { id: "All", label: "All Categories" },
                ...safeCategories
                  .filter((cat) => cat !== "All")
                  .map((cat) => ({ id: cat, label: cat })),
              ]}
              label="Categories"
              icon={Users}
              dropdownRef={categoryDropdownRef}
            />

            {/* Price Range Multi-Select */}
            <MultiSelectDropdown
              isOpen={isPriceDropdownOpen}
              setIsOpen={setIsPriceDropdownOpen}
              selectedItems={selectedPriceRanges}
              handleToggle={handlePriceToggle}
              options={priceRanges}
              label="Price"
              icon={Wallet}
              dropdownRef={priceDropdownRef}
            />
          </div>

          {/* Second Row of Filters */}
          <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center mt-6">
            {/* Location Multi-Select */}
            <MultiSelectDropdown
              isOpen={isLocationDropdownOpen}
              setIsOpen={setIsLocationDropdownOpen}
              selectedItems={selectedLocations}
              handleToggle={handleLocationToggle}
              options={locations}
              label="Location"
              icon={MapPin}
              dropdownRef={locationDropdownRef}
            />

            {/* Date Range Multi-Select */}
            <MultiSelectDropdown
              isOpen={isDateDropdownOpen}
              setIsOpen={setIsDateDropdownOpen}
              selectedItems={selectedDateRanges}
              handleToggle={handleDateToggle}
              options={dateRanges}
              label="Date"
              icon={Calendar}
              dropdownRef={dateDropdownRef}
            />

            {/* Sort By */}
            <div className="w-full xl:w-64">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 transition-all duration-200 font-medium"
                >
                  <option value="date">Date</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <TrendingUp size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
            {!selectedCategories.includes("All") && (
              <div>
                <span className="text-sm font-semibold text-gray-700 mb-2 block">
                  Selected Categories:
                </span>
                <FilterChips
                  selectedItems={selectedCategories}
                  handleToggle={handleCategoryToggle}
                  getLabel={(item) => item}
                />
              </div>
            )}

            {!selectedPriceRanges.includes("All") && (
              <div>
                <span className="text-sm font-semibold text-gray-700 mb-2 block">
                  Selected Price Ranges:
                </span>
                <FilterChips
                  selectedItems={selectedPriceRanges}
                  handleToggle={handlePriceToggle}
                  getLabel={(item) =>
                    priceRanges.find((p) => p.id === item)?.label || item
                  }
                />
              </div>
            )}

            {!selectedLocations.includes("All") && (
              <div>
                <span className="text-sm font-semibold text-gray-700 mb-2 block">
                  Selected Locations:
                </span>
                <FilterChips
                  selectedItems={selectedLocations}
                  handleToggle={handleLocationToggle}
                  getLabel={(item) =>
                    locations.find((l) => l.id === item)?.label || item
                  }
                />
              </div>
            )}
          </div>

          {/* Popular Categories Quick Filter */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Popular Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {popularCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategories.includes(category)
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Header */}
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
              Page {currentPage}/{totalPages} • {currentEvents.length} events •{" "}
              {filteredEvents.length} total
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {filteredEvents.length > 0 && (
            <div className="mt-4 sm:mt-0 bg-blue-50 text-blue-700 px-3 lg:px-4 py-2 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2">
                <Filter size={14} className="lg:size-4" />
                <span className="text-xs lg:text-sm font-medium">
                  {filteredEvents.length} events match your criteria
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Events Grid with Skeleton Loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: eventsPerPage }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : currentEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
              {currentEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => handleEventClick(event)}
                  className="group cursor-pointer transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl"
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
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
                  <ChevronLeft size={16} className="mr-1" />
                  Previous
                </button>

                {getPageNumbers().map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`px-3 lg:px-4 py-2 rounded-lg border transition-all duration-200 text-sm lg:text-base ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25"
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
                  Next
                  <ChevronRight size={16} className="ml-1" />
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

        {/* Event Detail Modal */}
        {selectedEvent && (
          <EventDetail
            event={selectedEvent}
            onClose={handleCloseDetail}
            onBack={handleCloseDetail}
          />
        )}

        {/* Mobile Filters */}
        {isMobileFiltersOpen && <MobileFilters />}
      </div>
    </section>
  );
};

export default Events;
