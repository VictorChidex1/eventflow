import React from "react";
import { Shield, Lock, Eye, UserCheck, Database, Mail } from "lucide-react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <section className="privacy-policy-container">
      {/* Header Section */}
      <div className="privacy-header">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-subtitle">
            Your privacy is important to us. This policy explains how EventFlow
            collects, uses, and protects your personal information.
          </p>
          <div className="privacy-update">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="privacy-content">
          {/* Introduction */}
          <div className="privacy-section">
            <h2 className="privacy-section-title">Introduction</h2>
            <p className="privacy-text">
              At EventFlow, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy describes how we collect, use, and share information when
              you use our event planning platform, including ticket sales and
              real-time management services.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="privacy-section">
            <h2 className="privacy-section-title flex items-center gap-2">
              <Database className="w-5 h-5" />
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div className="info-category">
                <h3 className="info-category-title">Personal Information</h3>
                <ul className="privacy-list">
                  <li>Name and contact details (email, phone number)</li>
                  <li>Billing and payment information</li>
                  <li>Event preferences and booking history</li>
                  <li>Profile information and preferences</li>
                </ul>
              </div>

              <div className="info-category">
                <h3 className="info-category-title">Technical Information</h3>
                <ul className="privacy-list">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Usage data and analytics</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="privacy-section">
            <h2 className="privacy-section-title flex items-center gap-2">
              <Eye className="w-5 h-5" />
              How We Use Your Information
            </h2>
            <div className="usage-grid">
              <div className="usage-card">
                <div className="usage-icon bg-blue-100 text-blue-600">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="usage-title">Service Delivery</h3>
                <p className="usage-desc">
                  Process ticket purchases, manage event registrations, and
                  provide real-time event management services.
                </p>
              </div>

              <div className="usage-card">
                <div className="usage-icon bg-green-100 text-green-600">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="usage-title">Communication</h3>
                <p className="usage-desc">
                  Send event updates, important notifications, and respond to
                  your inquiries and support requests.
                </p>
              </div>

              <div className="usage-card">
                <div className="usage-icon bg-purple-100 text-purple-600">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="usage-title">Security & Improvement</h3>
                <p className="usage-desc">
                  Protect against fraud, improve our services, and develop new
                  features for better user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="privacy-section">
            <h2 className="privacy-section-title">Data Sharing</h2>
            <p className="privacy-text">
              We do not sell your personal information to third parties. We may
              share your information only in the following circumstances:
            </p>
            <ul className="privacy-list">
              <li>With event organizers for events you register for</li>
              <li>With payment processors to complete transactions</li>
              <li>When required by law or to protect our legal rights</li>
              <li>With service providers who assist in platform operations</li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="privacy-section">
            <h2 className="privacy-section-title">Data Security</h2>
            <p className="privacy-text">
              We implement appropriate technical and organizational security
              measures to protect your personal information against unauthorized
              access, alteration, disclosure, or destruction. This includes
              encryption, secure servers, and regular security assessments.
            </p>
          </div>

          {/* Your Rights */}
          <div className="privacy-section">
            <h2 className="privacy-section-title">Your Rights</h2>
            <p className="privacy-text">You have the right to:</p>
            <ul className="privacy-list">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Data portability to transfer your data to another service</li>
            </ul>
          </div>

          {/* Cookies */}
          <div className="privacy-section">
            <h2 className="privacy-section-title">Cookies & Tracking</h2>
            <p className="privacy-text">
              We use cookies and similar tracking technologies to enhance your
              experience, analyze platform usage, and support our marketing
              efforts. You can control cookie preferences through your browser
              settings.
            </p>
          </div>

          {/* Contact Information */}
          <div className="privacy-section">
            <h2 className="privacy-section-title">Contact Us</h2>
            <p className="privacy-text">
              If you have any questions about this Privacy Policy or how we
              handle your personal information, please contact us:
            </p>
            <div className="contact-info">
              <p>Email: privacy@eventflow.com</p>
              <p>Phone: +234 (803) 123-4567</p>
              <p>Address: 4 Babatope Bejide Crescent, Lekki Phase 1</p>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="privacy-section">
            <h2 className="privacy-section-title">Policy Updates</h2>
            <p className="privacy-text">
              We may update this Privacy Policy from time to time. We will
              notify you of any significant changes by posting the new policy on
              our platform and updating the "Last updated" date. We encourage
              you to review this policy periodically.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
