import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Home,
  Clock,
  ClipboardList,
  FileText,
  Folder,
  User,
  Settings,
  Languages,
  Bell,
  Flame,
  LogOut,
  LayoutDashboard,
  Newspaper,
  CalendarDays,
  HandHeart,
  Megaphone,
} from "lucide-react";

const HomeDash = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hasFetched = useRef(false);
  const userId = localStorage.getItem("userId");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    localStorage.removeItem("userId");
    alert("Logged out successfully.");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={closeSidebar}
      ></div>
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white w-64 transition-transform transform md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-2xl font-semibold text-green-500">Dashboard</h2>
          <button onClick={closeSidebar} className="text-gray-600 md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <a
                href="/"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200 group"
              >
                {" "}
                <Home
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Home
              </a>
            </li>
            <li>
              <a
                href="/set-reminder"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200 group"
              >
                {" "}
                <LayoutDashboard
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/submissions1"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200 group"
              >
                {" "}
                <Newspaper
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Blog Posts
              </a>
            </li>
            <li>
              <a
                href="/submissions"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200 group"
              >
                {" "}
                <Megaphone
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                News
              </a>
            </li>
            <li>
              <a
                href="/projects"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200 group"
              >
                {" "}
                <CalendarDays
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Events
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200 group"
              >
                <HandHeart
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Donations
              </a>
            </li>
            <li>
              <a
                href="/languages"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200 group"
              >
                {" "}
                <User
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Profile
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="flex items-center gap-3 py-2 px-4 text-gray-800 hover:bg-green-500 hover:text-white transition duration-200 group"
              >
                <Settings
                  size={18}
                  className="text-green-600 group-hover:text-white transition duration-200"
                />
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div
        className="flex-1 flex flex-col ml-0 md:ml-64 transition-all duration-300 w-full  "
        // style={{ backgroundImage: `url(${bgImg})` }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>{" "} */}
        {/* Navbar */}
        <header className="bg-green-500 text-white p-4 fixed w-full top-0 left-0 z-10 shadow-md">
          <div className="flex items-center justify-between">
            <button onClick={toggleSidebar} className="md:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-bold text-white flext items-start justify-start">
              {/* DX */}
            </h1>
            <div className="flex items-center  space-x-4">
              <button className="text-white">
                {" "}
                <a href="/profile">
                  <Bell
                    size={18}
                    className="text-white group-hover:text-gray-900 transition duration-200"
                  />
                </a>
              </button>
              <button className="text-white">
                <a href="/profile">
                  <User
                    size={18}
                    className="text-white group-hover:text-gray-700 transition duration-200"
                  />
                </a>
              </button>
              <button className="text-white" onClick={handleLogout}>
                <a href="/">
                  <LogOut
                    size={18}
                    className="text-white group-hover:text-gray-700 transition duration-200"
                  />
                </a>
              </button>
              <button className=" flex justify-center gap-2 text-white ">
                {" "}
                <a
                  href="/streak"
                  className="flex justify-center gap-2 text-white"
                >
                  <Flame size={18} className="text-white gap-0 p-0 m-0" />{" "}
                  <span className="text-white font-bold"> days</span>
                </a>
              </button>
            </div>
          </div>
        </header>
        {/* Main Dashboard Section */}
        <main className="flex-grow p-6 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-4 sm:gap-2 lg:grid-cols-3 gap-6 ">
            {/* Mission and vison statement with lorem ipsum */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200 mb-3">
              <h3 className="text-xl font-semibold text-gray-800">
                Our Mission
              </h3>
              <p className="text-gray-600  ">
                To encourage women discover their value and develop their
                strengths and achieve their freedom thereby creating a POSITIVE
                IMPACT in their lives and beyond.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200 mb-3">
              <h3 className="text-xl font-semibold text-gray-800">
                The Vision
              </h3>
              <p className="text-gray-600  ">
                To be beacons of HOPE to the girl child shining brightly and
                overtaking in Africa and the WORLD at large.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-4 sm:gap-2 lg:grid-cols-3 gap-6 mt-2">
            {/* Set Daily Timer Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Set Daily Timer
              </h3>
              <p className="text-gray-600 mt-2">
                Stay productive by managing your daily coding tasks and setting
                a timer to track your progress.
              </p>
              <button className="mt-4 text-indigo-600 hover:text-indigo-700">
                <a href="/set-reminder">Configure Timer</a>
              </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800">Profile</h3>
              <p className="text-gray-600 mt-2">
                View and manage your personal details and preferences.
              </p>
              <button className="mt-4 text-indigo-600 hover:text-indigo-700">
                <a href="/profile">View Profile</a>
              </button>
            </div>

            {/* Projects Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800">Projects</h3>
              <p className="text-gray-600 mt-2">
                Manage your coding projects, track progress, and collaborate.
              </p>
              <button className="mt-4 text-indigo-600 hover:text-indigo-700">
                <a href="/projects"> View Projects</a>
              </button>
            </div>

            {/* Settings Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800">Settings</h3>
              <p className="text-gray-600 mt-2">
                Configure your dashboard settings, theme, and notifications.
              </p>
              <button className="mt-4 text-indigo-600 hover:text-indigo-700">
                <a href="/settings">Go to Settings</a>
              </button>
            </div>

            {/* Languages Card */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200">
              <h3 className="text-xl font-semibold text-gray-800">
                Your Preferred Languages
              </h3>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeDash;
