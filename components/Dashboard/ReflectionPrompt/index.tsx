"use client";

import React from 'react';
import Link from 'next/link';
import { RefreshCcw, HelpCircle, PenLine, LightbulbIcon } from 'lucide-react';

import { Button } from '../../ui/Button';

const ReflectionPrompt: React.FC = () => {
  return (
    <div className="rounded-lg bg-[#091d45]/95 p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Daily Reflection Prompt</h2>
        <div className="flex space-x-3">
          <RefreshCcw size={18} className="cursor-pointer text-gray-400 hover:text-gray-300" />
          <HelpCircle size={18} className="cursor-pointer text-gray-400 hover:text-gray-300" />
        </div>
      </div>
      <div className="relative mb-6 rounded-lg border border-blue-500/30 bg-gradient-to-br from-[#1c3a7a] to-[#15295a] p-5">
        <div className="absolute -right-1 -top-1 rounded-full bg-amber-500/20 p-1.5">
          <LightbulbIcon size={16} className="text-amber-400" />
        </div>
        <p className="text-lg text-gray-300">"If your emotions had colors, what color are you feeling now and why?"</p>
      </div>
      <Link href="/journal" className="w-full">
        <Button className="flex w-full items-center justify-center gap-2 bg-blue-600 py-2.5 text-sm text-white transition-all hover:bg-blue-700">
          <PenLine size={18} />
          Write Now
        </Button>
      </Link>
    </div>
  );
};

export default ReflectionPrompt;