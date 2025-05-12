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
      className={`fixed z-50 w-full py-4 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-sm" : "bg-black"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <div className="relative size-8">
            {/* Animated Logo Circle */}
            <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            <div className="absolute inset-1 rounded-full bg-black"></div>
            <div className="animate-spin-slow absolute inset-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 opacity-80"></div>
          </div>
          <span className="text-xl font-semibold text-white">NeuroSphere</span>
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
        <div className="hidden items-center space-x-8 md:flex">
          <a
            href="#login"
            className="text-white transition-colors hover:text-gray-300"
          >
            Log in
          </a>
          <a
            href="#get-started"
            className="rounded-md bg-indigo-600 px-6 py-2 text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/50"
          >
            Get Started
          </a>
        </div>
      </div>
      {/* Mobile Navigation Menu - Hidden by default */}
      <div className="absolute inset-x-0 top-full hidden bg-black/95 p-4 shadow-lg md:hidden">
        <div className="flex flex-col space-y-4">
          <a
            href="#login"
            className="py-2 text-white transition-colors hover:text-gray-300"
          >
            Log in
          </a>
          <a
            href="#get-started"
            className="rounded-md bg-indigo-600 px-6 py-2 text-center text-white transition-all duration-300 hover:bg-indigo-700"
          >
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
