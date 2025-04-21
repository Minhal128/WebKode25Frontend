import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { div } from "framer-motion/client";

const testimonials = [
  
    {
        name: "Jennifer K.",
        app: "Bill Payment Feature",
        review: "Paying bills used to be such a hassle, but this app has streamlined the process.  I can schedule payments and get reminders, which is fantastic.",
      },
      {
        name: "Michael S.",
        app: "Budgeting Tool",
        review: "The budgeting feature has helped me get a much better handle on my spending.  I can set goals, track progress, and see where my money is going.",
      },
      {
        name: "David L.",
        app: "Customer Support Chat",
        review: "I had a question about a transaction, and the customer support chat was incredibly responsive and helpful.  Great service!",
      },
        {
        name: "Sarah W.",
        app: "International Transfer",
        review: "I needed to send money to family overseas, and the app made the international transfer quick and easy, with transparent fees.",
      },
      {
        name: "Kevin R.",
        app: "Loan Application",
        review: "I was able to apply for a personal loan directly through the app. The process was straightforward, and I received a decision quickly.",
      },
      {
        name: "Jessica G.",
        app: "Account Overview",
        review: "The account overview page provides a clear and concise summary of all my accounts.  I can easily see my balances and recent transactions.",
      },
      {
        name: "Brian T.",
        app: "Security Alerts",
        review: "I appreciate the real-time security alerts.  It gives me peace of mind knowing that my account is being monitored for any suspicious activity.",
      },
      {
        name: "Angela H.",
        app: "Personalized Recommendations",
        review: "The app provides helpful, personalized recommendations for financial products and services that are relevant to my needs.",
      },];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setIndex((prevIndex) =>
          prevIndex + itemsPerView >= testimonials.length ? 0 : prevIndex + 1
        );
      }, 1000); // Auto-rotate every 3 seconds
      return () => clearInterval(interval);
    }
  }, [index, isPaused, itemsPerView]);

  const prevTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - itemsPerView : prevIndex - 1
    );
  };

  const nextTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex + itemsPerView >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-12 bg-black text-white text-center">
      <h2 className="text-3xl font-bold mb-4">
        What Our <span className="text-lime-500">Clients</span> Say
      </h2>
      <p className="text-gray-600 mb-8">
        Trusted by supercar owners and exotic car collectors around the world.
      </p>
      <div className="relative mx-auto max-w-8xl px-4 overflow-hidden">
        <div className="flex  justify-center gap-6">
          <AnimatePresence mode="popLayout">
            {testimonials.slice(index, index + itemsPerView).map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className=" border border-[#a4a7ac] cursor-pointer hover:border-lime-600 p-6 rounded-lg shadow-md text-left w-full max-w-lg"
                onMouseEnter={() => setIsPaused(true)}  // 🔹 Stops rotation when hovering over a testimonial
                onMouseLeave={() => setIsPaused(false)} // 🔹 Resumes rotation when mouse leaves
              >
                <div className="  flex font-bold items-center mb-4">
                <div className="text-lime-600"> What they say</div>
                </div>
                <p className="text-gray-700 mb-4">{testimonial.review}</p>
                <div className=" border-t  flex items-center">
                  <div className="mt-2">
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.app}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button onClick={prevTestimonial} className="p-2 bg-gray-300 rounded-full">
            <FiChevronLeft className="text-2xl text-lime-500 font-bold" />
          </button>
          <button onClick={nextTestimonial} className="p-2 bg-gray-300 rounded-full">
            <FiChevronRight className="text-2xl text-lime-500 font-bold" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
