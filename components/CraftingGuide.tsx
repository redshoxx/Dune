import React from 'react';
import { CraftingGuideCategory } from '../types';
import { Spinner } from './Spinner';

interface CraftingGuideProps {
  categories: CraftingGuideCategory[] | null;
  isLoading: boolean;
  error: string | null;
  onItemSelect: (itemName: string) => void;
}

export const CraftingGuide: React.FC<CraftingGuideProps> = ({ categories, isLoading, error, onItemSelect }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-[var(--color-primary-light)] animate-fade-in-up">
        <Spinner size="lg" />
        <p className="mt-4 font-chakra animate-pulse">Lade Handwerks-Guide...</p>
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg text-center animate-fade-in-up">{error}</div>;
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center text-[var(--color-text-muted)] p-8 font-chakra animate-fade-in-up">
        <p>Der Guide ist leer. Die Sandwürmer haben wohl die Daten gefressen.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      {categories.map((category, index) => (
        <div key={index} className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg shadow-black/30">
          <h2 className="text-2xl font-bold text-[var(--color-primary)] font-chakra mb-4 border-b-2 border-[var(--color-primary)]/30 pb-2">
            {category.categoryName}
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                <button
                  onClick={() => onItemSelect(item.name)}
                  className="w-full text-left bg-[var(--color-surface)]/60 hover:bg-[var(--color-surface)]/90 p-4 rounded-lg transition-all duration-200 hover:scale-[1.02] focus:scale-[1.02] focus:ring-2 focus:ring-[var(--color-accent)] outline-none"
                >
                  <h3 className="font-bold text-[var(--color-primary-light)] font-chakra">{item.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">{item.description}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
