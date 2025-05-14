import React from 'react';

const WeeklyTrend: React.FC = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  // Fixed mood data to prevent hydration errors
  const moodData = [
    { height: 94, color: 'bg-green-500' },  // Sunday
    { height: 31, color: 'bg-red-500' },     // Monday
    { height: 78, color: 'bg-green-500' },   // Tuesday
    { height: 64, color: 'bg-yellow-500' },  // Wednesday
    { height: 23, color: 'bg-red-500' },     // Thursday
    { height: 10, color: 'bg-red-500' },     // Friday
    { height: 41, color: 'bg-yellow-500' }   // Saturday
  ];
  
  return (
    <div className="flex h-12 items-end justify-between">
      {days.map((day, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className={`w-1.5 rounded-t-sm ${moodData[index].color}`} 
            style={{ height: `${moodData[index].height}%` }}
          ></div>
          <span className="mt-1 text-xs text-gray-500">{day}</span>
        </div>
      ))}
    </div>
  );
};

export default WeeklyTrend;