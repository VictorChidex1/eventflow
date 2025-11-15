// components/Pricing/Pricing.jsx
import React, { useState, useEffect } from "react";
import { Check, X, Star, Zap, Crown, CreditCard } from "lucide-react";
import "./Pricing.css";
import PlanCalculator from "../PlanCalculator/PlanCalculator";
import PaymentCurrency from "../PaymentCurrency/PaymentCurrency";
import SocialProof from "../SocialProof/SocialProof";
import EnterpriseContactForm from "../EnterpriseContact/EnterpriseContactForm";
import SmartTicketing from "../FeatureDeepDive/SmartTicketing/SmartTicketing";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [showEnterpriseForm, setShowEnterpriseForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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

  // Skeleton Components
  const PricingCardSkeleton = () => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse">
      {/* Popular Badge Skeleton */}
      <div className="h-6 bg-gray-200 rounded w-24 mx-auto mb-4"></div>

      <div className="plan-header">
        {/* Icon Skeleton */}
        <div className="h-10 w-10 bg-gray-200 rounded-lg mx-auto mb-3"></div>

        {/* Name Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>

        {/* Description Skeleton */}
        <div className="h-4 bg-gray-200 rounded w-full mx-auto mb-4"></div>

        {/* Price Skeleton */}
        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-2"></div>

        {/* Savings Skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto"></div>
      </div>

      {/* Features Skeleton */}
      <div className="plan-features space-y-3 mt-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded flex-1"></div>
          </div>
        ))}
      </div>

      {/* Button Skeleton */}
      <div className="h-12 bg-gray-200 rounded-lg mt-6"></div>
    </div>
  );

  const ComparisonTableSkeleton = () => (
    <div className="comparison-table animate-pulse">
      {Array.from({ length: 3 }).map((_, sectionIndex) => (
        <div key={sectionIndex} className="comparison-section mb-8">
          {/* Category Skeleton */}
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>

          {/* Features Skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, featureIndex) => (
              <div key={featureIndex} className="comparison-row">
                <div className="feature-name">
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="feature-values">
                  {Array.from({ length: 3 }).map((_, valueIndex) => (
                    <div key={valueIndex} className="feature-value">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const FAQSkeleton = () => (
    <div className="faq-grid animate-pulse">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="faq-item">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const HeaderSkeleton = () => (
    <div className="pricing-header animate-pulse">
      <div className="max-w-4xl mx-auto text-center">
        {/* Icon Skeleton */}
        <div className="h-10 w-10 bg-white bg-opacity-30 rounded-lg mx-auto mb-4"></div>
        <div className="h-12 bg-white bg-opacity-30 rounded w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-white bg-opacity-30 rounded w-1/2 mx-auto mb-6"></div>

        {/* Title Skeleton */}
        <div className="h-12 bg-white/30 rounded w-3/4 mx-auto mb-4"></div>

        {/* Subtitle Skeleton */}
        <div className="h-6 bg-white/30 rounded w-1/2 mx-auto mb-6"></div>

        {/* Billing Toggle Skeleton */}
        <div className="billing-toggle-container">
          <div className="billing-toggle bg-white/20 p-1 rounded-lg">
            <div className="flex space-x-1">
              <div className="h-10 bg-white/30 rounded-lg w-24"></div>
              <div className="h-10 bg-white/30 rounded-lg w-24"></div>
            </div>
          </div>
          <div className="h-8 bg-white/30 rounded-full w-48"></div>
        </div>
      </div>
    </div>
  );

  const handleEnterpriseContact = () => {
    setShowEnterpriseForm(true);
  };

  const handleCloseEnterpriseForm = () => {
    setShowEnterpriseForm(false);
  };

  return (
    <section className="pricing-container">
      {/* Header Section with Skeleton */}
      {isLoading ? (
        <HeaderSkeleton />
      ) : (
        <div className="pricing-header">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            <h1 className="pricing-title">Simple, Transparent Pricing</h1>
            <p className="pricing-subtitle">
              Choose the perfect plan for your events. All plans include our
              core features with no hidden fees.
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
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Plan Calculator - Assuming it has its own loading state */}
        <PlanCalculator />

        <SmartTicketing />

        <PaymentCurrency />

        <SocialProof />

        {/* Pricing Plans with Skeleton */}
        {isLoading ? (
          <div className="pricing-grid">
            {Array.from({ length: 3 }).map((_, index) => (
              <PricingCardSkeleton key={index} />
            ))}
          </div>
        ) : (
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
                  onClick={
                    plan.name === "Enterprise"
                      ? handleEnterpriseContact
                      : undefined
                  }
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Features Comparison Table with Skeleton */}
        <div className="features-comparison">
          <div className="text-center mb-12">
            <h2 className="comparison-title">Compare Plans</h2>
            <p className="comparison-subtitle">
              Detailed feature comparison to help you choose the right plan
            </p>
          </div>

          {isLoading ? (
            <ComparisonTableSkeleton />
          ) : (
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
          )}
        </div>

        {/* FAQ Section with Skeleton */}
        <div className="faq-section">
          <div className="text-center mb-12">
            <h2 className="faq-title">Frequently Asked Questions</h2>
          </div>

          {isLoading ? (
            <FAQSkeleton />
          ) : (
            <div className="faq-grid">
              <div className="faq-item">
                <h4 className="faq-question">Can I change plans later?</h4>
                <p className="faq-answer">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect immediately with prorated billing.
                </p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">Is there a free trial?</h4>
                <p className="faq-answer">
                  Yes! All paid plans include a 14-day free trial. No credit
                  card required to start.
                </p>
              </div>

              <div className="faq-item">
                <h4 className="faq-question">
                  What payment methods do you accept?
                </h4>
                <p className="faq-answer">
                  We accept all major credit cards, PayPal, and bank transfers
                  for annual plans.
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
          )}
        </div>
      </div>

      {/* Enterprise Contact Form Modal */}
      {showEnterpriseForm && (
        <div className="enterprise-modal-overlay">
          <div className="enterprise-modal">
            <EnterpriseContactForm
              onClose={handleCloseEnterpriseForm}
              initialPlan="enterprise"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
