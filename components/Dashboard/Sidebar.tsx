"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Brain, BarChart3, User, Settings, BarChart2 } from 'lucide-react';

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();
  const [activePath, setActivePath] = useState('/dashboard');
  
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);
  
  // Create a context value to share the expanded state with the layout
  useEffect(() => {
    // Immediately update the body class without delay to remove lag
    if (expanded) {
      document.body.classList.add('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-expanded');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('sidebar-expanded');
    };
  }, [expanded]);
  
  return (
    <aside 
      className={`fixed left-0 top-0 z-50 flex h-full flex-col border-r border-gray-800 bg-[#0f1729] py-6 shadow-lg transition-all duration-150 ease-out ${expanded ? 'w-[220px] shadow-indigo-900/20' : 'w-[80px]'}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="mb-8 flex justify-center">
        <div className={`size-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 transition-all duration-300 ${expanded ? 'scale-110' : ''}`}></div>
      </div>
      {/* Title with transition */}
      <div className={`overflow-hidden px-2 text-center transition-all duration-300 ${expanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
        <span className="text-lg font-bold text-white">NeuroSphere</span>
      </div>
      <nav className="mt-8 flex flex-1 flex-col px-2">
        <ul className="space-y-4">
          <NavItem href="/dashboard" icon={<Home size={24} />} label="Home" active={activePath === '/dashboard'} expanded={expanded} />
          <NavItem href="/journal" icon={<BookOpen size={24} />} label="Journal" active={activePath === '/journal'} expanded={expanded} />
          <NavItem href="/mood-tracker" icon={<BarChart2 size={24} />} label="Mood Tracker" active={activePath === '/mood-tracker'} expanded={expanded} />
          <NavItem href="/soulprint" icon={<Brain size={24} />} label="SoulPrint" active={activePath === '/soulprint'} expanded={expanded} />
          <NavItem href="/analytics" icon={<BarChart3 size={24} />} label="Analytics" active={activePath === '/analytics'} expanded={expanded} />
          <NavItem href="/profile" icon={<User size={24} />} label="Profile" active={activePath === '/profile'} expanded={expanded} />
        </ul>
      </nav>
      <div className="mt-auto px-2">
        <NavItem href="/settings" icon={<Settings size={24} />} label="Settings" active={activePath === '/settings'} expanded={expanded} />
      </div>
      <div className="mt-8 flex justify-center">
        <div className="group relative">
          {/* Sonar effect - multiple rings with animation */}
          <div className="absolute -inset-3 animate-ping-slow rounded-full border border-blue-500/30 opacity-0 group-hover:opacity-100"></div>
          <div className="absolute -inset-2 animate-ping-slow rounded-full border border-blue-500/40 opacity-0 delay-300 group-hover:opacity-100"></div>
          <div className="absolute -inset-1 animate-ping-slow rounded-full border border-blue-500/50 opacity-0 delay-600 group-hover:opacity-100"></div>
          {/* Glow effect */}
          <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 opacity-70 blur-sm transition duration-300 group-hover:opacity-100"></div>
          {/* Avatar */}
          <div className="relative flex size-10 items-center justify-center rounded-full bg-[#131c36] text-white ring-1 ring-indigo-500/50"><span className="font-medium">DU</span></div>
          {/* Status indicator */}
          <div className="absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-[#0f1729] bg-green-500 shadow-sm shadow-green-500/50"></div>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  expanded: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, active, expanded }) => {
  return (
    <li className="relative">
      <Link 
        href={href}
        className={`flex items-center rounded-xl p-3 transition-all duration-300 ${active ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
      >
        <div className={`flex items-center justify-center transition-transform duration-200 ${expanded ? '' : 'scale-110'}`}>{icon}</div>
        {/* Label with transition */}
        <div className={`overflow-hidden transition-all duration-300 ${expanded ? 'ml-3 max-w-[150px] opacity-100' : 'max-w-0 opacity-0'}`}>
          <span className="whitespace-nowrap text-sm">{label}</span>
        </div>
        {/* Always show the white dot for active items */}
        {active && <div className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-white"></div>}
      </Link>
    </li>
  );
};

export default Sidebar;