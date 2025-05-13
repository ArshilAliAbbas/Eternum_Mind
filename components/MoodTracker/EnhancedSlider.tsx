import React from 'react';

import { generateParticleProps } from './utils';

interface EnhancedSliderProps {
  value: number;
  onChange: (_value: number) => void;
  min: number;
  max: number;
  step?: number;
  colorScheme: 'mood' | 'energy';
  label: string;
}

const EnhancedSlider: React.FC<EnhancedSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  colorScheme,
  label
}) => {
  // Determine color scheme based on the type
  const colors = {
    mood: {
      gradient: 'from-indigo-600 via-blue-500 to-violet-500',
      shadow: 'shadow-indigo-500/30',
      activeShadow: 'shadow-indigo-500/40',
      thumbGradient: 'from-indigo-500 to-blue-500',
      textColor: 'text-indigo-200',
      badge: 'from-indigo-600 to-blue-500 shadow-indigo-500/20'
    },
    energy: {
      gradient: 'from-blue-600 via-purple-500 to-fuchsia-500',
      shadow: 'shadow-purple-500/30',
      activeShadow: 'shadow-purple-500/40',
      thumbGradient: 'from-blue-500 to-purple-500',
      textColor: 'text-purple-200',
      badge: 'from-blue-600 to-purple-500 shadow-purple-500/20'
    }
  };

  // Get the selected color scheme
  const selectedColors = colors[colorScheme];

  // Calculate percentage for positioning
  const percentage = ((value - min) / (max - min)) * 100;

  // Get label text based on value
  const getLabelText = () => {
    if (value <= min) return "Very Low";
    if (value === min + 1) return "Low";
    if (value === min + 2) return "Moderate";
    if (value === max - 1) return "High";
    
    return "Very High";
  };

  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-lg font-medium">{label}</span>
        <span className={`rounded-full bg-gradient-to-r ${selectedColors.badge} px-3 py-1 text-sm font-medium text-white shadow-lg`}>
          {getLabelText()}
        </span>
      </div>
      <div className="relative mb-3 h-4 w-full overflow-hidden rounded-full bg-[#0c1222] shadow-inner shadow-black/30">
        {/* Animated glow effect */}
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 5 }).map((_, i) => {
            const props = generateParticleProps(i, 5, `${colorScheme}-slider`);
            
            return (
              <div
                key={i}
                className="absolute size-2 rounded-full bg-white blur-sm"
                style={{
                  top: `${props.top}%`,
                  left: `${props.left}%`,
                  animation: `pulse ${2 + props.duration * 0.3}s ease-in-out infinite`,
                  animationDelay: `${props.delay * 0.4}s`,
                }}
              ></div>
            );
          })}
        </div>
        {/* Progress bar with gradient */}
        <div className={`absolute h-full rounded-full bg-gradient-to-r ${selectedColors.gradient} transition-all duration-300 ease-out`} style={{ width: `${percentage}%` }}>
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </div>
        </div>
        {/* Custom slider thumb */}
        <div className={`absolute top-0 -ml-3 size-6 cursor-grab rounded-full bg-white shadow-lg transition-all duration-300 ease-out ${selectedColors.shadow} active: active:scale-110 active:cursor-grabbing active:shadow-xl${selectedColors.activeShadow}`} style={{ left: `${percentage}%` }}>
          <div className={`absolute inset-1 rounded-full bg-gradient-to-br ${selectedColors.thumbGradient}`}></div>
        </div>
      </div>
      <div className="relative mb-6">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute top-0 z-10 h-4 w-full cursor-pointer appearance-none bg-transparent opacity-0"
        />
        <div className={`mt-2 flex justify-between text-xs font-medium ${selectedColors.textColor}`}>
          <span>Very Low</span>
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
          <span>Very High</span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSlider;
