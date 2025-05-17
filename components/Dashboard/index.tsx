"use client";
/* eslint-disable react/jsx-newline */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Clock, 
  Calendar, 
  BookOpen, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  Lightbulb, 
  Layers 
} from 'lucide-react';

// Internal imports
import { useTheme } from '@/contexts/ThemeContext';

import Sidebar from './Sidebar';
import MoodCheckIn from './MoodCheckIn';
import ReflectionPrompt from './ReflectionPrompt';
import SoulPrintInsights from './SoulPrintInsights';
import Journey from './Journey';

const Dashboard: React.FC = () => {
  // Using theme context to ensure theme is properly applied throughout the component
  useTheme();
  const [greeting, setGreeting] = useState('Good Morning'); // Default greeting
  const [formattedTime, setFormattedTime] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  
  // Initialize time and date formatting on client-side only
  useEffect(() => {
    // Format initial time on client-side only to avoid hydration mismatch
    const updateTimeAndDate = () => {
      const now = new Date();
      
      // Format time
      setFormattedTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
      
      // Format date
      setFormattedDate(now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      }));
      
      // Set greeting based on time of day
      const hour = now.getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    };
    
    // Initial update
    updateTimeAndDate();
    
    // Update time every minute
    const timer = setInterval(updateTimeAndDate, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // This would typically come from user authentication or context
  const userName = "David";
  
  // Quick actions for dashboard
  const quickActions = [
    { icon: <BookOpen size={18} />, label: 'New Journal', href: '/journal', color: 'theme-gradient-primary' },
    { icon: <Flame size={18} />, label: 'Mood Check', href: '/mood-tracker', color: 'theme-gradient-primary' },
    { icon: <Sparkles size={18} />, label: 'Insights', href: '/soulprint', color: 'theme-gradient-primary' },
    { icon: <Calendar size={18} />, label: 'View Timeline', href: '/journal/entries', color: 'theme-gradient-primary' },
  ];
  
  // Recent activities
  const recentActivities = [
    { type: 'journal', title: 'Morning Reflection', time: '2 hours ago', emotion: 'Calm' },
    { type: 'insight', title: 'Weekly Analysis Complete', time: 'Yesterday', emotion: null },
    { type: 'mood', title: 'Mood Tracked', time: 'Yesterday', emotion: 'Happy' },
  ];
  
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
          {/* Top section with greeting and time */}
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold tracking-tight sm:text-5xl"
              >
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  {greeting}, {userName}
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-2 text-gray-400"
              >
                {formattedDate}
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 rounded-xl bg-[#0d1530]/50 px-4 py-2 backdrop-blur-sm"
            >
              <Clock size={18} className="text-blue-400" />
              <span className="text-lg font-medium">{formattedTime}</span>
            </motion.div>
          </div>
          
          {/* Quick actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {quickActions.map((action) => (
              <Link 
                key={action.href} 
                href={action.href}
                className="group relative overflow-hidden rounded-xl border border-[#1a2747]/50 bg-[#0d1530]/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-[#2a3a61]/70 hover:bg-[#111c3d]/70 hover:shadow-lg hover:shadow-blue-900/10"
              >
                <div className="absolute -right-6 -top-6 size-20 rounded-full bg-gradient-to-br from-blue-600/10 to-violet-600/10 blur-xl transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-blue-600/20 group-hover:to-violet-600/20"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="relative flex size-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-6 text-white shadow-md">
                    <div className="scale-125">{action.icon}</div>
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white">{action.label}</h3>
                    <p className="text-xs text-gray-400">Quick access</p>
                  </div>
                  <ArrowRight size={16} className="ml-auto text-gray-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </div>
              </Link>
            ))}
          </motion.div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left column - Mood and Insights */}
            <div className="space-y-8 lg:col-span-2">
              {/* Mood tracking card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="theme-border theme-container overflow-hidden rounded-xl"
              >
                <div className="border-b border-[#1a2747]/50 px-6 py-4">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Flame size={18} className="theme-text-primary" />
                    <span>Mood Check-In</span>
                  </h2>
                </div>
                <div className="p-6">
                  <MoodCheckIn />
                </div>
              </motion.div>
              
              {/* Journey timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="theme-border theme-container overflow-hidden rounded-xl"
              >
                <div className="border-b border-[#1a2747]/50 px-6 py-4">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Layers size={18} className="theme-text-secondary" />
                    <span>Journey Timeline</span>
                  </h2>
                </div>
                <div className="p-6">
                  <Journey />
                </div>
              </motion.div>
            </div>
            
            {/* Right column - Recent activities and insights */}
            <div className="space-y-8">
              {/* Reflection prompt */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="theme-border theme-container overflow-hidden rounded-xl"
              >
                <div className="border-b border-[#1a2747]/50 px-6 py-4">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Lightbulb size={18} className="theme-text-accent" />
                    <span>Daily Reflection</span>
                  </h2>
                </div>
                <div className="p-6">
                  <ReflectionPrompt />
                </div>
              </motion.div>
              
              {/* SoulPrint insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="theme-border theme-container overflow-hidden rounded-xl"
              >
                <div className="border-b border-[#1a2747]/50 px-6 py-4">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Sparkles size={18} className="theme-text-primary" />
                    <span>SoulPrint Insights</span>
                  </h2>
                </div>
                <div className="p-6">
                  <SoulPrintInsights />
                </div>
              </motion.div>
              
              {/* Recent activities */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                className="theme-border theme-container overflow-hidden rounded-xl"
              >
                <div className="border-b border-[#1a2747]/50 px-6 py-4">
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Activity size={18} className="theme-text-secondary" />
                    <span>Recent Activity</span>
                  </h2>
                </div>
                <div className="theme-border divide-y">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-4">
                      <div className="flex size-10 items-center justify-center rounded-full bg-[#111c3d]">
                        {activity.type === 'journal' && <BookOpen size={16} className="theme-text-secondary" />}
                        {activity.type === 'insight' && <Sparkles size={16} className="theme-text-primary" />}
                        {activity.type === 'mood' && <Flame size={16} className="theme-text-accent" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white">{activity.title}</h4>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                      {activity.emotion && (
                        <span className="rounded-full bg-[#111c3d] px-2 py-1 text-xs text-gray-300">{activity.emotion}</span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
