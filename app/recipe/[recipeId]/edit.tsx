import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import { View } from '@/components/Themed';
import { Button, Text } from 'react-native-paper';
import { Link, useNavigation, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from 'react-native-uuid/dist/v4';
import { NavigationProp } from '@react-navigation/native';

import RootStackParamList from '@/types/RootStackParamList';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import useSetOptions from '@/hooks/useSetOptions';
import useRecipes from '@/hooks/useRecipes';
import useRecipe from '@/hooks/useRecipe';
import { useDishesTheme } from '@/constants/Theme';
import {
  IngredientEntry,
  NEW_RECIPE_ID,
  RecipeContent,
} from '@/constants/Recipes';
import { useStyles as useIngredientsStyles } from '@/components/recipe/Ingredients';
import { useStyles as useMethodStyles } from '@/components/recipe/Method';

const SPLASH_ICON = require('@/assets/images/splash-icon.png');

// TODO: redo ingredient entry for new data shape

const defaultIngredientEntry = {
  amount: '',
  ingredient: '',
} as const;

type Params = RootStackParamList['edit-recipe'];

export default function EditRecipeScreen() {
  const { recipeId } = useLocalSearchParams<Params>();
  const isNewRecipe = recipeId === NEW_RECIPE_ID;

  const { saveRecipe, deleteRecipe } = useRecipes();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [recipeName, setRecipeName] = useState<string>('');
  const [recipeIngredients, setRecipeIngredients] = useState<IngredientEntry[]>(
    [{ ...defaultIngredientEntry }],
  );
  const [recipeMethod, setRecipeMethod] = useState<string[]>(['']);

  const ingredientRefs = useRef<
    { amount: TextInput | null; item: TextInput | null }[]
  >([]);
  const methodRefs = useRef<(TextInput | null)[]>([]);

  const [recipe] = useRecipe(recipeId);

  const { colors } = useDishesTheme();

  useEffect(() => {
    setRecipeName((prev) => recipe?.name ?? prev);
    setRecipeIngredients((prev) => recipe?.ingredients ?? prev);
    setRecipeMethod((prev) => recipe?.method ?? prev);
  }, [recipe]);

  const setIngredient =
    (index: number, field: keyof IngredientEntry) => (value: string) => {
      setRecipeIngredients((prev) => [
        ...prev.slice(0, index),
        { ...prev[index], [field]: value },
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

  const addIngredientAndFocus = () => {
    setRecipeIngredients((prev) => [...prev, { ...defaultIngredientEntry }]);
    setTimeout(
      () => ingredientRefs.current[recipeIngredients.length]?.amount?.focus(),
      0,
    );
  };

  const addMethodAndFocus = () => {
    setRecipeMethod((prev) => [...prev, '']);
    setTimeout(() => methodRefs.current[recipeMethod.length]?.focus(), 0);
  };

  const onSubmitEditingName = () => {
    setRecipeName((prev) => prev.trim());
    ingredientRefs.current[0]?.amount?.focus();
  };

  const onSubmitEditingIngredient =
    (index: number, field: 'amount' | 'item') => () => {
      if (field === 'amount') {
        // pressing enter on any amount field brings you to its ingredient field
        ingredientRefs.current[index]?.item?.focus();
        return;
      }
      if (recipeIngredients[index].ingredient.length === 0) {
        if (recipeIngredients.length === index + 1) {
          // Pressing enter on the last ingredient when it's empty closes keyboard
          Keyboard.dismiss();
          return;
        }
        // Pressing enter on
        setRecipeIngredients((prev) => [
          ...prev.slice(0, index),
          ...prev.slice(index + 1),
        ]);
        return;
      }
      const nextRef = ingredientRefs.current[index + 1]?.amount;
      if (nextRef) {
        nextRef.focus();
        return;
      }
      addIngredientAndFocus();
    };

  const onSubmitEditingStep = (index: number) => () => {
    if (recipeMethod[index].length === 0) {
      if (recipeMethod.length === index + 1) {
        Keyboard.dismiss();
        return;
      }
      setRecipeMethod((prev) => [
        ...prev.slice(0, index),
        ...prev.slice(index + 1),
      ]);
      return;
    }
    setStep(index)(recipeMethod[index].trim());
    const nextRef = methodRefs.current[index + 1];
    if (nextRef) {
      nextRef.focus();
      return;
    }
    addMethodAndFocus();
  };

  /**
   * Returns the recipe prepared for saving, minus date and ID fields:
   * - removes empty ingredients and steps
   * - copies the rest of the recipe as is
   */

  const getPreparedRecipeContent = (): RecipeContent | null => {
    if (!recipeId) return null;

    const cleanIngredients = recipeIngredients.filter(
      ({ ingredient }) => ingredient.trim().length > 0,
    );
    const cleanMethod = recipeMethod
      .map((step) => step.trim())
      .filter((step) => step.length > 0);

    const cleanRecipeContent: RecipeContent = {
      name: recipeName,
      ingredients: cleanIngredients,
      method: cleanMethod,
    };
    return cleanRecipeContent;
  };

  const updateRecipe = () => {
    const preparedRecipe = getPreparedRecipeContent();

    if (!recipe || !preparedRecipe) {
      return;
    }

    const now = new Date();

    saveRecipe({
      ...recipe,
      ...preparedRecipe,
      modifiedAt: now,
    });
  };

  const createRecipe = () => {
    const preparedRecipe = getPreparedRecipeContent();
    if (!preparedRecipe) return;
    const now = new Date();

    saveRecipe({
      ...preparedRecipe,
      id: uuid(),
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

  const onPressSaveRecipe = () => {
    if (isNewRecipe) {
      createRecipe();
    } else {
      updateRecipe();
    }
  };

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
  const ingredientsStyles = useIngredientsStyles();
  const methodStyles = useMethodStyles();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior='height'
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 115 : 0}
      >
        <SafeAreaScrollView
          keyboardShouldPersistTaps='handled'
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.section}>
            <TextInput
              multiline
              scrollEnabled={false}
              autoFocus={isNewRecipe}
              placeholder='Recipe Name'
              autoCapitalize='words'
              style={styles.recipeName}
              onChangeText={setRecipeName}
              defaultValue={recipeName}
              returnKeyType='next'
              onSubmitEditing={onSubmitEditingName}
              submitBehavior='submit'
            />
          </View>
          <View style={ingredientsStyles.container}>
            {recipeIngredients.map(({ amount, ingredient }, index) => (
              <View
                key={index}
                style={ingredientsStyles.row}
              >
                <View style={ingredientsStyles.amountContainer}>
                  <TextInput
                    multiline
                    scrollEnabled={false}
                    ref={(ref) => {
                      if (!ingredientRefs.current[index]) {
                        ingredientRefs.current[index] = {
                          amount: null,
                          item: null,
                        };
                      }
                      ingredientRefs.current[index].amount = ref;
                    }}
                    placeholder='qty.'
                    style={[ingredientsStyles.text, ingredientsStyles.amount]}
                    onChangeText={(text) =>
                      setIngredient(index, 'amount')(text)
                    }
                    defaultValue={amount}
                    returnKeyType='next'
                    onSubmitEditing={onSubmitEditingIngredient(index, 'amount')}
                    submitBehavior='submit'
                  />
                </View>
                <View style={ingredientsStyles.ingredientContainer}>
                  <TextInput
                    multiline
                    scrollEnabled={false}
                    ref={(ref) => {
                      if (!ingredientRefs.current[index]) {
                        ingredientRefs.current[index] = {
                          amount: null,
                          item: null,
                        };
                      }
                      ingredientRefs.current[index].item = ref;
                    }}
                    placeholder='ingredient'
                    style={[
                      ingredientsStyles.text,
                      ingredientsStyles.ingredient,
                    ]}
                    onChangeText={(text) =>
                      setIngredient(index, 'ingredient')(text)
                    }
                    defaultValue={ingredient}
                    returnKeyType='next'
                    onSubmitEditing={onSubmitEditingIngredient(index, 'item')}
                    submitBehavior='submit'
                  />
                </View>
              </View>
            ))}
            <Button onPress={addIngredientAndFocus}>Add</Button>
          </View>

          <View style={methodStyles.container}>
            <Text style={methodStyles.title}>Preparation</Text>
            {recipeMethod.map((step, index) => (
              <View
                key={index}
                style={methodStyles.row}
              >
                <View style={methodStyles.stepIndexContainer}>
                  <Text
                    style={[methodStyles.text, methodStyles.stepIndex]}
                  >{`${index + 1}.`}</Text>
                </View>
                <View style={methodStyles.stepContainer}>
                  <TextInput
                    multiline
                    scrollEnabled={false}
                    ref={(ref) => (methodRefs.current[index] = ref)}
                    placeholder='Add step...'
                    style={[methodStyles.text, methodStyles.step]}
                    onChangeText={(text) => setStep(index)(text)}
                    defaultValue={step}
                    returnKeyType='next'
                    onSubmitEditing={onSubmitEditingStep(index)}
                    submitBehavior='submit'
                  />
                </View>
              </View>
            ))}
            <Button
              onPress={() => {
                setRecipeMethod((prev) => [...prev, '']);
                setTimeout(
                  () => methodRefs.current[recipeMethod.length]?.focus(),
                  0,
                );
              }}
            >
              Add
            </Button>
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
    </View>
  );
}

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardAvoidingView: {
      flex: 1,
      backgroundColor: colors.background,
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
      color: colors.onBackground,
      fontSize: 16,
    },
    amountInput: {
      flex: 1,
    },
    ingredientInput: {
      flex: 2,
    },
    dishesImage: {
      aspectRatio: 1,
      height: 50,
      alignSelf: 'center',
      margin: layout.spacer,
    },
  });
};
