import { Recipe } from '@/constants/Recipes';
import { Text } from 'react-native-paper';
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useDishesTheme } from '@/constants/Theme';

type RecipeListItemProps = {
  recipe: Recipe;
};

const useStyles = () => {
  const { layout } = useDishesTheme();
  return StyleSheet.create({
    container: {
      padding: layout.spacer,
    },
    recipeName: {
      fontSize: 25,
      fontWeight: 900,
    },
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