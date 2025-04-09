import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { View } from '@/components/Themed';
import { Button, Text } from 'react-native-paper';
import { Link, useNavigation, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'react-native-uuid/dist/v4';
import { NavigationProp } from '@react-navigation/native';

import RootStackParamList from '@/types/RootStackParamList';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import useSetOptions from '@/hooks/useSetOptions';
import useRecipes from '@/hooks/useRecipes';
import useRecipe from '@/hooks/useRecipe';
import { useDishesTheme } from '@/constants/Theme';
import { NEW_RECIPE_ID } from '@/constants/Recipes';

const SPLASH_ICON = require('@/assets/images/splash-icon.png');

type Params = RootStackParamList['edit-recipe'];

export default function EditRecipeScreen() {
  const { recipeId } = useLocalSearchParams<Params>();
  const isNewRecipe = recipeId === NEW_RECIPE_ID;

  const { saveRecipe, deleteRecipe } = useRecipes();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [recipeName, setRecipeName] = useState<string>('');
  const [recipeIngredients, setRecipeIngredients] = useState<string[]>(['']);
  const [recipeMethod, setRecipeMethod] = useState<string[]>(['']);

  const [recipe] = useRecipe(recipeId);

  const { colors } = useDishesTheme();

  useEffect(() => {
    setRecipeName((prev) => recipe?.name ?? prev);
    setRecipeIngredients((prev) => recipe?.ingredients ?? prev);
    setRecipeMethod((prev) => recipe?.method ?? prev);
  }, [recipe]);

  const setIngredient = (index: number) => (ingredient: string) => {
    setRecipeIngredients((prev) => [
      ...prev.slice(0, index),
      ingredient,
      ...prev.slice(index + 1),
    ]);
  };

  const setStep = (index: number) => (step: string) => {
    setRecipeMethod((prev) => [
      ...prev.slice(0, index),
      step,
      ...prev.slice(index + 1),
    ]);
  };

  const updateRecipe = () => {
    if (!recipe) return;
    const now = new Date();

    saveRecipe({
      id: recipeId,
      name: recipeName,
      ingredients: recipeIngredients,
      method: recipeMethod,
      createdAt: recipe.createdAt,
      modifiedAt: now,
    });
  };
  const createRecipe = () => {
    const now = new Date();
    saveRecipe({
      id: uuid(),
      name: recipeName,
      ingredients: recipeIngredients,
      method: recipeMethod,
      createdAt: now,
      modifiedAt: now,
    });
  };
  const deleteAndGoBack = () => {
    deleteRecipe(recipeId).then(() => {
      navigation.goBack();
      navigation.navigate('index');
    });
  };

  const onPressDelete = () => {
    Alert.alert(
      'Deleting Recipe',
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
        },
      ],
    );
  };

  const onPressSaveRecipe = isNewRecipe
    ? () => createRecipe()
    : () => updateRecipe();

  const CancelButton = () => (
    <Link href='..'>
      <Button textColor={colors.secondary}>Cancel</Button>
    </Link>
  );

  const SaveButton = () => (
    <Link
      asChild
      href={'..'}
      replace
    >
      <Button onPress={onPressSaveRecipe}>Save</Button>
    </Link>
  );

  useSetOptions({
    title: `${isNewRecipe ? 'New' : 'Editing'} Recipe:`,
    headerLeft: CancelButton,
    headerRight: SaveButton,
  });

  const styles = useStyles();

  return (
    <KeyboardAvoidingView
      behavior='height'
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaScrollView
        keyboardShouldPersistTaps='handled'
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.section}>
          <TextInput
            autoFocus={isNewRecipe}
            placeholder='Recipe Name'
            autoCapitalize='words'
            style={styles.recipeName}
            onChangeText={setRecipeName}
            value={recipeName}
            multiline
            scrollEnabled={false}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>Ingredients</Text>
          <View style={styles.sectionContent}>
            {recipeIngredients.map((ingredient, index) => (
              <View
                key={index}
                style={styles.ingredientRow}
              >
                <TextInput
                  multiline
                  scrollEnabled={false}
                  placeholder='Add ingredient...'
                  style={styles.textInput}
                  onChangeText={(text) => setIngredient(index)(text)}
                  value={ingredient}
                />
              </View>
            ))}
            <Button
              onPress={() => setRecipeIngredients((prev) => [...prev, ''])}
            >
              Add
            </Button>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Preparation</Text>
          <View style={styles.sectionContent}>
            {recipeMethod.map((step, index) => (
              <View
                key={index}
                style={styles.ingredientRow}
              >
                <Text>{`${index + 1}.`}</Text>
                <TextInput
                  multiline
                  scrollEnabled={false}
                  placeholder='Add step...'
                  style={styles.textInput}
                  onChangeText={(text) => setStep(index)(text)}
                  value={step}
                />
              </View>
            ))}
            <Button onPress={() => setRecipeMethod((prev) => [...prev, ''])}>
              Add
            </Button>
          </View>
        </View>

        <Image
          source={SPLASH_ICON}
          style={styles.dishesImage}
        />

        {!isNewRecipe && (
          <Button
            textColor={colors.danger}
            onPress={onPressDelete}
          >
            Delete
          </Button>
        )}
      </SafeAreaScrollView>
    </KeyboardAvoidingView>
  );
}

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollViewContent: {
      paddingHorizontal: layout.spacer,
      gap: layout.spacer * 2,
      backgroundColor: colors.background,
    },
    recipeName: {
      color: colors.onBackground,
      fontSize: 35,
      fontWeight: 900,
    },
    section: {
      gap: layout.spacer,
    },
    sectionContent: {
      gap: layout.spacer / 2,
    },
    ingredientRow: {
      flexDirection: 'row',
      gap: layout.spacer / 2,
      alignItems: 'center',
    },
    heading: {
      color: colors.onBackground,
      fontSize: 30,
      fontWeight: 200,
    },
    textInput: {
      flex: 1,
      color: colors.onBackground,
    },
    dishesImage: {
      aspectRatio: 1,
      height: 50,
      alignSelf: 'center',
      margin: layout.spacer,
    },
  });
};
