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
} from "lucide-react";

const News = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const [news, setNews] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newNews, setNewNews] = useState({ title: "", content: "", image: "" });
  const userRole = localStorage.getItem("role");
  const userToken = localStorage.getItem("token");

  // Fetch News
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/news`);
        setNews(data);
      } catch (error) {
        toast.error("Failed to fetch news.");
      }
    };
    fetchNews();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setNewNews({ ...newNews, [e.target.name]: e.target.value });
  };

  // Add News (Admins Only)
  const handleAddNews = async () => {
    if (userRole !== "admin") {
      toast.error("You don't have permission to add news.");
      return;
    }
    try {
      const { data } = await axios.post(`${API_URL}/api/news`, newNews, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setNews([...news, data]);
      setAddModalOpen(false);
      toast.success("News added successfully!");
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Access Denied: You don't have permission to add news.");
      }
      toast.error("Failed to add news.");
    }
  };

  // Delete News (Admins Only)
  const handleDeleteNews = async (newsId) => {
    if (userRole !== "admin") {
      toast.error("You don't have permission to delete news.");
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black z-40 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white w-64 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow-md`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold text-purple-500">Dashboard</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-600 md:hidden hover:text-purple-500"
          >
            ✕
          </button>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            {[
              { name: "Home", icon: Home, link: "/" },
              { name: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
              { name: "Blog Posts", icon: Newspaper, link: "/blog" },
              { name: "News", icon: Megaphone, link: "/news" },
              { name: "Events", icon: CalendarDays, link: "/events" },
              { name: "Donations", icon: HandHeart, link: "/profile" },
              { name: "Profile", icon: User, link: "/profile" },
              { name: "Settings", icon: Settings, link: "/settings" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-purple-500 hover:text-white transition duration-200 rounded-md"
                >
                  <item.icon size={18} />
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300 w-full">
        <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 fixed w-full top-0 left-0 z-10 shadow-md">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-white"
            >
              ☰
            </button>
            <h1 className="text-2xl font-bold text-white">Valuable Women</h1>
            <div className="flex items-center space-x-4">
              <a href="/profile" className="text-white hover:text-gray-300">
                <Bell size={20} />
              </a>
              <a href="/profile" className="text-white hover:text-gray-300">
                <User size={20} />
              </a>
              <button
                onClick={() =>
                  localStorage.clear() || (window.location.href = "/login")
                }
                className="text-white hover:text-gray-300"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* News Section */}
        <div className="flex flex-col min-h-screen bg-gray-100 p-6">
          <div className="flex justify-between items-center mt-12">
            <h1 className="text-2xl font-bold">Latest News</h1>

            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center gap-2"
            >
              <PlusCircle size={18} /> Add News
            </button>
          </div>

          <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {news.map((newsItem) => (
              <div
                key={newsItem._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <img
                  src={newsItem.image || "https://via.placeholder.com/300"}
                  alt={newsItem.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-bold mt-2">{newsItem.title}</h3>
                <p className="text-gray-600">
                  {newsItem.content.slice(0, 100)}...
                </p>
                {userRole === "admin" && (
                  <button
                    onClick={() => handleDeleteNews(newsItem._id)}
                    className="mt-2 text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <Trash size={18} /> Delete
                  </button>
                )}
              </div>
            ))}
          </main>
        </div>

        {/* Add News Modal */}
        {addModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg relative">
              <button
                onClick={() => setAddModalOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                <X size={24} />
              </button>
              <input
                type="text"
                name="title"
                value={newNews.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 border rounded mb-2"
              />
              <textarea
                name="content"
                value={newNews.content}
                onChange={handleChange}
                placeholder="Content"
                className="w-full p-2 border rounded mb-2"
              ></textarea>
              <button
                onClick={handleAddNews}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
