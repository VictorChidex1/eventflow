import React, { useState } from "react";
import { Bell, Mail, MessageSquare, Calendar, Check, X } from "lucide-react";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    eventReminders: true,
    ticketPurchases: true,
    eventUpdates: true,
    promotions: false,
    securityAlerts: true,
  });

  const [pushNotifications, setPushNotifications] = useState({
    eventReminders: true,
    newMessages: true,
    eventUpdates: false,
    securityAlerts: true,
  });

  const [smsNotifications, setSmsNotifications] = useState({
    eventReminders: false,
    securityAlerts: true,
  });

  const handleEmailToggle = (key) => {
    setEmailNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handlePushToggle = (key) => {
    setPushNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSmsToggle = (key) => {
    setSmsNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const notificationTypes = [
    {
      id: "eventReminders",
      label: "Event Reminders",
      description:
        "Get reminded about upcoming events you're attending or hosting",
      icon: Calendar,
    },
    {
      id: "ticketPurchases",
      label: "Ticket Purchases",
      description:
        "Notifications when someone purchases tickets to your events",
      icon: Bell,
    },
    {
      id: "eventUpdates",
      label: "Event Updates",
      description: "Important updates about events you're attending or hosting",
      icon: MessageSquare,
    },
    {
      id: "promotions",
      label: "Promotions & Offers",
      description: "Special offers, discounts, and promotional content",
      icon: Mail,
    },
    {
      id: "securityAlerts",
      label: "Security Alerts",
      description: "Important security notifications about your account",
      icon: Bell,
    },
    {
      id: "newMessages",
      label: "New Messages",
      description:
        "When you receive new messages from event organizers or attendees",
      icon: MessageSquare,
    },
  ];

  // Custom Toggle Component with Check/X icons
  const CustomToggle = ({ isOn, onToggle }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        isOn ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out flex items-center justify-center ${
          isOn ? "translate-x-5" : "translate-x-0"
        }`}
      >
        {isOn ? (
          <Check size={14} className="text-green-500" />
        ) : (
          <X size={14} className="text-gray-400" />
        )}
      </span>
    </button>
  );

  return (
    <div className="profile-content">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Notification Settings
      </h2>

      <div className="space-y-8">
        {/* Email Notifications */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Mail size={20} className="mr-2" />
                Email Notifications
              </h3>
              <p className="text-gray-600 mt-1">
                Control which notifications you receive via email
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {notificationTypes
              .filter((type) => emailNotifications.hasOwnProperty(type.id))
              .map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <div className="flex items-start space-x-3">
                        <Icon size={20} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {type.label}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CustomToggle
                      isOn={emailNotifications[type.id]}
                      onToggle={() => handleEmailToggle(type.id)}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        {/* Push Notifications */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Bell size={20} className="mr-2" />
                Push Notifications
              </h3>
              <p className="text-gray-600 mt-1">
                Browser and mobile push notifications
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {notificationTypes
              .filter((type) => pushNotifications.hasOwnProperty(type.id))
              .map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <div className="flex items-start space-x-3">
                        <Icon size={20} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {type.label}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CustomToggle
                      isOn={pushNotifications[type.id]}
                      onToggle={() => handlePushToggle(type.id)}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        {/* SMS Notifications */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <MessageSquare size={20} className="mr-2" />
                SMS Notifications
              </h3>
              <p className="text-gray-600 mt-1">
                Text message notifications (standard rates may apply)
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {notificationTypes
              .filter((type) => smsNotifications.hasOwnProperty(type.id))
              .map((type) => {
                const Icon = type.icon;
                return (
                  <div
                    key={type.id}
                    className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex-1">
                      <div className="flex items-start space-x-3">
                        <Icon size={20} className="text-gray-400 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900">
                            {type.label}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <CustomToggle
                      isOn={smsNotifications[type.id]}
                      onToggle={() => handleSmsToggle(type.id)}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Notification Preferences
          </h3>
          <p className="text-blue-700">
            Your notification settings help us keep you informed about important
            event updates, security alerts, and activities relevant to your
            EventFlow experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
