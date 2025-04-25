import { Recipe } from '@/constants/Recipes';
import { Text } from 'react-native-paper';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Link } from 'expo-router';
import { useDishesTheme } from '@/constants/Theme';

type RecipeCardProps = {
  recipe: Recipe;
  index: number;
};

const RecipeCard = ({ recipe, index }: RecipeCardProps) => {
  const styles = useStyles();
  // const { width } = Dimensions.get('window');
  // const cardWidth = width * 0.8;
  const overlapOffset = 50; // How much each card overlaps

  return (
    <Link
      asChild
      href={{
        pathname: '/recipe/[recipeId]',
        params: { recipeId: recipe.id },
      }}
    >
      <View
        style={[
          styles.container,
          {
            top: index * overlapOffset,
            // left: (width - cardWidth) / 2,
          },
        ]}
      >
        <View style={styles.content}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
        </View>
      </View>
    </Link>
  );
};

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  const { width } = Dimensions.get('window');
  const cardWidth = width * 0.8;
  const cardHeight = cardWidth * 2; // 1:2 aspect ratio

  return StyleSheet.create({
    container: {
      position: 'absolute',
      width: cardWidth,
      height: cardHeight,
      backgroundColor: colors.secondary,
      borderRadius: 20,
      borderColor: colors.primary,
      borderWidth: layout.borderWidth,
      shadowColor: colors.shadow,
      shadowOffset: layout.shadowOffset,
      shadowOpacity: layout.shadowOpacity,
      shadowRadius: layout.shadowRadius,
      elevation: 5,
      overflow: 'visible',
    },
    content: {
      flex: 1,
      padding: layout.spacer * 2,
      justifyContent: 'flex-end',
      backgroundColor: 'transparent',
    },
    recipeName: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.onBackground,
    },
  });
};

export default RecipeCard;
