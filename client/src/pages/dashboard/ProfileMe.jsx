import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Settings, LogOut, Edit, X } from "lucide-react";

const Profile = () => {
  const API_URL = import.meta.env.VITE_BASE_URL;
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const userToken = localStorage.getItem("token");

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/users/me`,

          {
            headers: { Authorization: `Bearer ${userToken}` },
          }
        );
        setUser(data);
      } catch (error) {
        toast.error("Failed to load profile.");
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
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      // refresh page after the profile update
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen  bg-gray-100 items-center justify-center">
      <div className="w-full max-w-2xl grid xsm:grid-cols-1 bg-white p-8 rounded-lg shadow-lg">
        {user ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                {user.title} {user.firstName} {user.lastName}
              </h2>
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-700 flex items-center"
              >
                <Edit size={18} /> <span className="ml-1">Edit</span>
              </button>
            </div>

            {/* Profile Details */}
            <div className="grid md:grid-cols-2 xs:grid-cols-1 xsm:grid-cols-1 gap-4">
              <p className="text-gray-700">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-gray-700">
                <strong>Role:</strong> {user.role}
              </p>
              <p className="text-gray-700">
                <strong>Occupation:</strong> {user.occupation}
              </p>
              <p className="text-gray-700">
                <strong>Marital Status:</strong> {user.maritalStatus}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {user.phone}
              </p>
              <p className="text-gray-700">
                <strong>Address:</strong> {user.address}
              </p>
              <p className="text-gray-700">
                <strong>Date of Birth:</strong>{" "}
                {new Date(user.dateOfBirth).toLocaleDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}
              </p>
              {user.socialLinks?.twitter && (
                <p className="text-gray-700">
                  <strong>Twitter:</strong>{" "}
                  <a
                    href={user.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    Visit
                  </a>
                </p>
              )}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-600">Loading profile...</p>
        )}
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
              name="firstName"
              defaultValue={user?.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="lastName"
              defaultValue={user?.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="occupation"
              defaultValue={user?.occupation}
              onChange={handleChange}
              placeholder="Occupation"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="phone"
              defaultValue={user?.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="text"
              name="address"
              defaultValue={user?.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full p-2 border rounded mb-2"
            />
            <button
              onClick={handleUpdateProfile}
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

export default Profile;
