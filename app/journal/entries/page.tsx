"use client";

import React from 'react';

import JournalEntries from '@/components/Journal/JournalEntries';
import Sidebar from '@/components/Dashboard/Sidebar';

const JournalEntriesPage = () => {
  return (
    <div className="flex min-h-screen bg-[#0c1222]">
      <Sidebar />
      <div className="flex-1">
        <JournalEntries />
      </div>
    </div>
  );
};

export default JournalEntriesPage;
