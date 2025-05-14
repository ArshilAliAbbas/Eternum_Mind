import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  color: 'blue' | 'purple' | 'yellow' | 'green' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon, color: _ }) => {
  return (
    <div className="flex flex-col rounded-lg bg-[#0f1729] p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <div className="flex size-8 items-center justify-center rounded-full bg-[#131c36]/50">
          {icon}
        </div>
      </div>
      <div className="mb-1 text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-400">{description}</p>
    </div>
  );
};

export default StatCard;
