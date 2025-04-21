import React from 'react';
import { motion } from 'framer-motion';

// Placeholder image since we don't have the exact image.  You'd replace this.
const HeroImage = () => (
    <div className="relative w-full max-w-md">
        {/* Placeholder phone frame */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-2xl opacity-40 blur-3xl" />
        <div className="border-4 border-gray-800 rounded-xl p-2 relative z-10">
            <div className="bg-gray-900 rounded-lg h-full w-full p-4 flex flex-col items-center justify-center">
                <div className="text-white text-center text-sm">
                    <p>Portfolio</p>
                    <p className="text-green-400 font-semibold text-lg">0.22174 BTC</p>
                    <div className="mt-4 space-x-2">
                        <span className="bg-gray-700 text-gray-300 rounded-full px-2 py-1 text-xs">BTC</span>
                        <span className="bg-gray-700 text-gray-300 rounded-full px-2 py-1 text-xs">ETH</span>
                        <span className="bg-gray-700 text-gray-300 rounded-full px-2 py-1 text-xs">SOL</span>
                    </div>
                </div>
            </div>
        </div>
        {/* Placeholder crypto icons */}
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
                        Lorem ipsum dolor sit amet consectetur adipiscing elit at pharetra nec sed erat non
                        metus suspendisse mus non lectus vel vitae massa id in in turpis posuere laoreet tortor.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
                        className="flex gap-4"
                    >
                        <button
                            className="bg-lime-500 hover:bg-lime-600 text-black px-6 py-3 rounded-full text-lg"
                        >
                            Download app
                        </button>
                        <button
                            className="bg-gray-80 hover:bg-gray-900 text-white px-6 py-3 rounded-full border border-gray-700 text-lg"
                        >
                            View pricing
                        </button>
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
