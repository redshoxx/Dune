import React from 'react';
import { CraftingRecipe } from '../types';
import { InfoIcon } from './IconComponents';

interface CraftingRecipeCardProps {
  recipe: CraftingRecipe;
  onResourceClick: (resourceName: string) => void;
}

export const CraftingRecipeCard: React.FC<CraftingRecipeCardProps> = ({ recipe, onResourceClick }) => {
  return (
    <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg shadow-black/30 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] font-chakra mb-2">{recipe.recipeName}</h2>
      <p className="text-[var(--color-text-muted)] mb-6 italic">{recipe.description}</p>
      
      <h3 className="text-lg font-semibold text-[var(--color-primary-light)] font-chakra border-b-2 border-white/10 pb-2 mb-4">Benötigte Ressourcen:</h3>
      
      <ul className="space-y-3">
        {recipe.requiredResources.map((resource, index) => (
          <li key={index} className="flex justify-between items-center bg-[var(--color-surface)]/60 p-3 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="font-bold text-[var(--color-primary-light)] text-lg w-8 text-center">{resource.quantity}x</span>
              <span className="text-white font-medium">{resource.name}</span>
            </div>
            <button 
              onClick={() => onResourceClick(resource.name)}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors p-2 rounded-full hover:bg-[var(--color-accent)]/10"
              title={`Informationen über ${resource.name}`}
              aria-label={`Informationen über ${resource.name}`}
            >
              <InfoIcon className="w-5 h-5"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};