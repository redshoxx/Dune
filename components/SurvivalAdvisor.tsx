import React, { useState, useCallback } from 'react';
import { QueryType, CraftingRecipe } from '../types';
import { generateCraftingRecipe, getResourceInfo, getPlanetaryAnalysis } from '../services/geminiService';
import { CraftingRecipeCard } from './CraftingRecipeCard';
import { ResourceInfoModal } from './ResourceInfoModal';
import { Spinner } from './Spinner';
import { BookIcon, WrenchIcon, SearchIcon, MapIcon } from './IconComponents';
import { PlanetaryMap } from './PlanetaryMap';

export const SurvivalAdvisor: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [queryType, setQueryType] = useState<QueryType>(QueryType.PLANETARY_ANALYSIS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | CraftingRecipe | null>(null);
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [resourceInfo, setResourceInfo] = useState<string>('');
  const [isResourceLoading, setIsResourceLoading] = useState<boolean>(false);

  const handleResourceClick = useCallback(async (resourceName: string) => {
    setSelectedResource(resourceName);
    setIsModalOpen(true);
    setIsResourceLoading(true);
    setResourceInfo('');
    try {
      const info = await getResourceInfo(resourceName);
      setResourceInfo(info);
    } catch (err) {
      setResourceInfo('Informationen konnten nicht geladen werden.');
    } finally {
      setIsResourceLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      if (queryType === QueryType.CRAFTING_RECIPE) {
        const recipe = await generateCraftingRecipe(query);
        setResult(recipe);
      } else {
        const analysis = await getPlanetaryAnalysis(query);
        setResult(analysis);
      }
    } catch (err) {
      console.error(err);
      setError('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getPlaceholderText = () => {
    switch(queryType) {
      case QueryType.PLANETARY_ANALYSIS:
        return 'Analysiere... z.B. Lebenszyklus des Sandwurms';
      case QueryType.CRAFTING_RECIPE:
        return 'Suche nach Rezept... z.B. Stillsuit oder Crysknife';
      default:
        return 'Stelle deine Frage...';
    }
  };

  const handleQueryTypeChange = (type: QueryType) => {
    setQueryType(type);
    setResult(null);
    setError(null);
    setQuery('');
  }

  return (
    <>
      <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 shadow-2xl shadow-black/30">
        <div className="bg-[var(--color-surface)]/50 p-1 rounded-lg flex flex-col sm:flex-row gap-1 mb-4">
          <button
            onClick={() => handleQueryTypeChange(QueryType.PLANETARY_ANALYSIS)}
            className={`flex-1 font-chakra font-bold py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${queryType === QueryType.PLANETARY_ANALYSIS ? 'bg-[var(--color-primary)] text-black' : 'text-[var(--color-text-muted)] hover:bg-white/5'}`}
          >
            <BookIcon className="w-5 h-5"/> Planeten-Analyse
          </button>
          <button
            onClick={() => handleQueryTypeChange(QueryType.CRAFTING_RECIPE)}
            className={`flex-1 font-chakra font-bold py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${queryType === QueryType.CRAFTING_RECIPE ? 'bg-[var(--color-primary)] text-black' : 'text-[var(--color-text-muted)] hover:bg-white/5'}`}
          >
            <WrenchIcon className="w-5 h-5" /> Rezeptsuche
          </button>
          <button
            onClick={() => handleQueryTypeChange(QueryType.PLANETARY_MAP)}
            className={`flex-1 font-chakra font-bold py-2 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 ${queryType === QueryType.PLANETARY_MAP ? 'bg-[var(--color-primary)] text-black' : 'text-[var(--color-text-muted)] hover:bg-white/5'}`}
          >
            <MapIcon className="w-5 h-5" /> Planetenkarte
          </button>
        </div>
        
        {queryType !== QueryType.PLANETARY_MAP && (
            <form onSubmit={handleSubmit} className="animate-fade-in-up">
                <div className="relative flex items-center gap-2">
                    <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-muted)]" />
                    <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={getPlaceholderText()}
                    className="w-full bg-[var(--color-surface)]/70 border border-transparent rounded-lg py-3 pl-10 pr-4 text-[var(--color-text)] placeholder-[var(--color-text-muted)] focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent outline-none transition-all duration-200"
                    disabled={isLoading}
                    />
                    <button
                    type="submit"
                    className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] disabled:bg-cyan-800/50 disabled:cursor-not-allowed text-white font-bold p-3 rounded-lg transition-colors duration-200 flex items-center justify-center aspect-square"
                    disabled={isLoading || !query.trim()}
                    aria-label="Suchen"
                    >
                    {isLoading ? <Spinner size="sm" /> : <SearchIcon className="w-6 h-6"/>}
                    </button>
                </div>
            </form>
        )}
      </div>

      <div className="mt-8 min-h-[400px]">
        {queryType === QueryType.PLANETARY_MAP ? (
            <PlanetaryMap />
        ) : (
            <>
                {error && <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded-lg text-center animate-fade-in-up">{error}</div>}
                
                {!isLoading && !result && !error && (
                <div className="text-center text-[var(--color-text-muted)] p-8 font-chakra animate-fade-in-up">
                    <p>Die Wüste birgt viele Geheimnisse.</p>
                    <p className="text-sm">Stelle eine Frage, um sie zu lüften.</p>
                </div>
                )}

                {isLoading && (
                <div className="flex flex-col items-center justify-center p-8 text-[var(--color-primary-light)] animate-fade-in-up">
                    <Spinner size="lg" />
                    <p className="mt-4 font-chakra animate-pulse">Analysiere Wüstendaten...</p>
                </div>
                )}
                
                {result && typeof result === 'string' && (
                  <div className="bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg shadow-black/30 animate-fade-in-up">
                    <h3 className="text-xl font-bold text-[var(--color-primary)] font-chakra mb-3">Analyse von Planetologist.app:</h3>
                    <p className="text-[var(--color-text)] whitespace-pre-wrap leading-relaxed">{result}</p>
                     <p className="text-xs text-right mt-4 text-[var(--color-text-muted)] opacity-70">
                        Daten bereitgestellt von <a href="https://www.planetologist.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-[var(--color-accent)] transition-colors">Planetologist.app</a>
                    </p>
                  </div>
                )}

                {result && typeof result === 'object' && (
                  <CraftingRecipeCard recipe={result} onResourceClick={handleResourceClick} />
                )}
            </>
        )}
      </div>
      
      <ResourceInfoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        resourceName={selectedResource}
        info={resourceInfo}
        isLoading={isResourceLoading}
      />
    </>
  );
};