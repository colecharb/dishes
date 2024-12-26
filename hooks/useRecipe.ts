import { Recipe } from '@/constants/Recipes';
import RecipeStorage from '@/helpers/recipeStorage';
import { useState, useEffect } from 'react';

const useRecipe = (recipeId: string) => {
  const [recipe, setRecipe] = useState<Recipe | null>();

  useEffect(() => {
    RecipeStorage.getRecipe(recipeId)
      .then((recipe) => setRecipe(recipe));
  }, [recipeId]);

  return recipe;
};

export default useRecipe;