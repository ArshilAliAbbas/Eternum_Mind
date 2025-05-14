"use client";

import React from 'react';

interface SoulPrintInsightProps {
  icon: string;
  title: string;
  description: string;
}

const SoulPrintInsight: React.FC<SoulPrintInsightProps> = ({ icon, title, description }) => {
  return (
    <div className="cursor-pointer rounded-lg bg-[#131c36] p-6 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-indigo-900/20">
      <div className="mb-2 flex items-center">
        <div className="mr-4 flex size-10 items-center justify-center rounded-full bg-indigo-600/20 text-xl transition-all group-hover:bg-indigo-600/30">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-white">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-gray-400">{description}</p>
    </div>
  );
};

export default SoulPrintInsight;
