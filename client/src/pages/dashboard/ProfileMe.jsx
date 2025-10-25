import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Heart,
  Shield,
  Award,
  Edit3,
  Save,
  X,
  LogOut,
  Camera,
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Bell,
  Lock,
  Users,
  Star,
  Zap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const userToken = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${API_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setUser(data);
        setUpdatedUser(data);
      } catch (error) {
        toast.error("Failed to load profile.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Handle input change in the edit form
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Update profile
  const handleUpdateProfile = async () => {
    try {
      await axios.put(`${API_URL}/api/users/update`, updatedUser, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      toast.success("Profile updated successfully! 🎉");
      setIsEditing(false);
      setUser(updatedUser);
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const stats = [
    { label: "Events Attended", value: "12", icon: Calendar },
    { label: "Community Points", value: "1.2k", icon: Award },
    { label: "Resources Viewed", value: "45", icon: BookOpen },
    { label: "Days Active", value: "156", icon: Zap },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                  <User className="w-10 h-10 text-white" />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform">
                  <Camera className="w-4 h-4 text-purple-600" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  {user?.title} {user?.firstName} {user?.lastName}
                </h1>
                <p className="text-purple-100 flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>{user?.email}</span>
                  {user?.isVerified && (
                    <CheckCircle className="w-4 h-4 text-green-300" />
                  )}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                    {user?.role}
                  </span>
                  {user?.isVerified && (
                    <span className="bg-green-500/20 px-2 py-1 rounded-full text-xs font-medium text-green-300 flex items-center space-x-1">
                      <Shield className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center space-x-2 border border-white/30"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500/20 backdrop-blur-sm text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-500/30 transition-all flex items-center space-x-2 border border-red-300/30"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <nav className="space-y-2">
                {[
                  { id: "profile", label: "Profile Information", icon: User },
                  { id: "activity", label: "Activity", icon: Award },
                  { id: "settings", label: "Settings", icon: Settings },
                  { id: "privacy", label: "Privacy", icon: Lock },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 border-r-2 border-purple-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`w-5 h-5 ${
                        activeTab === item.id
                          ? "text-purple-600"
                          : "text-gray-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Stats Summary */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Your Impact
                </h3>
                <div className="space-y-3">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <stat.icon className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm text-gray-600">
                          {stat.label}
                        </span>
                      </div>
                      <span className="font-bold text-gray-900">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Personal Information
                    </h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-purple-600 hover:text-purple-700 font-medium flex items-center space-x-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Full Name</p>
                          <p className="font-medium text-gray-900">
                            {user?.title} {user?.firstName} {user?.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-900">
                            {user?.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-gray-900">
                            {user?.phone || "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Briefcase className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Occupation</p>
                          <p className="font-medium text-gray-900">
                            {user?.occupation || "Not specified"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Marital Status
                          </p>
                          <p className="font-medium text-gray-900">
                            {user?.maritalStatus || "Not specified"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-500">Date of Birth</p>
                          <p className="font-medium text-gray-900">
                            {user?.dateOfBirth
                              ? new Date(user.dateOfBirth).toLocaleDateString()
                              : "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium text-gray-900">
                          {user?.address || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm text-gray-500">Nationality</p>
                        <p className="font-medium text-gray-900">
                          {user?.nationality || "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Social Links
                  </h2>
                  <div className="flex space-x-4">
                    {user?.socialLinks?.twitter && (
                      <a
                        href={user.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-400 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                        <span>Twitter</span>
                      </a>
                    )}
                    {user?.socialLinks?.linkedin && (
                      <a
                        href={user.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                    {user?.socialLinks?.instagram && (
                      <a
                        href={user.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                        <span>Instagram</span>
                      </a>
                    )}
                    {!user?.socialLinks?.twitter &&
                      !user?.socialLinks?.linkedin &&
                      !user?.socialLinks?.instagram && (
                        <p className="text-gray-500">No social links added</p>
                      )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-500 text-center py-8">
                    Activity tracking coming soon...
                  </p>
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Account Settings
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-500 text-center py-8">
                    Settings management coming soon...
                  </p>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Privacy Settings
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-500 text-center py-8">
                    Privacy controls coming soon...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={updatedUser.firstName || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={updatedUser.lastName || ""}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <input
                  type="text"
                  name="occupation"
                  value={updatedUser.occupation || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={updatedUser.phone || ""}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={updatedUser.address || ""}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateProfile}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Add missing icon component
const BookOpen = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const Settings = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export default Profile;
