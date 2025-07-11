export enum QueryType {
  PLANETARY_ANALYSIS = 'PLANETARY_ANALYSIS',
  CRAFTING_RECIPE = 'CRAFTING_RECIPE',
  PLANETARY_MAP = 'PLANETARY_MAP',
}

export interface Resource {
  name: string;
  quantity: number;
  description?: string;
}

export interface CraftingRecipe {
  recipeName: string;
  description: string;
  requiredResources: Resource[];
}

export interface CraftingGuideItem {
  name: string;
  description: string;
}

export interface CraftingGuideCategory {
  categoryName: string;
  items: CraftingGuideItem[];
}
