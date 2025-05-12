"use client";
import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll listener to change navbar appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed z-50 w-full py-4 transition-all duration-300 ${scrolled ? "bg-[#0a0b13]/95 backdrop-blur-md" : "bg-[#0a0b13]"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative size-10">
            {/* Logo Circle */}
            <div className="absolute inset-0 rounded-full bg-[#7256ff]/90"></div>
          </div>
          <span className="font-sm text-xl text-white">NeuroSphere</span>
        </div>
        {/* Navigation Links - Mobile Hamburger Menu - Only shows on small screens */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-10 md:flex">
          <a
            href="#login"
            className="text-white transition-colors hover:text-gray-300"
          >
            Log in
          </a>
          <a
            href="#get-started"
            className="rounded-lg bg-[#7256ff] px-6 py-3 font-medium text-white shadow-md shadow-[#7256ff]/30 transition-all duration-300 hover:bg-[#8165ff] hover:shadow-lg hover:shadow-[#7256ff]/40"
          >
            Get Started
          </a>
        </div>
      </div>
      {/* Mobile Navigation Menu - Hidden by default */}
      <div className="absolute inset-x-0 top-full hidden bg-[#0a0b13]/95 px-6 py-4 shadow-lg md:hidden">
        <div className="flex flex-col space-y-4">
          <a
            href="#login"
            className="py-2 text-white transition-colors hover:text-gray-300"
          >
            Log in
          </a>
          <a
            href="#get-started"
            className="rounded-lg bg-[#7256ff] px-6 py-3 text-center font-medium text-white shadow-md shadow-[#7256ff]/30 transition-all duration-300 hover:bg-[#8165ff] hover:shadow-lg hover:shadow-[#7256ff]/40"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

// Add this to your tailwind.config.js:
// extend: {
//   animation: {
//     'spin-slow': 'spin 3s linear infinite',
//     'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
//   },
// }

export default Navbar;
