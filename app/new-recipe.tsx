import { Button, KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';
import { View } from '@/components/Themed';
import { Text } from 'react-native-paper';
import RootStackParamList from '@/types/RootStackParamList';
import { Link } from 'expo-router';
import SafeAreaScrollView from '@/components/SafeAreaScrollView';
import useSetOptions from '@/hooks/useSetOptions';
import { useState } from 'react';
import { v4 as uuid } from 'react-native-uuid/dist/v4';
import useRecipes from '@/hooks/useRecipes';
import { useDishesTheme } from '@/constants/Theme';

type Params = RootStackParamList['recipe'];

export default function NewRecipeScreen() {
  const { saveRecipe } = useRecipes();

  const [recipeName, setRecipeName] = useState<string>('');
  const [recipeIngredients, setRecipeIngredients] = useState<string[]>(['']);
  const [recipeMethod, setRecipeMethod] = useState<string[]>(['']);

  const setIngredient = (index: number) => (
    (ingredient: string) => {
      setRecipeIngredients(
        (prev) => ([
          ...prev.slice(0, index),
          ingredient,
          ...prev.slice(index + 1),
        ])
      );
    }
  );

  const setStep = (index: number) => (
    (step: string) => {
      setRecipeMethod(
        (prev) => ([
          ...prev.slice(0, index),
          step,
          ...prev.slice(index + 1),
        ])
      );
    }
  );

  useSetOptions({ title: recipeName });

  const onPressSave = () => (
    saveRecipe({
      id: uuid(),
      name: recipeName,
      ingredients: recipeIngredients,
      method: recipeMethod,
    })
  );

  const styles = useStyles();

  return (
    <KeyboardAvoidingView
      behavior='height'
      style={styles.keyboardAvoidingView}
    >
      <SafeAreaScrollView
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={styles.container}
      >

        <View style={styles.section}>
          <TextInput
            placeholder='Recipe Name'
            autoCapitalize='words'
            style={styles.heading}
            onChangeText={setRecipeName}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.heading}>
            Ingredients
          </Text>
          <View style={styles.sectionContent}>
            {
              recipeIngredients.map(
                (ingredient, index) => (
                  <View
                    key={index}
                    style={styles.ingredientRow}
                  >
                    <Text style={styles.sectionText}>
                      •
                    </Text>
                    <TextInput
                      placeholder='Add ingredient...'
                      style={[styles.sectionText, { flex: 1 }]}
                      onChangeText={(text) => setIngredient(index)(text)}
                      value={ingredient}
                    />
                  </View>
                )
              )
            }
            <Button
              title='add'
              onPress={() => setRecipeIngredients((prev) => [...prev, ''])}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>
            Preparation
          </Text>
          <View style={styles.sectionContent}>
            {
              recipeMethod.map(
                (step, index) => (
                  <View
                    key={index}
                    style={styles.ingredientRow}
                  >
                    <Text style={styles.sectionText}>
                      •
                    </Text>
                    <TextInput
                      placeholder='Add step...'
                      style={[styles.sectionText, { flex: 1 }]}
                      onChangeText={(text) => setStep(index)(text)}
                      value={step}
                    />
                  </View>
                )
              )
            }
            <Button
              title='add'
              onPress={() => setRecipeMethod((prev) => [...prev, ''])}
            />
          </View>
        </View>

        <Link asChild href={'..'} replace>
          <Button
            title='Save'
            onPress={onPressSave}
          />
        </Link>

      </SafeAreaScrollView>
    </KeyboardAvoidingView>
  );
}

const useStyles = () => {
  const { layout } = useDishesTheme();
  return StyleSheet.create({
    keyboardAvoidingView: { flex: 1 },
    container: {
      paddingHorizontal: layout.spacer,
      paddingTop: 100 + layout.spacer,
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
    ingredientRow: {
      flexDirection: 'row',
      gap: layout.spacer / 2,
    },
    sectionText: {
      color: 'white',
    },
    heading: {
      color: 'white',
      fontSize: 30,
      fontWeight: 200,
    },
  });
};
