"use client";

import React from 'react';
import { BrainCircuit, Clock, Heart, Lightbulb } from 'lucide-react';

import Sidebar from '../Dashboard/Sidebar';

import StatCard from './StatCard';
import WeeklyActivity from './WeeklyActivity';

const Analytics: React.FC = () => {
  return (
    <div className="h-screen bg-[#0a0e1a] text-white">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content - with padding that adjusts based on sidebar state */}
      <main className="min-h-screen overflow-y-auto pl-[80px] transition-all duration-300 ease-out">
        <div className="mx-auto max-w-full p-6">
          <h1 className="mb-6 text-3xl font-bold">Analytics Dashboard</h1>
          {/* Stats Cards Grid */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Journal Streak" value="7 Days" description="Keep going! You're building a healthy habit." icon={<Clock className="text-blue-400" />} color="blue" />
            <StatCard title="Mood Trend" value="+15%" description="Your overall mood is improving week over week." icon={<Heart className="text-purple-400" />} color="purple" />
            <StatCard title="Insights Generated" value="12" description="AI has analyzed your entries and found patterns." icon={<BrainCircuit className="text-blue-400" />} color="blue" />
            <StatCard title="Reflection Prompts" value="24" description="You've completed these prompts to aid growth." icon={<Lightbulb className="text-yellow-400" />} color="yellow" />
          </div>
          {/* Weekly Activity Chart - Large as requested */}
          <div className="rounded-lg bg-[#0f1729] p-6 shadow-lg">
            <WeeklyActivity />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
