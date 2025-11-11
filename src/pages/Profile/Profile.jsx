import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  User,
  Settings,
  Shield,
  Bell,
  CreditCard,
  ArrowLeft,
  Save,
  Camera,
} from "lucide-react";
import ProfileOverview from "./components/ProfileOverview";
import EditProfile from "./components/EditProfile";
import SecuritySettings from "./components/SecuritySettings";
import NotificationSettings from "./components/NotificationSettings";
import "./Profile.css";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "edit", label: "Edit Profile", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "billing", label: "Billing", icon: CreditCard },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <ProfileOverview user={user} onEdit={() => setActiveTab("edit")} />
        );
      case "edit":
        return (
          <EditProfile user={user} onSave={() => setActiveTab("overview")} />
        );
      case "security":
        return <SecuritySettings />;
      case "notifications":
        return <NotificationSettings />;
      case "billing":
        return (
          <div className="profile-content">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <p className="text-yellow-800">
                Billing features coming soon! Manage your subscription and
                payment methods here.
              </p>
            </div>
          </div>
        );
      default:
        return <ProfileOverview user={user} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar Navigation */}
            <div className="lg:w-64 bg-gray-50 border-r border-gray-200">
              <nav className="p-6 space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                        activeTab === tab.id
                          ? "bg-white shadow-sm border border-gray-200 text-blue-600"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 lg:p-8">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
