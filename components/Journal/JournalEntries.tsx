"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, PenLine, Calendar } from 'lucide-react';
import Link from 'next/link';

const JournalEntries: React.FC = () => {
  const [entries, setEntries] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading entries from localStorage
    const loadEntries = () => {
      setIsLoading(true);
      try {
        // Get all keys from localStorage that start with 'journal_entry_'
        const entryKeys = Object.keys(localStorage).filter(key => key.startsWith('journal_entry_'));
        
        // Parse each entry
        const loadedEntries = entryKeys.map(key => {
          const entry = JSON.parse(localStorage.getItem(key) || '{}');
          
return {
            id: key.replace('journal_entry_', ''),
            title: entry.title || 'Untitled Entry',
            content: entry.content || '',
            date: entry.date || new Date().toISOString(),
            mood: entry.mood || null,
            tags: entry.tags || []
          };
        });
        
        // Sort by date (newest first)
        loadedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setEntries(loadedEntries);
      } catch (error) {
        console.error('Error loading journal entries:', error);
        setEntries([]);
      }
      setIsLoading(false);
    };

    loadEntries();
  }, []);

  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (entry.tags && entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    
return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getExcerpt = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    
return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="relative min-h-screen bg-[#0c1222] text-white">
      {/* Background stars - small */}
      {[...Array(50)].map((_, i) => (
        <div 
          key={`star-sm-${i}`} 
          className="absolute size-1 rounded-full bg-yellow-200 opacity-40"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
          }}
        ></div>
      ))}
      {/* Background stars - medium */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={`star-md-${i}`} 
          className="absolute size-1.5 rounded-full bg-yellow-300 opacity-60"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${2 + Math.random() * 4}s infinite ${Math.random() * 2}s`
          }}
        ></div>
      ))}
      {/* Background stars - large */}
      {[...Array(10)].map((_, i) => (
        <div 
          key={`star-lg-${i}`} 
          className="absolute size-2 rounded-full bg-yellow-300 opacity-70 shadow-sm shadow-yellow-200/50"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            animation: `twinkle ${3 + Math.random() * 4}s infinite ${Math.random() * 2}s`
          }}
        ></div>
      ))}
      {/* Content */}
      <div className="relative z-10 px-6 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Journal Entries</h1>
          <p className="text-gray-400">Review and reflect on your past thoughts and feelings</p>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full bg-[#1e293b]/50 py-2 pl-10 pr-4 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2 size-4 text-gray-500" />
          </div>
          <button className="flex items-center gap-2 rounded-full bg-[#1e293b]/50 px-4 py-2 text-sm text-gray-300 hover:bg-[#1e293b]">
            <Filter className="size-4" />
            Filter
          </button>
        </div>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="size-8 animate-spin rounded-full border-y-2 border-blue-500"></div>
          </div>
        ) : filteredEntries.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredEntries.map(entry => (
              <Link 
                href={`/journal/entry/${entry.id}`} 
                key={entry.id}
                className="group flex flex-col rounded-lg border border-[#1e293b] bg-[#0f1729]/50 p-4 transition-all hover:border-blue-500/30 hover:bg-[#1e293b]/30"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="size-3" />
                    <span>{formatDate(entry.date)}</span>
                  </div>
                  {entry.mood && (
                    <div className="rounded-full bg-[#1e293b] px-2 py-1 text-xs">
                      {entry.mood}
                    </div>
                  )}
                </div>
                <h3 className="mb-2 text-lg font-medium group-hover:text-blue-400">{entry.title}</h3>
                <p className="mb-4 grow text-sm text-gray-400">{getExcerpt(entry.content)}</p>
                {entry.tags && entry.tags.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-1">
                    {entry.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="rounded-full bg-[#1e293b] px-2 py-0.5 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-[#1e293b] bg-[#0f1729]/50 p-12 text-center">
            <PenLine className="mb-4 size-16 text-gray-500 opacity-50" />
            <h3 className="mb-2 text-xl font-medium">No journal entries found</h3>
            <p className="mb-6 text-gray-400">
              Start journaling to see your entries appear here. Record your thoughts, feelings, and experiences.
            </p>
            <Link
              href="/journal/new"
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 font-medium shadow-lg transition-all hover:from-blue-600 hover:to-indigo-700"
            >
              <PenLine className="size-4" />
              Start Journaling
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalEntries;
