import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { events, categories } from "../../data/events";
import EventCard from "../../components/Events/EventCard";
import EventDetail from "../../components/Events/EventDetail";
import "./Events.css";

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Safe data access with fallbacks
  const safeEvents = events || [];
  const safeCategories = categories || ["All"];

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
      18: "/images/fashion-week.png",
      19: "/images/comedy-night.png",
      20: "/images/yoga-retreat.png",
      21: "/images/film-festival.png",
      22: "/images/tech-career-fair.png",
      23: "/images/entrepreneurship-summit.png",
      24: "/images/afro-jazz-soul.png",
    };

    return imageMap[event.id] || "/images/owambe.png";
  };

  // Create events with corrected image paths
  const eventsWithCorrectedImages = safeEvents.map((event) => ({
    ...event,
    image: getEventImage(event),
  }));

  // Filter and sort events
  const filteredEvents = eventsWithCorrectedImages
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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
  };

  return (
    <section id="events" className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Events
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find events that match your interests and book tickets seamlessly
          </p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          {/* Search Bar */}
          <div className="relative md:flex-1 md:max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter and Sort */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {safeCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="price">Sort by Price</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event)}
                className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No events found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Results Count */}
        <div className="mt-8 text-center text-gray-600">
          Showing {filteredEvents.length} of {safeEvents.length} events
        </div>

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
