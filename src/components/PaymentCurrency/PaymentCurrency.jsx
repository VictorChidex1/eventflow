import React, { useState } from "react";
import {
  CreditCard,
  Landmark,
  Wallet,
  Coins,
  Globe,
  Shield,
  Check,
  Banknote,
  AlertCircle,
} from "lucide-react";
import "./PaymentCurrency.css";

const PaymentCurrency = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

  // Payment methods
  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      description: "Visa, Mastercard, Verve - International cards accepted",
      icon: <CreditCard className="payment-icon" />,
      supported: true,
      note: "Automatic currency conversion for international cards",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      description: "Direct bank transfer to Nigerian banks",
      icon: <Landmark className="payment-icon" />,
      supported: true,
      note: "Nigerian bank accounts only",
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "PayPal wallet payments",
      icon: <Wallet className="payment-icon" />,
      supported: true,
      note: "Automatically converted from your local currency",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      description: "BTC, ETH, USDT payments",
      icon: <Coins className="payment-icon" />,
      supported: false,
      note: "Coming soon for international clients",
    },
  ];

  // Trust badges
  const trustBadges = [
    { name: "PCI DSS Compliant", icon: <Shield className="trust-icon" /> },
    {
      name: "CBN Licensed Partners",
      icon: <Banknote className="trust-icon" />,
    },
    { name: "256-bit Encryption", icon: <Shield className="trust-icon" /> },
    { name: "Secure Payment Gateway", icon: <Globe className="trust-icon" /> },
  ];

  return (
    <div className="payment-currency-container">
      <div className="payment-currency-header">
        <Banknote className="header-icon" />
        <h2>Secure Payment Options</h2>
        <p>
          All prices in Nigerian Naira (₦) - Multiple payment methods available
        </p>
      </div>

      <div className="payment-currency-content">
        {/* Currency Notice */}
        <div className="currency-notice">
          <div className="notice-header">
            <Globe className="notice-icon" />
            <h3>International Clients Welcome!</h3>
          </div>
          <div className="notice-content">
            <p>
              <strong>
                All transactions are processed in Nigerian Naira (₦).
              </strong>
              International credit/debit cards and PayPal are automatically
              converted to your local currency by your bank or payment provider.
            </p>
            <div className="notice-features">
              <div className="notice-feature">
                <Check className="feature-check" />
                <span>No extra fees from EventFlow</span>
              </div>
              <div className="notice-feature">
                <Check className="feature-check" />
                <span>Real-time exchange rates</span>
              </div>
              <div className="notice-feature">
                <Check className="feature-check" />
                <span>Secure international payment processing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="payment-section">
          <h3 className="section-title">
            <CreditCard className="section-icon" />
            Choose Payment Method
          </h3>
          <div className="payment-grid">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`payment-method ${
                  selectedPaymentMethod === method.id ? "selected" : ""
                } ${!method.supported ? "disabled" : ""}`}
                onClick={() =>
                  method.supported && setSelectedPaymentMethod(method.id)
                }
              >
                <div className="payment-method-header">
                  <div className="method-icon">{method.icon}</div>
                  <div className="method-info">
                    <h4 className="method-name">{method.name}</h4>
                    <p className="method-description">{method.description}</p>
                    {method.note && (
                      <p className="method-note">{method.note}</p>
                    )}
                  </div>
                  {selectedPaymentMethod === method.id && (
                    <Check className="check-icon" />
                  )}
                </div>
                {!method.supported && (
                  <div className="coming-soon">Coming Soon</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="trust-section">
          <h3 className="section-title">Secure & Trusted Payments</h3>
          <p className="trust-subtitle">
            Your payments are protected with bank-level security and processed
            through CBN-licensed partners
          </p>
          <div className="trust-badges">
            {trustBadges.map((badge, index) => (
              <div key={index} className="trust-badge">
                {badge.icon}
                <span>{badge.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Assurance */}
        <div className="assurance-section">
          <div className="assurance-content">
            <AlertCircle className="assurance-icon" />
            <div className="assurance-text">
              <h4>Payment Security Guarantee</h4>
              <p>
                All payments are processed through secure, CBN-licensed payment
                gateways. Your financial information is never stored on our
                servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCurrency;
