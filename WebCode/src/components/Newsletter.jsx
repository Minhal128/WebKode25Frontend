import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Globe from '../assets/Globe.png';

const Newsletter = () => {
  return (
    <div className="bg-black text-white py-24 md:py-32"> {/* Increased padding here */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="space-y-4 md:space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Join to 1M users in the world
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl">
            With our user-friendly mobile and web applications, we strive to make
            managing finances easier for everyone.
          </p>
          <button className="bg-lime-500 hover:bg-lime-600 text-black px-6 py-3 rounded-full flex items-center gap-2">
            Join Us <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="flex justify-center"
        >
          <img
            src={Globe}
            alt="World Map"
            className="w-full max-w-4xl rounded-xl shadow-lg"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Newsletter;