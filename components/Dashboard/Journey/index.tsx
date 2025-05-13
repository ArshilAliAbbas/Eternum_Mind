"use client";

import React from 'react';
import { ChevronRight, Award } from 'lucide-react';

import MilestoneItem from './MilestoneItem';

const Journey: React.FC = () => {
  return (
    <div className="rounded-lg bg-[#091d45]/95 p-5">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={20} className="text-amber-400" />
          <h2 className="text-2xl font-semibold">Your Journey</h2>
        </div>
        <a href="#" className="flex items-center text-base text-blue-400 transition-colors hover:text-blue-300">
          All Milestones
          <ChevronRight size={18} className="ml-1" />
        </a>
      </div>
      <div className="space-y-6">
        <MilestoneItem 
          icon="🏆" 
          title="7-Day Journal Streak" 
          progress={5} 
          total={7} 
          color="bg-blue-500" 
        />
        <MilestoneItem 
          icon="🧘" 
          title="Mindfulness Explorer" 
          progress={3} 
          total={5} 
          color="bg-purple-500" 
        />
        <MilestoneItem 
          icon="💪" 
          title="Emotion Mastery" 
          progress={2} 
          total={10} 
          color="bg-indigo-500" 
        />
      </div>

    </div>
  );
};

export default Journey;