import React from 'react';

import ProgressBar from './ProgressBar';

interface MilestoneItemProps {
  icon: string;
  title: string;
  progress: number;
  total: number;
  color: string;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({ 
  icon, 
  title, 
  progress, 
  total, 
  color 
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center">
        <div className="mr-3 flex size-8 items-center justify-center rounded-full bg-gray-800 text-lg">
          {icon}
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-xs text-gray-400">{progress} of {total} completed</p>
        </div>
      </div>
      <ProgressBar progress={(progress / total) * 100} color={color} />
    </div>
  );
};

export default MilestoneItem;