import React, { useState } from "react";
import { Search, Filter, Calendar, TrendingUp, Sparkles } from "lucide-react";
import { events, categories } from "../../data/events";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";
import "./EventsList.css";

const EventsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // LIMIT TO 17 EVENTS FOR HOMEPAGE - ONLY CHANGE MADE
  const limitedEvents = events.slice(0, 17);

  // Filter and sort events (using limitedEvents instead of events)
  const filteredEvents = limitedEvents
    .filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date) - new Date(b.date);
        case "price":
          return a.price - b.price;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
  };

  // Get popular categories for quick filters
  const popularCategories = categories
    .filter((cat) => cat !== "All")
    .slice(0, 4);

  return (
    <section
      id="events"
      className="py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
            <Sparkles size={16} />
            <span>Discover Your Next Experience</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
            Amazing Events
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find events that match your interests and book tickets seamlessly.
            <span className="text-blue-600 font-semibold">
              {" "}
              Curated just for you.
            </span>
          </p>

          {/* Quick Stats */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {limitedEvents.length}
              </div>
              <div className="text-gray-500 text-sm">Featured Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {categories.length - 1}
              </div>
              <div className="text-gray-500 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {limitedEvents.filter((e) => e.price === 0).length}
              </div>
              <div className="text-gray-500 text-sm">Free Events</div>
            </div>
          </div>
        </div>

        {/* Enhanced Search and Filters Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Search Bar */}
            <div className="flex-1 w-full">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search events by name, description, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 transition-all duration-200 shadow-sm"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="w-full lg:w-auto">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none w-full lg:w-48 px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 transition-all duration-200 font-medium shadow-sm"
                >
                  {categories.map((category) => (
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
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none w-full lg:w-48 px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 transition-all duration-200 font-medium shadow-sm"
                >
                  <option value="date">Sort by Date</option>
                  <option value="price">Sort by Price</option>
                  <option value="name">Sort by Name</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <TrendingUp size={18} />
                </div>
              </div>
            </div>
          </div>

          {/* Popular Categories Quick Filter */}
          <div className="mt-6 pt-6 border-t border-gray-100/60">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-sm font-semibold text-gray-700">
                Trending Categories:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border-blue-600"
                      : "bg-white/60 text-gray-700 hover:bg-white hover:shadow-md border-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
              {selectedCategory !== "All" && (
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-all duration-200 border border-red-200"
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
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "All"
                ? "Featured Events"
                : selectedCategory + " Events"}
            </h3>
            <p className="text-gray-600 mt-2">
              {filteredEvents.length} of {limitedEvents.length} events
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>

          {filteredEvents.length > 0 && (
            <div className="mt-4 sm:mt-0 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2">
                <Filter size={16} />
                <span className="text-sm font-medium">
                  {filteredEvents.length} events found
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event)}
                className="group cursor-pointer transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl rounded-2xl"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 mb-12">
            <div className="text-gray-300 mb-6">
              <Filter size={80} className="mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">
              No events found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              We couldn't find any events matching your search criteria.
            </p>
            {(searchTerm || selectedCategory !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* View All Events CTA */}
        {filteredEvents.length > 0 && (
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Want to see more events?
              </h4>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Explore our complete collection of events with advanced
                filtering and search options.
              </p>
              <a
                href="/events"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span>View All Events</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
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

export default EventsList;
