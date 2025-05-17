"use client";
/* eslint-disable react/jsx-newline */

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, BarChart2 } from 'lucide-react';

// Sample insights data
const insights = [
  { 
    id: 1, 
    title: 'Emotional Stability', 
    description: 'Your emotional patterns show increased stability',
    icon: <TrendingUp size={16} className="text-emerald-400" />,
    color: 'bg-emerald-500/10 border-emerald-500/20'
  },
  { 
    id: 2, 
    title: 'Journaling Consistency', 
    description: 'Journal consistency has improved by 30%',
    icon: <BarChart2 size={16} className="text-blue-400" />,
    color: 'bg-blue-500/10 border-blue-500/20'
  },
  { 
    id: 3, 
    title: 'Emotional Awareness', 
    description: 'You\'ve been more mindful of your emotions',
    icon: <Sparkles size={16} className="text-purple-400" />,
    color: 'bg-purple-500/10 border-purple-500/20'
  }
];

const SoulPrintInsights: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div 
            key={insight.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`rounded-lg border p-3 ${insight.color}`}
          >
            <div className="flex items-start gap-2">
              <div className="mt-0.5">{insight.icon}</div>
              <div>
                <h4 className="text-sm font-medium text-white">{insight.title}</h4>
                <p className="text-xs text-gray-300">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full rounded-lg border border-purple-500/30 bg-purple-600/10 py-2 text-sm font-medium text-purple-400 transition-colors hover:bg-purple-600/20">
        View Full Analysis
      </button>
    </div>
  );
};

export default SoulPrintInsights;
