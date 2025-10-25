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
  Edit,
  Eye,
  Search,
  Filter,
  Calendar,
  User as UserIcon,
  Clock,
  BookOpen,
  ArrowRight,
  Menu,
  Zap,
  Heart,
  Share2,
  Bookmark,
  MoreVertical,
  Globe,
  TrendingUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const News = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNews, setSelectedNews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newNews, setNewNews] = useState({
    title: "",
    content: "",
    image: "",
    excerpt: "",
    category: "general",
    source: "",
  });

  const userRole = localStorage.getItem("role");
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const categories = [
    { value: "all", label: "All News" },
    { value: "general", label: "General" },
    { value: "updates", label: "Updates" },
    { value: "events", label: "Events" },
    { value: "achievements", label: "Achievements" },
    { value: "community", label: "Community" },
  ];

  // Fetch News
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API_URL}/api/news`);
        setNews(data);
        setFilteredNews(data);
      } catch (error) {
        toast.error("Failed to fetch news.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Filter news based on search
  useEffect(() => {
    let filtered = news;

    if (searchTerm) {
      filtered = filtered.filter(
        (newsItem) =>
          newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          newsItem.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (newsItem.category &&
            newsItem.category.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredNews(filtered);
  }, [searchTerm, news]);

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Handle Input Change
  const handleChange = (e) => {
    setNewNews({ ...newNews, [e.target.name]: e.target.value });
  };

  // Open News View Modal
  const openNewsModal = (newsItem) => {
    setSelectedNews(newsItem);
    setViewModalOpen(true);
  };

  // Close News Modal
  const closeModal = () => {
    setViewModalOpen(false);
    setSelectedNews(null);
  };

  // Add News (Admins Only)
  const handleAddNews = async () => {
    if (userRole !== "admin") {
      toast.error("You don't have permission to add news.");
      return;
    }

    if (!newNews.title || !newNews.content || !newNews.excerpt) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/api/news`, newNews, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setNews([...news, data]);
      setAddModalOpen(false);
      setNewNews({
        title: "",
        content: "",
        image: "",
        excerpt: "",
        category: "general",
        source: "",
      });
      toast.success("News published successfully! 🎉");
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Access Denied: You don't have permission to add news.");
      } else {
        toast.error("Failed to publish news.");
      }
    }
  };

  // Delete News (Admins Only)
  const handleDeleteNews = async (newsId) => {
    if (userRole !== "admin") {
      toast.error("You don't have permission to delete news.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this news article?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/news/${newsId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setNews(news.filter((newsItem) => newsItem._id !== newsId));
      toast.success("News deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete news.");
    }
  };

  const navigationItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Home", icon: Home, path: "/" },
    { name: "Blog", icon: Newspaper, path: "/blog" },
    { name: "News", icon: Megaphone, path: "/news", active: true },
    { name: "Events", icon: CalendarDays, path: "/events" },
    { name: "Donations", icon: HandHeart, path: "/donations" },
    // { name: "Community", icon: UserIcon, path: "/community" },
  ];

  const sampleNews = [
    {
      _id: "1",
      title: "New Empowerment Program Launched",
      excerpt:
        "We're excited to announce our new women empowerment program starting next month.",
      content: "Full content about the new empowerment program...",
      image:
        "https://images.unsplash.com/photo-1551836026-d5c8c2a6d7a7?w=500&h=300&fit=crop",
      category: "updates",
      source: "Valuable Women",
      date: "2024-03-20",
      readTime: "3 min read",
    },
    {
      _id: "2",
      title: "Community Outreach Success",
      excerpt:
        "Our recent community outreach program impacted over 500 women across the region.",
      content: "Full content about community outreach success...",
      image:
        "https://images.unsplash.com/photo-1551836026-d5c8c2a6d7a7?w=500&h=300&fit=crop",
      category: "achievements",
      source: "Valuable Women",
      date: "2024-03-18",
      readTime: "4 min read",
    },
  ];

  // Use sample data if no news from API
  const displayNews = filteredNews.length > 0 ? filteredNews : sampleNews;

  // Helper function to get date safely
  const getNewsDate = (date) => {
    if (!date) return new Date().toLocaleDateString();
    return new Date(date).toLocaleDateString();
  };

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
              <p className="text-xs text-gray-500">News Platform</p>
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
              <UserIcon className="text-white w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                News Reader
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
                  Latest News
                </h1>
                <p className="text-sm text-gray-500">
                  Stay updated with our latest announcements and stories
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Add News Button */}
              {userRole === "admin" && (
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Add News</span>
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
                  <UserIcon className="text-white w-4 h-4" />
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
                  placeholder="Search news articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span>{displayNews.length} news articles</span>
                </div>
              </div>
            </div>
          </div>

          {/* News Grid */}
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
              {displayNews.map((newsItem) => (
                <article
                  key={newsItem._id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => openNewsModal(newsItem)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={
                        newsItem.image ||
                        "https://images.unsplash.com/photo-1585829365295-ab7cd400d167?w=500&h=300&fit=crop"
                      }
                      alt={newsItem.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          newsItem.category === "updates"
                            ? "bg-purple-100 text-purple-700"
                            : newsItem.category === "achievements"
                            ? "bg-green-100 text-green-700"
                            : newsItem.category === "events"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {newsItem.category || "General"}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Clock className="w-4 h-4 mr-1" />
                      {newsItem.readTime || "3 min read"}
                      <span className="mx-2">•</span>
                      <Calendar className="w-4 h-4 mr-1" />
                      {getNewsDate(newsItem.date)}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                      {newsItem.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {newsItem.excerpt ||
                        (newsItem.content &&
                          newsItem.content.slice(0, 120) + "...") ||
                        "No content available"}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <Globe className="text-white w-3 h-3" />
                        </div>
                        <span className="text-sm text-gray-600">
                          {newsItem.source || "Valuable Women"}
                        </span>
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
          {!isLoading && displayNews.length === 0 && (
            <div className="text-center py-12">
              <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No news articles found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or check back later for
                updates.
              </p>
              {userRole === "admin" && (
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2 mx-auto"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Publish First News</span>
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      {/* News View Modal */}
      {viewModalOpen && selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">News Article</h2>
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
                  selectedNews.image ||
                  "https://images.unsplash.com/photo-1585829365295-ab7cd400d167?w=800&h=400&fit=crop"
                }
                alt={selectedNews.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>{selectedNews.source || "Valuable Women"}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{getNewsDate(selectedNews.date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedNews.readTime || "3 min read"}</span>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedNews.category === "updates"
                      ? "bg-purple-100 text-purple-700"
                      : selectedNews.category === "achievements"
                      ? "bg-green-100 text-green-700"
                      : selectedNews.category === "events"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {selectedNews.category || "General"}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedNews.title}
              </h1>
              <p className="text-gray-700 leading-relaxed text-lg">
                {selectedNews.content}
              </p>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <Heart className="w-5 h-5" />
                    <span>Like</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>

                {userRole === "admin" && (
                  <button
                    onClick={() => handleDeleteNews(selectedNews._id)}
                    className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash className="w-4 h-4" />
                    <span>Delete Article</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add News Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Publish News Article
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
                  Featured Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewNews({
                      ...newNews,
                      image: URL.createObjectURL(e.target.files[0]),
                    })
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={newNews.category}
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
                  News Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={newNews.title}
                  onChange={handleChange}
                  placeholder="Enter news headline..."
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source
                </label>
                <input
                  type="text"
                  name="source"
                  value={newNews.source}
                  onChange={handleChange}
                  placeholder="News source (optional)"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={newNews.excerpt}
                  onChange={handleChange}
                  placeholder="Write a brief summary of the news..."
                  rows="3"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={newNews.content}
                  onChange={handleChange}
                  placeholder="Write the full news content here..."
                  rows="8"
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
                  onClick={handleAddNews}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Publish News</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
