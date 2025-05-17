"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  Save,
  Sparkles,
  Info,
  Lock,
  Upload,
  Heart,
  PenLine,
  Clock,
  Smile,
  Frown,
  ThumbsDown,
  Zap,
  Moon,
  Sun,
  RefreshCcw,
  HelpCircle,
  Tag,
  Plus,
} from "lucide-react";

const JournalEntry: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [saveMessage, setSaveMessage] = useState("");
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  // Load saved entry from localStorage if it exists
  useEffect(() => {
    const savedEntry = localStorage.getItem("journalEntry");
    if (savedEntry) {
      const parsedEntry = JSON.parse(savedEntry);
      setTitle(parsedEntry.title || "");
      setContent(parsedEntry.content || "");
      setSelectedMood(parsedEntry.mood || null);
      setTags(parsedEntry.tags || []);
      setWordCount(
        parsedEntry.content ? parsedEntry.content.trim().split(/\s+/).length : 0
      );
    }
  }, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setWordCount(
      newContent.trim() === "" ? 0 : newContent.trim().split(/\s+/).length
    );
    setShowPlaceholder(newContent.trim() === "");
  };

  const handleAddTag = () => {
    if (tagInput.trim() !== "" && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood === selectedMood ? null : mood);
  };

  const saveEntry = () => {
    const now = new Date();
    const entry = {
      title,
      content,
      mood: selectedMood,
      tags,
      date: now.toISOString(),
      wordCount,
    };

    localStorage.setItem("journalEntry", JSON.stringify(entry));
    const timeString = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setLastSaved(timeString);
    setSaveMessage("Journal entry saved successfully!");

    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  };

  const moods = [
    { id: "happy", label: "Happy", icon: <Smile className="size-5" /> },
    { id: "calm", label: "Calm", icon: <Moon className="size-5" /> },
    {
      id: "reflective",
      label: "Reflective",
      icon: <RefreshCcw className="size-5" />,
    },
    { id: "energetic", label: "Energetic", icon: <Zap className="size-5" /> },
    { id: "anxious", label: "Anxious", icon: <Frown className="size-5" /> },
    { id: "sad", label: "Sad", icon: <ThumbsDown className="size-5" /> },
    { id: "excited", label: "Excited", icon: <Sparkles className="size-5" /> },
    { id: "tired", label: "Tired", icon: <Moon className="size-5" /> },
    { id: "grateful", label: "Grateful", icon: <Heart className="size-5" /> },
    { id: "neutral", label: "Neutral", icon: <Sun className="size-5" /> },
  ];

  return (
    <div className="flex bg-[#0c1222] text-white">
      {/* Left side - Journal Entry */}
      <div className="relative flex-1 p-6">
        {/* Futuristic elements */}
        <div className="absolute left-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        <div className="absolute right-0 top-0 h-px w-1/4 bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
        <div className="absolute bottom-0 right-0 h-px w-1/3 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/50"></div>
            <h1 className="text-2xl font-bold tracking-wide">Journal Entry</h1>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-[#1e293b]/50 px-3 py-1">
            <div className="flex items-center gap-1 text-gray-400">
              <Clock size={16} />
              <span className="text-sm">{formattedDate}</span>
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex items-center gap-1 text-gray-400">
              <span className="text-sm">{wordCount} words</span>
            </div>
          </div>
        </div>
        <div className="mb-6 flex gap-3">
          <button
            onClick={saveEntry}
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#1e293b] px-5 py-2 text-sm text-gray-300 transition-all hover:shadow-md"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 opacity-0 transition-opacity group-hover:opacity-100"></span>
            <Save size={16} className="relative z-10" />
            <span className="relative z-10">Save</span>
          </button>
          <button className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm transition-all hover:shadow-md hover:shadow-indigo-500/20">
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 transition-opacity group-hover:opacity-100"></span>
            <Sparkles size={16} className="relative z-10" />
            <span className="relative z-10">AI Insights</span>
          </button>
          {saveMessage && (
            <div className="flex items-center rounded-full bg-green-600/20 px-5 py-2 text-sm text-green-400">
              {saveMessage}
            </div>
          )}
          {lastSaved && !saveMessage && (
            <div className="flex items-center rounded-full bg-[#1e293b]/30 px-5 py-2 text-sm text-gray-400">
              Last saved at {lastSaved}
            </div>
          )}
        </div>
        <div className="relative mb-4">
          <div className="absolute -left-2 top-1/2 h-px w-2 -translate-y-1/2 bg-yellow-500/50"></div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title for your journal entry"
            className="w-full rounded-md border border-[#1e293b] bg-[#0c1222] p-4 text-lg transition-all placeholder:text-gray-500 focus:border-yellow-500/50 focus:outline-none focus:ring-1 focus:ring-yellow-500/30"
          />
          <div className="absolute -right-2 top-1/2 h-px w-2 -translate-y-1/2 bg-yellow-500/50"></div>
        </div>
        <div className="mb-2 flex items-center gap-2 text-gray-400">
          <Calendar size={16} />
          <span className="text-sm">{formattedDate}</span>
        </div>
        <div className="relative min-h-[300px] w-full overflow-hidden rounded-md border border-[#1e293b] bg-[#0c1222] transition-all focus-within:border-yellow-500/50 focus-within:ring-1 focus-within:ring-yellow-500/30">
          {/* Futuristic corner accents */}
          <div className="absolute left-0 top-0 h-4 w-px bg-gradient-to-b from-yellow-500/50 to-transparent"></div>
          <div className="absolute left-0 top-0 h-px w-4 bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
          <div className="absolute right-0 top-0 h-4 w-px bg-gradient-to-b from-yellow-500/50 to-transparent"></div>
          <div className="absolute right-0 top-0 h-px w-4 bg-gradient-to-r from-transparent to-yellow-500/50"></div>
          <div className="absolute bottom-0 left-0 h-4 w-px bg-gradient-to-t from-yellow-500/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 h-px w-4 bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-4 w-px bg-gradient-to-t from-yellow-500/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-px w-4 bg-gradient-to-r from-transparent to-yellow-500/50"></div>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder=""
            className="min-h-[300px] w-full bg-transparent p-4 text-lg focus:outline-none"
          />
          {showPlaceholder && (
             <div className="pointer-events-none absolute left-0 top-0 flex size-full flex-col items-center justify-center p-4 text-gray-500">
             <PenLine size={40} className="mb-4 opacity-20" />
             <p className="text-center">Start writing your thoughts...</p>
             <form className="w-full max-w-md p-4 bg-white rounded shadow-lg">
               <textarea
                 value={content}
                 onChange={handleContentChange}
                 placeholder="Type your text here..."
                 className="w-full p-2 border border-gray-300 rounded mb-4"
               />
               <input
                 type="file"
                 onChange={(e) => {
                   const file = e.target.files?.[0];
                   if (file) {
                     // Handle the image file here
                     console.log('Selected file:', file);
                   }
                 }}
                 accept="image/*"
                 className="w-full p-2 border border-gray-300 rounded mb-4"
               />
               <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                 Upload
               </button>
             </form>
           </div>
          )}
        </div>
        <div className="my-8 border-t border-[#1e293b]"></div>
        <div className="mb-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="size-1.5 rounded-full bg-yellow-400 shadow-sm shadow-yellow-400/30"></div>
            <h3 className="text-xl font-medium">How are you feeling today?</h3>
            <div className="h-px grow bg-gradient-to-r from-yellow-500/20 to-transparent"></div>
          </div>
          <div className="flex flex-wrap gap-3">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => handleMoodSelect(mood.id)}
                className={`group relative flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 transition-all ${
                  selectedMood === mood.id
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-sm shadow-yellow-500/20"
                    : "bg-[#1e293b] text-gray-300 hover:bg-[#1e293b]/80 hover:shadow-sm hover:shadow-yellow-500/10"
                }`}
              >
                <span
                  className={`relative z-10 ${selectedMood === mood.id ? "text-white" : "text-gray-300"}`}
                >
                  {mood.icon}
                </span>
                <span className="relative z-10">{mood.label}</span>
                {selectedMood !== mood.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-yellow-600/10 to-amber-600/10 opacity-0 transition-opacity group-hover:opacity-100"></span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="mb-2 flex items-center gap-2 text-xl font-medium">
            <Tag size={18} />
            Add tags to categorize your entry
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center rounded-full bg-[#1e293b] px-3 py-1.5 text-sm text-gray-300"
              >
                <span>{tag}</span>
                <button
                  onClick={() => setTags(tags.filter((_, i) => i !== index))}
                  className="ml-2 text-gray-500 hover:text-gray-300"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
              placeholder="Add a tag..."
              className="flex-1 rounded-l-md border border-[#1e293b] bg-[#0f1729] px-4 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={handleAddTag}
              className="flex items-center gap-1 rounded-r-md bg-[#1e293b] px-4 py-2 text-sm hover:bg-[#283548]"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm text-gray-400">
            <span>{wordCount} words</span>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-md bg-[#1e293b] px-4 py-2 text-sm text-gray-300 hover:bg-[#283548]">
              <Sparkles size={16} />
              Get AI Insights
            </button>
            <button
              onClick={saveEntry}
              className="flex items-center gap-2 rounded-md bg-[#4f46e5] px-4 py-2 text-sm hover:bg-[#4338ca]"
            >
              <Save size={16} />
              Save Entry
            </button>
          </div>
        </div>
      </div>
      {/* Right side - Prompts and Analysis */}
      <div className="w-[350px] border-l border-[#1e293b] bg-[#0c1523] p-6">
        <div className="mb-8 rounded-lg border border-[#1e293b] bg-[#0f1729] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Reflection Prompts</h3>
            <div className="flex gap-2">
              <button className="text-gray-400 hover:text-gray-300">
                <RefreshCcw size={16} />
              </button>
              <button className="text-yellow-400 hover:text-yellow-300">
                <HelpCircle size={16} />
              </button>
            </div>
          </div>
          <div className="mb-4 rounded-md bg-[#1e293b]/50 p-3 text-amber-100">
            <p className="italic">
              "Write about something you're grateful for today."
            </p>
          </div>
          <button className="w-full rounded-md bg-[#4f46e5] py-2 text-center font-medium hover:bg-[#4338ca]">
            Write About This
          </button>
          <div className="mt-4 text-sm text-gray-400">
            <p>
              If your emotions had colors, what's one small thing you could do.
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-[#1e293b] bg-[#0f1729] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">SoulPrint Analysis</h3>
            <button className="text-indigo-400 hover:text-indigo-300">
              <Info size={16} />
            </button>
          </div>
          <div className="mb-6 rounded-md bg-[#1e293b]/50 p-3 text-gray-300">
            <p className="text-sm">
              This entry will add to your SoulPrint profile, capturing your
              unique thought patterns and values.
            </p>
          </div>
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Emotional Depth</span>
              <span className="text-indigo-400">78%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#1e293b]">
              <div className="h-2 w-[78%] rounded-full bg-indigo-500"></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Memory Impact</span>
              <span className="text-indigo-400">65%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#1e293b]">
              <div className="h-2 w-[65%] rounded-full bg-indigo-500"></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-sm">
              <span>Legacy Value</span>
              <span className="text-indigo-400">82%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#1e293b]">
              <div className="h-2 w-[82%] rounded-full bg-indigo-500"></div>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button className="flex items-center gap-2 rounded-md bg-[#1e293b] px-4 py-2 text-sm hover:bg-[#283548]">
              <Lock size={16} />
              Encrypt
            </button>
            <button className="flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm hover:bg-indigo-700">
              <Upload size={16} />
              To Crystal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalEntry;
