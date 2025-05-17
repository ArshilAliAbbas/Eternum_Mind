"use client";

import React, { useState } from 'react';
import { Palette, Bell, Shield, Settings as SettingsIcon } from 'lucide-react';

import AppearanceSettings from './AppearanceSettings';

type SettingsTab = 'general' | 'notifications' | 'appearance' | 'privacy';

const SettingsLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');

  const tabs = [
    { id: 'general', label: 'General', icon: <SettingsIcon size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={18} /> },
    { id: 'privacy', label: 'Privacy', icon: <Shield size={18} /> },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      {/* Tabs */}<div className="overflow-hidden rounded-lg border border-[#1a2747]/50 bg-[#0d1530]/50 backdrop-blur-sm">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as SettingsTab)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-violet-500 text-white'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Content */}<div className="overflow-hidden rounded-lg border border-[#1a2747]/50 bg-[#0d1530]/50 p-6 backdrop-blur-sm">
        {activeTab === 'general' && <div>General settings content</div>}
        {activeTab === 'notifications' && <div>Notifications settings content</div>}
        {activeTab === 'appearance' && <AppearanceSettings />}
        {activeTab === 'privacy' && <div>Privacy settings content</div>}
      </div>
    </div>
  );
};

export default SettingsLayout;
