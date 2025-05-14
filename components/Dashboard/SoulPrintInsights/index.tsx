"use client";

import React from 'react';
import { Info, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const SoulPrintInsights: React.FC = () => {
  // Data for the radar chart
  const attributes = [
    { name: 'Resilience', value: 0.8 },
    { name: 'Mindfulness', value: 0.9 },
    { name: 'Creativity', value: 0.85 },
    { name: 'Empathy', value: 0.75 },
    { name: 'Focus', value: 0.7 },
    { name: 'Gratitude', value: 0.78 },
    { name: 'Adaptability', value: 0.82 },
    { name: 'Optimism', value: 0.76 }
  ];

  return (
    <div className="rounded-lg bg-[#0f1729] p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Your SoulPrint</h2>
        <Info size={20} className="cursor-pointer text-gray-400 hover:text-white" />
      </div>
      <div className="flex justify-center">
        <div className="flex space-x-3">
          <button className="rounded-lg border border-gray-700 px-4 py-1.5 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">Soul Print</button>
          <button className="rounded-lg border border-gray-700 px-4 py-1.5 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">Legacy Data</button>
          <button className="rounded-lg border border-gray-700 px-4 py-1.5 text-sm text-gray-400 transition-colors hover:bg-gray-800 hover:text-white">Soul Links</button>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <div className="relative aspect-square w-full max-w-[300px]">
          <svg viewBox="0 0 200 200" className="size-full">
            {/* Background grid */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.1)" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.1)" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.1)" />
            <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(255,255,255,0.1)" />
            {/* Axis lines */}
            {attributes.map((attr, i) => {
              const angle = (i * 2 * Math.PI) / attributes.length - Math.PI / 2;
              const x = 100 + 80 * Math.cos(angle);
              const y = 100 + 80 * Math.sin(angle);

              return (
                <React.Fragment key={attr.name}>
                  <line x1="100" y1="100" x2={x} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <text x={100 + 95 * Math.cos(angle)} y={100 + 95 * Math.sin(angle)} textAnchor="middle" dominantBaseline="middle" fill="rgba(255,255,255,0.7)" fontSize="10">{attr.name}</text>
                </React.Fragment>
              );
            })}
            {/* Data polygon */}
            <polygon 
              points={attributes.map((attr, i) => {
                const angle = (i * 2 * Math.PI) / attributes.length - Math.PI / 2;
                const x = 100 + 80 * attr.value * Math.cos(angle);
                const y = 100 + 80 * attr.value * Math.sin(angle);
                
                return `${x},${y}`;
              }).join(' ')}
              fill="rgba(99, 102, 241, 0.3)"
              stroke="rgba(129, 140, 248, 0.8)"
              strokeWidth="2"
            />
            {/* Data points */}
            {attributes.map((attr, i) => {
              const angle = (i * 2 * Math.PI) / attributes.length - Math.PI / 2;
              const x = 100 + 80 * attr.value * Math.cos(angle);
              const y = 100 + 80 * attr.value * Math.sin(angle);

              return (
                <circle key={`point-${i}`} cx={x} cy={y} r="3" fill="white" filter="drop-shadow(0 0 3px rgba(129, 140, 248, 0.8))" />
              );
            })}
          </svg>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-gray-400">
        Your SoulPrint represents your unique emotional and behavioral patterns based on your journal entries and mood data.
      </p>
      <div className="mt-6 flex items-center justify-between">
        <Link href="/soulprint" className="flex items-center gap-1.5 text-sm text-blue-400 transition-colors hover:text-blue-300">
          <span>Complete Analysis</span>
          <TrendingUp size={14} />
        </Link>
      </div>
    </div>
  );
};

export default SoulPrintInsights;