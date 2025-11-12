// components/PlanCalculator.jsx
import React, { useState, useEffect } from "react";
import { Users, Calendar, Zap, Calculator } from "lucide-react";
import "./PlanCalculator.css";

const PlanCalculator = () => {
  // State for user inputs
  const [attendees, setAttendees] = useState(100);
  const [eventsPerMonth, setEventsPerMonth] = useState(5);
  const [features, setFeatures] = useState({
    customBranding: false,
    prioritySupport: false,
    advancedAnalytics: false,
    apiAccess: false,
    whiteLabel: false,
  });

  // State for calculated results
  const [recommendedPlan, setRecommendedPlan] = useState("starter");
  const [costPerEvent, setCostPerEvent] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [annualSavings, setAnnualSavings] = useState(0);

  // Plan definitions with pricing
  const plans = {
    starter: {
      name: "Starter",
      monthlyPrice: 28500,
      annualPrice: 270000,
      maxAttendees: 100,
      maxEvents: 5,
      includes: ["basic-analytics", "email-support"],
    },
    professional: {
      name: "Professional",
      monthlyPrice: 73500,
      annualPrice: 720000,
      maxAttendees: 1000,
      maxEvents: Infinity,
      includes: [
        "advanced-analytics",
        "priority-support",
        "custom-branding",
        "api-access",
      ],
    },
    enterprise: {
      name: "Enterprise",
      monthlyPrice: 0, // Custom pricing
      annualPrice: 0,
      maxAttendees: Infinity,
      maxEvents: Infinity,
      includes: ["everything", "white-label", "dedicated-support"],
    },
  };

  // Calculate recommended plan based on inputs
  useEffect(() => {
    calculatePlanRecommendation();
    calculateCosts();
  }, [attendees, eventsPerMonth, features]);

  const calculatePlanRecommendation = () => {
    let plan = "starter";

    // Check if user needs Professional
    if (
      attendees > 100 ||
      eventsPerMonth > 5 ||
      features.advancedAnalytics ||
      features.apiAccess ||
      features.customBranding
    ) {
      plan = "professional";
    }

    // Check if user needs Enterprise
    if (
      attendees > 1000 ||
      features.whiteLabel ||
      (eventsPerMonth > 20 && attendees > 500)
    ) {
      plan = "enterprise";
    }

    setRecommendedPlan(plan);
  };

  const calculateCosts = () => {
    const plan = plans[recommendedPlan];

    if (plan.name === "Enterprise") {
      setCostPerEvent(0); // Custom pricing
      setMonthlyCost(0);
      setAnnualSavings(0);
      return;
    }

    // Calculate cost per event
    const costPerEventValue = plan.monthlyPrice / Math.max(eventsPerMonth, 1);
    setCostPerEvent(costPerEventValue);

    // Monthly cost
    setMonthlyCost(plan.monthlyPrice);

    // Annual savings
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - plan.annualPrice;
    setAnnualSavings(savings);
  };

  const handleFeatureToggle = (feature) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const formatCurrency = (amount) => {
    if (amount === 0) return "Custom Pricing";
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className="plan-calculator">
      <div className="calculator-header">
        <Calculator className="calculator-icon" />
        <h2>Find Your Perfect Plan</h2>
        <p>Answer a few questions to get personalized pricing</p>
      </div>

      <div className="calculator-content">
        {/* Input Section */}
        <div className="calculator-inputs">
          <div className="input-group">
            <label className="input-label">
              <Users className="input-icon" />
              Attendees Per Event
            </label>
            <div className="slider-container">
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={attendees}
                onChange={(e) => setAttendees(parseInt(e.target.value))}
                className="slider"
              />
              <div className="slider-value">
                {attendees.toLocaleString()} attendees
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">
              <Calendar className="input-icon" />
              Events Per Month
            </label>
            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={eventsPerMonth}
                onChange={(e) => setEventsPerMonth(parseInt(e.target.value))}
                className="slider"
              />
              <div className="slider-value">{eventsPerMonth} events/month</div>
            </div>
          </div>

          {/* Feature Toggles */}
          <div className="features-section">
            <h4>Additional Features Needed</h4>
            <div className="feature-toggles">
              {[
                {
                  key: "customBranding",
                  label: "Custom Branding",
                  plan: "professional",
                },
                {
                  key: "prioritySupport",
                  label: "Priority Support",
                  plan: "professional",
                },
                {
                  key: "advancedAnalytics",
                  label: "Advanced Analytics",
                  plan: "professional",
                },
                { key: "apiAccess", label: "API Access", plan: "professional" },
                {
                  key: "whiteLabel",
                  label: "White Label Solution",
                  plan: "enterprise",
                },
              ].map((feature) => (
                <label key={feature.key} className="feature-toggle">
                  <input
                    type="checkbox"
                    checked={features[feature.key]}
                    onChange={() => handleFeatureToggle(feature.key)}
                  />
                  <span className="toggle-label">{feature.label}</span>
                  <span className="plan-badge">{feature.plan}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="calculator-results">
          <div className={`recommendation-card ${recommendedPlan}`}>
            <div className="recommendation-header">
              <Zap className="recommendation-icon" />
              <h3>Recommended Plan: {plans[recommendedPlan].name}</h3>
            </div>

            <div className="cost-breakdown">
              {recommendedPlan === "enterprise" ? (
                <div className="enterprise-pricing">
                  <div className="custom-price">Custom Enterprise Pricing</div>
                  <p>Contact our sales team for a tailored quote</p>
                </div>
              ) : (
                <>
                  <div className="cost-item">
                    <span className="cost-label">Monthly Cost:</span>
                    <span className="cost-amount">
                      {formatCurrency(monthlyCost)}
                    </span>
                  </div>
                  <div className="cost-item">
                    <span className="cost-label">Cost Per Event:</span>
                    <span className="cost-amount">
                      {formatCurrency(costPerEvent)}
                    </span>
                  </div>
                  <div className="cost-item">
                    <span className="cost-label">Annual Savings:</span>
                    <span className="savings-amount">
                      Save {formatCurrency(annualSavings)}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="plan-features-list">
              <h4>This plan includes:</h4>
              <ul>
                {recommendedPlan === "starter" && (
                  <>
                    <li>Up to 100 attendees per event</li>
                    <li>Basic event creation tools</li>
                    <li>Email support</li>
                    <li>Standard ticketing</li>
                  </>
                )}
                {recommendedPlan === "professional" && (
                  <>
                    <li>Up to 1,000 attendees per event</li>
                    <li>Advanced event creation tools</li>
                    <li>Priority email & chat support</li>
                    <li>Custom branding</li>
                    <li>Advanced analytics</li>
                  </>
                )}
                {recommendedPlan === "enterprise" && (
                  <>
                    <li>Unlimited attendees</li>
                    <li>Full feature access</li>
                    <li>24/7 phone support</li>
                    <li>Custom integrations</li>
                    <li>White-label solutions</li>
                  </>
                )}
              </ul>
            </div>
            <button className={`cta-button ${recommendedPlan}`}>
              {recommendedPlan === "enterprise"
                ? "Contact Sales"
                : "Start Free Trial"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCalculator;
