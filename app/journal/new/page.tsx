"use client";

import React from 'react';

import Sidebar from '@/components/Dashboard/Sidebar';
import JournalEntry from '@/components/Journal/JournalEntry';
import JournalHeader from '@/components/Journal/JournalHeader';

const NewJournalEntryPage = () => {
  return (
    <div className="flex min-h-screen bg-[#0c1222]">
      <Sidebar />
      <div className="relative flex-1 overflow-hidden">
        {/* Background stars - small */}
        {[...Array(30)].map((_, i) => (
          <div key={`star-sm-${i}`} className="absolute size-1 rounded-full bg-yellow-200 opacity-40" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s` }} />
        ))}
        {/* Background stars - medium */}
        {[...Array(15)].map((_, i) => (
          <div key={`star-md-${i}`} className="absolute size-1.5 rounded-full bg-yellow-300 opacity-60" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 2}s` }} />
        ))}
        {/* Background stars - large */}
        {[...Array(5)].map((_, i) => (
          <div key={`star-lg-${i}`} className="absolute size-2 rounded-full bg-yellow-300 opacity-70 shadow-sm shadow-yellow-200/50" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `twinkle ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s` }} />
        ))}
        <div className="relative z-10">
          <JournalHeader />
          <div className="container mx-auto px-4">
            <JournalEntry />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewJournalEntryPage;
