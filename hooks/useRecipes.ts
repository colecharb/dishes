import { Recipe } from '@/constants/Recipes';
import RecipeStorage from '@/helpers/RecipeStorage';
import recipesAtom from '@/jotai/recipesAtom';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

const useRecipes = () => {
  const [recipesAtomValue, setRecipesAtomValue] = useAtom(recipesAtom);

  // console.log('Recipes Atom Value:', JSON.stringify(recipesAtomValue, null, 2));


  const fetchRecipes = async () => {
    const storedRecipes = await RecipeStorage.getAll();
    setRecipesAtomValue(storedRecipes);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const saveRecipe = (recipe: Recipe) => (
    RecipeStorage.save(recipe)
      .then(() => setRecipesAtomValue(
        (prev) => [...prev, recipe]
      ))
  );

  const removeRecipe = (recipeId: string) => (
    RecipeStorage.delete(recipeId)
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
    saveRecipe,
    removeRecipe,
  };
};

export default useRecipes;