"use client";
import React, { useState, useEffect } from 'react';

// Animated logo component with ripple effect
const AnimatedLogo = ({ size = '16' }) => {
  const [isRippling, setIsRippling] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 2000);
    }, 4000);

    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`size- relative flex${size} items-center justify-center`}>
      <div
        className={`size- absolute${size} rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500`}
      ></div>
      {isRippling && (
        <>
          <div
            className={`animate-ripple size- absolute${size} rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 opacity-75`}
          ></div>
          <div
            className={`animate-ripple-delay size- absolute${size} rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 opacity-50`}
          ></div>
          <div
            className={`animate-ripple-delay-2 size- absolute${size} rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 opacity-25`}
          ></div>
        </>
      )}
    </div>
  );
};

// Input field component
const InputField = ({ icon, type, placeholder }:{icon:any,type:any,placeholder:any}) => {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
        {icon}
      </div>
      <input 
        type={type} 
        className="w-full rounded-md border border-gray-700 bg-gray-800 py-3 pl-10 pr-4 
                  text-gray-200 transition-all duration-300 placeholder:text-gray-500
                  focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export default function LoginPage() {
  // For demo mode toggle
  const [demoMode, setDemoMode] = useState(true);
  
  // For interactive button effect
  const [isPressed, setIsPressed] = useState(false);
  
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4">
      {/* Main content container */}
      <div className="w-full max-w-md">
        {/* Logo and brand section */}
        <div className="mb-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center space-x-4">
            <AnimatedLogo />
            <h1 className="text-3xl font-bold text-white">Eternum Mind</h1>
          </div>
          <p className="mt-2 text-center text-gray-400">
            Unlock the full potential of your mental well-being journey
          </p>
        </div>
        {/* Login form card  */}
        <div className="mb-6 rounded-lg bg-gray-800 p-8 shadow-xl">
          {/* Icon and welcome text */}
          <div className="mb-6 flex flex-col items-center justify-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-purple-600">
              <svg 
                className="size-6 text-white" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" 
                />
              </svg>
            </div>
            <h2 className="mb-1 text-2xl font-bold text-white">Welcome Back</h2>
            <p className="text-center text-gray-400">
              Enter your credentials to access your account
            </p>
            {/* Demo mode toggle */}
            <div className="mt-2 flex items-center">
              <span className="mr-2 text-sm text-gray-400">Demo Mode</span>
              <button 
                className={`flex h-6 w-10 items-center rounded-full p-1 
                          ${demoMode ? 'bg-purple-600' : 'bg-gray-700'} transition-colors duration-300 ease-in-out`}
                onClick={() => setDemoMode(!demoMode)}
              >
                <div 
                  className={`size-4 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out${demoMode ? 'translate-x-4' : 'translate-x-0'}`}
                ></div>
              </button>
            </div>
          </div>
          {/* Form fields */}
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-400">
                Email
              </label>
              <InputField 
                icon={
                  <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                } 
                type="email" 
                placeholder="you@example.com" 
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-400">
                Password
              </label>
              <InputField 
                icon={
                  <svg className="size-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                } 
                type="password" 
                placeholder="••••••••" 
              />
            </div>
            {/* Sign In button with animation */}
            <button
              type="button"
              className="relative w-full overflow-hidden rounded-md bg-gradient-to-r from-purple-600 
                        to-blue-500 px-4 py-3 font-medium text-white
                        transition-all duration-300 ease-in-out hover:from-purple-700
                        hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              onMouseDown={() => setIsPressed(true)}
              onMouseUp={() => setIsPressed(false)}
              onMouseLeave={() => setIsPressed(false)}
              style={{
                transform: isPressed ? 'scale(0.98)' : 'scale(1)',
              }}
            >
              <div className="flex items-center justify-center">
                <span>Sign In</span>
                <svg 
                  className="ml-2 size-5" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
            </button>
          </form>
        </div>
        {/* Sign up link */}
        <div className="text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-purple-400 transition-colors duration-300 hover:text-purple-300">
              Sign up
            </a>
          </p>
        </div>
      </div>
      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        
        .animate-ripple {
          animation: ripple 2s ease-out;
        }
        
        .animate-ripple-delay {
          animation: ripple 2s ease-out 0.3s;
        }
        
        .animate-ripple-delay-2 {
          animation: ripple 2s ease-out 0.6s;
        }
      `}</style>
    </div>
  );
}