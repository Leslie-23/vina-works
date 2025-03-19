import React from "react";
import { Link } from "react-router-dom";
import {
  Newspaper,
  Quote,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowLeft,
  Home,
} from "lucide-react";

const NotFound = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-500 to-blue-500 px-4 text-white">
        <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
        <p className="text-xl font-semibold mt-4">Oops! Page Not Found.</p>
        <p className="text-gray-300 mt-2 text-center">
          The page you're looking for might have been removed or is temporarily
          unavailable.
        </p>

        {/* Button to Redirect */}
        <Link to="/">
          <button className="mt-6 bg-[#A855F7] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#9333EA] transition">
            Go Back Home <Home className="inline" size={18} />
          </button>
        </Link>

        <Link to={-1}>
          <button className="mt-6 bg-[#A855F7] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#9333EA] transition">
            Previous Page <ArrowLeft className="inline" size={18} />
          </button>
        </Link>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 text-gray-300 text-sm">
          <p>Valuable Women &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto px-6 md:flex md:justify-between">
          {/* Left Section: Brand Info */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">Valuable Women</h2>
            <p className="text-gray-400 mt-2 max-w-sm">
              Breaking boundaries and empowering women to achieve greatness
              through support and education.
            </p>
          </div>

          {/* Center Section: Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {["Home", "Blog", "Events", "Donations", "Profile", "Contact"].map(
              (link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  {link}
                </a>
              )
            )}
          </div>

          {/* Right Section: Social Icons */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-300 hover:text-white transition"
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Valuable Women. All Rights Reserved.
        </div>
      </footer>
    </>
  );
};

export default NotFound;
