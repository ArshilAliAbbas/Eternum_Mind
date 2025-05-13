"use client";

import React from 'react';

import MoodTracker from '@/components/MoodTracker';
import Sidebar from '@/components/Dashboard/Sidebar';

const MoodTrackerPage: React.FC = () => {
  return (
    <div className="h-screen bg-[#0c1222]">
      <Sidebar />
      <main className="min-h-screen overflow-y-auto pl-[80px] transition-all duration-300 ease-out">
        <MoodTracker />
      </main>
    </div>
  );
};

export default MoodTrackerPage;
