import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Home,
  LayoutDashboard,
  Newspaper,
  Megaphone,
  CalendarDays,
  HandHeart,
  User,
  Settings,
  Bell,
  LogOut,
  PlusCircle,
  Trash,
  X,
  MapPin,
  Calendar,
  Clock,
  Users,
  ArrowRight,
  Search,
  Filter,
  Menu,
  Zap,
  Ticket,
  Star,
  Share2,
  Bookmark,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Events = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    image: "",
    category: "workshop",
    capacity: "",
    price: "0",
    registrationLink: "",
  });

  const userRole = localStorage.getItem("role");
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const categories = [
    { value: "all", label: "All Events" },
    { value: "workshop", label: "Workshop" },
    { value: "conference", label: "Conference" },
    { value: "networking", label: "Networking" },
    { value: "training", label: "Training" },
    { value: "social", label: "Social" },
  ];

  // Fetch Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API_URL}/api/events`);
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        toast.error("Failed to fetch events.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter events based on search
  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [searchTerm, events]);

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Handle Input Change
  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  // Open Event View Modal
  const openEventModal = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  // Close Event Modal
  const closeModal = () => {
    setViewModalOpen(false);
    setSelectedEvent(null);
  };

  // Add Event (Admins Only)
  const handleAddEvent = async () => {
    if (userRole !== "admin") {
      toast.error("You don't have permission to add events.");
      return;
    }

    if (
      !newEvent.title ||
      !newEvent.description ||
      !newEvent.date ||
      !newEvent.location
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/events`, newEvent, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setEvents([...events, data]);
      setAddModalOpen(false);
      setNewEvent({
        title: "",
        description: "",
        date: "",
        time: "",
        location: "",
        image: "",
        category: "workshop",
        capacity: "",
        price: "0",
        registrationLink: "",
      });
      toast.success("Event created successfully! 🎉");
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Access Denied: You don't have permission to add events.");
      } else {
        toast.error("Failed to create event.");
      }
    }
  };

  // Delete Event (Admins Only)
  const handleDeleteEvent = async (eventId) => {
    if (userRole !== "admin") {
      toast.error("You don't have permission to delete events.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this event?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/events/${eventId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setEvents(events.filter((event) => event._id !== eventId));
      closeModal();
      toast.success("Event deleted successfully!");
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error(
          "Access Denied: You don't have permission to delete events."
        );
      } else {
        toast.error("Failed to delete event.");
      }
    }
  };

  // Helper function to get date safely
  const getEventDate = (date) => {
    if (!date) return "Date TBD";
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to check if event is upcoming
  const isUpcoming = (date) => {
    return new Date(date) > new Date();
  };

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Home", icon: Home, path: "/" },
    { name: "Blog", icon: Newspaper, path: "/blog" },
    { name: "News", icon: Megaphone, path: "/news" },
    { name: "Events", icon: CalendarDays, path: "/events", active: true },
    { name: "Donations", icon: HandHeart, path: "/donations" },
    // { name: "Community", icon: Users, path: "/community" },
  ];

  const sampleEvents = [
    {
      _id: "1",
      title: "Women in Leadership Conference",
      description:
        "Join us for an inspiring conference featuring successful women leaders sharing their journeys and insights.",
      date: "2024-04-15",
      time: "9:00 AM - 5:00 PM",
      location: "Convention Center, New York",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=300&fit=crop",
      category: "conference",
      capacity: 200,
      price: "0",
      registrationLink: "#",
    },
    {
      _id: "2",
      title: "Career Development Workshop",
      description:
        "Enhance your professional skills with our comprehensive career development workshop.",
      date: "2024-04-22",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual Event",
      image:
        "https://images.unsplash.com/photo-1515168833906-d2a3b82daa4e?w=500&h=300&fit=crop",
      category: "workshop",
      capacity: 50,
      price: "0",
      registrationLink: "#",
    },
  ];

  // Use sample data if no events from API
  const displayEvents =
    filteredEvents.length > 0 ? filteredEvents : sampleEvents;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Valuable Women
              </h2>
              <p className="text-xs text-gray-500">Events Platform</p>
            </div>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    item.active
                      ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-r-2 border-purple-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      item.active ? "text-purple-600" : "text-gray-400"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User className="text-white w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Event Attendee
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userRole || "Member"}
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link
              to="/profile"
              className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors text-center"
            >
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors flex items-center justify-center space-x-1"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Upcoming Events
                </h1>
                <p className="text-sm text-gray-500">
                  Join our empowering events and connect with the community
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Add Event Button */}
              {userRole === "admin" && (
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Create Event</span>
                </button>
              )}

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="text-white w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Search Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  <span>{displayEvents.length} upcoming events</span>
                </div>
              </div>
            </div>
          </div>

          {/* Events Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse"
                >
                  <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayEvents.map((event) => (
                <article
                  key={event._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => openEventModal(event)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        event.image ||
                        "https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=500&h=300&fit=crop"
                      }
                      alt={event.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.category === "workshop"
                            ? "bg-purple-100 text-purple-700"
                            : event.category === "conference"
                            ? "bg-blue-100 text-blue-700"
                            : event.category === "networking"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {event.category}
                      </span>
                    </div>
                    {!isUpcoming(event.date) && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                          Past Event
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-1" />
                      {getEventDate(event.date)}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{event.time || "Time TBD"}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                      {event.capacity && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{event.capacity} spots</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {event.price === "0" || !event.price ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Free
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            ${event.price}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Bookmark className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Share2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && displayEvents.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No events found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or check back later for new
                events.
              </p>
              {userRole === "admin" && (
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Create First Event</span>
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Event View Modal */}
      {viewModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Event Details
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <img
                src={
                  selectedEvent.image ||
                  "https://images.unsplash.com/photo-1542736667-069246bdbc6d?w=800&h=400&fit=crop"
                }
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{getEventDate(selectedEvent.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedEvent.time || "Time TBD"}</span>
                  </div>
                  {selectedEvent.capacity && (
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{selectedEvent.capacity} spots</span>
                    </div>
                  )}
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedEvent.category === "workshop"
                      ? "bg-purple-100 text-purple-700"
                      : selectedEvent.category === "conference"
                      ? "bg-blue-100 text-blue-700"
                      : selectedEvent.category === "networking"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {selectedEvent.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedEvent.title}
              </h1>

              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-lg text-gray-700">
                  {selectedEvent.location}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                {selectedEvent.description}
              </p>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <Bookmark className="w-5 h-5" />
                    <span>Save</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  {selectedEvent.registrationLink && (
                    <a
                      href={selectedEvent.registrationLink}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                    >
                      <Ticket className="w-5 h-5" />
                      <span>Register Now</span>
                    </a>
                  )}

                  {userRole === "admin" && (
                    <button
                      onClick={() => handleDeleteEvent(selectedEvent._id)}
                      className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-3 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash className="w-4 h-4" />
                      <span>Delete Event</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Create New Event
              </h2>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewEvent({
                      ...newEvent,
                      image: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Category
                </label>
                <select
                  name="category"
                  value={newEvent.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories
                    .filter((c) => c.value !== "all")
                    .map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleChange}
                  placeholder="Enter event title..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={newEvent.location}
                  onChange={handleChange}
                  placeholder="Enter event location..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={newEvent.capacity}
                    onChange={handleChange}
                    placeholder="Number of attendees"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newEvent.price}
                    onChange={handleChange}
                    placeholder="0 for free"
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Link
                </label>
                <input
                  type="url"
                  name="registrationLink"
                  value={newEvent.registrationLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleChange}
                  placeholder="Describe your event..."
                  rows="4"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  onClick={() => setAddModalOpen(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Create Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
