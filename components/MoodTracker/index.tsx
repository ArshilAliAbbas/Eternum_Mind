"use client";

import React, { useState, useEffect } from "react";
import {
  Smile,
  Frown,
  Meh,
  BatteryCharging,
  History,
  Save,
  ThumbsUp,
  ThumbsDown,
  Zap,
  Moon,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const MoodTracker: React.FC = () => {
  const [moodValue, setMoodValue] = useState(3);
  const [energyValue, setEnergyValue] = useState(3);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [factors, setFactors] = useState<string[]>([]);

  const saveMoodCheck = () => {
    // Save mood data to localStorage
    const moodData = {
      date: new Date().toISOString(),
      mood: moodValue,
      energy: energyValue,
      moodType: selectedMood,
      factors: factors,
    };

    // Get existing mood history or initialize empty array
    const existingData = JSON.parse(
      localStorage.getItem("mood_history") || "[]"
    );
    existingData.push(moodData);

    // Save updated history
    localStorage.setItem("mood_history", JSON.stringify(existingData));

    // Show success message (in a real app)
    alert("Mood check saved successfully!");
  };

  // Calculate chart dimensions
  const chartWidth = 500;
  const chartHeight = 200;
  const padding = 40;
  const graphWidth = chartWidth - padding * 2;
  const graphHeight = chartHeight - padding * 2;

  // State for chart data
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Get mood history from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("mood_history");
    if (storedData) {
      try {
        setChartData(JSON.parse(storedData));
      } catch (error) {
        console.error("Error parsing mood history:", error);
        setChartData([]);
      }
    }
  }, []);

  // Generate path data for the chart lines
  const generatePathData = (data: any[], key: string) => {
    if (data.length <= 1) {
      return "";
    }
    
    return data
      .map((point, index) => {
        const x = (index / (data.length - 1)) * graphWidth + padding;
        const y = chartHeight - (point[key] / 5) * graphHeight - padding;

        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  const moodPath = generatePathData(chartData.slice(-7), "mood");
  const energyPath = generatePathData(chartData.slice(-7), "energy");
  
  // Handle mood selection
  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood === selectedMood ? null : mood);
  };
  
  // Handle factor toggle
  const handleFactorToggle = (factor: string) => {
    setFactors(prevFactors => 
      prevFactors.includes(factor)
        ? prevFactors.filter(f => f !== factor)
        : [...prevFactors, factor]
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0c1222] p-6 text-white">
      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Mood Tracker</h1>
        </div>
        <div className="mb-6 flex items-center justify-end">
          <Link
            href="/mood-tracker/history"
            className="flex items-center gap-2 rounded-full bg-[#151f38] px-4 py-2 text-sm text-indigo-400 transition-colors hover:bg-[#1a2542] hover:text-indigo-300"
          >
            <History className="size-4" />
            <span>History</span>
          </Link>
          <Link
            href="/mood-tracker"
            className="ml-2 flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-sm text-white transition-colors hover:bg-indigo-700"
          >
            <CheckCircle className="size-4" />
            <span>Check-in</span>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left panel - Mood input */}
        <div className="rounded-lg bg-[#151f38] p-6">
          <h2 className="mb-6 text-xl font-medium">How are you feeling?</h2>
          {/* Mood slider */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-base">Overall Mood</span>
              <span className="rounded-md bg-indigo-600 px-2 py-1 text-xs font-medium">
                {moodValue === 1
                  ? "Very Low"
                  : moodValue === 2
                    ? "Low"
                    : moodValue === 3
                      ? "Moderate"
                      : moodValue === 4
                        ? "High"
                        : "Very High"}
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#0c1222]">
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-500"
                style={{ width: `${((moodValue - 1) / 4) * 100}%` }}
              ></div>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={moodValue}
              onChange={(e) => setMoodValue(parseInt(e.target.value))}
              className="relative -mt-1 h-4 w-full cursor-pointer appearance-none bg-transparent"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>Very Low</span>
              <span>Very High</span>
            </div>
          </div>
          {/* Energy slider */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-base">Energy Level</span>
              <span className="rounded-md bg-blue-600 px-2 py-1 text-xs font-medium">
                {energyValue === 1
                  ? "Very Low"
                  : energyValue === 2
                    ? "Low"
                    : energyValue === 3
                      ? "Moderate"
                      : energyValue === 4
                        ? "High"
                        : "Very High"}
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#0c1222]">
              <div
                className="absolute h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                style={{ width: `${((energyValue - 1) / 4) * 100}%` }}
              ></div>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={1}
              value={energyValue}
              onChange={(e) => setEnergyValue(parseInt(e.target.value))}
              className="relative -mt-1 h-4 w-full cursor-pointer appearance-none bg-transparent"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>Very Low</span>
              <span>Very High</span>
            </div>
          </div>
          {/* Mood type selection */}
          <div className="mb-6">
            <h3 className="mb-4 text-base">Which best describes your mood?</h3>
            <div className="flex justify-between">
              <button
                onClick={() => handleMoodSelect("happy")}
                className={`flex flex-col items-center gap-2 rounded-md p-2 ${selectedMood === "happy" ? "bg-[#1a2542] text-green-400" : "text-gray-400 hover:text-gray-300"}`}
              >
                <Smile size={24} />
                <span className="text-xs">Happy</span>
              </button>
              <button
                onClick={() => handleMoodSelect("neutral")}
                className={`flex flex-col items-center gap-2 rounded-md p-2 ${selectedMood === "neutral" ? "bg-[#1a2542] text-blue-400" : "text-gray-400 hover:text-gray-300"}`}
              >
                <Meh size={24} />
                <span className="text-xs">Neutral</span>
              </button>
              <button
                onClick={() => handleMoodSelect("sad")}
                className={`flex flex-col items-center gap-2 rounded-md p-2 ${selectedMood === "sad" ? "bg-[#1a2542] text-purple-400" : "text-gray-400 hover:text-gray-300"}`}
              >
                <Frown size={24} />
                <span className="text-xs">Sad</span>
              </button>
            </div>
          </div>
          {/* Contributing factors */}
          <div className="mb-6">
            <h3 className="mb-4 text-base">
              Contributing factors (select all that apply)
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleFactorToggle("productive")}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs ${factors.includes("productive") ? "bg-indigo-500/20 text-indigo-300" : "bg-[#0c1222] text-gray-400 hover:text-gray-300"}`}
              >
                <ThumbsUp size={16} />
                Productive
              </button>
              <button
                onClick={() => handleFactorToggle("unproductive")}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs ${factors.includes("unproductive") ? "bg-indigo-500/20 text-indigo-300" : "bg-[#0c1222] text-gray-400 hover:text-gray-300"}`}
              >
                <ThumbsDown size={16} />
                Unproductive
              </button>
              <button
                onClick={() => handleFactorToggle("energetic")}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs ${factors.includes("energetic") ? "bg-indigo-500/20 text-indigo-300" : "bg-[#0c1222] text-gray-400 hover:text-gray-300"}`}
              >
                <Zap size={16} />
                Energetic
              </button>
              <button
                onClick={() => handleFactorToggle("tired")}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs ${factors.includes("tired") ? "bg-indigo-500/20 text-indigo-300" : "bg-[#0c1222] text-gray-400 hover:text-gray-300"}`}
              >
                <Moon size={16} />
                Tired
              </button>
              <button
                onClick={() => handleFactorToggle("stressed")}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs ${factors.includes("stressed") ? "bg-indigo-500/20 text-indigo-300" : "bg-[#0c1222] text-gray-400 hover:text-gray-300"}`}
              >
                <BatteryCharging size={16} />
                Stressed
              </button>
            </div>
          </div>
          {/* Save button */}
          <button
            onClick={saveMoodCheck}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700"
          >
            <Save size={18} />
            <span>Save Mood Check</span>
          </button>
        </div>
        {/* Right panel - Mood trends */}
        <div className="rounded-lg bg-[#151f38] p-6">
          <h2 className="mb-6 text-xl font-medium">Mood & Energy Trends</h2>
          <svg width={chartWidth} height={chartHeight} className="mb-4">
            {/* Grid lines */}
            {[1, 2, 3, 4, 5].map((tick) => (
              <line
                key={`horizontal-${tick}`}
                x1={padding}
                y1={chartHeight - (tick / 5) * graphHeight - padding}
                x2={chartWidth - padding}
                y2={chartHeight - (tick / 5) * graphHeight - padding}
                stroke="#1e293b"
                strokeWidth="1"
              />
            ))}
            {chartData.length > 1 && chartData.slice(-7).map((point, index) => (
              <line
                key={`vertical-${index}`}
                x1={(index / (Math.max(chartData.slice(-7).length - 1, 1))) * graphWidth + padding}
                y1={padding}
                x2={(index / (Math.max(chartData.slice(-7).length - 1, 1))) * graphWidth + padding}
                y2={chartHeight - padding}
                stroke="#1e293b"
                strokeWidth="1"
              />
            ))}
            {/* Y-axis labels */}
            {[1, 2, 3, 4, 5].map((tick) => (
              <text
                key={`y-label-${tick}`}
                x={padding - 10}
                y={chartHeight - (tick / 5) * graphHeight - padding + 5}
                fontSize="12"
                textAnchor="end"
                fill="#6b7280"
              >
                {tick}
              </text>
            ))}
            {/* X-axis labels */}
            {chartData.length > 1 && chartData.slice(-7).map((point, index) => {
              const date = new Date(point.date);
              const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
              
              return (
                <text
                  key={`x-label-${index}`}
                  x={(index / (Math.max(chartData.slice(-7).length - 1, 1))) * graphWidth + padding}
                  y={chartHeight - padding + 20}
                  fontSize="12"
                  textAnchor="middle"
                  fill="#6b7280"
                >
                  {formattedDate}
                </text>
              );
            })}
            {/* Mood line */}
            <path d={moodPath} fill="none" stroke="#8b5cf6" strokeWidth="2" />
            {/* Energy line */}
            <path d={energyPath} fill="none" stroke="#06b6d4" strokeWidth="2" />
            {/* Data points - Mood */}
            {chartData.length > 1 && chartData.slice(-7).map((point, index) => (
              <circle
                key={`mood-point-${index}`}
                cx={(index / (Math.max(chartData.slice(-7).length - 1, 1))) * graphWidth + padding}
                cy={chartHeight - (point.mood / 5) * graphHeight - padding}
                r="4"
                fill="#8b5cf6"
              />
            ))}
            {/* Data points - Energy */}
            {chartData.length > 1 && chartData.slice(-7).map((point, index) => (
              <circle
                key={`energy-point-${index}`}
                cx={(index / (Math.max(chartData.slice(-7).length - 1, 1))) * graphWidth + padding}
                cy={chartHeight - (point.energy / 5) * graphHeight - padding}
                r="4"
                fill="#06b6d4"
              />
            ))}
          </svg>
          <div className="flex justify-center gap-6">
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
      </div>
    </div>
  );
};

export default MoodTracker;
