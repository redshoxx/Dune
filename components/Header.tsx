import React from 'react';
import { SpiceIcon } from './IconComponents';

export const Header: React.FC = () => {
  return (
    <header className="p-4 sm:p-6">
      <div className="max-w-4xl mx-auto flex items-center justify-center space-x-4">
        <SpiceIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--color-primary)]" />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-[var(--color-primary-light)] tracking-widest uppercase font-chakra text-center">
          Dune: Awakening Überlebensberater
        </h1>
        <SpiceIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--color-primary)]" />
      </div>
    </header>
  );
};