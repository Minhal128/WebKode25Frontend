import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const Button = ({ children,  className, variant, ...props }) => {
  const baseClass = "px-4 py-2 rounded-md font-medium flex items-center justify-center transition-colors";
  const variantClass = variant === "outline" 
    ? "border border-[#B0F127] text-[#B0F127] hover:bg-[#B0F127]/10" 
    : "bg-[#B0F127] text-black hover:bg-[#B0F127]/80";
  
  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#060606] px-4 text-white">
      {/* Background Elements */}
      <div className="absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B0F127]/5 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-[#B0F127]/10 blur-3xl"></div>

      {/* 404 Text */}
      <div className="relative">
        <h1 className="text-center text-[150px] font-bold leading-none tracking-tighter text-[#B0F127]/10 md:text-[250px]">
          404
        </h1>
        <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-5xl">Page Not Found</h2>
          <p className="mb-8 text-gray-400 md:text-lg">The page you're looking for doesn't exist or has been moved.</p>
        </div>
      </div>

      {/* Glitch Effect SVG */}
      <div className="mb-12 mt-8 w-full max-w-md">
        <svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,50 L400,50"
            stroke="#B0F127"
            strokeWidth="2"
            strokeDasharray="10,15"
            className="animate-dash-slow"
          />
          <path
            d="M0,30 L400,30"
            stroke="#B0F127"
            strokeWidth="1"
            strokeDasharray="5,10"
            className="animate-dash-medium"
          />
          <path
            d="M0,70 L400,70"
            stroke="#B0F127"
            strokeWidth="1"
            strokeDasharray="8,12"
            className="animate-dash-reverse"
          />
        </svg>
      </div>

      {/* Error Message */}
      <div className="mb-8 flex items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 px-6 py-4 backdrop-blur-sm">
        <code className="font-mono text-sm text-gray-400">
          Error: Route not found at <span className="text-[#B0F127]">finconnect.com{window.location.pathname}</span>
        </code>
      </div>

      {/* Navigation Options */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/">
          <Button className="bg-[#B0F127] text-black hover:bg-[#B0F127]/80">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="outline" className="border-[#B0F127] text-[#B0F127] hover:bg-[#B0F127]/10">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go to Dashboard
          </Button>
        </Link>
      </div>

      {/* Suggested Links */}
      <div className="mt-12 text-center">
        <h3 className="mb-4 text-lg font-medium">You might be looking for:</h3>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-400">
          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Pricing", href: "/pricing" },
            { name: "Contact Us", href: "/contact" },
            { name: "About Us", href: "/about" },
            { name: "Login", href: "/login" },
          ].map((link, i) => (
            <Link
              key={i}
              to={link.href}
              className="border-b border-transparent hover:border-[#B0F127] hover:text-[#B0F127]"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx="true">{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        .animate-dash-slow {
          animation: dash 15s linear infinite;
        }
        .animate-dash-medium {
          animation: dash 10s linear infinite;
        }
        .animate-dash-reverse {
          animation: dash 12s linear infinite reverse;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;