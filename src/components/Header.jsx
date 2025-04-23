import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { div } from 'framer-motion/client';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // You can adjust this value
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (

    <header
      className={` bg-black text-white px-8 py-4 ${isSticky ? 'fixed top-0 left-0 w-full z-50 shadow-lg' : ''}`}
      style={{
        transition: 'all 0.3s ease-in-out', // Add smooth transition
      }}
    >
      <div className="flex  px-6 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-lime-500 rotate-45"></div>
          <Link to="/" className="font-bold text-xl">Finantech X</Link>
        </div>

        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6 text-md">
          <Link to="/" className="font-bold hover:text-lime-500">Home</Link>
          <Link to="/about" className="hover:text-lime-500">About</Link>
          <Link to="/contact" className="hover:text-lime-500">Contact</Link>
          <Link to="/register">
            <button
              className="bg-lime-500 hover:bg-lime-600 font-semibold text-black px-6 py-2 rounded-full text-lg"
            >
              Register
            </button>
          </Link>
        </nav>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col items-center md:hidden text-sm space-y-2">
          {["Home", "About", "Contact", "Register"].map((text, idx) => (
            <Link
              key={idx}
              to="/"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-2 rounded hover:bg-lime-500 transition-all duration-200"
            >
              {text === "Home" ? <span className="font-bold">{text}</span> : text}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
