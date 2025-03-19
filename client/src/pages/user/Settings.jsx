import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Bell,
  Lock,
  User,
  Moon,
  Sun,
  Settings as SettingsIcon,
  LogOut,
  X,
} from "lucide-react";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedSettings, setUpdatedSettings] = useState({});
  const userToken = localStorage.getItem("token");

  // Handle input change in the settings form
  const handleChange = (e) => {
    setUpdatedSettings({ ...updatedSettings, [e.target.name]: e.target.value });
  };

  // Handle settings update
  const handleUpdateSettings = () => {
    toast.success("Settings updated successfully!");
    setIsEditing(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-purple-500 to-blue-500 items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <SettingsIcon size={24} /> Settings
        </h2>

        {/* Account Settings */}
        <div className="mt-6 border-b pb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <User size={20} /> Account Settings
          </h3>
          <p className="text-gray-600">
            Update your profile and account details.
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            Edit Profile
          </button>
        </div>

        {/* Notifications */}
        <div className="mt-6 border-b pb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Bell size={20} /> Notifications
          </h3>
          <p className="text-gray-600">Manage email and SMS notifications.</p>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Email Notifications
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            SMS Alerts
          </label>
        </div>

        {/* Privacy & Security */}
        <div className="mt-6 border-b pb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Lock size={20} /> Privacy & Security
          </h3>
          <p className="text-gray-600">Manage privacy settings and security.</p>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" />
            Enable Two-Factor Authentication (2FA)
          </label>
        </div>

        {/* Appearance */}
        <div className="mt-6 border-b pb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />} Appearance
          </h3>
          <p className="text-gray-600">Switch between light and dark mode.</p>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="mt-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              placeholder="New Email"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="New Password"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleUpdateSettings}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg w-full"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
