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
        <View style={styles.section}>
          <Text style={styles.heading}>Ingredients</Text>
          <View style={styles.sectionContent}>
            {recipe.ingredients.map((ingredient) => (
              <Text key={ingredient}>{ingredient}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Preparation</Text>
          <View style={styles.sectionContent}>
            {recipe.method.map((step, index) => (
              <Text key={step}>{`${index + 1}.  ${step}`}</Text>
            ))}
          </View>
        </View>

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
      paddingTop: layout.spacer,
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
