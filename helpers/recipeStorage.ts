import { Recipe } from '../constants/Recipes';
import AsyncStorage from '@react-native-async-storage/async-storage';

// RECIPE IDS //

/**
 * Get the list of recipe IDs.
 */

const RECIPE_ID_INDEX_KEY = 'recipe.index';

const getRecipeIds = async (): Promise<string[]> =>
  AsyncStorage.getItem(RECIPE_ID_INDEX_KEY)
    .then((jsonString) => {
      return jsonString ? (JSON.parse(jsonString) as string[]) : [];
    })
    .catch((error) => {
      console.error('Error retrieving recipe IDs:', error);
      return [];
    });

const addToRecipeIds = async (ids: string[]): Promise<void> => {
  const recipeIds = await getRecipeIds();

  let newRecipeIds = recipeIds;

  ids.forEach((id) => {
    if (newRecipeIds.includes(id)) {
      return;
    }
    newRecipeIds = [...newRecipeIds, id];
  });

  await AsyncStorage.setItem(
    RECIPE_ID_INDEX_KEY,
    JSON.stringify(newRecipeIds),
  ).catch((error) => console.error('Error adding recipe ID:', error));
};

const removeFromRecipeIds = async (id: string): Promise<void> => {
  const recipeIds = await getRecipeIds();
  const newRecipeIds = recipeIds.filter((recipeId) => recipeId !== id);

  await AsyncStorage.setItem(
    RECIPE_ID_INDEX_KEY,
    JSON.stringify(newRecipeIds),
  ).catch((error) => console.error('Error removing recipe ID:', error));
};

// RECIPES //

const save = (recipe: Recipe): Promise<void> =>
  AsyncStorage.setItem(recipe.id, JSON.stringify(recipe))
    .then(() => addToRecipeIds([recipe.id]))
    .catch((error) => console.error('Error saving recipe:', error));

const saveMultiple = async (recipes: Recipe[]): Promise<void> => {
  const recipeIds = recipes.map((recipe) => recipe.id);
  const recipeKeyValuePairs = recipes.map<[string, string]>((recipe) => [
    recipe.id,
    JSON.stringify(recipe),
  ]);
  await AsyncStorage.multiSet(recipeKeyValuePairs)
    .then(() => addToRecipeIds(recipeIds))
    .catch((error) => console.error('Error saving recipe:', error));
};

const get = (id: string): Promise<Recipe | null> =>
  AsyncStorage.getItem(id)
    .then((jsonString) =>
      jsonString ? (JSON.parse(jsonString) as Recipe) : null,
    )
    .catch((error) => {
      console.error('Error retrieving recipe:', error);
      return null;
    });

const getAll = (): Promise<Recipe[]> =>
  getRecipeIds()
    .then((keys) => {
      return AsyncStorage.multiGet(keys);
    })
    .then((result) => {
      return result
        .map(([key, value]) => (value ? (JSON.parse(value) as Recipe) : null))
        .filter((recipe) => recipe !== null);
    })
    .catch((error) => {
      console.error('Error retrieving all recipes:', error);
      return [];
    });

const deleteRecipe = (id: string): Promise<void> =>
  AsyncStorage.removeItem(id)
    .then(() => {
      removeFromRecipeIds(id);
    })
    .catch((error) => {
      console.error('Error deleting recipe:', error);
    });

const RecipeStorage = {
  save,
  saveMultiple,
  get,
  getAll,
  delete: deleteRecipe,
};

export default RecipeStorage;
