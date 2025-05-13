import React from 'react';

interface MoodOptionProps {
  emoji: string;
  label: string;
  color: string;
  isSelected?: boolean;
}

const MoodOption: React.FC<MoodOptionProps> = ({ emoji, label, color, isSelected = false }) => {
  return (
    <button className={`flex flex-col items-center transition-transform hover:scale-110 ${isSelected ? 'scale-110' : ''}`}>
      <div className={`mb-1 text-2xl ${color} ${isSelected ? 'animate-pulse' : ''}`}>{emoji}</div>
      <span className={`text-xs ${isSelected ? 'font-medium text-white' : 'text-gray-400'}`}>{label}</span>
    </button>
  );
};

export default MoodOption;