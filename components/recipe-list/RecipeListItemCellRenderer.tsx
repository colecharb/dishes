import { Recipe } from '@/constants/Recipes';
import { CellRendererProps, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  SharedValue,
  clamp,
} from 'react-native-reanimated';
import { useMemo } from 'react';
import { CARD_HEIGHT, PEEK_HEIGHT } from './RecipeCard';

export type MaybeFilteredRecipe = Recipe & {
  filteredBy?: 'name' | 'ingredient';
};

export type SearchResultSection = {
  title: string;
  filteredBy: 'name' | 'ingredient';
};

const RecipeListItemCellRenderer = (
  props: CellRendererProps<MaybeFilteredRecipe | SearchResultSection> & {
    scrollY: SharedValue<number>;
  },
) => {
  const { item, index, children, style, scrollY } = props;
  // Calculate rotation based on position
  // Each cell is 150px tall with -90px marginBottom, so effective height is 60px
  const minRotation = 15;
  const maxRotation = 90;

  const animatedStyle = useAnimatedStyle(() => {
    const adjustedIndex = index - (item.filteredBy === 'ingredient' ? 1 : 0);
    const rotation = clamp(
      (scrollY.value - adjustedIndex * PEEK_HEIGHT) * 1.4,
      minRotation,
      maxRotation,
    );

    return {
      transform: [
        { perspective: 500 },
        { translateY: -CARD_HEIGHT }, // Move to center
        { rotateX: `${rotation}deg` },
        { translateY: CARD_HEIGHT }, // Move back
        { scaleY: -1 },
      ],
      zIndex: -index,
    };
  });

  const combinedStyle = useMemo(() => {
    return StyleSheet.flatten([animatedStyle, style]);
  }, [animatedStyle, style]);

  return <Animated.View style={combinedStyle}>{children}</Animated.View>;
};

export default RecipeListItemCellRenderer;
