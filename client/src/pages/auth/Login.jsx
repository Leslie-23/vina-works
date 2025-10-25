import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  User,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";

const Login = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validateForm = () => {
    const { email, password } = credentials;

    if (!email.trim()) {
      toast.error("Please enter your email address.");
      return false;
    }

    if (!email.match(/^\S+@\S+\.\S+$/)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!password) {
      toast.error("Please enter your password.");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setError("");
    setIsLoading(true);

    try {
      const { email, password } = credentials;
      const { status, data } = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      if (status === 200) {
        // Store authentication data
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);

        // Store user details
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // Remember me functionality
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        toast.success(
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Welcome back! Login successful.</span>
          </div>
        );

        navigate("/dashboard");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
      toast.error(
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Check for remembered email on component mount
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setCredentials((prev) => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors mb-6"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <Zap className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Valuable<span className="text-purple-600">Women</span>
            </h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to continue your empowerment journey
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fadeIn">
              <div className="flex items-center space-x-2 text-red-700">
                <Shield className="w-5 h-5" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                  disabled={isLoading}
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full p-4 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  required
                  disabled={isLoading}
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                disabled={isLoading}
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-700">
                Remember me on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Alternative Actions */}
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                Join our community
              </Link>
            </p>

            {/* Quick Demo Access (optional) */}
            <div className="pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setCredentials({
                    email: "demo@valuablewomen.org",
                    password: "demo123",
                  });
                }}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                disabled={isLoading}
              >
                Try demo credentials
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-center justify-center space-x-2 text-blue-700">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">
              Your login is secure and encrypted
            </span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          {[
            { icon: User, label: "Community" },
            { icon: Zap, label: "Empowerment" },
            { icon: Shield, label: "Secure" },
          ].map((item, index) => (
            <div key={index} className="text-gray-600">
              <item.icon className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
