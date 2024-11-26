import { Recipe } from '@/constants/Recipes';
import { Text, View } from './Themed';
import { ListRenderItem, ListRenderItemInfo, Pressable, StyleSheet } from 'react-native';
import Layout from '@/constants/Layout';
import { Link } from 'expo-router';

type RecipeListItemProps = {
  recipe: Recipe;
};

const useStyles = () => {
  return StyleSheet.create({
    container: {
      padding: Layout.spacer,
    },
    recipeName: {
      fontSize: 25,
      fontWeight: 900,
    }
  });
};

const RecipeListItem = ({ recipe }: RecipeListItemProps) => {
  const styles = useStyles();
  return (
    <Link
      asChild
      href={{
        pathname: '/recipe',
        params: { recipeId: recipe.id }
      }}
    >
      <Pressable style={styles.container}>
        <Text style={styles.recipeName}>
          {recipe.name}
        </Text>
      </Pressable>
    </Link>
  );
};

export default RecipeListItem;