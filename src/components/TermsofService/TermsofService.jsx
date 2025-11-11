import React from "react";
import {
  FileText,
  Scale,
  Shield,
  AlertTriangle,
  BookOpen,
  Users,
} from "lucide-react";
import "./TermsofService.css";

const TermsOfService = () => {
  return (
    <section className="terms-container">
      {/* Header Section */}
      <div className="terms-header">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Scale className="w-12 h-12 text-white" />
          </div>
          <h1 className="terms-title">Terms of Service</h1>
          <p className="terms-subtitle">
            Please read these terms carefully before using EventFlow services.
            By using our platform, you agree to be bound by these terms.
          </p>
          <div className="terms-update">
            Effective Date:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="terms-content">
          {/* Agreement Section */}
          <div className="terms-section">
            <h2 className="terms-section-title">1. Agreement to Terms</h2>
            <p className="terms-text">
              By accessing or using EventFlow's event planning platform, you
              agree to be bound by these Terms of Service and all applicable
              laws and regulations. If you do not agree with any of these terms,
              you are prohibited from using or accessing our services.
            </p>
          </div>

          {/* User Accounts */}
          <div className="terms-section">
            <h2 className="terms-section-title flex items-center gap-2">
              <Users className="w-5 h-5" />
              2. User Accounts
            </h2>
            <div className="space-y-4">
              <div className="clause-card">
                <h3 className="clause-title">Account Creation</h3>
                <p className="clause-text">
                  To access certain features, you must create an account. You
                  agree to provide accurate and complete information and to keep
                  your account credentials secure.
                </p>
              </div>

              <div className="clause-card">
                <h3 className="clause-title">Account Responsibility</h3>
                <p className="clause-text">
                  You are responsible for all activities that occur under your
                  account. Notify us immediately of any unauthorized use or
                  security breach.
                </p>
              </div>
            </div>
          </div>

          {/* Event Creation & Management */}
          <div className="terms-section">
            <h2 className="terms-section-title flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              3. Event Creation & Management
            </h2>
            <ul className="terms-list">
              <li>You may create events for legitimate purposes only</li>
              <li>You are responsible for the accuracy of event information</li>
              <li>Event content must comply with all applicable laws</li>
              <li>You must provide clear refund and cancellation policies</li>
              <li>
                Prohibited events include illegal activities or hate speech
              </li>
            </ul>
          </div>

          {/* Ticket Sales & Payments */}
          <div className="terms-section">
            <h2 className="terms-section-title">4. Ticket Sales & Payments</h2>
            <div className="payment-grid">
              <div className="payment-card">
                <div className="payment-icon bg-blue-100 text-blue-600">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="payment-title">Pricing & Fees</h3>
                <p className="payment-desc">
                  Event organizers set ticket prices. EventFlow charges a
                  service fee that is clearly disclosed during the event
                  creation process.
                </p>
              </div>

              <div className="payment-card">
                <div className="payment-icon bg-green-100 text-green-600">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="payment-title">Payment Processing</h3>
                <p className="payment-desc">
                  All payments are processed through secure third-party payment
                  processors. We do not store your full payment card
                  information.
                </p>
              </div>

              <div className="payment-card">
                <div className="payment-icon bg-purple-100 text-purple-600">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="payment-title">Refunds & Cancellations</h3>
                <p className="payment-desc">
                  Refund policies are set by event organizers. EventFlow is not
                  responsible for organizer cancellations or refund disputes.
                </p>
              </div>
            </div>
          </div>

          {/* User Conduct */}
          <div className="terms-section">
            <h2 className="terms-section-title">5. User Conduct</h2>
            <p className="terms-text">You agree not to:</p>
            <ul className="terms-list">
              <li>Use the service for any unlawful purpose</li>
              <li>Impersonate any person or entity</li>
              <li>Upload viruses or malicious code</li>
              <li>Interfere with the platform's security features</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Attempt to gain unauthorized access to other accounts</li>
            </ul>
          </div>

          {/* Intellectual Property */}
          <div className="terms-section">
            <h2 className="terms-section-title">6. Intellectual Property</h2>
            <p className="terms-text">
              EventFlow owns all intellectual property rights in the platform.
              You retain rights to your event content but grant us a license to
              display and distribute it through our services.
            </p>
          </div>

          {/* Termination */}
          <div className="terms-section">
            <h2 className="terms-section-title">7. Termination</h2>
            <p className="terms-text">
              We may suspend or terminate your account at our sole discretion if
              you violate these terms. You may terminate your account at any
              time through your account settings.
            </p>
          </div>

          {/* Disclaimer of Warranties */}
          <div className="terms-section">
            <h2 className="terms-section-title">8. Disclaimer of Warranties</h2>
            <p className="terms-text">
              The service is provided "as is" without warranties of any kind. We
              do not guarantee uninterrupted or error-free service and are not
              responsible for event outcomes or attendee satisfaction.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div className="terms-section">
            <h2 className="terms-section-title">9. Limitation of Liability</h2>
            <p className="terms-text">
              To the fullest extent permitted by law, EventFlow shall not be
              liable for any indirect, incidental, or consequential damages
              arising from your use of the platform.
            </p>
          </div>

          {/* Governing Law */}
          <div className="terms-section">
            <h2 className="terms-section-title">10. Governing Law</h2>
            <p className="terms-text">
              These terms shall be governed by the laws of Lagos State of
              Nigeria, without regard to its conflict of law provisions.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="terms-section">
            <h2 className="terms-section-title">11. Changes to Terms</h2>
            <p className="terms-text">
              We reserve the right to modify these terms at any time. We will
              notify users of significant changes via email or platform
              notifications. Continued use constitutes acceptance of modified
              terms.
            </p>
          </div>

          {/* Contact Information */}
          <div className="terms-section">
            <h2 className="terms-section-title">12. Contact Information</h2>
            <p className="terms-text">
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="contact-info">
              <p>Email: legal@eventflow.com</p>
              <p>Phone: +234 (803) 123-4567</p>
              <p>Address: 4 Babatope Bejide Crescent, Lekki Phase 1</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
