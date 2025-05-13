"use client";

import React from 'react';
import { Edit, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const JournalHeader: React.FC = () => {
  const pathname = usePathname();
  const isEntriesPage = pathname === '/journal/entries';
  
  return (
    <div className="relative mb-8 overflow-hidden rounded-lg bg-[#0c1222] p-12 text-center text-white">
      {/* Futuristic elements */}
      <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
      <div className="absolute left-0 top-1/2 h-1/3 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
      <div className="absolute right-0 top-1/2 h-1/2 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-indigo-500 to-transparent"></div>
      {/* Glowing orbs */}
      <div className="absolute left-10 top-10 size-2 rounded-full bg-yellow-300 opacity-70 shadow-lg shadow-yellow-300/30"></div>
      <div className="absolute right-10 top-10 size-2 rounded-full bg-yellow-300 opacity-70 shadow-lg shadow-yellow-300/30"></div>
      <div className="absolute bottom-10 left-10 size-2 rounded-full bg-yellow-300 opacity-70 shadow-lg shadow-yellow-300/30"></div>
      <div className="absolute bottom-10 right-10 size-2 rounded-full bg-yellow-300 opacity-70 shadow-lg shadow-yellow-300/30"></div>
      {/* Animated stars */}
      {[...Array(20)].map((_, i) => (
        <div key={`star-${i}`} className="absolute size-1 rounded-full bg-yellow-200 opacity-60" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s` }} />
      ))}
      {/* Larger glowing stars */}
      <div className="absolute left-1/4 top-1/3 size-3 animate-pulse rounded-full bg-yellow-300 opacity-80 shadow-lg shadow-yellow-300/50"></div>
      <div className="absolute right-1/4 top-2/3 size-3 animate-pulse rounded-full bg-yellow-300 opacity-80 shadow-lg shadow-yellow-300/50"></div>
      <div className="absolute left-2/3 top-1/4 size-3 animate-pulse rounded-full bg-yellow-300 opacity-80 shadow-lg shadow-yellow-300/50"></div>
      {/* Content */}
      <div className="relative z-10 mx-auto max-w-2xl">
        <div className="mb-1 flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
          <div className="size-2 rounded-full bg-blue-400"></div>
          <div className="h-px w-12 bg-gradient-to-r from-blue-400 via-transparent to-blue-400"></div>
        </div>
        <h1 className="mb-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400 bg-clip-text text-5xl font-bold tracking-wider text-transparent">
          Soul Journal
        </h1>
        <div className="mb-1 flex items-center justify-center gap-2">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
          <div className="size-1.5 rounded-full bg-indigo-400"></div>
          <div className="h-px w-16 bg-gradient-to-r from-indigo-400 via-transparent to-indigo-400"></div>
        </div>
        <p className="mb-8 text-blue-100">
          Document your journey, track your emotions, and gain insights into your inner self
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/journal/new" className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 font-medium shadow-lg transition-all hover:shadow-xl hover:shadow-indigo-500/20">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-0 transition-opacity group-hover:opacity-100"></span>
            <Edit size={18} className="relative z-10" />
            <span className="relative z-10">Write Journal</span>
          </Link>
          <Link href="/journal/entries" className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-medium transition-all ${isEntriesPage ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-yellow-500/20' : 'bg-white/10 text-white backdrop-blur-sm hover:bg-gradient-to-r hover:from-yellow-500 hover:to-amber-600 hover:text-white hover:shadow-lg hover:shadow-yellow-500/20'}`}>
            <BookOpen size={18} className="relative z-10" />
            <span className="relative z-10">View Entries</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JournalHeader;
