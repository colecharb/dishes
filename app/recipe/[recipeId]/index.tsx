import { Image, ScrollView, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { Text } from 'react-native-paper';
import RootStackParamList from '@/types/RootStackParamList';
import { Link, useLocalSearchParams } from 'expo-router';
import useSetOptions from '@/hooks/useSetOptions';
import useRecipe from '@/hooks/useRecipe';
import { useDishesTheme } from '@/constants/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import GradientOverlay from '@/components/GradientOverlay';
import Ingredients from '@/components/recipe/Ingredients';
import Method from '@/components/recipe/Method';

const SPLASH_ICON = require('@/assets/images/splash-icon.png');

type Params = RootStackParamList['recipe'];

export default function RecipeScreen() {
  const { layout, colors } = useDishesTheme();
  const { recipeId } = useLocalSearchParams<Params>();
  const [recipe] = useRecipe(recipeId);

  const EditButton = () => (
    <Link
      asChild
      href={{
        pathname: '/recipe/[recipeId]/edit',
        params: { recipeId },
      }}
    >
      <FontAwesome
        size={layout.spacer * 1.5}
        name='edit'
        color={colors.primary}
      />
    </Link>
  );

  useSetOptions({
    title: recipe?.name,
    headerRight: EditButton,
  });

  const styles = useStyles();

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found.</Text>
      </View>
    );
  }

  const { ingredients, method } = recipe;

  return (
    <View style={styles.container}>
      <GradientOverlay
        colors={[
          colors.background,
          colors.background + '00',
          colors.background + '00',
          colors.background,
        ]}
        locations={[0, 0.05, 0.8, 1]}
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <Ingredients ingredients={ingredients} />

        <Method method={method} />

        <Image
          source={SPLASH_ICON}
          style={styles.dishesImage}
        />
      </ScrollView>
    </View>
  );
}

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      backgroundColor: colors.background,
      flex: 1,
    },
    scrollViewContent: {
      backgroundColor: colors.background,
      paddingHorizontal: layout.spacer,
      paddingTop: layout.spacer * 2,
      paddingBottom: safeAreaInsets.bottom * 2,
      gap: layout.spacer * 2,
    },
    recipeName: {
      fontSize: 35,
      fontWeight: 900,
    },
    section: {
      gap: layout.spacer,
    },
    sectionContent: {
      gap: layout.spacer / 2,
    },
    heading: {
      fontSize: 30,
      fontWeight: 200,
    },
    dishesImage: {
      aspectRatio: 1,
      height: 50,
      alignSelf: 'center',
      margin: layout.spacer,
    },
  });
};
