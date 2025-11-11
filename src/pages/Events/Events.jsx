import React, { useState } from "react";
import { Calendar, MapPin, Users, Clock, Search, Filter } from "lucide-react";
import { events, categories } from "../../data/events";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  // Safe data access with fallbacks
  const safeEvents = events || [];
  const safeCategories = categories || ["All"];

  // Filter events based on search and category
  const filteredEvents = safeEvents.filter((event) => {
    if (!event) return false;

    const matchesSearch =
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case "date":
        return new Date(a.date) - new Date(b.date);
      case "price":
        return (a.price || 0) - (b.price || 0);
      case "title":
        return (a.title || "").localeCompare(b.title || "");
      default:
        return 0;
    }
  });

  const formatDate = (dateString) => {
    try {
      const options = { month: "short", day: "numeric", year: "numeric" };
      return new Date(dateString).toLocaleDateString("en-US", options);
    } catch (error) {
      return "Date TBD";
    }
  };

  const formatPrice = (price) => {
    if (price === 0 || price === "0") return "Free";
    return `₦${(price || 0).toLocaleString()}`;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Owambe: "bg-purple-100 text-purple-800",
      Carnival: "bg-yellow-100 text-yellow-800",
      Afrobeats: "bg-green-100 text-green-800",
      Business: "bg-blue-100 text-blue-800",
      "Food & Drink": "bg-red-100 text-red-800",
      Religious: "bg-indigo-100 text-indigo-800",
      Cultural: "bg-orange-100 text-orange-800",
      Technology: "bg-cyan-100 text-cyan-800",
      Sports: "bg-emerald-100 text-emerald-800",
      Education: "bg-violet-100 text-violet-800",
      Art: "bg-pink-100 text-pink-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  // CORRECTED: Image path resolution for public/images/ structure
  const getEventImage = (event) => {
    // If event has image property, convert it to correct path
    if (event.image) {
      // Remove 'images/' prefix if it exists and any leading slashes
      const cleanPath = event.image.replace(/^images\//, "").replace(/^\//, "");
      return `/images/${cleanPath}`;
    }

    // Fallback: Direct mapping to public/images/ files
    const imageMap = {
      1: "/images/owambe.png",
      2: "/images/traditional-wedding.png",
      3: "/images/calabar-carnival.png",
      4: "/images/eyo-festival.png",
      5: "/images/afrobeats-concert.png",
      6: "/images/naija-club-night.png",
      7: "/images/startup-summit.png",
      8: "/images/naija-food-festival.png",
      9: "/images/worship.png",
      10: "/images/igbo-festival.png",
      11: "/images/lagos-tech-festival.png",
      12: "/images/derby-match.png",
      13: "/images/jamb.png",
      14: "/images/art-show.png",
      15: "/images/blockchain.png",
      16: "/images/digital-skills.png",
      17: "/images/public-speaking.png",
    };

    return imageMap[event.id] || "/images/owambe.png";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Events
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Find and join events that match your interests. From cultural
              festivals to tech conferences, there's something for everyone in
              our vibrant community.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search events by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {safeCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === "All"
                ? "All Events"
                : selectedCategory + " Events"}
              <span className="text-gray-500 text-lg font-normal ml-2">
                ({sortedEvents.length} events found)
              </span>
            </h2>
          </div>

          {sortedEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search size={64} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No events found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  {/* Event Image */}
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src={getEventImage(event)}
                      alt={event.title || "Event image"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.warn(
                          `Failed to load image for event ${event.id}: ${e.target.src}`
                        );
                        // Fallback to default image
                        e.target.src = "/images/owambe.png";
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          event.category
                        )}`}
                      >
                        {event.category || "Event"}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm font-medium">
                        {formatPrice(event.price)}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {event.title || "Untitled Event"}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description || "No description available."}
                    </p>

                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-500">
                        <Calendar size={16} className="mr-2" />
                        <span className="text-sm">
                          {formatDate(event.date)}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Clock size={16} className="mr-2" />
                        <span className="text-sm">
                          {event.time || "Time TBD"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <MapPin size={16} className="mr-2" />
                        <span className="text-sm">
                          {event.location || "Location TBD"}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Users size={16} className="mr-2" />
                        <span className="text-sm">
                          {event.availableTickets || 0} of{" "}
                          {event.totalTickets || 0} tickets available
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg transition-colors font-medium">
                        View Details
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors font-medium">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Event Statistics
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {safeEvents.length}
              </div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {safeCategories.length - 1}
              </div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {safeEvents.filter((e) => e.price === 0).length}
              </div>
              <div className="text-sm text-gray-600">Free Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {safeEvents.reduce(
                  (total, event) => total + (event.availableTickets || 0),
                  0
                )}
              </div>
              <div className="text-sm text-gray-600">Available Tickets</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
