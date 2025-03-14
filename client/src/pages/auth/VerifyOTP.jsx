import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/auth/verify-otp`, {
        email,
        otp,
      });

      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-500 to-green-700 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
          Verify OTP
        </h2>

        <p className="text-center text-gray-700 mb-4">
          An OTP has been sent to <strong>{email}</strong>. Enter the code
          below:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            maxLength="6"
            className="w-full p-3 border border-gray-300 rounded-lg text-center text-lg tracking-widest"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
