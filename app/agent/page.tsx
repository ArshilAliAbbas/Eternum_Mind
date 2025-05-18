"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

import Agent from '@/components/Dashboard/Agent';
import Sidebar from '@/components/Dashboard/Sidebar';

export default function AgentPage() {
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // Set pageLoaded to true after component mounts
  useEffect(() => {
    setPageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#050a18] text-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <main className="relative min-h-screen overflow-y-auto pl-[70px] transition-all duration-300 ease-out">
        {/* Background elements */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 size-[500px] rounded-full bg-blue-900/5 blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 size-[600px] rounded-full bg-violet-900/5 blur-[120px]"></div>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050a18]/80 via-[#050a18] to-[#050a18]"></div>
        </div>
        
        {/* Content container */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
          {/* Page header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                AI Agent
              </span>
            </h1>
            <p className="mt-2 text-gray-400">
              Chat with your AI assistant and share images
            </p>
          </motion.div>
          
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: pageLoaded ? 1 : 0, y: pageLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="theme-border theme-container overflow-hidden rounded-xl"
          >
            <div className="border-b border-[#1a2747]/50 px-6 py-4">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <MessageSquare size={18} className="theme-text-primary" />
                <span>AI Assistant</span>
              </h2>
            </div>
            <div className="p-6">
              <Agent />
            </div>
          </motion.div>
          
          {/* Features section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* Feature 1 */}
            <div className="theme-border theme-container overflow-hidden rounded-xl p-6">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20">
                <MessageSquare size={24} className="text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Natural Conversations</h3>
              <p className="text-gray-400">
                Engage in fluid, natural conversations with an AI that understands context and nuance.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="theme-border theme-container overflow-hidden rounded-xl p-6">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Image Sharing</h3>
              <p className="text-gray-400">
                Share images directly in your conversations for more meaningful and contextual interactions.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="theme-border theme-container overflow-hidden rounded-xl p-6">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-white">Private & Secure</h3>
              <p className="text-gray-400">
                Your conversations are private and secure, with advanced encryption to protect your data.
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
