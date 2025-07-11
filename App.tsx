import React from 'react';
import { Header } from './components/Header';
import { SurvivalAdvisor } from './components/SurvivalAdvisor';

function App() {
  return (
    <div 
      className="min-h-screen w-full text-[var(--color-text)] bg-[var(--color-bg)]"
      style={{
        backgroundImage: 'radial-gradient(ellipse at top, #4a2a0a, var(--color-bg) 70%), radial-gradient(ellipse at bottom, #0f4c75, var(--color-bg) 80%)'
      }}
    >
        <Header />
        <main className="p-4 sm:p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <SurvivalAdvisor />
          </div>
        </main>
        <footer className="text-center p-4 mt-8 text-xs text-[var(--color-text-muted)] font-chakra">
          <p>Planetologie-Daten bereitgestellt von <a href="https://www.planetologist.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--color-accent)]">Planetologist.app</a>. Dies ist eine inoffizielle Tool-App. Dune: Awakening ist eine Marke von Funcom.</p>
        </footer>
    </div>
  );
}

export default App;
