import React, { useState } from 'react';
import { MapIcon, ArrowsPointingOutIcon, XMarkIcon } from './IconComponents';

export const PlanetaryMap: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const mapUrl = "https://www.planetologist.app/";

  // The modal component for the fullscreen map
  const FullScreenMapModal = () => (
    <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col animate-fade-in-up">
      <div className="flex justify-between items-center p-4 bg-black/30">
        <h3 className="text-lg font-bold text-[var(--color-primary)] font-chakra">Interaktive Karte</h3>
        <button 
          onClick={() => setIsFullScreen(false)}
          className="text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
          aria-label="Vollbildmodus schließen"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      <iframe
        src={mapUrl}
        title="Interaktive Karte von Arrakis (Vollbild)"
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );

  return (
    <>
      <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg shadow-black/30 animate-fade-in-up overflow-hidden">
        <div className="p-4 bg-black/30 border-b border-white/10 flex justify-between items-center flex-wrap gap-2">
          <h2 className="text-xl font-bold text-[var(--color-primary)] font-chakra flex items-center gap-3">
              <MapIcon className="w-6 h-6" />
              Interaktive Planetenkarte
          </h2>
          <div className="flex items-center gap-2">
            <button
                onClick={() => setIsFullScreen(true)}
                className="text-sm font-chakra bg-[var(--color-accent)]/80 hover:bg-[var(--color-accent)] text-white font-bold py-2 px-3 rounded-md transition-colors flex items-center gap-2"
                aria-label="Karte im Vollbildmodus öffnen"
            >
                <ArrowsPointingOutIcon className="w-5 h-5" />
                Vollbild
            </button>
          </div>
        </div>
        <div className="h-[60vh] md:h-[600px] w-full bg-[var(--color-bg)]">
          <iframe
            src={mapUrl}
            title="Interaktive Karte von Arrakis von Planetologist.app"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
          />
        </div>
      </div>
      {isFullScreen && <FullScreenMapModal />}
    </>
  );
};