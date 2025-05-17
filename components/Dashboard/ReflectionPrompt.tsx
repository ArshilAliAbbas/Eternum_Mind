"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Send } from 'lucide-react';

// Sample reflection prompts
const reflectionPrompts = [
  "What small win are you celebrating today?",
  "What's one thing you learned recently that surprised you?",
  "What are you grateful for in this moment?",
  "What's something you're looking forward to?",
  "What's one thing you'd like to improve about yourself?",
  "What made you smile today?",
  "What's a challenge you're facing, and how might you overcome it?"
];

const ReflectionPrompt: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState(reflectionPrompts[0]); // Default to first prompt to avoid hydration errors
  
  // Select a random prompt on client-side only
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * reflectionPrompts.length);
    setPrompt(reflectionPrompts[randomIndex]);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the reflection
    console.log('Reflection saved:', { prompt, response });
    
    // Reset form and collapse
    setResponse('');
    setIsExpanded(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Lightbulb size={16} className="text-yellow-400" />
        <p className="text-sm text-gray-300">Today's reflection question:</p>
      </div>
      
      <p className="font-medium text-white">{prompt}</p>
      
      {!isExpanded ? (
        <button 
          onClick={() => setIsExpanded(true)}
          className="mt-2 rounded-lg bg-blue-600/20 px-4 py-2 text-sm text-blue-400 transition-colors hover:bg-blue-600/30"
        >
          Start Reflection
        </button>
      ) : (
        <motion.form 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-3"
        >
          <textarea
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            placeholder="Write your reflection here..."
            className="w-full rounded-lg border border-[#1a2747]/50 bg-[#0d1530]/50 p-2 text-sm text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            rows={4}
          />
          
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!response.trim()}
              className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600/80 to-indigo-600/80 px-3 py-1.5 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-600 disabled:opacity-50"
            >
              <Send size={14} />
              <span>Save</span>
            </button>
            
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="rounded-lg border border-[#1a2747]/50 bg-[#111c3d]/50 px-3 py-1.5 text-sm text-gray-300 hover:bg-[#111c3d] hover:text-white"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default ReflectionPrompt;
