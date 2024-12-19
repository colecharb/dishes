import { Recipe } from '@/constants/Recipes';
import RecipeStorage from '@/helpers/recipeStorage.helper';
import { useState, useEffect } from 'react';

const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    RecipeStorage.getAllRecipes()
      .then((recipes) => setRecipes(recipes));
  }, []);

  return recipes;
};

export default useRecipes;