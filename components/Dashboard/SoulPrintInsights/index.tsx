"use client";

import React from 'react';
import { Info, TrendingUp, ArrowUpCircle } from 'lucide-react';

import InsightBar from './InsightBar';

const SoulPrintInsights: React.FC = () => {
  return (
    <div className="rounded-lg bg-[#091d45]/95 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Soul Print Insights</h2>
        <Info size={20} className="cursor-pointer text-indigo-400 hover:text-indigo-300" />
      </div>
      <div className="space-y-5">
        <InsightBar label="Mindfulness" percentage={75} color="bg-indigo-500" />
        <InsightBar label="Resilience" percentage={82} color="bg-purple-500" />
        <InsightBar label="Well-being" percentage={68} color="bg-blue-500" />
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-1.5 rounded-full bg-green-900/20 px-3 py-1.5 text-sm text-green-400">
          <ArrowUpCircle size={16} className="text-green-400" />
          +5% this week
        </div>
        <a href="#" className="flex items-center gap-1.5 text-sm text-blue-400 transition-colors hover:text-blue-300">
          <span>Complete Analysis</span>
          <TrendingUp size={14} />
        </a>
      </div>
    </div>
  );
};

export default SoulPrintInsights;