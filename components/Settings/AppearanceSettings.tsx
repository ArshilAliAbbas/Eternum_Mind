"use client";

import React, { useState, useEffect } from 'react';
import { Palette, Sun, Moon, Check, Monitor } from 'lucide-react';

import { useTheme, ColorTheme } from '@/contexts/ThemeContext';

const AppearanceSettings: React.FC = () => {
  const { colorTheme, themeMode, isDarkMode, setColorTheme, setThemeMode } = useTheme();
  
  // Force re-render when theme changes
  const [, forceUpdate] = useState({});
  
  // Update component when theme changes
  useEffect(() => {
    // Force a re-render to ensure UI reflects current theme
    forceUpdate({});
  }, [colorTheme, themeMode, isDarkMode]);
  
  const colorOptions: { id: ColorTheme; color: string }[] = [
    { id: 'purple', color: 'bg-purple-500' },
    { id: 'blue', color: 'bg-blue-500' },
    { id: 'green', color: 'bg-green-500' },
    { id: 'violet', color: 'bg-violet-500' },
    { id: 'azure', color: 'bg-blue-400' },
    { id: 'pink', color: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Palette size={24} className="theme-text-primary" />
        <h2 className="text-xl font-semibold">Appearance</h2>
      </div>
      {/* Dark Mode Toggle */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Dark Mode</h3>
        <p className="text-sm text-gray-400">Switch between light and dark themes</p>
        <div className="mt-4 flex flex-col gap-3">
          {/* Theme mode options */}
          <div className="grid grid-cols-3 gap-3">
            <button onClick={() => setThemeMode('light')} className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-3 transition-all ${themeMode === 'light' ? `theme-border theme-bg-primary-10 text-white` : 'border-[#1a2747]/30 bg-[#111c3d]/30 text-gray-400 hover:border-[#1a2747]/50 hover:text-gray-300'}`}>
              <Sun size={24} className={themeMode === 'light' ? 'text-yellow-400' : 'text-gray-500'} />
              <span className="text-sm font-medium">Light</span>
            </button>
            <button onClick={() => setThemeMode('system')} className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-3 transition-all ${themeMode === 'system' ? `theme-border theme-bg-primary-10 text-white` : 'border-[#1a2747]/30 bg-[#111c3d]/30 text-gray-400 hover:border-[#1a2747]/50 hover:text-gray-300'}`}>
              <Monitor size={24} className={themeMode === 'system' ? 'theme-text-secondary' : 'text-gray-500'} />
              <span className="text-sm font-medium">System</span>
            </button>
            <button onClick={() => setThemeMode('dark')} className={`flex flex-col items-center justify-center gap-2 rounded-lg border p-3 transition-all ${themeMode === 'dark' ? `theme-border theme-bg-primary-10 text-white` : 'border-[#1a2747]/30 bg-[#111c3d]/30 text-gray-400 hover:border-[#1a2747]/50 hover:text-gray-300'}`}>
              <Moon size={24} className={themeMode === 'dark' ? 'theme-text-accent' : 'text-gray-500'} />
              <span className="text-sm font-medium">Dark</span>
            </button>
          </div>
          {/* Current mode indicator */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full bg-[#111c3d]/50 px-3 py-1.5 text-xs text-gray-300">
              <div className={`size-2 rounded-full ${isDarkMode ? 'theme-bg-accent' : 'bg-yellow-400'}`}></div>
              <span>Currently using {themeMode === 'system' ? 'system setting' : themeMode + ' mode'} ({isDarkMode ? 'dark' : 'light'})</span>
            </div>
          </div>
        </div>
      </div>
      {/* Color Theme */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium">Color Theme</h3>
        <p className="text-sm text-gray-400">Select your preferred color theme</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {colorOptions.map((option) => (
            <button key={option.id} onClick={() => setColorTheme(option.id)} className={`relative flex size-10 items-center justify-center rounded-full ${option.color} transition-transform hover:scale-110 ${colorTheme === option.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0d1530]' : ''}`}>
              {colorTheme === option.id && <Check size={16} className="text-white" />}
            </button>
          ))}
        </div>
      </div>
      {/* Preview */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Preview</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Light UI Elements */}
          <div className="theme-border rounded-lg border bg-[#f8fafc] p-4 text-gray-800">
            <h4 className="mb-4 font-medium">Light UI Elements</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="theme-bg-primary size-4 rounded-full"></div>
                <span>Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="theme-bg-secondary size-4 rounded-full"></div>
                <span>Secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="theme-bg-accent size-4 rounded-full"></div>
                <span>Accent</span>
              </div>
            </div>
          </div>
          {/* Dark UI Elements */}
          <div className="theme-border rounded-lg border bg-[#0f172a] p-4 text-gray-200">
            <h4 className="mb-4 font-medium">Dark UI Elements</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="theme-bg-primary size-4 rounded-full"></div>
                <span>Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="theme-bg-secondary size-4 rounded-full"></div>
                <span>Secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="theme-bg-accent size-4 rounded-full"></div>
                <span>Accent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
