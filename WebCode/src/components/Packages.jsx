import React, { useState, useRef, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
// Checkout component is not used in this file
import Checkout from './Checkout';
import ComingSoonPage from './Future';

const packages = [
  {
    name: "Basic Plan",
    price: "$19.99/mo",
    oldPrice: "$14.99",
    features: ["Basic analytics", "5 transfers/month", "Email support", "Basic security"],
    buttonText: "Get Started",
    path: "/checkout"
  },
  {
    name: "Pro Plan",
    price: "$29.99/mo",
    oldPrice: "$29.99",
    features: ["Advanced analytics", "Unlimited transfers", "Priority support", "Enhanced security", "API access"],
    buttonText: "Subscribe Now",
    path: "comingSoon"
  },
  {
    name: "Enterprise Plan",
    price: "$49.99/mo",
    oldPrice: "$69.99",
    features: ["Custom analytics", "Unlimited transfers", "24/7 support", "Maximum security", "API access", "Dedicated manager"],
    buttonText: "Contact Sales",
    path: "comingSoon"
  }
];

const PricingCard = ({ packageData, isActive, onMouseEnter, onMouseLeave, className = "", onSubscribe }) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`bg-gradient-to-b from-slate-900 to-slate-800 text-white rounded-3xl p-6
        w-full md:w-[320px] shadow-xl transform transition-all duration-500 cursor-pointer
        min-h-[460px] flex flex-col justify-between 
        ${className}
        ${isActive ? "md:scale-110 z-20" : "md:scale-90 opacity-70 z-10"}
      `}
    >
      {/* Card content remains the same */}
      <div>
        <p className="text-sm text-gray-300 mb-2">{packageData.name}</p>
        <div className="flex items-baseline gap-3 mb-4">
          <h2 className="text-4xl font-bold text-lime-400 mb-10">{packageData.price}</h2>
          <span className="line-through text-gray-400 text-lg">{packageData.oldPrice}</span>
        </div>

        <ul className="space-y-3 mb-6">
          {packageData.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-3">
              <CheckCircle2 className="text-lime-400 w-5 h-5" />
              <span className="text-white font-medium">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={() => onSubscribe(packageData)}
        className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3 rounded-full transition mt-auto"
      >
        {packageData.buttonText}
      </button>
    </div>
  );
};

const RotatingCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  // Auto rotate cards unless user is hovering
  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev === packages.length - 1 ? 0 : prev + 1));
      }, 5000); // Rotate every 5 seconds
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering]); // Added isHovering dependency

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
    setIsHovering(true);
  };

  // Simulated auth check - replace with your actual auth logic
  const isLoggedIn = () => {
    // Replace with actual auth check (e.g., from context or localStorage)
    return localStorage.getItem('user') !== null;
  };

  // Simulated subscription check - replace with your actual logic
  const hasActiveSubscription = () => {
    // Replace with actual subscription check
    return localStorage.getItem('subscription') !== null;
  };

  useEffect(() => {
    // If user already has an active subscription, redirect to dashboard
    if (hasActiveSubscription()) {
      navigate("/dashboard");
    }
  }, [navigate]);
  useEffect(() => {
    // Event handler to intercept basic plan selections for logged-in users
    const handleBasicPlanRedirect = (packageData) => {
      if (isLoggedIn() && packageData.name.toLowerCase().includes('basic')) {
        navigate("/checkout", { 
          state: { 
            packageName: packageData.name,
            packagePrice: packageData.price,
            planId: packageData.name.toLowerCase().replace(' ', '_')
          }
        });
      }
    };
    
    // Make this handler available to other functions
    window.handleBasicPlanRedirect = handleBasicPlanRedirect;
    
    return () => {
      window.handleBasicPlanRedirect = null;
    };
  }, [navigate]);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? packages.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === packages.length - 1 ? 0 : prev + 1));
  };

  const handleSubscribe = (packageData) => {
    if (packageData.path) {
      // You can also pass package data to checkout page
      navigate(packageData.path, { 
        state: { 
          packageName: packageData.name,
          packagePrice: packageData.price,
          planId: packageData.name.toLowerCase().replace(' ', '_')
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16">
      {/* Mobile View */}
      <div className="block md:hidden w-full max-w-sm mb-6">
        <PricingCard
          packageData={packages[activeIndex]}
          isActive
          onMouseEnter={() => handleMouseEnter(activeIndex)}
          onMouseLeave={handleMouseLeave}
          onSubscribe={handleSubscribe}
        />
      </div>

      {/* Navigation Buttons (Mobile only) */}
      <div className="block md:hidden flex justify-center gap-4 mb-12">
        <button onClick={prevTestimonial} className="p-2 bg-black border border-lime-500 rounded-full">
          <FiChevronLeft className="text-2xl text-lime-500 font-bold" />
        </button>
        <button onClick={nextTestimonial} className="p-2 bg-black border border-lime-500 rounded-full">
          <FiChevronRight className="text-2xl text-lime-500 font-bold" />
        </button>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex gap-10 items-center justify-center">
        {packages.map((pkg, i) => (
          <PricingCard
            key={i}
            packageData={pkg}
            isActive={i === activeIndex}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={handleMouseLeave}
            onSubscribe={handleSubscribe}
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingCards;
