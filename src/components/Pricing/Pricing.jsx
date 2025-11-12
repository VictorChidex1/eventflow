import React, { useState } from "react";
import { Check, X, Star, Zap, Crown, CreditCard } from "lucide-react";
import "./Pricing.css";
import PlanCalculator from "../PlanCalculator/PlanCalculator";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' or 'annual'

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small events and individual organizers",
      price: {
        monthly: "N28,500",
        annual: "N270,000",
      },
      savings: "Save 17%",
      popular: false,
      icon: <Star className="w-4 h-4" />,
      features: [
        { included: true, text: "Up to 100 attendees per event" },
        { included: true, text: "Basic event creation tools" },
        { included: true, text: "Email support" },
        { included: true, text: "Standard ticketing" },
        { included: true, text: "Basic analytics" },
        { included: false, text: "Custom branding" },
        { included: false, text: "Priority support" },
        { included: false, text: "Advanced analytics" },
        { included: false, text: "API access" },
      ],
      cta: "Get Started",
      color: "blue",
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and frequent events",
      price: {
        monthly: "N73,500",
        annual: "N720,000",
      },
      savings: "Save 17%",
      popular: true,
      icon: <Zap className="w-4 h-4" />,
      features: [
        { included: true, text: "Up to 1,000 attendees per event" },
        { included: true, text: "Advanced event creation tools" },
        { included: true, text: "Priority email & chat support" },
        { included: true, text: "Advanced ticketing options" },
        { included: true, text: "Comprehensive analytics" },
        { included: true, text: "Custom branding" },
        { included: true, text: "Seat management" },
        { included: false, text: "Dedicated account manager" },
        { included: false, text: "White-label solutions" },
      ],
      cta: "Start Free Trial",
      color: "purple",
    },
    {
      name: "Enterprise",
      description: "For large organizations and high-volume events",
      price: {
        monthly: "Custom",
        annual: "Custom",
      },
      savings: "Volume discounts",
      popular: false,
      icon: <Crown className="w-4 h-4" />,
      features: [
        { included: true, text: "Unlimited attendees" },
        { included: true, text: "Full feature access" },
        { included: true, text: "24/7 phone support" },
        { included: true, text: "Custom integrations" },
        { included: true, text: "Advanced security" },
        { included: true, text: "White-label solutions" },
        { included: true, text: "Dedicated account manager" },
        { included: true, text: "SLA guarantee" },
        { included: true, text: "Onboarding & training" },
      ],
      cta: "Contact Sales",
      color: "gold",
    },
  ];

  const featuresComparison = [
    {
      category: "Event Management",
      features: [
        {
          name: "Events per month",
          starter: "5",
          professional: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "Attendees per event",
          starter: "100",
          professional: "1,000",
          enterprise: "Unlimited",
        },
        {
          name: "Custom registration forms",
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "Multi-day events",
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "Recurring events",
          starter: false,
          professional: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "Ticketing & Payments",
      features: [
        {
          name: "Ticket types",
          starter: "3",
          professional: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          name: "Payment processing fee",
          starter: "2.9%",
          professional: "2.5%",
          enterprise: "Custom",
        },
        {
          name: "Early bird pricing",
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "Group discounts",
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "Seat selection",
          starter: false,
          professional: true,
          enterprise: true,
        },
      ],
    },
    {
      category: "Support & Security",
      features: [
        {
          name: "Email support",
          starter: true,
          professional: true,
          enterprise: true,
        },
        {
          name: "Chat support",
          starter: false,
          professional: true,
          enterprise: true,
        },
        {
          name: "Phone support",
          starter: false,
          professional: false,
          enterprise: true,
        },
        {
          name: "SLA guarantee",
          starter: false,
          professional: false,
          enterprise: true,
        },
        {
          name: "Custom security",
          starter: false,
          professional: false,
          enterprise: true,
        },
      ],
    },
  ];

  return (
    <section className="pricing-container">
      {/* Header Section */}
      <div className="pricing-header">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <CreditCard className="w-10 h-10 text-white" />
          </div>
          <h1 className="pricing-title">Simple, Transparent Pricing</h1>
          <p className="pricing-subtitle">
            Choose the perfect plan for your events. All plans include our core
            features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="billing-toggle-container">
            <div className="billing-toggle">
              <button
                className={`toggle-option ${
                  billingCycle === "monthly" ? "active" : ""
                }`}
                onClick={() => setBillingCycle("monthly")}
              >
                Monthly
              </button>
              <button
                className={`toggle-option ${
                  billingCycle === "annual" ? "active" : ""
                }`}
                onClick={() => setBillingCycle("annual")}
              >
                Annual
              </button>
            </div>
            <div className="savings-badge">
              Save up to 20% with annual billing
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Plan Calculator */}
        <PlanCalculator />

        {/* Pricing Plans */}
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
            >
              {plan.popular && (
                <div className="popular-badge">Most Popular</div>
              )}

              <div className="plan-header">
                <div className={`plan-icon ${plan.color}`}>{plan.icon}</div>
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>

                <div className="plan-price">
                  {plan.price[billingCycle] === "Custom" ? (
                    <div className="custom-price">Custom Pricing</div>
                  ) : (
                    <>
                      <span className="price-amount">
                        {plan.price[billingCycle]}
                      </span>
                      <span className="price-period">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    </>
                  )}
                </div>

                {plan.savings && plan.price[billingCycle] !== "Custom" && (
                  <div className="savings-text">{plan.savings}</div>
                )}
              </div>

              <div className="plan-features">
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className={`feature-item ${
                      feature.included ? "included" : "excluded"
                    }`}
                  >
                    {feature.included ? (
                      <Check className="feature-icon included" />
                    ) : (
                      <X className="feature-icon excluded" />
                    )}
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <button
                className={`cta-button ${plan.color} ${
                  plan.popular ? "popular" : ""
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Features Comparison Table */}
        <div className="features-comparison">
          <div className="text-center mb-12">
            <h2 className="comparison-title">Compare Plans</h2>
            <p className="comparison-subtitle">
              Detailed feature comparison to help you choose the right plan
            </p>
          </div>

          <div className="comparison-table">
            {featuresComparison.map((section, sectionIndex) => (
              <div key={sectionIndex} className="comparison-section">
                <h3 className="comparison-category">{section.category}</h3>
                <div className="comparison-features">
                  {section.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="comparison-row">
                      <div className="feature-name">{feature.name}</div>
                      <div className="feature-values">
                        <div className="feature-value starter">
                          {typeof feature.starter === "boolean" ? (
                            feature.starter ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )
                          ) : (
                            feature.starter
                          )}
                        </div>
                        <div className="feature-value professional">
                          {typeof feature.professional === "boolean" ? (
                            feature.professional ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )
                          ) : (
                            feature.professional
                          )}
                        </div>
                        <div className="feature-value enterprise">
                          {typeof feature.enterprise === "boolean" ? (
                            feature.enterprise ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <X className="w-4 h-4" />
                            )
                          ) : (
                            feature.enterprise
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="text-center mb-12">
            <h2 className="faq-title">Frequently Asked Questions</h2>
          </div>

          <div className="faq-grid">
            <div className="faq-item">
              <h4 className="faq-question">Can I change plans later?</h4>
              <p className="faq-answer">
                Yes, you can upgrade or downgrade your plan at any time. Changes
                take effect immediately with prorated billing.
              </p>
            </div>

            <div className="faq-item">
              <h4 className="faq-question">Is there a free trial?</h4>
              <p className="faq-answer">
                Yes! All paid plans include a 14-day free trial. No credit card
                required to start.
              </p>
            </div>

            <div className="faq-item">
              <h4 className="faq-question">
                What payment methods do you accept?
              </h4>
              <p className="faq-answer">
                We accept all major credit cards, PayPal, and bank transfers for
                annual plans.
              </p>
            </div>

            <div className="faq-item">
              <h4 className="faq-question">
                Do you offer discounts for nonprofits?
              </h4>
              <p className="faq-answer">
                Absolutely! We offer special pricing for registered nonprofit
                organizations. Contact us for details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
