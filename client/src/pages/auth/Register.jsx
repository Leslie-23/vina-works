import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  MapPin,
  Phone,
  Calendar,
  Briefcase,
  Heart,
  ArrowRight,
  CheckCircle,
  XCircle,
} from "lucide-react";
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
  const [currentStep, setCurrentStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: [],
  });

  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Account Details" },
    { number: 3, title: "Additional Info" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check password strength in real-time
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const feedback = [];
    let score = 0;

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push("At least 8 characters");
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One uppercase letter");
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One lowercase letter");
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One number");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push("One special character");
    }

    setPasswordStrength({ score, feedback });
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength.score <= 2) return "bg-red-500";
    if (passwordStrength.score <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const validateStep = (step) => {
    const { firstName, lastName, email, title, maritalStatus, dateOfBirth } =
      formData;

    switch (step) {
      case 1:
        if (!firstName.trim() || !lastName.trim() || !email.trim() || !title) {
          toast.error("Please fill in all required personal information.");
          return false;
        }
        if (!email.match(/^\S+@\S+\.\S+$/)) {
          toast.error("Please enter a valid email address.");
          return false;
        }
        return true;

      case 2:
        if (!formData.password || !formData.confirmPassword) {
          toast.error("Please fill in all password fields.");
          return false;
        }
        if (formData.password.length < 6) {
          toast.error("Password must be at least 6 characters.");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match.");
          return false;
        }
        return true;

      case 3:
        if (!maritalStatus || !dateOfBirth || !formData.nationality) {
          toast.error("Please fill in all required additional information.");
          return false;
        }
        const birthDate = new Date(dateOfBirth);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        if (age < 16) {
          toast.error("You must be at least 16 years old.");
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/auth/register`,
        formData
      );

      if (response.status === 201) {
        toast.success("🎉 Registration successful! Please verify your email.");

        // Save email to localStorage
        localStorage.setItem("email", formData.email);

        // Save user details (excluding password) to sessionStorage
        const { password, confirmPassword, ...userData } = formData;
        sessionStorage.setItem("userDetails", JSON.stringify(userData));

        // Redirect to OTP verification
        navigate("/verify-otp");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-semibold transition-all duration-300 ${
                  currentStep >= step.number
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle size={20} />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-xs mt-2 font-medium ${
                  currentStep >= step.number
                    ? "text-purple-600"
                    : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                  currentStep > step.number ? "bg-purple-600" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Personal Information
        </h2>
        <p className="text-gray-600 mt-2">Tell us a bit about yourself</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white appearance-none"
            required
          >
            <option value="">Select Title</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
          </select>
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div className="relative">
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white appearance-none"
            required
          >
            <option value="">Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
          <Heart className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div className="relative">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="relative">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          required
        />
        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Account Security</h2>
        <p className="text-gray-600 mt-2">Create a secure password</p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create Password"
            className="w-full p-4 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {formData.password && (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Password strength:</span>
              <span
                className={`font-medium ${
                  passwordStrength.score <= 2
                    ? "text-red-600"
                    : passwordStrength.score <= 3
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {passwordStrength.score <= 2
                  ? "Weak"
                  : passwordStrength.score <= 3
                  ? "Good"
                  : "Strong"}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              />
            </div>
            {passwordStrength.feedback.length > 0 && (
              <div className="text-sm text-gray-600 space-y-1">
                {passwordStrength.feedback.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <XCircle size={14} className="text-red-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full p-4 pl-12 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {formData.confirmPassword &&
          formData.password !== formData.confirmPassword && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <XCircle size={16} />
              <span>Passwords do not match</span>
            </div>
          )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Additional Information
        </h2>
        <p className="text-gray-600 mt-2">Complete your profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white appearance-none"
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
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {formData.nationality === "Other" && (
          <div className="relative">
            <input
              type="text"
              name="customNationality"
              value={formData.customNationality}
              onChange={handleChange}
              placeholder="Enter Nationality"
              className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              required
            />
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        )}

        <div className="relative">
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div className="relative">
          <input
            type="text"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            placeholder="Occupation"
            className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            maxLength="30"
            required
          />
          <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full Address"
            className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            maxLength="50"
            required
          />
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div className="relative">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full p-4 pl-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors mb-4"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Join <span className="text-purple-600">Valuable Women</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Start your journey to empowerment and growth
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Progress Bar */}
          {renderStepIndicator()}

          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit}>
              {/* Step Content */}
              <div className="min-h-[400px]">
                {currentStep === 1 && renderStep1()}
                {currentStep === 2 && renderStep2()}
                {currentStep === 3 && renderStep3()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 border-t border-gray-100">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    currentStep === 1
                      ? "invisible"
                      : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                  disabled={currentStep === 1}
                >
                  Back
                </button>

                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all flex items-center space-x-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Registration</span>
                        <CheckCircle className="w-5 h-5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>

            {/* Login Link */}
            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-600 font-semibold hover:text-purple-700 transition-colors"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 flex items-center justify-center space-x-1">
            <Lock className="w-4 h-4" />
            <span>Your information is securely encrypted and protected</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
