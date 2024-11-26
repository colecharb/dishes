import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { RECIPES, type Recipe } from '@/constants/Recipes';
import RootStackParamList from '@/types/RootStackParamList';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import Layout from '@/constants/Layout';
import useSetOptions from '@/hooks/useSetOptions';

type Params = RootStackParamList['recipe'];

export default function RecipeScreen() {
  const { recipeId } = useLocalSearchParams<RootStackParamList['recipe']>();
  const recipe = RECIPES.find(r => r.id === recipeId);

  useSetOptions({ title: recipe?.name });

  const styles = useStyles();

  // const route = useRoute();
  // console.log({ route });

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>
          Recipe not found.
        </Text>
      </View>

    );
  }

  return (
    <SafeAreaScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <Text style={styles.heading}>
          Ingredients
        </Text>
        <View style={styles.sectionContent}>
          {
            recipe.ingredients.map(
              (ingredient) => (
                <Text key={ingredient}>
                  {ingredient}
                </Text>
              )
            )
          }
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>
          Preparation
        </Text>
        <View style={styles.sectionContent}>
          {recipe.method.map(
            (step, index) => (
              <Text key={step}>
                {`${index + 1}.  ${step}`}
              </Text>
            )
          )}
        </View>
      </View>


    </SafeAreaScrollView>
  );
}

const useStyles = () => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: Layout.spacer,
      paddingTop: 100 + Layout.spacer,
      gap: Layout.spacer * 2,

    },
    recipeName: {
      fontSize: 35,
      fontWeight: 900,
    },
    section: {
      gap: Layout.spacer,
    },
    sectionContent: {
      gap: Layout.spacer / 2,
    },
    heading: {
      fontSize: 30,
      fontWeight: 200,
    }
  });
};
