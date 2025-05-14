"use client";

import React from 'react';

const WeeklyActivity: React.FC = () => {
  // Data for the weekly activity chart
  const activityData = [
    { day: 'Mon', journalWords: 450, reflections: 3 },
    { day: 'Tue', journalWords: 310, reflections: 4 },
    { day: 'Wed', journalWords: 480, reflections: 4 },
    { day: 'Thu', journalWords: 340, reflections: 3 },
    { day: 'Fri', journalWords: 420, reflections: 5 },
    { day: 'Sat', journalWords: 600, reflections: 5 },
    { day: 'Sun', journalWords: 470, reflections: 4 }
  ];

  // Find the maximum values for scaling
  const maxJournalWords = Math.max(...activityData.map(item => item.journalWords));

  return (
    <div className="w-full">
      <h2 className="mb-6 text-xl font-bold">Weekly Activity</h2>
      <div className="relative h-[300px] w-full">
        {/* Y-axis labels for journal words (left) */}
        <div className="absolute -left-8 top-0 flex h-full flex-col justify-between text-xs text-purple-400">
          <div>600</div>
          <div>450</div>
          <div>300</div>
          <div>150</div>
          <div>0</div>
        </div>
        {/* Y-axis labels for reflections (right) */}
        <div className="absolute -right-8 top-0 flex h-full flex-col justify-between text-xs text-teal-400">
          <div>8</div>
          <div>6</div>
          <div>4</div>
          <div>2</div>
          <div>0</div>
        </div>
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between">
          {[0, 1, 2, 3, 4].map((_, index) => (
            <div 
              key={index} 
              className="w-full border-t border-gray-700/30"
            />
          ))}
        </div>
        {/* Vertical grid lines */}
        <div className="absolute inset-0 flex justify-between">
          {activityData.map((item, index) => (
            <div 
              key={index} 
              className="h-full border-l border-gray-700/30"
            />
          ))}
          <div className="h-full border-l border-gray-700/30" />
        </div>
        {/* Bars */}
        <div className="absolute inset-x-0 bottom-6 flex h-[calc(100%-24px)] items-end justify-between px-4">
          {activityData.map((item, index) => (
            <div key={index} className="w-1/7 flex flex-col items-center gap-2">
              {/* Journal words bar (purple) */}
              <div className="w-10 rounded-t bg-purple-500/80 transition-all duration-300 hover:bg-purple-400" style={{ height: `${(item.journalWords / maxJournalWords) * 100}%` }} />
              {/* Reflections bar (teal) */}
              <div className="w-10 rounded-t bg-teal-500/80 transition-all duration-300 hover:bg-teal-400" style={{ height: `${(item.reflections / 8) * 100}%` }} />
              {/* Day label */}
              <div className="mt-2 text-xs text-gray-400">{item.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyActivity;
