import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { View } from '@/components/Themed';
import { Text } from 'react-native-paper';
import RootStackParamList from '@/types/RootStackParamList';
import { Link, useNavigation } from 'expo-router';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import useSetOptions from '@/hooks/useSetOptions';
import { useEffect, useState } from 'react';
import { v4 as uuid } from 'react-native-uuid/dist/v4';
import useRecipes from '@/hooks/useRecipes';
import { useDishesTheme } from '@/constants/Theme';
import { useLocalSearchParams } from 'expo-router';
import { Alert } from 'react-native';
import { NEW_RECIPE_ID } from '@/constants/Recipes';
import useRecipe from '@/hooks/useRecipe';
import { NavigationProp } from '@react-navigation/native';

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

  const updateRecipe = () =>
    saveRecipe({
      id: recipeId,
      name: recipeName,
      ingredients: recipeIngredients,
      method: recipeMethod,
    });
  const createRecipe = () =>
    saveRecipe({
      id: uuid(),
      name: recipeName,
      ingredients: recipeIngredients,
      method: recipeMethod,
    });
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

  const SaveButton = () => (
    <Link
      asChild
      href={'..'}
      replace
    >
      <Button
        title='Save'
        onPress={onPressSaveRecipe}
      />
    </Link>
  );

  useSetOptions({
    title: `Editing: ${recipeName}`,
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
            returnKeyType='done'
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
                  returnKeyType='done'
                />
              </View>
            ))}
            <Button
              title='add'
              onPress={() => setRecipeIngredients((prev) => [...prev, ''])}
            />
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
                  returnKeyType='done'
                />
              </View>
            ))}
            <Button
              title='add'
              onPress={() => setRecipeMethod((prev) => [...prev, ''])}
            />
          </View>
        </View>

        {!isNewRecipe && (
          <Button
            title='Delete'
            color='red'
            onPress={onPressDelete}
          />
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
  });
};
