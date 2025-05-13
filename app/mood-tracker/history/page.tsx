"use client";

import React from "react";

import MoodHistory from "@/components/MoodTracker/MoodHistory";
import Sidebar from "@/components/Dashboard/Sidebar";

const MoodHistoryPage: React.FC = () => {
  return (
    <div className="h-screen bg-[#0c1222]">
      <Sidebar />
      <main className="min-h-screen overflow-y-auto pl-[80px] transition-all duration-300 ease-out">
        <MoodHistory />
      </main>
    </div>
  );
};

export default MoodHistoryPage;
