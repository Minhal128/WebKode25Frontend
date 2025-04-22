import React, { useEffect, useState, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const packages = [
  {
    name: "Basic Package",
    price: "$99",
    oldPrice: "$150",
    features: [
      "Digital Transactions",
      "Effortless Control",
      "Secure Payments",
      "Basic Support",
    ],
    buttonText: "Subscribe Now",
  },
  {
    name: "Ultimate Package",
    price: "$299",
    oldPrice: "$450",
    features: [
      "24/7 Customer Support",
      "High-Value Transactions",
      "Global Access",
      "Exclusive Rewards",
    ],
    buttonText: "Unlock Ultimate",
  },
  {
    name: "Premium Package",
    price: "$199",
    oldPrice: "$300",
    features: [
      "Priority Support",
      "Advanced Security",
      "Monthly Reports",
      "Personalized Assistance",
    ],
    buttonText: "Get Premium",
  },
];

const PricingCard = ({ packageData, isActive, onMouseEnter, onMouseLeave, className = "" }) => {
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

      <button className="w-full bg-lime-500 hover:bg-lime-600 text-black font-semibold py-3 rounded-full transition mt-auto">
        {packageData.buttonText}
      </button>
    </div>
  );
};

const RotatingCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isHovering) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % packages.length);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isHovering]);

  const handleMouseEnter = (index) => {
    setIsHovering(true);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const nextTestimonial = () =>
    setActiveIndex((prev) => (prev + 1) % packages.length);
  const prevTestimonial = () =>
    setActiveIndex((prev) => (prev - 1 + packages.length) % packages.length);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-16">
      {/* Mobile View */}
      <div className="block md:hidden w-full max-w-sm mb-6">
        <PricingCard
          packageData={packages[activeIndex]}
          isActive
          onMouseEnter={() => handleMouseEnter(activeIndex)}
          onMouseLeave={handleMouseLeave}
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
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingCards;
