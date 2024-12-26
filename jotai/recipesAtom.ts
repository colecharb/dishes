import { Recipe } from '@/constants/Recipes';
import recipeStorage from '@/helpers/recipeStorage';
import { atom } from 'jotai';

export default atom<Recipe[]>([]);