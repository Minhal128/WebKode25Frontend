import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

// Pricing Card Component
const PricingCard = ({
    title,
    price,
    originalPrice,
    features,
    isPopular = false,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`
        bg-gray-900 rounded-2xl p-6 space-y-6
        ${isPopular
                    ? 'border-2 border-lime-500 shadow-xl shadow-lime-500/30 z-10' // Increased shadow and z-index
                    : 'border border-gray-800'
                }
        flex flex-col
      `}
            style={{ zIndex: isPopular ? 10 : 1 }} // Explicitly set z-index
        >
            {/* Title and Popular Badge */}
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                {isPopular && (
                    <span className="bg-lime-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                        Most Popular Plan
                    </span>
                )}
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
                <p className="text-3xl font-bold text-white">${price}</p>
                {originalPrice && (
                    <p className="text-gray-500 text-lg line-through">
                        ${originalPrice}
                    </p>
                )}
            </div>

            {/* Features List */}
            <ul className="space-y-3">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-lime-500" />
                        <span className="text-gray-400">{feature}</span>
                    </li>
                ))}
            </ul>

            {/* Get Started Button */}
            <button className="bg-lime-500 hover:bg-lime-600 text-black px-6 py-3 rounded-full w-full flex items-center justify-center gap-2 mt-auto">
                Get Started <ArrowRight className="w-5 h-5" />
            </button>
        </motion.div>
    );
};

const Packages = () => {
    return (
        <div className="bg-black py-16 md:py-24">
            <div className="container mx-auto px-4">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                        Best plans for you
                    </h2>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* First Card */}
                    <PricingCard
                        title="Digital Transactions"
                        price={249}
                        originalPrice={400}
                        features={[
                            'Digital Transactions',
                            'Effortless Control',
                            'Online Banking',
                            'Completely Reliable',
                        ]}
                    />

                    {/* Second Card (Most Popular) */}
                    <PricingCard
                        title="Most Popular Plan"
                        price={249}
                        originalPrice={400}
                        features={[
                            'Digital Transactions',
                            'Effortless Control',
                            'Online Banking',
                            'Completely Reliable',
                        ]}
                        isPopular={true}
                    />

                    {/* Third Card */}
                    <PricingCard
                        title="Digital Transactions"
                        price={249}
                        originalPrice={400}
                        features={[
                            'Digital Transactions',
                            'Effortless Control',
                            'Online Banking',
                            'Completely Reliable',
                        ]}
                    />
                </div>
            </div>
        </div>
    );
};

export default Packages;
