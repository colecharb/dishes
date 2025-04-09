import { Recipe } from '@/constants/Recipes';
import RecipeStorage from '@/helpers/recipeStorage';
import recipesAtom from '@/jotai/recipesAtom';
import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';

const useRecipes = () => {
  const [recipesAtomValue, setRecipesAtomValue] = useAtom(recipesAtom);

  const fetchRecipes = useCallback(async () => {
    const storedRecipes = await RecipeStorage.getAll();
    setRecipesAtomValue(storedRecipes);
  }, [setRecipesAtomValue]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const saveRecipe = (recipe: Recipe) =>
    RecipeStorage.save(recipe).then(fetchRecipes);

  const deleteRecipe = (recipeId: string) =>
    RecipeStorage.delete(recipeId).then(fetchRecipes);

  return {
    recipes: recipesAtomValue,
    saveRecipe,
    deleteRecipe,
    reloadRecipes: fetchRecipes,
  };
};

export default useRecipes;
