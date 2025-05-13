"use client";
import React, { useState, useEffect } from 'react';

// Animated logo component with ripple effect
const AnimatedLogo = () => {
  const [isRippling, setIsRippling] = useState(false);
  
  // Auto-trigger ripple effect every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 2000);
    }, 4000);
    
    // Trigger on first load
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative flex items-center justify-center h-16 w-16">
      {/* Main gradient circle */}
      <div className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500"></div>
      
      {/* Ripple effects */}
      {isRippling && (
        <>
          <div className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 opacity-75 animate-ripple"></div>
          <div className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 opacity-50 animate-ripple-delay"></div>
          <div className="absolute h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 opacity-25 animate-ripple-delay-2"></div>
        </>
      )}
    </div>
  );
};

// Input field component
const InputField = ({ icon, type, placeholder }:{icon:any,type:any,placeholder:any}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
        {icon}
      </div>
      <input 
        type={type} 
        className="w-full py-3 pl-10 pr-4 bg-gray-800 border border-gray-700 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                  text-gray-200 placeholder-gray-500 transition-all duration-300"
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
        <div className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center justify-center space-x-4">
            <AnimatedLogo />
            <h1 className="text-3xl font-bold text-white">Eternum Mind</h1>
          </div>
          <p className="mt-2 text-gray-400 text-center">
            Unlock the full potential of your mental well-being journey
          </p>
        </div>
        
        {/* Login form card */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 mb-6">
          {/* Icon and welcome text */}
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="h-12 w-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <svg 
                className="h-6 w-6 text-white" 
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
            <h2 className="text-2xl font-bold text-white mb-1">Welcome Back</h2>
            <p className="text-gray-400 text-center">
              Enter your credentials to access your account
            </p>
            
            {/* Demo mode toggle */}
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-400 mr-2">Demo Mode</span>
              <button 
                className={`w-10 h-6 flex items-center rounded-full p-1 
                          ${demoMode ? 'bg-purple-600' : 'bg-gray-700'} transition-colors duration-300 ease-in-out`}
                onClick={() => setDemoMode(!demoMode)}
              >
                <div 
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ease-in-out
                            ${demoMode ? 'translate-x-4' : 'translate-x-0'}`}
                ></div>
              </button>
            </div>
          </div>
          
          {/* Form fields */}
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <InputField 
                icon={
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                } 
                type="email" 
                placeholder="you@example.com" 
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                Password
              </label>
              <InputField 
                icon={
                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
              className="w-full py-3 px-4 rounded-md text-white font-medium 
                        bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                        transition-all duration-300 ease-in-out transform relative overflow-hidden"
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
                  className="ml-2 h-5 w-5" 
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
            <a href="#" className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300">
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