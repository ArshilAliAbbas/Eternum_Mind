"use client";

import React from 'react';
import { PenLine, CheckSquare } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/Button';

interface DashboardHeaderProps {
  userName: string;
  greeting: string;
  message: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  userName, 
  greeting, 
  message 
}) => {
  return (
    <div className="flex flex-col items-start justify-between rounded-xl bg-[#111827] p-6 md:flex-row md:items-center">
      <div>
        <h1 className="mb-1 text-2xl font-bold">{greeting}, {userName}</h1>
        <p className="text-gray-400">{message}</p>
      </div>
      <div className="mt-4 flex gap-4 md:mt-0">
        <Link href="/journal">
          <Button className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700">
            <PenLine size={18} />
            Start Journaling
          </Button>
        </Link>
        <Button variant="outline" className="flex items-center gap-2 border-gray-600 text-white hover:bg-gray-800">
          <CheckSquare size={18} />
          Check-in
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;