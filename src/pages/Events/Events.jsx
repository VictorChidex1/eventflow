import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Calendar,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { events, categories } from "../../data/events";
import EventCard from "../../components/Events/EventCard";
import EventDetail from "../../components/Events/EventDetail";
import "./Events.css";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
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
    }, 1200); // 1.2 seconds to see the skeleton effect

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return eventsWithCorrectedImages
      .filter((event) => {
        if (!event) return false;

        const matchesSearch =
          event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || event.category === selectedCategory;
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
  }, [eventsWithCorrectedImages, searchTerm, selectedCategory, sortBy]);

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
  }, [searchTerm, selectedCategory, sortBy]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
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

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Skeleton Loader Component
  const EventCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 relative overflow-hidden">
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer"></div>
      </div>

      <div className="p-6 space-y-3">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>

        {/* Category skeleton */}
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>

        {/* Description skeletons */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Date and price skeletons */}
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

            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none w-full lg:w-64 px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50/50 transition-all duration-200 font-medium"
                >
                  {safeCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg
                    className="h-5 w-5"
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
                </div>
              </div>
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
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                  }`}
                >
                  {category}
                </button>
              ))}
              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all duration-200"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {selectedCategory === "All"
                ? "All Events"
                : selectedCategory + " Events"}
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
          // Show skeletons while loading
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {Array.from({ length: eventsPerPage }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        ) : currentEvents.length > 0 ? (
          // Show actual events when loaded
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
                {/* Previous Button */}
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

                {/* Page Numbers */}
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

                {/* Next Button */}
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
            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
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
