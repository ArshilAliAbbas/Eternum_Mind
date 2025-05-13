import React from 'react';

interface ProgressBarProps {
  progress: number;
  color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
  return (
    <div className="h-2 w-full rounded-full bg-gray-700">
      <div 
        className={`${color} h-2 rounded-full transition-all duration-500 ease-in-out`} 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;