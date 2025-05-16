"use client";

import React from 'react';

import JournalEntries from '@/components/Journal/JournalEntries';
import Sidebar from '@/components/Dashboard/Sidebar';

const JournalEntriesPage = () => {
  return (
    <div className="min-h-screen bg-[#0c1222]">
      <Sidebar />
      <main className="relative min-h-screen overflow-y-auto pl-[80px] transition-all duration-300 ease-out">
        <div className="relative z-10">
          <JournalEntries />
        </div>
      </main>
    </div>
  );
};

export default JournalEntriesPage;
