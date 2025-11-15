// Events.jsx - Updated with Multi-Select Filtering
import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
} from "lucide-react";
import { events, categories } from "../../data/events";
import EventCard from "../../components/Events/EventCard";
import EventDetail from "../../components/Events/EventDetail";
import "./Events.css";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const eventsPerPage = 27;

  // Safe data access with fallbacks
  const safeEvents = events || [];
  const safeCategories = categories || ["All"];

  // SIMPLIFIED: Use the image paths as they are from events.js
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

  // Enhanced category selection handler
  const handleCategoryToggle = (category) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories((prev) => {
        // Remove "All" if any other category is selected
        const newCategories = prev.filter((cat) => cat !== "All");

        if (newCategories.includes(category)) {
          // Remove category if already selected
          return newCategories.filter((cat) => cat !== category);
        } else {
          // Add category
          return [...newCategories, category];
        }
      });
    }
  };

  // Clear all categories
  const clearAllCategories = () => {
    setSelectedCategories(["All"]);
  };

  // Filter and sort events with multi-select support
  const filteredEvents = useMemo(() => {
    return eventsWithCorrectedImages
      .filter((event) => {
        if (!event) return false;

        const matchesSearch =
          event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategories.includes("All") ||
          selectedCategories.includes(event.category);

        return matchesSearch && matchesCategory;
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
  }, [eventsWithCorrectedImages, searchTerm, selectedCategories, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Get current events for the page
  const currentEvents = useMemo(() => {
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    return filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  }, [filteredEvents, currentPage, eventsPerPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories, sortBy]);

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

  // Skeleton Loader Component (unchanged)
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

  return (
    <section
      id="events"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30"
    >
      {/* Enhanced Header with Background */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Discover Events
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
              Find your next unforgettable experience. From cultural festivals
              to tech conferences, we've got something for everyone.
            </p>

            {/* Quick Stats */}
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white">
                  {safeEvents.length}+
                </div>
                <div className="text-blue-200 text-sm">Total Events</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {safeCategories.length - 1}
                </div>
                <div className="text-blue-200 text-sm">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">
                  {safeEvents.filter((e) => e.price === 0).length}
                </div>
                <div className="text-blue-200 text-sm">Free Events</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10">
        {/* Search and Filters Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
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

            {/* Enhanced Multi-Select Category Filter */}
            <div className="w-full lg:w-64">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Categories
              </label>
              <div className="relative">
                <button
                  onClick={() =>
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                  }
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 transition-all duration-200 font-medium text-left flex justify-between items-center"
                >
                  <span className="truncate">
                    {selectedCategories.includes("All")
                      ? "All Categories"
                      : `${selectedCategories.length} selected`}
                  </span>
                  <svg
                    className={`h-5 w-5 transform transition-transform ${
                      isCategoryDropdownOpen ? "rotate-180" : ""
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
                {isCategoryDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-80 overflow-y-auto">
                    <div className="p-2">
                      {/* Select All Option */}
                      <div
                        onClick={() => handleCategoryToggle("All")}
                        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                          selectedCategories.includes("All")
                            ? "bg-blue-50 text-blue-700"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${
                            selectedCategories.includes("All")
                              ? "bg-blue-600 border-blue-600"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedCategories.includes("All") && (
                            <Check size={14} className="text-white" />
                          )}
                        </div>
                        <span className="font-medium">All Categories</span>
                      </div>

                      {/* Category Options */}
                      {safeCategories
                        .filter((cat) => cat !== "All")
                        .map((category) => (
                          <div
                            key={category}
                            onClick={() => handleCategoryToggle(category)}
                            className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                              selectedCategories.includes(category)
                                ? "bg-blue-50 text-blue-700"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div
                              className={`w-5 h-5 border rounded mr-3 flex items-center justify-center ${
                                selectedCategories.includes(category)
                                  ? "bg-blue-600 border-blue-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedCategories.includes(category) && (
                                <Check size={14} className="text-white" />
                              )}
                            </div>
                            <span>{category}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Selected Categories Chips */}
              {!selectedCategories.includes("All") &&
                selectedCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedCategories.map((category) => (
                      <div
                        key={category}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {category}
                        <button
                          onClick={() => handleCategoryToggle(category)}
                          className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                    {selectedCategories.length > 1 && (
                      <button
                        onClick={clearAllCategories}
                        className="text-red-600 text-sm hover:text-red-700 font-medium"
                      >
                        Clear all
                      </button>
                    )}
                  </div>
                )}
            </div>

            {/* Sort By */}
            <div className="w-full lg:w-auto">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full lg:w-64 px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 transition-all duration-200 font-medium"
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
              {!selectedCategories.includes("All") && (
                <button
                  onClick={clearAllCategories}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-200"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategories.includes("All")
                ? "All Events"
                : selectedCategories.length === 1
                ? `${selectedCategories[0]} Events`
                : `${selectedCategories.length} Categories`}
            </h2>
            <p className="text-gray-600 mt-2">
              Page {currentPage}/{totalPages} • {currentEvents.length} events •{" "}
              {filteredEvents.length} total
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {filteredEvents.length > 0 && (
            <div className="mt-4 sm:mt-0 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2">
                <Filter size={16} />
                <span className="text-sm font-medium">
                  {filteredEvents.length} events match your criteria
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Events Grid with Skeleton Loading */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: eventsPerPage }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : currentEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
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
              <div className="flex justify-center items-center space-x-2 mb-12">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center px-4 py-2 rounded-lg border transition-all duration-200 ${
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
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${
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
                  className={`flex items-center px-4 py-2 rounded-lg border transition-all duration-200 ${
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
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 mb-12">
            <div className="text-gray-300 mb-6">
              <Filter size={80} className="mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">
              No events found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We couldn't find any events matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
            {(searchTerm || !selectedCategories.includes("All")) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategories(["All"]);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
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
      </div>
    </section>
  );
};

export default Events;
