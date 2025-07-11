import React from 'react';
import { Spinner } from './Spinner';
import { XMarkIcon } from './IconComponents';

interface ResourceInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  resourceName: string | null;
  info: string;
  isLoading: boolean;
}

export const ResourceInfoModal: React.FC<ResourceInfoModalProps> = ({ isOpen, onClose, resourceName, info, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[var(--color-surface)]/80 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/40 w-full max-w-lg m-4 relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <h3 className="text-2xl font-bold text-[var(--color-primary)] font-chakra mb-4 pr-8">{resourceName}</h3>
          
          <div className="min-h-[128px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-32 text-[var(--color-primary-light)]">
                <Spinner size="lg"/>
                <p className="mt-3 font-chakra">Lade Ressourcendaten...</p>
              </div>
            ) : (
              <p className="text-[var(--color-text)] whitespace-pre-wrap leading-relaxed">{info}</p>
            )}
          </div>
        </div>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
          aria-label="Schließen"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};