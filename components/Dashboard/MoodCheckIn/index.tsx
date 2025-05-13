"use client";

import React from 'react';
import { ClipboardCheck, Calendar } from 'lucide-react';

import MoodOption from './MoodOption';
import WeeklyTrend from './WeeklyTrend';

const MoodCheckIn: React.FC = () => {
  return (
    <div className="rounded-lg bg-[#091d45]/95 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">How are you feeling?</h2>
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-gray-400" />
          <ClipboardCheck size={20} className="text-gray-400" />
        </div>
      </div>
      <p className="mb-4 text-sm text-gray-300">How are you feeling today?</p>
      <div className="mb-8 flex justify-between">
        <MoodOption emoji="😊" label="Great" color="text-green-500" isSelected={true} />
        <MoodOption emoji="😐" label="Okay" color="text-yellow-500" />
        <MoodOption emoji="😔" label="Not Good" color="text-red-500" />
      </div>
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-medium">Weekly Trend</h3>
          <a href="#" className="flex items-center text-xs text-blue-400 hover:text-blue-300">
            View Details
            <svg className="ml-1 size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <WeeklyTrend />
      </div>
    </div>
  );
};

export default MoodCheckIn;