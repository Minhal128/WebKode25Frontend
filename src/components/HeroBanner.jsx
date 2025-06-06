import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Placeholder image since we don't have the exact image.  You'd replace this.
const HeroImage = () => (
    <div className="relative w-full max-w-md">
        <img 
            src="https://imgur.com/ghLt6kz.jpg" 
            alt="Crypto Trading Platform" 
            className="w-full h-auto max-w-md rounded-xl shadow-2xl relative z-10"
        />

        {/* Animated elements for visual effect */}
        <div className="absolute top-1/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 space-y-4">
            <div className="w-8 h-8 bg-green-500 rounded-full animate-pulse opacity-70"></div>
            <div className="w-6 h-6 bg-blue-500 rounded-full animate-pulse opacity-70"></div>
            <div className="w-10 h-10 bg-purple-500 rounded-full animate-pulse opacity-70"></div>
        </div>
    </div>
);

const HeroBanner = () => {
    return (
        <div className="bg-black text-white flex items-center justify-center min-h-[75vh] py-20">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="space-y-6"
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
                    >
                        Buy and trade cryptos like never <span className="text-lime-500">before.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
                        className="text-gray-400 text-base sm:text-lg max-w-xl"
                    >
                        Unlock a world of financial possibilities with Finantech X. Seamlessly manage your money, achieve your savings goals, and access personalized solutions designed for your unique journey. Experience secure, convenient banking that puts you in control, empowering you to build a brighter financial future, today.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
                        className="flex gap-4"
                    >
                        <Link to="/register">
                        <button
                            className="bg-lime-500 hover:bg-lime-600 font-semibold text-black px-6 py-3 rounded-full text-lg"
                        >
                            Get Started
                        </button>
                        </Link>
                        <Link to="/contactus">
                        <button
                            className="bg-gray-80 hover:border-lime-500 text-white px-6 py-3 rounded-full border border-gray-700 text-lg"
                        >
                            Contact US
                        </button>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Image Component */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
                    className="flex justify-center"
                >
                    <HeroImage />
                </motion.div>
            </div>
        </div>
    );
};

export default HeroBanner;
