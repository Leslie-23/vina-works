import React, { useState, useRef } from "react";
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
  Flame,
  Menu,
  X,
  Zap,
  Users,
  Trophy,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Star,
  TrendingUp,
  Eye,
  Heart,
  Share2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const HomeDash = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("dashboard");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Home", icon: Home, path: "/" },
    { name: "Blog", icon: Newspaper, path: "/blog" },
    { name: "News", icon: Megaphone, path: "/news" },
    { name: "Events", icon: CalendarDays, path: "/events" },
    { name: "Donations", icon: HandHeart, path: "/donations" },
    // { name: "Community", icon: Users, path: "/community" },
    // { name: "Resources", icon: BookOpen, path: "/resources" },
  ];

  const stats = [
    {
      label: "Learning Streak",
      value: "12 days",
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      label: "Events Attended",
      value: "5",
      icon: Trophy,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      label: "Resources Viewed",
      value: "23",
      icon: BookOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      label: "Community Points",
      value: "1.2k",
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
  ];

  const upcomingEvents = [
    {
      title: "Women in Tech Conference",
      date: "Mar 25, 2024",
      time: "2:00 PM",
      type: "Virtual",
      attendees: 124,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
    },
    {
      title: "Leadership Workshop",
      date: "Apr 2, 2024",
      time: "10:00 AM",
      type: "In-Person",
      attendees: 45,
      image:
        "https://images.unsplash.com/photo-1515168833906-d2a3b82daa4e?w=400&h=200&fit=crop",
    },
    {
      title: "Career Development Session",
      date: "Apr 15, 2024",
      time: "3:00 PM",
      type: "Virtual",
      attendees: 89,
      image:
        "https://images.unsplash.com/photo-1551830416-5ed98c6dc750?w=400&h=200&fit=crop",
    },
  ];

  const recentActivities = [
    {
      action: "Completed",
      item: "Financial Literacy Course",
      time: "2 hours ago",
      icon: Trophy,
    },
    {
      action: "Registered for",
      item: "Women in Tech Conference",
      time: "1 day ago",
      icon: CalendarDays,
    },
    {
      action: "Earned badge",
      item: "Community Contributor",
      time: "2 days ago",
      icon: Star,
    },
    {
      action: "Shared",
      item: "Leadership Article",
      time: "3 days ago",
      icon: Share2,
    },
  ];

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
              <p className="text-xs text-gray-500">Dashboard</p>
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
            {navigationItems.map((item, index) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    activeNav === item.name.toLowerCase()
                      ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-r-2 border-purple-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      activeNav === item.name.toLowerCase()
                        ? "text-purple-600"
                        : "text-gray-400"
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
                Welcome Back!
              </p>
              <p className="text-xs text-gray-500 truncate">Member</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">
                  Welcome to your empowerment journey
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Streak Display */}
              <div className="hidden sm:flex items-center space-x-2 bg-orange-50 px-3 py-2 rounded-lg">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">
                  12 day streak
                </span>
              </div>

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
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome Back! 👋</h2>
                <p className="text-purple-100 max-w-2xl">
                  Continue your journey of growth and empowerment. You've
                  completed 65% of your monthly goals!
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-semibold">Top 15% Contributor</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.random() * 60 + 40}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Events */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Upcoming Events
                </h3>
                <Link
                  to="/events"
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>View All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-purple-200 hover:bg-purple-50 transition-all group"
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors truncate">
                        {event.title}
                      </h4>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>{event.date}</span>
                        <span>{event.time}</span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            event.type === "Virtual"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {event.type}
                        </span>
                      </div>
                    </div>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                      Register
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Recent Activity
                </h3>
                <Link
                  to="/activity"
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center space-x-1"
                >
                  <span>See All</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                      <activity.icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.action}</span>{" "}
                        {activity.item}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Our Mission</h3>
              </div>
              <p className="text-purple-100 leading-relaxed">
                Encourage women to discover their value and develop their
                strengths to achieve freedom and create positive impact in their
                communities.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">Our Vision</h3>
              </div>
              <p className="text-blue-100 leading-relaxed">
                To be beacons of HOPE to the girl child, shining brightly across
                Africa and beyond, empowering generations of women leaders.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeDash;
