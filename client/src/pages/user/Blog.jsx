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

const Blog = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", image: "" });

  const [selectedBlog, setSelectedBlog] = useState(null);
  const userRole = localStorage.getItem("role"); // User role (admin, editor, user)
  const userToken = localStorage.getItem("token"); // Auth token

  // Toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/api/blogs`);
        setBlogs(data);
      } catch (error) {
        toast.error("Failed to fetch blogs.");
      }
    };
    fetchBlogs();
  }, []);

  // Open Blog View Modal
  const openBlogModal = (blog) => {
    setSelectedBlog(blog);
    setModalOpen(true);
  };

  // Close Blog Modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedBlog(null);
  };

  // Delete Blog
  const handleDeleteBlog = async (blogId) => {
    try {
      await axios.delete(`${API_URL}/api/blogs/${blogId}`, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
      closeModal();
      toast.success("Blog deleted successfully!");
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("You don't have permission to delete blogs.");
      } else {
        toast.error(error.response?.data?.message || "Failed to delete blog.");
      }
    }
  };

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => {
    setAddModalOpen(false);
    setNewBlog({ title: "", content: "", image: "" });
  };

  // Handle Input Change for Adding Blog
  const handleChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  // Add Blog
  const handleAddBlog = async () => {
    try {
      const { data } = await axios.post(`${API_URL}/api/blogs`, newBlog, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setBlogs([...blogs, data]);
      closeAddModal();
      toast.success("Blog added successfully!");
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("You don't have permission to add blogs.");
      } else {
        toast.error("Failed to add blog.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black z-40 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={closeSidebar}
      ></div>
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white w-64 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow-md`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold text-purple-500">Dashboard</h2>
          <button
            onClick={closeSidebar}
            className="text-gray-600 md:hidden hover:text-purple-500 hover:scale-110 "
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
            <button onClick={toggleSidebar} className="md:hidden text-white">
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

        {/* Blog Section */}
        <main className="flex-grow p-6 pt-20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Latest Blogs{" "}
            </h2>
            <button
              onClick={openAddModal}
              className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition "
            >
              <PlusCircle size={18} /> Add Blog
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
                onClick={() => openBlogModal(blog)}
              >
                <img
                  src={blog.image || "https://via.placeholder.com/300"}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-xl font-bold mt-2">{blog.title}</h3>
                <p className="text-gray-600">{blog.content.slice(0, 100)}...</p>
                <button
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="mt-2 flex items-center gap-1 text-red-500 hover:text-red-700 transition"
                >
                  <Trash size={12} />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Blog View Modal */}
      {modalOpen && selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <img
              src={selectedBlog.image || "https://via.placeholder.com/500"}
              alt={selectedBlog.title}
              className="w-full h-60 object-cover rounded-md"
            />
            <h3 className="text-2xl font-bold mt-4">{selectedBlog.title}</h3>
            <p className="text-gray-700 mt-2">{selectedBlog.content}</p>
            {/* {userRole === "admin" && (
              <button
                onClick={() => handleDeleteBlog(selectedBlog._id)}
                className="mt-4 flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <Trash size={18} /> Delete Blog
              </button>
            )} */}
          </div>
        </div>
      )}

      {addModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-b from bg-purple-500 to-blue-500  bg-opacity-50 flex justify-center items-center z-50">
          <button
            onClick={() => setAddModalOpen(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewBlog({
                  ...newBlog,
                  image: URL.createObjectURL(e.target.files[0]),
                  // the above line save me so musch time and makes cloudinary vweeryy unnecesary
                })
              }
              className="w-full p-2 border rounded mb-2"
              placeholder="Image"
            />

            <input
              type="text"
              name="title"
              value={newBlog.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              name="content"
              value={newBlog.content}
              onChange={handleChange}
              placeholder="Content"
              className="w-full p-2 border rounded mb-2"
            ></textarea>

            <button
              onClick={handleAddBlog}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
