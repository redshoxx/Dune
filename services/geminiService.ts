
import { GoogleGenAI, Type } from "@google/genai";
import { CraftingRecipe } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const planetaryAnalysisSystemInstruction = `Du bist ein KI-Interface für die planetologische Datenbank 'planetologist.app'. Deine Aufgabe ist es, Anfragen über den Planeten Arrakis im Kontext von Dune: Awakening zu beantworten. Nutze deine 'Datenbank', um detaillierte und thematisch passende Informationen über Flora, Fauna, Geologie, Wetterphänomene und Überlebensstrategien zu liefern. Präsentiere die Informationen klar, strukturiert und fesselnd. Antworte auf Deutsch.`;

const craftingSystemInstruction = `Du bist ein Handwerksmeister in der Welt von Dune. Erstelle ein plausibles Handwerksrezept für den angeforderten Gegenstand. Die Ressourcen sollten zur Welt von Dune passen (z.B. Spice, Metallschrott, Sandwurm-Zähne, Melange-Fasern, etc.). Das Rezept sollte logisch, aber fiktiv sein. Antworte auf Deutsch.`;

const resourceSystemInstruction = `Du bist ein Geologe und Biologe auf Arrakis, der mit Daten von Planetologist.app arbeitet. Beschreibe die angeforderte Ressource kurz und bündig. Erkläre, wo man sie finden könnte und wofür sie nützlich ist, im Kontext des Dune-Universums. Antworte auf Deutsch.`;

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: {
      type: Type.STRING,
      description: "Der Name des herzustellenden Gegenstands.",
    },
    description: {
      type: Type.STRING,
      description: "Eine kurze, thematische Beschreibung des Gegenstands.",
    },
    requiredResources: {
      type: Type.ARRAY,
      description: "Eine Liste der benötigten Ressourcen.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "Der Name der Ressource.",
          },
          quantity: {
            type: Type.INTEGER,
            description: "Die benötigte Menge der Ressource.",
          },
        },
        required: ["name", "quantity"],
      },
    },
  },
  required: ["recipeName", "description", "requiredResources"],
};

export const getPlanetaryAnalysis = async (prompt: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      systemInstruction: planetaryAnalysisSystemInstruction,
      temperature: 0.7,
      topP: 0.9,
    },
  });
  return response.text;
};

export const generateCraftingRecipe = async (itemName: string): Promise<CraftingRecipe> => {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Erstelle ein Rezept für: ${itemName}`,
        config: {
            systemInstruction: craftingSystemInstruction,
            responseMimeType: "application/json",
            responseSchema: recipeSchema,
        },
    });

    try {
        const jsonText = response.text.trim();
        // The response should be a valid JSON string adhering to the schema.
        const parsedRecipe = JSON.parse(jsonText);
        // Basic validation
        if (parsedRecipe && parsedRecipe.recipeName && Array.isArray(parsedRecipe.requiredResources)) {
            return parsedRecipe as CraftingRecipe;
        } else {
            throw new Error("Ungültiges Rezeptformat von der API erhalten.");
        }
    } catch (error) {
        console.error("Fehler beim Parsen des Rezepts:", error);
        throw new Error("Das von der API zurückgegebene Rezept konnte nicht verarbeitet werden.");
    }
};

export const getResourceInfo = async (resourceName: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Beschreibe diese Ressource: ${resourceName}`,
    config: {
      systemInstruction: resourceSystemInstruction,
      temperature: 0.5,
    },
  });
  return response.text;
};
