"use client";

import React from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import SettingsLayout from '@/components/Settings/SettingsLayout';

const SettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050a18] text-white">
      <Sidebar />
      <main className="relative min-h-screen overflow-y-auto pl-[70px] transition-all duration-300 ease-out">
        {/* Background elements */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-1/4 size-[500px] rounded-full bg-blue-900/5 blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 size-[600px] rounded-full bg-violet-900/5 blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.02]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#050a18]/80 via-[#050a18] to-[#050a18]"></div>
        </div>
        
        {/* Content container */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-8 sm:px-6 lg:px-8">
          <SettingsLayout />
        </div>
      </main>
    </div>
  );
};

export default SettingsPage;
