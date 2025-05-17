"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type ColorTheme = 'purple' | 'blue' | 'green' | 'violet' | 'azure' | 'pink';
export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  colorTheme: ColorTheme;
  themeMode: ThemeMode;
  isDarkMode: boolean;
  setColorTheme: (_theme: ColorTheme) => void;
  setThemeMode: (_mode: ThemeMode) => void;
  getThemeColor: (_variant: 'primary' | 'secondary' | 'accent') => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('purple');
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Theme color mappings for gradient classes
  const themeColors = {
    purple: {
      primary: 'from-purple-500 to-purple-600',
      secondary: 'from-blue-400 to-indigo-500',
      accent: 'from-violet-400 to-violet-500',
    },
    blue: {
      primary: 'from-blue-500 to-blue-600',
      secondary: 'from-cyan-400 to-blue-500',
      accent: 'from-sky-400 to-sky-500',
    },
    green: {
      primary: 'from-green-500 to-green-600',
      secondary: 'from-emerald-400 to-green-500',
      accent: 'from-teal-400 to-teal-500',
    },
    violet: {
      primary: 'from-violet-500 to-violet-600',
      secondary: 'from-purple-400 to-violet-500',
      accent: 'from-indigo-400 to-indigo-500',
    },
    azure: {
      primary: 'from-blue-400 to-blue-500',
      secondary: 'from-sky-400 to-blue-400',
      accent: 'from-cyan-400 to-cyan-500',
    },
    pink: {
      primary: 'from-pink-500 to-pink-600',
      secondary: 'from-rose-400 to-pink-500',
      accent: 'from-fuchsia-400 to-fuchsia-500',
    },
  };

  // Function to get theme color based on variant
  const getThemeColor = (variant: 'primary' | 'secondary' | 'accent'): string => {
    return themeColors[colorTheme][variant];
  };

  // RGB values for each theme
  const themeRgbValues = {
    purple: {
      primary: '147, 51, 234',
      secondary: '124, 58, 237',
      accent: '167, 139, 250',
    },
    blue: {
      primary: '59, 130, 246',
      secondary: '96, 165, 250',
      accent: '56, 189, 248',
    },
    green: {
      primary: '16, 185, 129',
      secondary: '5, 150, 105',
      accent: '52, 211, 153',
    },
    violet: {
      primary: '139, 92, 246',
      secondary: '124, 58, 237',
      accent: '167, 139, 250',
    },
    azure: {
      primary: '96, 165, 250',
      secondary: '56, 189, 248',
      accent: '34, 211, 238',
    },
    pink: {
      primary: '236, 72, 153',
      secondary: '244, 114, 182',
      accent: '217, 70, 239',
    },
  };

  // Function to apply theme colors to CSS variables
  const applyThemeColors = (theme: ColorTheme, isDark: boolean) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    
    const root = document.documentElement;
    
    // Set theme color RGB values
    root.style.setProperty('--theme-primary-rgb', themeRgbValues[theme].primary);
    root.style.setProperty('--theme-secondary-rgb', themeRgbValues[theme].secondary);
    root.style.setProperty('--theme-accent-rgb', themeRgbValues[theme].accent);
    
    // Set HSL values for compatibility
    switch (theme) {
      case 'purple':
        root.style.setProperty('--theme-primary', '270 70% 60%');
        root.style.setProperty('--theme-secondary', '260 70% 50%');
        root.style.setProperty('--theme-accent', '280 70% 60%');
        break;
      case 'blue':
        root.style.setProperty('--theme-primary', '220 70% 50%');
        root.style.setProperty('--theme-secondary', '210 70% 60%');
        root.style.setProperty('--theme-accent', '200 70% 50%');
        break;
      case 'green':
        root.style.setProperty('--theme-primary', '150 70% 40%');
        root.style.setProperty('--theme-secondary', '160 70% 50%');
        root.style.setProperty('--theme-accent', '140 70% 45%');
        break;
      case 'violet':
        root.style.setProperty('--theme-primary', '260 70% 55%');
        root.style.setProperty('--theme-secondary', '250 70% 60%');
        root.style.setProperty('--theme-accent', '270 70% 65%');
        break;
      case 'azure':
        root.style.setProperty('--theme-primary', '210 70% 60%');
        root.style.setProperty('--theme-secondary', '200 70% 55%');
        root.style.setProperty('--theme-accent', '190 70% 65%');
        break;
      case 'pink':
        root.style.setProperty('--theme-primary', '330 70% 60%');
        root.style.setProperty('--theme-secondary', '340 70% 55%');
        root.style.setProperty('--theme-accent', '320 70% 65%');
        break;
    }
    
    // Apply mode-specific colors
    if (isDark) {
      root.style.setProperty('--background', '#050a18');
      root.style.setProperty('--foreground', '#ededed');
      root.style.setProperty('--card-bg', '#0d1530');
      root.style.setProperty('--container-bg', 'rgba(13, 21, 48, 0.8)');
      root.style.setProperty('--sidebar-bg', '#0a1025');
      root.style.setProperty('--hover-bg', 'rgba(255, 255, 255, 0.05)');
    } else {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#171717');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--container-bg', 'rgba(255, 255, 255, 0.8)');
      root.style.setProperty('--sidebar-bg', '#f8f9fa');
      root.style.setProperty('--hover-bg', 'rgba(0, 0, 0, 0.05)');
    }
  };

  // Initialize theme from localStorage on client-side
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Load saved preferences from localStorage
      const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme | null;
      const savedThemeMode = localStorage.getItem('themeMode') as ThemeMode | null;
      
      if (savedColorTheme && ['purple', 'blue', 'green', 'violet', 'azure', 'pink'].includes(savedColorTheme)) {
        setColorTheme(savedColorTheme);
      }
      
      if (savedThemeMode && ['light', 'dark', 'system'].includes(savedThemeMode)) {
        setThemeMode(savedThemeMode);
      }
      
      // Initialize system preference detection
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const newIsDarkMode = savedThemeMode === 'light' ? false : 
                          savedThemeMode === 'dark' ? true : 
                          prefersDark;
      
      setIsDarkMode(newIsDarkMode);
      
      // Apply initial theme
      applyThemeColors(savedColorTheme as ColorTheme || 'purple', newIsDarkMode);
      
      // Apply initial classes
      if (newIsDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
      
      // Set theme data attribute
      document.documentElement.dataset.theme = savedColorTheme || 'purple';
    } catch (error) {
      console.error('Error initializing theme:', error);
    }
  }, []);
  
  // Listen for system preference changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeMode === 'system') {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themeMode]);

  // Update theme when settings change
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      // Save preferences to localStorage
      localStorage.setItem('colorTheme', colorTheme);
      localStorage.setItem('themeMode', themeMode);
      
      // Update dark mode based on theme mode
      let newIsDarkMode = isDarkMode;
      
      if (themeMode === 'light') {
        newIsDarkMode = false;
      } else if (themeMode === 'dark') {
        newIsDarkMode = true;
      } else if (themeMode === 'system') {
        // System preference
        newIsDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      
      if (newIsDarkMode !== isDarkMode) {
        setIsDarkMode(newIsDarkMode);
      }
      
      // Apply theme to document
      if (newIsDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.style.colorScheme = 'dark';
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
      } else {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
      }
      
      // Set theme color on root element
      document.documentElement.dataset.theme = colorTheme;
      
      // Apply CSS variables directly for immediate effect
      applyThemeColors(colorTheme, newIsDarkMode);
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [colorTheme, themeMode, isDarkMode]);

  return (
    <ThemeContext.Provider
      value={{
        colorTheme,
        themeMode,
        isDarkMode,
        setColorTheme,
        setThemeMode,
        getThemeColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
