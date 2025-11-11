import React, { useState } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";

const SecuritySettings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsLoading(false);

    // In a real app, you'd show success/error messages
  };

  const passwordRequirements = [
    { id: 1, text: "At least 8 characters", met: newPassword.length >= 8 },
    { id: 2, text: "Contains a number", met: /\d/.test(newPassword) },
    {
      id: 3,
      text: "Contains uppercase letter",
      met: /[A-Z]/.test(newPassword),
    },
    {
      id: 4,
      text: "Contains lowercase letter",
      met: /[a-z]/.test(newPassword),
    },
  ];

  return (
    <div className="profile-content">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Security Settings
      </h2>

      <div className="space-y-8">
        {/* Change Password */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Change Password
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Current Password */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  id="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter current password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            {newPassword && (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Password Requirements:
                </p>
                <ul className="space-y-1">
                  {passwordRequirements.map((req) => (
                    <li key={req.id} className="flex items-center text-sm">
                      <CheckCircle
                        size={16}
                        className={`mr-2 ${
                          req.met ? "text-green-500" : "text-gray-300"
                        }`}
                      />
                      <span
                        className={req.met ? "text-green-700" : "text-gray-500"}
                      >
                        {req.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Updating Password..." : "Update Password"}
            </button>
          </form>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Two-Factor Authentication
          </h3>
          <p className="text-gray-600 mb-4">
            Add an extra layer of security to your account by enabling
            two-factor authentication.
          </p>
          <button className="bg-gray-900 text-white py-2 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">
            Enable 2FA
          </button>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Security Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Login from Chrome
                </p>
                <p className="text-sm text-gray-500">Today at 09:23 AM</p>
              </div>
              <span className="text-green-600 text-sm font-medium">
                Successful
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Password changed
                </p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
              <span className="text-blue-600 text-sm font-medium">Updated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
