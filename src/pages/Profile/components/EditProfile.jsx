import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { Save, Camera, User, Mail, MapPin, Phone } from "lucide-react";

const EditProfile = ({ user, onSave }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    location: "",
    bio: "",
    company: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update user data in context and localStorage
      const updatedUser = { ...user, ...formData };
      login(updatedUser);

      onSave();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="profile-content">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Upload */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0) || "U"}
            </div>
            <button
              type="button"
              className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Profile Picture</h3>
            <p className="text-sm text-gray-600">
              JPG, GIF or PNG. Max size 2MB.
            </p>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <User size={16} />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Mail size={16} />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Phone size={16} />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="+234 800 000 0000"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin size={16} />
              <span>Location</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Your city and country"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Tell us about yourself..."
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company/Organization
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Your company or organization name"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onSave}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save size={16} />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
