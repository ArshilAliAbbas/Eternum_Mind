"use client";

import React from 'react';

interface InsightBarProps {
  label: string;
  percentage: number;
  color: string;
}

const InsightBar: React.FC<InsightBarProps> = ({ label, percentage, color }) => {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-base font-medium text-gray-300">{label}</span>
        <span className="rounded-full bg-gray-800 px-3 py-1.5 text-base font-medium text-gray-300">{percentage}%</span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-gray-800/50">
        <div 
          className={`${color} h-4 rounded-full transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        >
          <div className="size-full animate-pulse opacity-70"></div>
        </div>
      </div>
    </div>
  );
};

export default InsightBar;