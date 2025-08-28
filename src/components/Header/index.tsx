"use client"

import React from 'react';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '../Theme/ThemeToggle';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo/Título centrado */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">
            ChatApp
          </h1>
        </div>

        {/* Área derecha - Theme toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
