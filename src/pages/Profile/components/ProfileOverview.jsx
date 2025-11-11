import React from "react";
import { User, Mail, Calendar, MapPin, Edit } from "lucide-react";

const ProfileOverview = ({ user, onEdit }) => {
  return (
    <div className="profile-content">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Profile Overview</h2>
        <button
          onClick={onEdit}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Edit size={16} />
          <span>Edit Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium text-gray-900">
                    {user?.name || "Not set"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar size={20} className="text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-600">Events Created</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-sm text-gray-600">Total Attendees</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                <p className="font-medium text-gray-900">Create New Event</p>
                <p className="text-sm text-gray-600">
                  Start planning your next event
                </p>
              </button>
              <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
                <p className="font-medium text-gray-900">View Dashboard</p>
                <p className="text-sm text-gray-600">Manage your events</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
