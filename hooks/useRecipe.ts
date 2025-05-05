// import { Recipe } from '@/constants/Recipes';
// import RecipeStorage from '@/helpers/RecipeStorage';
// import { useState, useEffect, useCallback } from 'react';
import useRecipes from './useRecipes';

const useRecipe = (recipeId: string) => {
  const { recipes } = useRecipes();
  const recipe = recipes.find((r) => r.id === recipeId);

  return [recipe];
};

export default useRecipe;
