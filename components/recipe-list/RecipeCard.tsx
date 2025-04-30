import { Recipe } from '@/constants/Recipes';
import { Text } from 'react-native-paper';
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useDishesTheme } from '@/constants/Theme';
import { View } from '../Themed';
import { RenderIngredient } from '../recipe/Ingredients';
import GradientOverlay from '../GradientOverlay';

export const CARD_HEIGHT = 200;
export const PEEK_HEIGHT = 60;

type RecipeCardProps = {
  recipe: Recipe;
  index: number;
};

const RecipeCard = ({ recipe, index }: RecipeCardProps) => {
  const { colors } = useDishesTheme();
  const styles = useStyles();

  return (
    <Link
      asChild
      href={{
        pathname: '/recipe/[recipeId]',
        params: { recipeId: recipe.id },
      }}
    >
      <Pressable style={styles.container}>
        <GradientOverlay
          colors={[
            colors.background + '00',
            colors.background + '00',
            colors.background,
          ]}
          locations={[0, 0.25, 1]}
        />
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <View
          style={styles.ingredientsContainer}
          pointerEvents='none'
        >
          {recipe.ingredients.map((ingredient) => (
            <RenderIngredient
              key={ingredient.ingredient}
              ingredientEntry={ingredient}
              isPressable={false}
            />
          ))}
        </View>
      </Pressable>
    </Link>
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
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: layout.shadowOpacity,
      shadowRadius: layout.spacer / 2,
      gap: layout.spacer,
    },
    ingredientsContainer: {
      flex: 1,
      overflow: 'hidden',
      gap: layout.spacer / 2,
    },
    recipeName: {
      fontSize: 25,
      fontWeight: 900,
    },
  });
};

export default RecipeCard;
