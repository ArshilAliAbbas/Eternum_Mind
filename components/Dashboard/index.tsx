"use client";

import React from 'react';
import Link from 'next/link';

import Sidebar from './Sidebar';
import MoodCheckIn from './MoodCheckIn';
import ReflectionPrompt from './ReflectionPrompt';
import SoulPrintInsights from './SoulPrintInsights';
import Journey from './Journey';

const Dashboard: React.FC = () => {
  // This would typically come from user authentication or context
  const userName = "Demo User";

  return (
    <div className="h-screen bg-[#0a0e1a] text-white">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content - with padding that adjusts based on sidebar state */}
      <main className="min-h-screen overflow-y-auto pl-[80px] transition-all duration-300 ease-out">
        <div className="mx-auto max-w-full p-4">
          {/* Immersive header with hero section */}
          <div className="relative mb-5 overflow-hidden rounded-xl bg-gradient-to-br from-[#091428] via-[#0a1e42] to-[#13295a] shadow-xl">
            {/* Background decorative elements */}
            <div className="absolute -right-16 -top-16 size-64 rounded-full bg-indigo-600/10 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-16 size-64 rounded-full bg-blue-600/10 blur-3xl"></div>
            <div className="absolute left-1/4 top-0 h-1/2 w-1/4 rounded-full bg-purple-600/5 blur-2xl"></div>
            {/* Content with proper spacing */}
            <div className="relative z-10 p-4">
              {/* User greeting */}
              <div className="mb-4"><h1 className="mb-1 text-3xl font-bold tracking-tight md:text-4xl"><span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Good Morning, {userName}</span></h1><p className="mt-1 text-base text-gray-300">Welcome to your personal NeuroSphere. What would you like to explore today?</p></div>
              {/* Action buttons with enhanced styling */}
              <div className="flex flex-wrap gap-4">
                <Link href="/journal" className="group flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-base font-medium text-white transition-all hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-600/20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-90"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
                  Start Journaling
                </Link>
                <button className="group flex items-center gap-2 rounded-lg border border-gray-600 bg-transparent px-5 py-2.5 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-gray-500 hover:bg-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:scale-110"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                  Check-in
                </button>
              </div>
            </div>
            {/* User avatar integrated into the header with sonar effect */}
            <div className="absolute right-6 top-6">
              <div className="group relative">
                {/* Sonar effect - multiple rings with animation */}
                <div className="absolute -inset-3 animate-ping-slow rounded-full border border-blue-500/30 opacity-0 group-hover:opacity-100"></div>
                <div className="absolute -inset-2 animate-ping-slow rounded-full border border-blue-500/40 opacity-0 delay-300 group-hover:opacity-100"></div>
                <div className="absolute -inset-1 animate-ping-slow rounded-full border border-blue-500/50 opacity-0 delay-600 group-hover:opacity-100"></div>
                {/* Avatar */}
                <div className="size-14 overflow-hidden rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-lg transition-transform hover:scale-105">
                  <div className="flex size-full items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-600">
                    <span className="text-2xl font-bold text-white">{userName.split(' ').map(name => name[0]).join('')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {/* First row with bigger cards and better spacing */}
            <div className="rounded-lg bg-gradient-to-b from-[#0a1d40] to-[#081630] p-2 shadow-md transition-all duration-1000 ease-in-out hover:-translate-y-6 hover:shadow-lg hover:shadow-blue-900/20"><MoodCheckIn /></div>
            <div className="rounded-lg bg-gradient-to-b from-[#0c2050] to-[#091940] p-2 shadow-md transition-all duration-1000 ease-in-out hover:-translate-y-6 hover:shadow-lg hover:shadow-blue-900/20"><ReflectionPrompt /></div>
            <div className="rounded-lg bg-gradient-to-b from-[#0f2a61] to-[#0a1f4a] p-2 shadow-md transition-all duration-1000 ease-in-out hover:-translate-y-6 hover:shadow-lg hover:shadow-blue-900/20"><SoulPrintInsights /></div>
          </div>
          {/* Second row - full width with enhanced styling */}
          <div className="mt-4 rounded-lg bg-gradient-to-b from-[#091d45] to-[#071535] p-2 shadow-md transition-all duration-1000 ease-in-out hover:-translate-y-6 hover:shadow-lg hover:shadow-blue-900/20"><Journey /></div>
        </div>
      </main>

    </div>
  );
};

export default Dashboard;
