"use client";
/* eslint-disable react/jsx-newline */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  User, 
  Settings,
  Sparkles,
  Zap,
  Flame,
  Layers,
  Shield
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const [activePath, setActivePath] = useState('/dashboard');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);
  
  useEffect(() => {
    if (expanded) {
      document.body.classList.add('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-expanded');
    }
    
    return () => {
      document.body.classList.remove('sidebar-expanded');
    };
  }, [expanded]);

  const menuItems = [
    { href: '/dashboard', icon: <Home size={20} />, label: 'Nexus', color: 'from-violet-500 to-fuchsia-500' },
    { href: '/journal', icon: <BookOpen size={20} />, label: 'Journal', color: 'from-cyan-500 to-blue-500' },
    { href: '/journal/entries', icon: <Layers size={20} />, label: 'Archives', color: 'from-emerald-500 to-teal-500' },
    { href: '/mood-tracker', icon: <Flame size={20} />, label: 'Emotions', color: 'from-amber-500 to-orange-500' },
    { href: '/soulprint', icon: <Sparkles size={20} />, label: 'Essence', color: 'from-pink-500 to-rose-500' },
    { href: '/analytics', icon: <Zap size={20} />, label: 'Insights', color: 'from-yellow-400 to-amber-500' },
    { href: '/profile', icon: <User size={20} />, label: 'Identity', color: 'from-indigo-500 to-purple-500' },
  ];
  
  return (
    <aside 
      className={`fixed left-0 top-0 z-50 flex h-full flex-col border-r border-[#1a1f35]/30 bg-[#080c17]/90 backdrop-blur-xl transition-all duration-300 ease-out ${expanded ? 'w-[240px]' : 'w-[70px]'}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-10 top-20 size-40 rounded-full bg-purple-600/10 blur-3xl"></div>
        <div className="absolute -right-20 top-1/3 size-60 rounded-full bg-blue-600/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 size-40 rounded-full bg-cyan-600/10 blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]"></div>
      </div>
      
      {/* Logo area */}
      <div className="relative mb-8 mt-6 flex flex-col items-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute size-14 animate-pulse rounded-full bg-blue-500/20 blur-md"></div>
          <div className="relative flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 p-1 shadow-lg shadow-blue-900/30">
            <Image src="/ethereum-logo.png" alt="Ethereum Logo" width={40} height={40} className="size-10" />
          </div>
        </div>
        <div className={`mt-3 overflow-hidden transition-all duration-300 ${expanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
          <h1 className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-center text-xl font-bold text-transparent">
            Eterum Mind
          </h1>
          <div className="mt-1 text-center text-xs font-medium text-blue-300/70">v2.0.4</div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="relative mt-4 flex flex-1 flex-col px-3">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={item.href} className="relative" onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)}>
              <Link 
                href={item.href}
                className={`group relative flex items-center overflow-hidden rounded-xl py-2.5 transition-all duration-300 ${activePath === item.href ? 'text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {/* Background gradient that appears on hover or active */}
                <div 
                  className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${activePath === item.href ? 'opacity-100' : 'group-hover:opacity-100'}`}
                  style={{
                    background: `linear-gradient(90deg, rgba(17, 24, 39, 0) 0%, ${activePath === item.href || hoverIndex === index ? `var(--tw-gradient-stops)` : 'rgba(17, 24, 39, 0)'} 100%)`,
                    '--tw-gradient-from': `${item.color.split(' ')[0].replace('from-', '')}`,
                    '--tw-gradient-to': `${item.color.split(' ')[1].replace('to-', '')}`,
                    '--tw-gradient-stops': `var(--tw-gradient-from), var(--tw-gradient-to)`,
                    opacity: activePath === item.href ? 0.15 : hoverIndex === index ? 0.1 : 0
                  } as React.CSSProperties}
                ></div>
                
                {/* Icon container */}
                <div className={`relative flex size-9 items-center justify-center rounded-lg transition-all duration-300 ${expanded ? 'ml-1' : 'mx-auto'}`}>
                  {/* Icon background that appears on active */}
                  {activePath === item.href && (
                    <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${item.color} opacity-20`}></div>
                  )}
                  {/* Icon */}
                  <div className={`relative z-10 transition-transform duration-200 ${activePath === item.href ? 'text-white' : ''}`}>
                    {item.icon}
                  </div>
                </div>
                
                {/* Label */}
                <div className={`ml-3 overflow-hidden transition-all duration-300 ${expanded ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'}`}>
                  <span className="whitespace-nowrap text-sm font-medium">{item.label}</span>
                </div>
                
                {/* Active indicator */}
                {activePath === item.href && (
                  <div className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-gradient-to-b from-blue-400 to-violet-500"></div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Bottom section */}
      <div className="relative mt-auto px-3 pb-5">
        <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-gray-700/20 to-transparent"></div>
        
        {/* Settings link */}
        <Link 
          href="/settings"
          className={`group flex items-center rounded-xl py-2.5 text-gray-400 transition-all duration-300 hover:text-white ${activePath === '/settings' ? 'text-white' : ''}`}
        >
          <div className={`relative flex size-9 items-center justify-center rounded-lg transition-all duration-300 ${expanded ? 'ml-1' : 'mx-auto'}`}>
            {activePath === '/settings' && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-gray-500 to-gray-600 opacity-20"></div>
            )}
            <Settings size={20} className="relative z-10" />
          </div>
          <div className={`ml-3 overflow-hidden transition-all duration-300 ${expanded ? 'max-w-[150px] opacity-100' : 'max-w-0 opacity-0'}`}>
            <span className="whitespace-nowrap text-sm font-medium">Settings</span>
          </div>
        </Link>
        
        {/* User profile */}
        <div className={`mt-5 flex items-center rounded-xl p-2 transition-all duration-300 ${expanded ? 'justify-between' : 'justify-center'}`}>
          <div className="group relative flex items-center">
            <div className="relative">
              {/* Avatar glow effect */}
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 opacity-75 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
              {/* Avatar */}
              <div className="relative flex size-8 items-center justify-center rounded-full bg-[#131c36] text-white ring-1 ring-indigo-500/50">
                <span className="text-xs font-medium">DU</span>
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-[#080c17] bg-emerald-500"></div>
            </div>
            
            {/* User info - only visible when expanded */}
            <div className={`ml-3 overflow-hidden transition-all duration-300 ${expanded ? 'max-w-[120px] opacity-100' : 'max-w-0 opacity-0'}`}>
              <div className="text-xs font-semibold text-white">David User</div>
              <div className="text-xs text-gray-400">Premium</div>
            </div>
          </div>
          
          {/* Shield icon - only visible when expanded */}
          <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'max-w-[30px] opacity-100' : 'max-w-0 opacity-0'}`}>
            <Shield size={16} className="text-blue-400" />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;