"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Filter,
  ChevronDown,
  BarChart2,
  Activity,
  Zap,
  Heart,
  Brain,
  Search,
  Sparkles,
  CheckCircle,
  BatteryCharging,
} from "lucide-react";

interface MoodEntry {
  date: string;
  mood: number;
  energy: number;
  moodType: string | null;
  factors: string[];
}

const MoodHistory: React.FC = () => {
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [selectedView, setSelectedView] = useState("calendar");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);

  // Fetch mood history from localStorage on component mount
  useEffect(() => {
    const storedHistory = localStorage.getItem("mood_history");
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        setMoodHistory(parsedHistory);
      } catch (error) {
        console.error("Error parsing mood history:", error);
      }
    }
  }, []);

  // Generate mock data if no real data exists
  useEffect(() => {
    if (moodHistory.length === 0) {
      const mockData: MoodEntry[] = [];
      const now = new Date();

      // Generate 30 days of mock data
      for (let i = 30; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        mockData.push({
          date: date.toISOString(),
          mood: Math.floor(Math.random() * 5) + 1,
          energy: Math.floor(Math.random() * 5) + 1,
          moodType: ["happy", "neutral", "sad"][Math.floor(Math.random() * 3)],
          factors: [
            "productive",
            "energetic",
            "tired",
            "stressed",
            "unproductive",
          ].filter(() => Math.random() > 0.5),
        });
      }

      setMoodHistory(mockData);
    }
  }, [moodHistory.length]);

  // Filter entries based on search query and selected factors
  const filteredEntries = moodHistory.filter((entry) => {
    const dateMatches = new Date(entry.date)
      .toLocaleDateString()
      .includes(searchQuery);
    const factorMatches =
      selectedFactors.length === 0 ||
      selectedFactors.some((factor) => entry.factors.includes(factor));

    return dateMatches && factorMatches;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Get mood color based on mood type
  const getMoodColor = (moodType: string | null) => {
    switch (moodType) {
      case "happy":
        return "from-green-500 to-emerald-400";
      case "neutral":
        return "from-blue-500 to-indigo-400";
      case "sad":
        return "from-purple-500 to-indigo-400";
      default:
        return "from-gray-500 to-gray-400";
    }
  };

  // Get mood icon based on mood type
  const getMoodIcon = (moodType: string | null) => {
    switch (moodType) {
      case "happy":
        return <Sparkles className="size-5 text-green-400" />;
      case "neutral":
        return <Brain className="size-5 text-blue-400" />;
      case "sad":
        return <Heart className="size-5 text-purple-400" />;
      default:
        return <Activity className="size-5 text-gray-400" />;
    }
  };

  // Toggle factor selection
  const toggleFactor = (factor: string) => {
    if (selectedFactors.includes(factor)) {
      setSelectedFactors(selectedFactors.filter((f) => f !== factor));
    } else {
      setSelectedFactors([...selectedFactors, factor]);
    }
  };

  // Add animation keyframes to the global style
  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      @keyframes float {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        25% { opacity: 0.5; }
        50% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
        75% { opacity: 0.5; }
        100% { transform: translateY(-40px) translateX(0); opacity: 0; }
      }
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
      @keyframes shine {
        to {
          transform: translateX(100%);
        }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0c1222] p-6 text-white">
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute size-1 rounded-full bg-indigo-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
      {/* Header with navigation */}
      <div className="relative z-10 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/mood-tracker">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#1e293b] transition-colors hover:bg-[#2d3748] hover:shadow-md hover:shadow-indigo-500/10">
              <ArrowLeft size={18} />
            </div>
          </Link>
          <h1 className="text-2xl font-bold">Mood History</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 rounded-full bg-[#1e293b] px-4 py-2 text-sm transition-colors hover:bg-[#2d3748]"
            >
              <Filter size={16} />
              <span>Filter</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 w-64 rounded-lg bg-[#1e293b] p-4 shadow-xl">
                <h3 className="mb-3 font-medium">Filter by factors</h3>
                <div className="mb-4 space-y-2">
                  {[
                    "productive",
                    "unproductive",
                    "energetic",
                    "tired",
                    "stressed",
                  ].map((factor) => (
                    <label key={factor} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedFactors.includes(factor)}
                        onChange={() => toggleFactor(factor)}
                        className="size-4 rounded border-gray-600 bg-[#0c1222] text-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="capitalize">{factor}</span>
                    </label>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedFactors([])}
                  className="w-full rounded bg-[#0c1222] px-3 py-1.5 text-sm text-gray-300 hover:bg-[#151f38]"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 rounded-full bg-[#1e293b] py-2 pl-9 pr-4 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
      {/* View selector */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex rounded-lg bg-[#1e293b] p-1">
          <button
            onClick={() => setSelectedView("calendar")}
            className={`rounded-md px-4 py-2 text-sm transition-colors ${
              selectedView === "calendar"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              Calendar
            </span>
          </button>
          <button
            onClick={() => setSelectedView("list")}
            className={`rounded-md px-4 py-2 text-sm transition-colors ${
              selectedView === "list"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <BarChart2 size={16} />
              List
            </span>
          </button>
        </div>
        <div className="flex rounded-lg bg-[#1e293b] p-1">
          <button
            onClick={() => setSelectedPeriod("week")}
            className={`rounded-md px-4 py-2 text-sm transition-colors ${
              selectedPeriod === "week"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setSelectedPeriod("month")}
            className={`rounded-md px-4 py-2 text-sm transition-colors ${
              selectedPeriod === "month"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setSelectedPeriod("year")}
            className={`rounded-md px-4 py-2 text-sm transition-colors ${
              selectedPeriod === "year"
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            Year
          </button>
        </div>
      </div>
      {/* Mood entries grid */}
      {selectedView === "list" ? (
        <div className="space-y-4">
          {filteredEntries.map((entry, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg bg-[#151f38] p-6 transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Glowing accent based on mood */}
              <div
                className={`absolute -right-4 -top-4 size-24 rounded-full bg-gradient-to-br ${getMoodColor(entry.moodType)} opacity-20 blur-xl transition-opacity group-hover:opacity-30`}
              ></div>
              {/* Decorative corner accents */}
              <div className="absolute left-0 top-0 h-6 w-px bg-gradient-to-b from-indigo-500/50 to-transparent"></div>
              <div className="absolute left-0 top-0 h-px w-6 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
              <div className="absolute right-0 top-0 h-6 w-px bg-gradient-to-b from-indigo-500/50 to-transparent"></div>
              <div className="absolute right-0 top-0 h-px w-6 bg-gradient-to-r from-transparent to-indigo-500/50"></div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-[#1e293b]">
                      {getMoodIcon(entry.moodType)}
                    </div>
                    <div>
                      <h3 className="font-medium capitalize">
                        {entry.moodType || "Unknown"} Mood
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar size={12} />
                        <span>{formatDate(entry.date)}</span>
                        <Clock size={12} />
                        <span>{formatTime(entry.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Mood</div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-16 rounded-full bg-[#0c1222]">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500`}
                          style={{ width: `${(entry.mood / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {entry.mood}/5
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-400">Energy</div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-16 rounded-full bg-[#0c1222]">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400`}
                          style={{ width: `${(entry.energy / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {entry.energy}/5
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {entry.factors.length > 0 && (
                <div className="mt-4">
                  <div className="text-xs text-gray-400">
                    Contributing factors:
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {entry.factors.map((factor, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-[#0c1222] px-2 py-1 text-xs capitalize"
                      >
                        {factor}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Hover effect - reveal button */}
              <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-[#151f38] to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                <button className="rounded-full bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-4">
          {/* Calendar day headers */}
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-400"
            >
              {day}
            </div>
          ))}
          {/* Calendar grid - would need proper calendar logic in a real app */}
          {Array.from({ length: 35 }).map((_, index) => {
            // Find a matching entry for this "day" (simplified for demo)
            const entry = moodHistory[index % moodHistory.length];
            const hasEntry = index < 31; // Simulate some days having entries

            return (
              <div
                key={index}
                className={`group relative aspect-square overflow-hidden rounded-lg ${
                  hasEntry
                    ? "bg-[#151f38]"
                    : "border border-[#1e293b] bg-[#0c1222]/50"
                } p-2 transition-transform hover:-translate-y-1 hover:shadow-lg`}
              >
                {hasEntry && (
                  <>
                    {/* Day number */}
                    <div className="text-sm font-medium">
                      {(index % 31) + 1}
                    </div>
                    {/* Mood indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className={`size-10 rounded-full bg-gradient-to-br ${getMoodColor(entry.moodType)} opacity-20`}
                      ></div>
                    </div>
                    {/* Mood and energy bars */}
                    <div className="absolute inset-x-2 bottom-2">
                      <div className="mb-1 h-1 w-full rounded-full bg-[#0c1222]">
                        <div
                          className="h-1 rounded-full bg-indigo-500"
                          style={{ width: `${(entry.mood / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="h-1 w-full rounded-full bg-[#0c1222]">
                        <div
                          className="h-1 rounded-full bg-cyan-400"
                          style={{ width: `${(entry.energy / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[#151f38]/90 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white hover:bg-indigo-700">
                        View
                      </button>
                    </div>
                  </>
                )}
                {!hasEntry && (
                  <div className="text-sm font-medium text-gray-600">
                    {(index % 31) + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      {/* Stats cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900/50 to-purple-900/50 p-6">
          {/* Decorative elements */}
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-indigo-600/20 blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 size-24 rounded-full bg-purple-600/20 blur-xl"></div>
          <div className="relative">
            <div className="mb-1 text-sm text-gray-400">Average Mood</div>
            <div className="mb-3 text-3xl font-bold">4.2</div>
            <div className="h-2 w-full rounded-full bg-[#0c1222]">
              <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-green-400">
              <Zap size={16} />
              <span>12% higher than last month</span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-6">
          {/* Decorative elements */}
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-blue-600/20 blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 size-24 rounded-full bg-cyan-600/20 blur-xl"></div>
          <div className="relative">
            <div className="mb-1 text-sm text-gray-400">Average Energy</div>
            <div className="mb-3 text-3xl font-bold">3.8</div>
            <div className="h-2 w-full rounded-full bg-[#0c1222]">
              <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-red-400">
              <Activity size={16} />
              <span>5% lower than last month</span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-violet-900/50 to-fuchsia-900/50 p-6">
          {/* Decorative elements */}
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-violet-600/20 blur-xl"></div>
          <div className="absolute -bottom-6 -left-6 size-24 rounded-full bg-fuchsia-600/20 blur-xl"></div>
          <div className="relative">
            <div className="mb-1 text-sm text-gray-400">Most Common Mood</div>
            <div className="mb-3 text-3xl font-bold">Happy</div>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-[#0c1222]">
                <Sparkles className="size-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm">15 days this month</div>
                <div className="text-sm text-gray-400">48% of all entries</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Monthly Mood Summary and Influencing Factors */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Monthly Mood Summary */}
        <div className="group relative overflow-hidden rounded-lg bg-[#151f38] p-6 transition-all hover:shadow-lg hover:shadow-purple-500/10">
          {/* Decorative glowing orb */}
          <div className="absolute -bottom-20 -right-20 size-40 rounded-full bg-purple-600/10 blur-xl transition-opacity group-hover:bg-purple-600/20"></div>
          {/* Animated corner accents */}
          <div className="absolute left-0 top-0 h-10 w-px bg-gradient-to-b from-purple-500/50 to-transparent"></div>
          <div className="absolute left-0 top-0 h-px w-10 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
          <div className="absolute right-0 top-0 h-10 w-px bg-gradient-to-b from-purple-500/50 to-transparent"></div>
          <div className="absolute right-0 top-0 h-px w-10 bg-gradient-to-r from-transparent to-purple-500/50"></div>
          <div className="absolute bottom-0 left-0 h-10 w-px bg-gradient-to-t from-purple-500/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 h-px w-10 bg-gradient-to-r from-purple-500/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-10 w-px bg-gradient-to-t from-purple-500/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-px w-10 bg-gradient-to-r from-transparent to-purple-500/50"></div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-1 rounded-sm bg-indigo-500"></div>
            <h2 className="text-xl font-medium">Monthly Mood Summary</h2>
          </div>
          <p className="mb-6 mt-2 text-sm text-gray-400">
            Your detailed mood patterns over the past month.
          </p>
          {/* Monthly summary chart */}
          <div className="relative h-64 w-full">
            <svg width="100%" height="100%" className="overflow-visible">
              {/* Grid lines */}
              {[1, 2, 3, 4, 5].map((tick) => (
                <line
                  key={`horizontal-${tick}`}
                  x1="0%"
                  y1={`${100 - (tick / 5) * 80}%`}
                  x2="100%"
                  y2={`${100 - (tick / 5) * 80}%`}
                  stroke="#1e293b"
                  strokeWidth="1"
                />
              ))}
              {[0, 0.25, 0.5, 0.75, 1].map((tick, i) => (
                <line
                  key={`vertical-${i}`}
                  x1={`${tick * 100}%`}
                  y1="0%"
                  x2={`${tick * 100}%`}
                  y2="100%"
                  stroke="#1e293b"
                  strokeWidth="1"
                />
              ))}
              {/* Y-axis labels */}
              {[1, 2, 3, 4, 5].map((tick) => (
                <text
                  key={`y-label-${tick}`}
                  x="-10"
                  y={`${100 - (tick / 5) * 80}%`}
                  fontSize="12"
                  textAnchor="end"
                  fill="#6b7280"
                  dominantBaseline="middle"
                >
                  {tick}
                </text>
              ))}
              {/* X-axis labels */}
              {["Week 1", "Week 2", "Week 3", "Week 4"].map((label, i) => (
                <text
                  key={`x-label-${i}`}
                  x={`${(i + 0.5) * 25}%`}
                  y="105%"
                  fontSize="12"
                  textAnchor="middle"
                  fill="#6b7280"
                >
                  {label}
                </text>
              ))}
              {/* Mood area chart */}
              <path
                d={`M 0% 80% L 10% 60% L 20% 40% L 30% 50% L 40% 30% L 50% 20% L 60% 30% L 70% 20% L 80% 40% L 90% 30% L 100% 20% L 100% 100% L 0% 100% Z`}
                fill="url(#moodGradient)"
                opacity="0.2"
              />
              <path
                d={`M 0% 80% L 10% 60% L 20% 40% L 30% 50% L 40% 30% L 50% 20% L 60% 30% L 70% 20% L 80% 40% L 90% 30% L 100% 20%`}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="2"
              />
              {/* Energy area chart */}
              <path
                d={`M 0% 90% L 10% 70% L 20% 60% L 30% 70% L 40% 50% L 50% 60% L 60% 40% L 70% 50% L 80% 60% L 90% 40% L 100% 50% L 100% 100% L 0% 100% Z`}
                fill="url(#energyGradient)"
                opacity="0.2"
              />
              <path
                d={`M 0% 90% L 10% 70% L 20% 60% L 30% 70% L 40% 50% L 50% 60% L 60% 40% L 70% 50% L 80% 60% L 90% 40% L 100% 50%`}
                fill="none"
                stroke="#06b6d4"
                strokeWidth="2"
              />
              {/* Gradient definitions */}
              <defs>
                <linearGradient
                  id="moodGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                </linearGradient>
                <linearGradient
                  id="energyGradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="mt-4 flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-indigo-500"></div>
              <span className="text-sm">Mood</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-cyan-500"></div>
              <span className="text-sm">Energy</span>
            </div>
          </div>
        </div>
        {/* Influencing Factors */}
        <div className="group relative overflow-hidden rounded-lg bg-[#151f38] p-6 transition-all hover:shadow-lg hover:shadow-blue-500/10">
          {/* Decorative glowing orb */}
          <div className="absolute -bottom-20 -right-20 size-40 rounded-full bg-blue-600/10 blur-xl transition-opacity group-hover:bg-blue-600/20"></div>
          {/* Animated corner accents */}
          <div className="absolute left-0 top-0 h-10 w-px bg-gradient-to-b from-blue-500/50 to-transparent"></div>
          <div className="absolute left-0 top-0 h-px w-10 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
          <div className="absolute right-0 top-0 h-10 w-px bg-gradient-to-b from-blue-500/50 to-transparent"></div>
          <div className="absolute right-0 top-0 h-px w-10 bg-gradient-to-r from-transparent to-blue-500/50"></div>
          <div className="absolute bottom-0 left-0 h-10 w-px bg-gradient-to-t from-blue-500/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 h-px w-10 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-10 w-px bg-gradient-to-t from-blue-500/50 to-transparent"></div>
          <div className="absolute bottom-0 right-0 h-px w-10 bg-gradient-to-r from-transparent to-blue-500/50"></div>
          <div className="flex items-center gap-3">
            <div className="h-4 w-1 rounded-sm bg-blue-500"></div>
            <h2 className="text-xl font-medium">Influencing Factors</h2>
          </div>
          <p className="mb-6 mt-2 text-sm text-gray-400">
            Factors that most influence your mood patterns.
          </p>
          {/* Factors visualization */}
          <div className="grid grid-cols-2 gap-4">
            {/* Productivity Factor */}
            <div className="rounded-lg bg-[#0c1222] p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="size-4 text-green-400" />
                  <span className="text-sm font-medium">Productivity</span>
                </div>
                <span className="text-sm font-bold text-green-400">+42%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#151f38]">
                <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-green-500 to-green-400"></div>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Being productive improves your mood significantly
              </p>
            </div>
            {/* Sleep Factor */}
            <div className="rounded-lg bg-[#0c1222] p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BatteryCharging className="size-4 text-blue-400" />
                  <span className="text-sm font-medium">Sleep</span>
                </div>
                <span className="text-sm font-bold text-blue-400">+35%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#151f38]">
                <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"></div>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Good sleep correlates with better mood
              </p>
            </div>
            {/* Stress Factor */}
            <div className="rounded-lg bg-[#0c1222] p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-red-400" />
                  <span className="text-sm font-medium">Stress</span>
                </div>
                <span className="text-sm font-bold text-red-400">-38%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#151f38]">
                <div className="h-2 w-3/5 rounded-full bg-gradient-to-r from-red-500 to-red-400"></div>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                High stress negatively impacts your mood
              </p>
            </div>
            {/* Exercise Factor */}
            <div className="rounded-lg bg-[#0c1222] p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="size-4 text-yellow-400" />
                  <span className="text-sm font-medium">Exercise</span>
                </div>
                <span className="text-sm font-bold text-yellow-400">+28%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[#151f38]">
                <div className="h-2 w-1/2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Regular exercise boosts your energy levels
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodHistory;
