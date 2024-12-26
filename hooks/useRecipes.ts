import { Recipe } from '@/constants/Recipes';
import RecipeStorage from '@/helpers/recipeStorage';
import recipesAtom from '@/jotai/recipesAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const useRecipes = () => {
  const [recipesAtomValue, setRecipesAtomValue] = useAtom(recipesAtom);

  const fetchRecipes = async () => {
    const storedRecipes = await RecipeStorage.getAllRecipes();
    setRecipesAtomValue(storedRecipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const addRecipe = (recipe: Recipe) => (
    RecipeStorage.saveRecipe(recipe)
      .then(() => setRecipesAtomValue(
        (prev) => [...prev, recipe]
      ))
  );

  const removeRecipe = (recipeId: string) => (
    RecipeStorage.deleteRecipe(recipeId)
      .then(() => setRecipesAtomValue(
        (prev) => prev.filter((recipe) => recipe.id !== recipeId)
      ))
  );

  // console.log(JSON.stringify(
  //   recipesAtomValue.map(r => r.name),
  //   null,
  //   2
  // ));

  return {
    recipes: recipesAtomValue,
    addRecipe,
    removeRecipe,
  };
};

export default useRecipes;