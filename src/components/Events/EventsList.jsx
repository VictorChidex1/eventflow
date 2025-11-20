import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Sparkles,
  X,
  Check,
  MapPin,
  Wallet,
  Users,
  SlidersHorizontal,
} from "lucide-react";
import { events, categories } from "../../data/events";
import EventCard from "./EventCard";
import EventDetail from "./EventDetail";
import "./EventsList.css";

const PRICE_RANGES = [
  { id: "All", label: "All Prices", min: null, max: null },
  { id: "free", label: "Free", min: 0, max: 0 },
  { id: "budget", label: "₦1K - ₦5K", min: 1000, max: 5000 },
  { id: "medium", label: "₦5K - ₦20K", min: 5000, max: 20000 },
  { id: "premium", label: "₦20K - ₦50K", min: 20000, max: 50000 },
  { id: "vip", label: "₦50K+", min: 50000, max: null },
];

const LOCATIONS = [
  { id: "All", label: "All Locations" },
  { id: "lagos", label: "Lagos" },
  { id: "abuja", label: "Abuja" },
  { id: "port-harcourt", label: "Port Harcourt" },
  { id: "ibadan", label: "Ibadan" },
  { id: "online", label: "Online" },
  { id: "others", label: "Other Cities" },
];

const DATE_RANGES = [
  { id: "All", label: "Any Date" },
  { id: "today", label: "Today" },
  { id: "tomorrow", label: "Tomorrow" },
  { id: "weekend", label: "This Weekend" },
  { id: "next-week", label: "Next 7 Days" },
  { id: "this-month", label: "This Month" },
];

// --- Sub-Components ---

const SearchInput = React.memo(
  ({
    value,
    onChange,
    placeholder = "Search events...",
    onClear,
    className = "",
    autoFocus = false,
    inputRef,
    onKeyPress,
  }) => (
    <div className="relative">
      <Search
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className={`w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white transition-all duration-200 text-base ${className}`}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        autoFocus={autoFocus}
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  )
);

const MultiSelectDropdown = React.memo(
  ({
    isOpen,
    setIsOpen,
    selectedItems,
    handleToggle,
    options,
    label,
    icon, // Recieve as lowercase prop
    dropdownRef,
  }) => {
    // Assign to Capitalized variable for JSX usage. 
    // This fixes the "unused variable" linter error explicitly.
    const IconComponent = icon;

    return (
      <div className="w-full lg:w-64" ref={dropdownRef}>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {label}
        </label>
        <div className="relative">
          <button
            onClick={setIsOpen}
            className="w-full px-4 py-3 lg:py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 transition-all duration-200 font-medium text-left flex justify-between items-center"
          >
            <span className="truncate flex items-center">
              {/* Check if component exists before rendering */}
              {IconComponent && (
                <IconComponent size={18} className="mr-2 text-gray-500 flex-shrink-0" />
              )}
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
  }
);

const MobileFiltersModal = React.memo(
  ({
    isOpen,
    onClose,
    filterState,
    dropdownState,
    dropdownRefs,
    onApplyFilters,
  }) => {
    const {
      mobileSearchTerm,
      setMobileSearchTerm,
      selectedCategories,
      selectedPriceRanges,
      selectedLocations,
      selectedDateRanges,
      sortBy,
      setSortBy,
    } = filterState;

    const {
      isCategoryDropdownOpen,
      setIsCategoryDropdownOpen,
      isPriceDropdownOpen,
      setIsPriceDropdownOpen,
      isLocationDropdownOpen,
      setIsLocationDropdownOpen,
      isDateDropdownOpen,
      setIsDateDropdownOpen,
      createDropdownToggle,
    } = dropdownState;

    const mobileSearchInputRef = useRef(null);

    useEffect(() => {
      if (isOpen) {
        document.body.classList.add("mobile-filters-open");
        setTimeout(() => {
          mobileSearchInputRef.current?.focus();
        }, 300);
      } else {
        document.body.classList.remove("mobile-filters-open");
      }
    }, [isOpen]);

    const handleMobileSearchChange = (e) => {
      setMobileSearchTerm(e.target.value);
    };

    const handleMobileSearchSubmit = (e) => {
      if (e.key === "Enter") {
        onApplyFilters();
      }
    };

    const createToggleHandler = (currentSelection, setSelection) => (itemId) => {
      if (itemId === "All") {
        setSelection(["All"]);
      } else {
        setSelection((prev) => {
          const newSelection = prev.filter((item) => item !== "All");
          if (newSelection.includes(itemId)) {
            return newSelection.filter((item) => item !== itemId);
          } else {
            return [...newSelection, itemId];
          }
        });
      }
    };

    if (!isOpen) return null;

    return (
      <div
        className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          ref={dropdownRefs.mobileFiltersRef}
          className="bg-white w-full max-h-[85vh] rounded-t-3xl overflow-y-auto animate-slide-up"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Filters & Search
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6" onClick={(e) => e.stopPropagation()}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Search Events
                </label>
                <SearchInput
                  value={mobileSearchTerm}
                  onChange={handleMobileSearchChange}
                  onKeyPress={handleMobileSearchSubmit}
                  onClear={() => setMobileSearchTerm("")}
                  placeholder="Type to search events..."
                  inputRef={mobileSearchInputRef}
                  autoFocus
                />
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter or tap "Apply Filters" to search
                </p>
              </div>

              <MultiSelectDropdown
                isOpen={isCategoryDropdownOpen}
                setIsOpen={createDropdownToggle(setIsCategoryDropdownOpen)}
                selectedItems={selectedCategories}
                handleToggle={createToggleHandler(selectedCategories, filterState.setSelectedCategories)}
                options={[
                  { id: "All", label: "All Categories" },
                  ...(categories || [])
                    .filter((cat) => cat !== "All")
                    .map((cat) => ({ id: cat, label: cat })),
                ]}
                label="Categories"
                icon={Users}
                dropdownRef={dropdownRefs.categoryDropdownRef}
              />

              <MultiSelectDropdown
                isOpen={isPriceDropdownOpen}
                setIsOpen={createDropdownToggle(setIsPriceDropdownOpen)}
                selectedItems={selectedPriceRanges}
                handleToggle={createToggleHandler(selectedPriceRanges, filterState.setSelectedPriceRanges)}
                options={PRICE_RANGES}
                label="Price"
                icon={Wallet}
                dropdownRef={dropdownRefs.priceDropdownRef}
              />

              <MultiSelectDropdown
                isOpen={isLocationDropdownOpen}
                setIsOpen={createDropdownToggle(setIsLocationDropdownOpen)}
                selectedItems={selectedLocations}
                handleToggle={createToggleHandler(selectedLocations, filterState.setSelectedLocations)}
                options={LOCATIONS}
                label="Location"
                icon={MapPin}
                dropdownRef={dropdownRefs.locationDropdownRef}
              />

              <MultiSelectDropdown
                isOpen={isDateDropdownOpen}
                setIsOpen={createDropdownToggle(setIsDateDropdownOpen)}
                selectedItems={selectedDateRanges}
                handleToggle={createToggleHandler(selectedDateRanges, filterState.setSelectedDateRanges)}
                options={DATE_RANGES}
                label="Date"
                icon={Calendar}
                dropdownRef={dropdownRefs.dateDropdownRef}
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white font-medium text-base"
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

              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    filterState.clearAllFilters();
                    setMobileSearchTerm("");
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={onApplyFilters}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

const DesktopFilters = React.memo(
  ({ filterState, dropdownState, dropdownRefs }) => {
    const {
      searchTerm,
      setSearchTerm,
      selectedCategories,
      selectedPriceRanges,
      selectedLocations,
      selectedDateRanges,
      sortBy,
      setSortBy,
      clearAllFilters,
    } = filterState;

    const {
      isCategoryDropdownOpen,
      setIsCategoryDropdownOpen,
      isPriceDropdownOpen,
      setIsPriceDropdownOpen,
      isLocationDropdownOpen,
      setIsLocationDropdownOpen,
      isDateDropdownOpen,
      setIsDateDropdownOpen,
      createDropdownToggle,
    } = dropdownState;

    const activeFiltersCount = useMemo(() => {
      let count = 0;
      if (!selectedCategories.includes("All")) count += selectedCategories.length;
      if (!selectedPriceRanges.includes("All")) count += selectedPriceRanges.length;
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

    const popularCategories = (categories || [])
      .filter((cat) => cat !== "All")
      .slice(0, 4);

    const createToggleHandler = (currentSelection, setSelection) => (itemId) => {
      if (itemId === "All") {
        setSelection(["All"]);
      } else {
        setSelection((prev) => {
          const newSelection = prev.filter((item) => item !== "All");
          if (newSelection.includes(itemId)) {
            return newSelection.filter((item) => item !== itemId);
          } else {
            return [...newSelection, itemId];
          }
        });
      }
    };

    return (
      <div className="hidden lg:block bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/60 p-6 mb-12">
        {activeFiltersCount > 0 && (
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100/60">
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {activeFiltersCount} active filter
                {activeFiltersCount !== 1 ? "s" : ""}
              </span>
            </div>
            <button
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center transition-colors"
            >
              <X size={16} className="mr-1" />
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center">
          <div className="flex-1 w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Search Events
            </label>
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm("")}
              placeholder="Search by event name, description, or category..."
            />
          </div>

          <MultiSelectDropdown
            isOpen={isCategoryDropdownOpen}
            setIsOpen={createDropdownToggle(setIsCategoryDropdownOpen)}
            selectedItems={selectedCategories}
            handleToggle={createToggleHandler(selectedCategories, filterState.setSelectedCategories)}
            options={[
              { id: "All", label: "All Categories" },
              ...(categories || [])
                .filter((cat) => cat !== "All")
                .map((cat) => ({ id: cat, label: cat })),
            ]}
            label="Categories"
            icon={Users}
            dropdownRef={dropdownRefs.categoryDropdownRef}
          />

          <MultiSelectDropdown
            isOpen={isPriceDropdownOpen}
            setIsOpen={createDropdownToggle(setIsPriceDropdownOpen)}
            selectedItems={selectedPriceRanges}
            handleToggle={createToggleHandler(selectedPriceRanges, filterState.setSelectedPriceRanges)}
            options={PRICE_RANGES}
            label="Price"
            icon={Wallet}
            dropdownRef={dropdownRefs.priceDropdownRef}
          />
        </div>

        <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center mt-6">
          <MultiSelectDropdown
            isOpen={isLocationDropdownOpen}
            setIsOpen={createDropdownToggle(setIsLocationDropdownOpen)}
            selectedItems={selectedLocations}
            handleToggle={createToggleHandler(selectedLocations, filterState.setSelectedLocations)}
            options={LOCATIONS}
            label="Location"
            icon={MapPin}
            dropdownRef={dropdownRefs.locationDropdownRef}
          />

          <MultiSelectDropdown
            isOpen={isDateDropdownOpen}
            setIsOpen={createDropdownToggle(setIsDateDropdownOpen)}
            selectedItems={selectedDateRanges}
            handleToggle={createToggleHandler(selectedDateRanges, filterState.setSelectedDateRanges)}
            options={DATE_RANGES}
            label="Date"
            icon={Calendar}
            dropdownRef={dropdownRefs.dateDropdownRef}
          />

          <div className="w-full xl:w-64">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Sort By
            </label>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white/50 transition-all duration-200 font-medium shadow-sm text-base"
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

        <div className="mt-6 pt-6 border-t border-gray-100/60">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Trending Categories
          </label>
          <div className="flex flex-wrap gap-2">
            {popularCategories.map((category) => (
              <button
                key={category}
                onClick={() => createToggleHandler(selectedCategories, filterState.setSelectedCategories)(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  selectedCategories.includes(category)
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25 border-blue-600"
                    : "bg-white/60 text-gray-700 hover:bg-white hover:shadow-md border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

// --- Main Component ---
const EventsList = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState(["All"]);
  const [selectedLocations, setSelectedLocations] = useState(["All"]);
  const [selectedDateRanges, setSelectedDateRanges] = useState(["All"]);
  const [sortBy, setSortBy] = useState("date");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");

  // Dropdown states
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Refs
  const categoryDropdownRef = useRef(null);
  const priceDropdownRef = useRef(null);
  const locationDropdownRef = useRef(null);
  const dateDropdownRef = useRef(null);
  const mobileFiltersRef = useRef(null);

  // Data
  const limitedEvents = useMemo(() => (events || []).slice(0, 17), []);
  const safeCategories = categories || ["All"];

  // Dropdown management
  const closeAllDropdowns = useCallback(() => {
    setIsCategoryDropdownOpen(false);
    setIsPriceDropdownOpen(false);
    setIsLocationDropdownOpen(false);
    setIsDateDropdownOpen(false);
  }, []);

  const createDropdownToggle = useCallback(
    (setter) => () => {
      closeAllDropdowns();
      setter(true);
    },
    [closeAllDropdowns]
  );

  // Filter handlers
  const clearAllFilters = useCallback(() => {
    setSelectedCategories(["All"]);
    setSelectedPriceRanges(["All"]);
    setSelectedLocations(["All"]);
    setSelectedDateRanges(["All"]);
    setSearchTerm("");
    setMobileSearchTerm("");
    closeAllDropdowns();
  }, [closeAllDropdowns]);

  // Mobile filters
  const applyMobileFilters = useCallback(() => {
    setSearchTerm(mobileSearchTerm);
    setIsMobileFiltersOpen(false);
    document.body.classList.remove("mobile-filters-open");
    closeAllDropdowns();
  }, [mobileSearchTerm, closeAllDropdowns]);

  const handleOpenMobileFilters = useCallback(() => {
    setIsMobileFiltersOpen(true);
    setMobileSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleQuickSearch = useCallback((term) => {
    setSearchTerm(term);
    setMobileSearchTerm(term);
  }, []);

  // Event handlers
  const handleEventClick = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  // Click outside handler for desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileFiltersOpen) return;

      const refs = [
        { ref: categoryDropdownRef, setter: setIsCategoryDropdownOpen },
        { ref: priceDropdownRef, setter: setIsPriceDropdownOpen },
        { ref: locationDropdownRef, setter: setIsLocationDropdownOpen },
        { ref: dateDropdownRef, setter: setIsDateDropdownOpen },
      ];

      refs.forEach(({ ref, setter }) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setter(false);
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileFiltersOpen]);

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    return limitedEvents
      .filter((event) => {
        if (!event) return false;

        const matchesSearch =
          !searchTerm ||
          event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategories.includes("All") ||
          selectedCategories.includes(event.category);

        const matchesPrice =
          selectedPriceRanges.includes("All") ||
          selectedPriceRanges.some((priceRange) => {
            const range = PRICE_RANGES.find((p) => p.id === priceRange);
            if (!range) return false;
            if (range.id === "free") return event.price === 0;
            if (range.min !== null && event.price < range.min) return false;
            if (range.max !== null && event.price > range.max) return false;
            return true;
          });

        const matchesLocation = selectedLocations.includes("All");
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
    limitedEvents,
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

  const popularCategories = safeCategories
    .filter((cat) => cat !== "All")
    .slice(0, 4);

  // Prepare state objects for child components
  const filterState = {
    searchTerm,
    setSearchTerm,
    selectedCategories,
    setSelectedCategories,
    selectedPriceRanges,
    setSelectedPriceRanges,
    selectedLocations,
    setSelectedLocations,
    selectedDateRanges,
    setSelectedDateRanges,
    sortBy,
    setSortBy,
    mobileSearchTerm,
    setMobileSearchTerm,
    clearAllFilters,
  };

  const dropdownState = {
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    isPriceDropdownOpen,
    setIsPriceDropdownOpen,
    isLocationDropdownOpen,
    setIsLocationDropdownOpen,
    isDateDropdownOpen,
    setIsDateDropdownOpen,
    isMobileFiltersOpen,
    setIsMobileFiltersOpen,
    closeAllDropdowns,
    createDropdownToggle,
  };

  const dropdownRefs = {
    categoryDropdownRef,
    priceDropdownRef,
    locationDropdownRef,
    dateDropdownRef,
    mobileFiltersRef,
  };

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
        {/* Header Section */}
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
                {safeCategories.length - 1}
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

        {/* Mobile Search & Filters */}
        <div className="lg:hidden space-y-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-4">
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm("")}
              placeholder="Search events..."
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleOpenMobileFilters}
              className="mobile-filters-trigger flex items-center space-x-2 bg-white px-4 py-3 rounded-2xl shadow-lg border border-gray-200 font-medium flex-1 mr-3"
            >
              <SlidersHorizontal size={20} />
              <span>Advanced Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-red-600 text-sm font-medium px-3 py-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear
              </button>
            )}
          </div>

          {!searchTerm && (
            <div className="flex flex-wrap gap-2">
              {popularCategories.slice(0, 3).map((category) => (
                <button
                  key={category}
                  onClick={() => handleQuickSearch(category)}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Filters */}
        <DesktopFilters
          filterState={filterState}
          dropdownState={dropdownState}
          dropdownRefs={dropdownRefs}
        />

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedCategories.includes("All")
                ? "Featured Events"
                : selectedCategories.length === 1
                ? `${selectedCategories[0]} Events`
                : `${selectedCategories.length} Categories`}
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
              {searchTerm
                ? `No events found for "${searchTerm}". Try adjusting your search or filters.`
                : "We couldn't find any events matching your search criteria."}
            </p>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
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
                href="#/events"
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

        {/* Results Count */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-gray-50 text-gray-600 px-4 py-2 rounded-lg border border-gray-200">
            <span className="text-sm">
              Showing <strong>{filteredEvents.length}</strong> of{" "}
              <strong>{limitedEvents.length}</strong> featured events
            </span>
          </div>
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <EventDetail
            event={selectedEvent}
            onClose={handleCloseDetail}
            onBack={handleCloseDetail}
          />
        )}

        {/* Mobile Filters Modal */}
        <MobileFiltersModal
          isOpen={isMobileFiltersOpen}
          onClose={() => setIsMobileFiltersOpen(false)}
          filterState={filterState}
          dropdownState={dropdownState}
          dropdownRefs={dropdownRefs}
          onApplyFilters={applyMobileFilters}
        />
      </div>
    </section>
  );
};

export default EventsList;