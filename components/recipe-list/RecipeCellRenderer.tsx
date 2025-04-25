import { Recipe } from '@/constants/Recipes';
import { CellRendererProps, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  SharedValue,
  clamp,
} from 'react-native-reanimated';
import { useMemo } from 'react';
import { CARD_HEIGHT, PEEK_HEIGHT } from '../RecipeListItem';

const RecipeCellRenderer = ({
  index,
  children,
  style,
  scrollY,
}: CellRendererProps<Recipe> & {
  scrollY: SharedValue<number>;
}) => {
  // Calculate rotation based on position
  // Each cell is 150px tall with -90px marginBottom, so effective height is 60px
  const minRotation = 15;
  const maxRotation = 90;

  const animatedStyle = useAnimatedStyle(() => {
    const rotation = clamp(
      (scrollY.value - index * PEEK_HEIGHT) * 1.4,
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
  }, [scrollY.value]);

  const combinedStyle = useMemo(() => {
    return StyleSheet.flatten([animatedStyle, style]);
  }, [animatedStyle, style]);

  return useMemo(
    () => <Animated.View style={combinedStyle}>{children}</Animated.View>,
    [combinedStyle, children],
  );
};

export default RecipeCellRenderer;
