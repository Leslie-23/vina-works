import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import africanCountries from "../utility/africanCountries";

const Register = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    nationality: "",
    customNationality: "",
    occupation: "",
    maritalStatus: "",
    dateOfBirth: "",
    address: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const {
      email,
      password,
      confirmPassword,
      phone,
      dateOfBirth,
      occupation,
      address,
    } = formData;

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    // if (!phone.match(/^\d{10,15}$/)) {
    //   toast.error("Phone number must be between 10 and 15 digits.");
    //   return false;
    // }

    const birthDate = new Date(dateOfBirth);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (age < 16) {
      toast.error("You must be at least 16 years old.");
      return false;
    }

    if (occupation.length > 30) {
      toast.error("Occupation should not exceed 30 characters.");
      return false;
    }

    if (address.length > 50) {
      toast.error("Address should not exceed 50 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        formData
      );

      if (response.status === 201) {
        toast.success("Signup successful!");

        // Save email to localStorage
        localStorage.setItem("email", formData.email);
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("userId", data.user.id);

        // Save user details (excluding password) to sessionStorage
        const { password, confirmPassword, ...userData } = formData;
        sessionStorage.setItem("userDetails", JSON.stringify(userData));

        // Redirect to OTP verification
        navigate("/verify-otp");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-500 to-blue-500 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-purple-600 text-center mb-6">
          Register with Us <hr />
          <span className="text-sm">Valuable Women</span>
        </h2>
        <div className="overflow-y-auto max-h-[70vh] px-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title Dropdown */}
            <select
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg  focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
              required
            >
              <option value="">Select Title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
              <option value="Dr">Dr</option>
              <option value="Prof">Prof</option>
            </select>
            <div className="grid grid-cols-1  lg:grid-cols- md:grid-cols-2 sm:grid-cols-2  2 gap-6 w-full">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50  "
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
                required
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2   lg:grid-cols-2 gap-6 w-full">
              {/* Password Input with Toggle */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Set Password"
                  className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={18} style={{ color: "gray" }} />
                  ) : (
                    <Eye size={18} style={{ color: "green" }} />
                  )}
                </button>
              </div>

              {/* Confirm Password Input with Toggle */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="w-full p-3 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} style={{ color: "gray" }} />
                  ) : (
                    <Eye size={18} style={{ color: "green" }} />
                  )}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2   lg:grid-cols-2 gap-6 w-full">
              {/* Nationality Dropdown */}
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
                required
              >
                <option value="">Select Nationality</option>
                {africanCountries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.flag} {country.name}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>

              {formData.nationality === "Other" && (
                <input
                  type="text"
                  name="customNationality"
                  value={formData.customNationality}
                  onChange={handleChange}
                  placeholder="Nationality"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
                  required
                />
              )}

              {/* Marital Status Dropdown */}
              <select
                name="maritalStatus"
                value={formData.maritalStatus}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
                required
              >
                <option value="">Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
              required
            />
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Occupation (Max 30 chars)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
              maxLength="30"
              required
            />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address (Max 50 chars)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
              maxLength="50"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (10-15 digits)"
              className="w-full p-3 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50 "
              required
            />
          </form>
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white p-3 rounded-lg font-semibold hover:bg-purple-600 transition"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="text-center text-sm text-gray-600 mt-4">
          Do you have an account?{" "}
          <a href="/login" className="text-[#A855F7] hover:underline">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
