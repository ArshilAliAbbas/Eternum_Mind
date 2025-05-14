"use client";

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Sparkles,
  Download,
  Share2,
  Database,
  Link,
  Brain,
  Lock,
  FileText,
  Shield,
  ExternalLink,
} from "lucide-react";

import Sidebar from "../../components/Dashboard/Sidebar";
import SoulPrintRadarChart from "../../components/SoulPrint/SoulPrintRadarChart";
import SoulPrintInsight from "../../components/SoulPrint/SoulPrintInsight";

const SoulPrintPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeTab, setActiveTab] = useState("soulprint"); // 'soulprint', 'legacy', or 'links'

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-[#0c1222]">
      <Sidebar />
      <main className="min-h-screen overflow-y-auto pl-[80px] transition-all duration-300 ease-out">
        <div className="min-h-screen bg-gradient-to-b from-[#0a1222] to-[#0f1729] p-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center">
                <h1
                  className={`text-5xl font-bold text-white transition-all duration-700 ${isAnimated ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
                >
                  Your SoulPrint
                </h1>
                <div
                  className={`ml-3 flex h-8 items-center rounded-full bg-indigo-600/30 px-3 text-sm text-indigo-300 transition-all delay-300 duration-700 ${isAnimated ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}
                >
                  <Sparkles size={14} className="mr-1" /> Ethereal Mind v2.0
                </div>
              </div>
              <div
                className={`flex space-x-3 transition-all delay-500 duration-700 ${isAnimated ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
              >
                <button className="flex items-center rounded-lg bg-indigo-600/20 px-5 py-2.5 text-sm text-indigo-400 transition-all duration-300 hover:scale-105 hover:bg-indigo-600/30">
                  <Download size={16} className="mr-2" /> Export
                </button>
                <button className="flex items-center rounded-lg bg-indigo-600/20 px-5 py-2.5 text-sm text-indigo-400 transition-all duration-300 hover:scale-105 hover:bg-indigo-600/30">
                  <Share2 size={16} className="mr-2" /> Share
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              {/* Main SoulPrint Card */}
              <div
                className={`col-span-1 rounded-xl bg-[#0f1729]/90 p-10 shadow-xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-900/20 lg:col-span-2 ${isAnimated ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
              >
                <div className="mb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="mb-1 text-3xl font-bold text-white">
                        Your SoulPrint
                      </h2>
                      <p className="text-sm text-gray-400">
                        Your digital consciousness profile, evolving with every
                        interaction.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex items-center justify-center rounded-xl bg-[#1a1b3a] px-4 py-2 text-purple-300 transition-all duration-300 hover:bg-[#1e1f45]">
                        <Database className="mr-2 size-5" />
                        Connect MetaMask
                      </button>
                      <button className="flex items-center justify-center rounded-xl bg-purple-700 px-4 py-2 text-purple-100 transition-all duration-300 hover:bg-purple-600">
                        <Database className="mr-2 size-5" />
                        Generate Memory Crystal
                      </button>
                    </div>
                  </div>
                  {/* Tab Navigation */}
                  <div className="mt-8 flex items-center justify-between space-x-4 rounded-xl bg-[#0d1525] p-1">
                    <button
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition-all duration-300 ${activeTab === "soulprint" ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-[#131c36] hover:text-gray-300"}`}
                      onClick={() => setActiveTab("soulprint")}
                    >
                      <Brain size={16} />
                      SoulPrint
                    </button>
                    <button
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition-all duration-300 ${activeTab === "legacy" ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-[#131c36] hover:text-gray-300"}`}
                      onClick={() => setActiveTab("legacy")}
                    >
                      <FileText size={16} />
                      Legacy Data
                    </button>
                    <button
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition-all duration-300 ${activeTab === "links" ? "bg-indigo-600 text-white" : "text-gray-400 hover:bg-[#131c36] hover:text-gray-300"}`}
                      onClick={() => setActiveTab("links")}
                    >
                      <Link size={16} />
                      Soul Links
                    </button>
                  </div>
                </div>
                {/* Tab Content */}
                <div className="min-h-[400px]">
                  {activeTab === "soulprint" && (
                    <div>
                      <div className="mb-6">
                        <SoulPrintRadarChart />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-[#0d1525] p-4">
                          <h3 className="mb-2 text-lg font-medium text-white">
                            Consciousness Score
                          </h3>
                          <div className="flex items-end justify-between">
                            <div className="text-3xl font-bold text-indigo-400">
                              78
                              <span className="text-lg font-normal">/100</span>
                            </div>
                            <div className="flex items-center text-sm text-green-400">
                              <TrendingUp size={14} className="mr-1" />
                              +12% this month
                            </div>
                          </div>
                        </div>
                        <div className="rounded-lg bg-[#0d1525] p-4">
                          <h3 className="mb-2 text-lg font-medium text-white">
                            Memory Fragments
                          </h3>
                          <div className="flex items-end justify-between">
                            <div className="text-3xl font-bold text-indigo-400">
                              143
                            </div>
                            <div className="flex items-center text-sm text-green-400">
                              <TrendingUp size={14} className="mr-1" />
                              +8 this week
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "legacy" && (
                    <div className="mt-4 space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-blue-400">
                          <Database className="size-5" />
                          <h3 className="text-xl font-medium">
                            Legacy Data Import
                          </h3>
                        </div>
                        <p className="mb-4 mt-2 text-sm text-gray-400">
                          Connect your existing data from other platforms to
                          enhance your SoulPrint.
                        </p>
                        <div className="mb-4 flex items-center justify-between">
                          <span className="text-sm text-gray-400">
                            Import Progress
                          </span>
                          <span className="text-sm text-blue-400">40%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-[#131c36]">
                          <div className="h-full w-2/5 rounded-full bg-blue-500"></div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-4">
                          <button className="flex items-center justify-center rounded-lg bg-blue-600/20 px-4 py-2 text-sm text-blue-400 transition-all duration-300 hover:bg-blue-600/30">
                            <FileText className="mr-2 size-4" />
                            Import Journals
                          </button>
                          <button className="flex items-center justify-center rounded-lg bg-purple-600/20 px-4 py-2 text-sm text-purple-400 transition-all duration-300 hover:bg-purple-600/30">
                            <Brain className="mr-2 size-4" />
                            Import Values
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "links" && (
                    <div className="mt-4 space-y-6">
                      <div>
                        <div className="flex items-center gap-2 text-purple-400">
                          <Link className="size-5" />
                          <h3 className="text-xl font-medium">
                            Connected SoulPrints
                          </h3>
                        </div>
                        <p className="mb-4 mt-2 text-sm text-gray-400">
                          Connect with other SoulPrints in the Memory DAO to
                          expand your consciousness network.
                        </p>
                        <div className="mb-6 flex flex-wrap gap-2">
                          <button className="rounded-lg bg-[#1a1b3a] px-4 py-2 text-sm text-indigo-300 transition-all duration-300 hover:bg-[#1e1f45]">
                            Family
                          </button>
                          <button className="rounded-lg bg-[#0d1525] px-4 py-2 text-sm text-gray-400 transition-all duration-300 hover:bg-[#1a1b3a] hover:text-indigo-300">
                            Friends
                          </button>
                          <button className="rounded-lg bg-[#0d1525] px-4 py-2 text-sm text-gray-400 transition-all duration-300 hover:bg-[#1a1b3a] hover:text-indigo-300">
                            Mentors
                          </button>
                          <button className="rounded-lg bg-[#0d1525] px-4 py-2 text-sm text-gray-400 transition-all duration-300 hover:bg-[#1a1b3a] hover:text-indigo-300">
                            Historical Figures
                          </button>
                        </div>
                        <div className="mt-6 flex items-center gap-2">
                          <button className="flex items-center justify-center rounded-lg bg-green-600/20 px-4 py-2 text-sm text-green-400 transition-all duration-300 hover:bg-green-600/30">
                            <Brain className="mr-2 size-4" />
                            Memory DAO
                          </button>
                          <span className="rounded-full bg-green-900/20 px-2 py-0.5 text-xs text-green-400">
                            12 DAO Members Online
                          </span>
                        </div>
                        <div className="mt-4 flex items-center justify-between rounded-lg bg-[#0d1525] p-3">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400">
                              MIND Token Balance
                            </span>
                            <span className="text-sm text-white">
                              0.00 MIND
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-400">
                              Governance Power
                            </span>
                            <span className="text-sm text-white">
                              0.00 vMIND
                            </span>
                          </div>
                        </div>
                        <button className="mt-6 flex w-full items-center justify-center rounded-lg bg-purple-600 py-3 text-white transition-all duration-300 hover:bg-purple-500">
                          <Sparkles className="mr-2 size-5" />
                          Create SoulLink
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* AI Insights Card */}
              <div
                className={`col-span-1 rounded-xl bg-[#0f1729]/90 p-10 shadow-xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-900/20 ${isAnimated ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-3xl font-semibold text-white">
                    AI-Generated Insights
                  </h2>
                  <a
                    href="#"
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    More Insights{" "}
                    <TrendingUp size={14} className="ml-1 inline" />
                  </a>
                </div>
                <div className="space-y-8">
                  <SoulPrintInsight
                    icon="🧠"
                    title="Emotional Patterns"
                    description="You tend to experience higher mood states in the morning, with a slight dip in the afternoon."
                  />
                  <SoulPrintInsight
                    icon="💡"
                    title="Growth Opportunity"
                    description="Consider practicing mindfulness during afternoon hours to maintain your energy levels throughout the day."
                  />
                  <SoulPrintInsight
                    icon="💪"
                    title="Strength Identified"
                    description="Your journaling shows high resilience when facing challenges in your professional life."
                  />
                </div>
              </div>
            </div>
            <div
              className={`mt-10 flex items-center justify-between rounded-xl bg-[#0f1729]/90 p-4 shadow-xl backdrop-blur-sm transition-all duration-500 hover:shadow-indigo-900/20 ${isAnimated ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            >
              <div className="flex items-center space-x-3">
                <span className="flex items-center rounded-lg bg-purple-900/20 px-3 py-1 text-sm text-purple-400">
                  <Database className="mr-1 size-4" />
                  Wallet Not Connected
                </span>
                <span className="flex items-center rounded-lg bg-gray-800 px-3 py-1 text-sm text-gray-400">
                  <Database className="mr-1 size-4" />
                  Local Storage
                </span>
                <span className="flex items-center rounded-lg bg-gray-800 px-3 py-1 text-sm text-gray-400">
                  <Lock className="mr-1 size-4" />
                  Standard Encryption
                </span>
                <span className="flex items-center rounded-lg bg-indigo-600/20 px-3 py-1 text-sm text-indigo-400">
                  <ExternalLink className="mr-1 size-4" />
                  Polygon
                </span>
              </div>
              <div>
                <span className="flex items-center rounded-lg bg-green-900/20 px-3 py-1 text-sm text-green-400">
                  <Shield className="mr-1 size-4" />
                  Web3 Secured
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SoulPrintPage;
