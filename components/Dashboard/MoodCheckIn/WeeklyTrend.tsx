import React from 'react';

const WeeklyTrend: React.FC = () => {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  
  return (
    <div className="flex h-12 items-end justify-between">
      {days.map((day, index) => {
        // Generate random heights for the demo
        const height = Math.floor(Math.random() * 100);
        const color = height > 70 ? 'bg-green-500' : height > 40 ? 'bg-yellow-500' : 'bg-red-500';
        
        return (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`w-1.5 rounded-t-sm ${color}`} 
              style={{ height: `${height}%` }}
            ></div>
            <span className="mt-1 text-xs text-gray-500">{day}</span>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyTrend;