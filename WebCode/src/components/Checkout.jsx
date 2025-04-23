import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CreditCard, Lock, CheckCircle2, ArrowRight, Shield, Calendar } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const planId = searchParams.get("plan") || "pro";
  
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});

  // Get plan details based on planId
  const getPlanDetails = (id) => {
    const plans = {
      basic: {
        name: "Basic Plan",
        price: "$9.99",
        period: "month",
        features: ["Basic analytics", "5 transfers/month", "Email support", "Basic security"],
      },
      pro: {
        name: "Pro Plan",
        price: "$19.99",
        period: "month",
        features: ["Advanced analytics", "Unlimited transfers", "Priority support", "Enhanced security", "API access"],
      },
      enterprise: {
        name: "Enterprise Plan",
        price: "$49.99",
        period: "month",
        features: [
          "Custom analytics",
          "Unlimited transfers",
          "24/7 support",
          "Maximum security",
          "API access",
          "Dedicated account manager",
        ],
      },
    };
    return plans[id] || plans.pro;
  };

  const plan = getPlanDetails(planId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim();
      setFormData({ ...formData, [name]: formatted.substring(0, 19) });
      return;
    }

    // Format expiry date
    if (name === "expiryDate") {
      const formatted = value.replace(/\D/g, "");
      if (formatted.length <= 2) {
        setFormData({ ...formData, [name]: formatted });
      } else {
        setFormData({
          ...formData,
          [name]: `${formatted.substring(0, 2)}/${formatted.substring(2, 4)}`,
        });
      }
      return;
    }

    // CVC - numbers only, max 3-4 digits
    if (name === "cvc") {
      const formatted = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: formatted.substring(0, 4) });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardName.trim()) {
      newErrors.cardName = "Cardholder name is required";
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Invalid format (MM/YY)";
    }

    if (!formData.cvc.trim()) {
      newErrors.cvc = "CVC is required";
    } else if (formData.cvc.length < 3) {
      newErrors.cvc = "CVC must be 3-4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Simulate payment processing
    setPaymentStatus("processing");

    // Simulate API call to Stripe
    setTimeout(() => {
      setPaymentStatus("success");

      // Redirect to dashboard after success
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }, 2000);
  };

  // If payment is successful, show success screen
  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-[#060606] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0c0c0c] border-[#1a1a1a] text-white rounded-lg border">
          <div className="text-center p-6 pb-2">
            <div className="mx-auto mb-4 bg-[#B0F127]/10 p-3 rounded-full inline-block">
              <CheckCircle2 className="h-12 w-12 text-[#B0F127]" />
            </div>
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
            <p className="text-gray-400">
              Your subscription to the {plan.name} has been activated
            </p>
          </div>
          <div className="text-center pt-4 px-6">
            <p className="mb-6">You will be redirected to your dashboard in a moment...</p>
            <div className="w-full bg-[#1a1a1a] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#B0F127] rounded-full transition-all duration-1000"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="p-6">
            <button
              className="w-full bg-[#B0F127] text-black hover:bg-[#B0F127]/90 flex items-center justify-center py-2 rounded-md"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060606] flex flex-col md:flex-row p-4 md:p-0">
      {/* Left side - Order summary */}
      <div className="md:w-1/3 bg-[#0a0a0a] p-6 md:p-10 flex flex-col">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-1">Order Summary</h2>
          <p className="text-gray-400">Review your subscription details</p>
        </div>

        <div className="bg-[#121212] rounded-lg p-4 mb-6">
          <h3 className="font-medium text-[#B0F127] mb-2">{plan.name}</h3>
          <div className="flex items-end gap-1 mb-4">
            <span className="text-2xl font-bold text-white">{plan.price}</span>
            <span className="text-gray-400">/{plan.period}</span>
          </div>

          <div className="space-y-2">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#B0F127] flex-shrink-0" />
                <span className="text-sm text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-white">{plan.price}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Tax</span>
            <span className="text-white">$0.00</span>
          </div>
          <div className="border-t border-[#1a1a1a] pt-4 flex justify-between">
            <span className="font-medium text-white">Total</span>
            <span className="font-bold text-white">{plan.price}</span>
          </div>
        </div>
      </div>

      {/* Right side - Payment form */}
      <div className="md:w-2/3 bg-[#060606] p-6 md:p-10">
        <div className="max-w-lg mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Complete your purchase</h1>
            <p className="text-gray-400">Enter your payment details to subscribe</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Card number */}
              <div className="space-y-2">
                <label htmlFor="cardNumber" className="text-white block">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    className={`w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-md p-2 text-white pl-10 ${
                      errors.cardNumber ? "border-red-500" : "focus:border-[#B0F127]"
                    }`}
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={19}
                  />
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
              </div>

              {/* Cardholder name */}
              <div className="space-y-2">
                <label htmlFor="cardName" className="text-white block">
                  Cardholder Name
                </label>
                <input
                  id="cardName"
                  name="cardName"
                  placeholder="John Smith"
                  className={`w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-md p-2 text-white ${
                    errors.cardName ? "border-red-500" : "focus:border-[#B0F127]"
                  }`}
                  value={formData.cardName}
                  onChange={handleInputChange}
                />
                {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
              </div>

              {/* Expiry and CVC */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="expiryDate" className="text-white block">
                    Expiry Date
                  </label>
                  <div className="relative">
                    <input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      className={`w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-md p-2 text-white pl-10 ${
                        errors.expiryDate ? "border-red-500" : "focus:border-[#B0F127]"
                      }`}
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      maxLength={5}
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="cvc" className="text-white block">
                    CVC
                  </label>
                  <div className="relative">
                    <input
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      className={`w-full bg-[#0c0c0c] border border-[#1a1a1a] rounded-md p-2 text-white pl-10 ${
                        errors.cvc ? "border-red-500" : "focus:border-[#B0F127]"
                      }`}
                      value={formData.cvc}
                      onChange={handleInputChange}
                      maxLength={4}
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                </div>
              </div>

              {/* Security note */}
              <div className="flex items-start gap-2 bg-[#0c0c0c] p-3 rounded-md border border-[#1a1a1a]">
                <Shield className="h-5 w-5 text-[#B0F127] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400">
                  Your payment information is encrypted and secure. We use industry-standard security measures to
                  protect your data.
                </p>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-6 bg-[#B0F127] text-black hover:bg-[#B0F127]/90 transition-all rounded-md"
                disabled={paymentStatus === "processing"}
              >
                {paymentStatus === "processing" ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <>Complete Payment</>
                )}
              </button>

              {/* Payment methods */}
              <div className="flex justify-center gap-3 mt-4">
                {/* <img
                  src="/visa.png"
                  alt="Visa"
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/mastercard.png"
                  alt="Mastercard"
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/amex.png"
                  alt="American Express"
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                />
                <img
                  src="/paypal.png"
                  alt="PayPal"
                  className="h-8 opacity-70 hover:opacity-100 transition-opacity"
                /> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;