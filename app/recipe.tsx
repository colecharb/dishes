import { Alert, Button, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import RootStackParamList from '@/types/RootStackParamList';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import Layout from '@/constants/Layout';
import useSetOptions from '@/hooks/useSetOptions';
import useRecipes from '@/hooks/useRecipes';
import useRecipe from '@/hooks/useRecipe';

type Params = RootStackParamList['recipe'];

export default function RecipeScreen() {
  const { recipeId } = useLocalSearchParams<RootStackParamList['recipe']>();
  const { removeRecipe } = useRecipes();
  const recipe = useRecipe(recipeId);

  const navigation = useNavigation();

  useSetOptions({ title: recipe?.name });

  const deleteAndGoBack = () => {
    removeRecipe(recipeId)
      .then(() => navigation.goBack());
  };

  const onPressDelete = () => {
    Alert.alert('Deleting Recipe',
      'Are you sure you want to delete this recipe?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: deleteAndGoBack,
        }
      ],
    );
  }

  const styles = useStyles();

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
              <Text style={styles.sectionText} key={step}>
                {`${index + 1}.  ${step}`}
              </Text>
            )
          )}
        </View>
      </View>

      <Button
        title='Delete'
        color='red'
        onPress={onPressDelete}
      />


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
    sectionText: {
      color: 'white',
    },
    heading: {
      fontSize: 30,
      fontWeight: 200,
    }
  });
};
