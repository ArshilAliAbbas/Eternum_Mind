"use client";
/* eslint-disable react/jsx-newline */

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Flame } from 'lucide-react';

// Sample data - in a real app, this would come from your database or API
const journeyData = [
  { date: 'Today', entries: 1, moods: 2, type: 'active' },
  { date: 'Yesterday', entries: 2, moods: 1, type: 'active' },
  { date: '2 days ago', entries: 0, moods: 1, type: 'partial' },
  { date: '3 days ago', entries: 1, moods: 0, type: 'partial' },
  { date: '4 days ago', entries: 0, moods: 0, type: 'inactive' },
  { date: '5 days ago', entries: 3, moods: 1, type: 'active' },
  { date: '6 days ago', entries: 1, moods: 1, type: 'active' },
];

const Journey: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-300">Last 7 days</h3>
        <button className="text-xs text-blue-400 hover:text-blue-300">View All</button>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {journeyData.map((day, index) => (
          <motion.div
            key={day.date}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex flex-col items-center"
          >
            <div 
              className={`
                relative flex h-14 w-full flex-col items-center justify-center rounded-md border 
                ${day.type === 'active' 
                  ? 'border-blue-500/30 bg-blue-500/10' 
                  : day.type === 'partial' 
                    ? 'border-blue-500/20 bg-blue-500/5' 
                    : 'border-[#1a2747]/50 bg-[#111c3d]/30'
                }
              `}
            >
              {day.entries > 0 && (
                <div className="absolute -top-1.5 right-1.5 flex size-3 items-center justify-center rounded-full bg-blue-400 text-[8px] text-white">
                  {day.entries > 1 && day.entries}
                </div>
              )}
              {day.moods > 0 && (
                <div className="absolute -top-1.5 left-1.5 flex size-3 items-center justify-center rounded-full bg-amber-400 text-[8px] text-white">
                  {day.moods > 1 && day.moods}
                </div>
              )}
              
              <div className="flex gap-1.5">
                {day.entries > 0 && <BookOpen size={12} className="text-blue-400" />}
                {day.moods > 0 && <Flame size={12} className="text-amber-400" />}
              </div>
            </div>
            <span className="mt-1 text-center text-[10px] text-gray-400">{day.date}</span>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-full bg-blue-400"></div>
          <span>Journal</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="size-2 rounded-full bg-amber-400"></div>
          <span>Mood</span>
        </div>
      </div>
    </div>
  );
};

export default Journey;
