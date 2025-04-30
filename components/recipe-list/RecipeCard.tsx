import { Recipe } from '@/constants/Recipes';
import { Text } from 'react-native-paper';
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useDishesTheme } from '@/constants/Theme';
import { View } from '../Themed';

export const CARD_HEIGHT = 150;
export const PEEK_HEIGHT = 60;

type RecipeCardProps = {
  recipe: Recipe;
  index: number;
};

const RecipeCard = ({ recipe, index }: RecipeCardProps) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Link
        asChild
        href={{
          pathname: '/recipe/[recipeId]',
          params: { recipeId: recipe.id },
        }}
      >
        <Pressable>
          <Text style={styles.recipeName}>{recipe.name}</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  return StyleSheet.create({
    container: {
      padding: layout.spacer,
      paddingTop: layout.spacer / 2,
      backgroundColor: colors.background,
      // borderWidth: layout.borderWidth,
      // borderColor: colors.secondary,
      borderRadius: layout.spacer / 2,
      height: CARD_HEIGHT,
      marginBottom: -(CARD_HEIGHT - PEEK_HEIGHT),
      shadowColor: colors.shadow,
      // shadowOffset: { height: 0, width: 0 },
      shadowOpacity: layout.shadowOpacity,
      shadowRadius: layout.spacer / 2,
    },
    recipeName: {
      fontSize: 25,
      fontWeight: 900,
    },
  });
};

export default RecipeCard;
