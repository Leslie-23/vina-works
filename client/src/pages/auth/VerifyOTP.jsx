import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowRight,
  Mail,
  Shield,
  CheckCircle,
  Clock,
  RefreshCw,
  Zap,
} from "lucide-react";

const VerifyOTP = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [verificationAttempts, setVerificationAttempts] = useState(0);
  const inputRefs = useRef([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    // Start countdown on component mount
    setCountdown(30);
  }, []);

  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow numbers and auto-advance
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if current box is filled
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      // Allow backspace to clear
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  // Handle backspace and arrow keys
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1].focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const pastedNumbers = pastedData.replace(/\D/g, "").slice(0, 6).split("");

    if (pastedNumbers.length === 6) {
      const newOtp = [...otp];
      pastedNumbers.forEach((num, index) => {
        newOtp[index] = num;
      });
      setOtp(newOtp);
      inputRefs.current[5].focus();
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      const response = await axios.post(`${API_URL}/api/auth/resend-otp`, {
        email,
      });

      if (response.status === 200) {
        toast.success(
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-green-500" />
            <span>New OTP sent to your email!</span>
          </div>
        );
        setCountdown(30);
        setOtp(["", "", "", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to resend OTP. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter the complete 6-digit code.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/verify-otp`, {
        email,
        otp: enteredOtp,
      });

      if (response.status === 200) {
        setVerificationAttempts(0);
        toast.success(
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Email verified successfully! Welcome to Valuable Women.</span>
          </div>
        );

        // Clear OTP from storage after successful verification
        localStorage.removeItem("email");

        // Redirect to login
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      const attempts = verificationAttempts + 1;
      setVerificationAttempts(attempts);

      if (attempts >= 3) {
        toast.error("Too many failed attempts. Please request a new OTP.");
        setCountdown(30);
        setOtp(["", "", "", "", "", ""]);
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      } else {
        toast.error(
          error.response?.data?.message ||
            "Invalid verification code. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const maskEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const maskedLocal =
      localPart.length > 2
        ? localPart.substring(0, 2) + "*".repeat(localPart.length - 2)
        : localPart;
    return `${maskedLocal}@${domain}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors mb-6"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span className="font-medium">Back to Registration</span>
          </Link>

          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center">
              <Shield className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Verify <span className="text-purple-600">Email</span>
            </h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Enter Verification Code
          </h2>
          <p className="text-gray-600">
            We've sent a 6-digit code to your email address
          </p>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Email Display */}
          <div className="flex items-center justify-center space-x-3 p-4 bg-purple-50 rounded-xl mb-6">
            <Mail className="w-5 h-5 text-purple-600" />
            <span className="text-gray-700 font-medium">
              {maskEmail(email || "your email")}
            </span>
          </div>

          {/* OTP Input Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700 text-center block">
                6-Digit Verification Code
              </label>

              <div className="flex justify-center gap-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={(e) => e.target.select()}
                    maxLength="1"
                    disabled={isLoading}
                    className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                ))}
              </div>

              {/* Countdown Timer */}
              <div className="text-center">
                {countdown > 0 ? (
                  <div className="flex items-center justify-center space-x-2 text-orange-600 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Resend available in {countdown}s</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
                  >
                    {isResending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
                        <span>Sending new code...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Resend verification code</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 6}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Verify Email</span>
                  <CheckCircle className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">Security Notice</p>
                <p className="mt-1">
                  This code expires in 10 minutes. Do not share it with anyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mt-8 space-y-4">
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-600">
              Didn't receive the code? Check your spam folder or{" "}
              <button
                onClick={handleResendOTP}
                disabled={countdown > 0 || isResending}
                className="text-purple-600 font-medium hover:text-purple-700 transition-colors disabled:opacity-50"
              >
                request a new one
              </button>
            </p>
          </div>

          {/* Support Contact */}
          <div className="text-xs text-gray-500">
            Need help? Contact{" "}
            <a
              href="mailto:support@valuablewomen.org"
              className="text-purple-600 hover:text-purple-700"
            >
              support@valuablewomen.org
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
