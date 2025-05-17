"use client";
/* eslint-disable react/jsx-newline */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh, Heart, ThumbsUp } from 'lucide-react';

const emotions = [
  { name: 'Happy', icon: <Smile className="size-5" />, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { name: 'Calm', icon: <Heart className="size-5" />, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { name: 'Neutral', icon: <Meh className="size-5" />, color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  { name: 'Grateful', icon: <ThumbsUp className="size-5" />, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { name: 'Sad', icon: <Frown className="size-5" />, color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
];

const MoodCheckIn: React.FC = () => {
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the mood data
    console.log('Mood tracked:', { emotion: selectedEmotion, note });
    
    // Reset form
    setSelectedEmotion(null);
    setNote('');
  };

  return (
    <div className="space-y-4">
      <p className="mb-4 text-gray-300">How are you feeling right now?</p>
      
      <div className="flex flex-wrap gap-2">
        {emotions.map((emotion) => (
          <button
            key={emotion.name}
            onClick={() => setSelectedEmotion(emotion.name)}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all ${
              selectedEmotion === emotion.name 
                ? emotion.color + ' ring-1 ring-white/20' 
                : 'border-[#1a2747]/50 bg-[#111c3d] hover:border-[#2a3a61]/70'
            }`}
          >
            {emotion.icon}
            <span className="text-sm">{emotion.name}</span>
          </button>
        ))}
      </div>
      
      {selectedEmotion && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="note" className="mb-1 block text-sm text-gray-300">
                Add a note (optional)
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full rounded-lg border border-[#1a2747]/50 bg-[#0d1530]/50 p-2 text-sm text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                placeholder="What's contributing to this feeling?"
                rows={3}
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-blue-600/80 to-indigo-600/80 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-600"
            >
              Save Mood
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default MoodCheckIn;
