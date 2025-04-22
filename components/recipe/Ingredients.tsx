import { IngredientEntry } from '@/constants/Recipes';
import { useDishesTheme } from '@/constants/Theme';
import { Pressable, StyleSheet } from 'react-native';
import { View } from '../Themed';
import { Text } from 'react-native-paper';
import { useState } from 'react';

type IngredientsCardProps = {
  ingredients: IngredientEntry[];
};

export default function IngredientsCard({ ingredients }: IngredientsCardProps) {
  const [checkedIngredients, setCheckedIngredients] = useState(
    Array(ingredients.length).fill(false),
  );

  const toggleCheckForIngredient = (index: number) => () => {
    setCheckedIngredients((prev) => [
      ...prev.slice(0, index),
      !prev[index],
      ...prev.slice(index + 1),
    ]);
  };

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredients</Text>

      {/* <View style={[styles.line, styles.redLine]} /> */}

      {ingredients.map(({ amount, ingredient }, index) => {
        const isChecked = checkedIngredients[index];
        return (
          // <>
          <Pressable
            onPress={toggleCheckForIngredient(index)}
            key={ingredient}
            style={styles.row}
          >
            <View style={styles.amountContainer}>
              <Text
                style={[
                  styles.text,
                  styles.amount,
                  isChecked && styles.checkedText,
                ]}
              >
                {amount}
              </Text>
            </View>
            <View style={styles.ingredientContainer}>
              <Text
                style={[
                  styles.text,
                  styles.ingredient,
                  isChecked && styles.checkedText,
                ]}
              >
                {ingredient}
              </Text>
            </View>
          </Pressable>
          // {/* <View style={[styles.line, styles.blueLine]} /> */}
          // </>
        );
      })}
    </View>
  );
}

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  return StyleSheet.create({
    container: {
      padding: layout.spacer,
      paddingBottom: layout.spacer * 2,
      gap: layout.spacer,
      backgroundColor: colors.surface,
      borderRadius: layout.spacer,
      // borderWidth: layout.borderWidth,
      // borderColor: colors.secondary + '7f',

      shadowColor: colors.shadow,
      shadowOffset: layout.shadowOffset,
      shadowRadius: layout.shadowRadius,
      shadowOpacity: layout.shadowOpacity,
    },
    title: {
      fontSize: 30,
      fontWeight: 200,
      color: colors.onBackground,
      // marginBottom: layout.spacer / 2,
    },
    row: {
      // justifyContent: 'space-between',
      flexDirection: 'row',
      gap: layout.spacer,
      // alignItems: 'center',
    },
    text: {
      fontSize: 16,
      color: colors.onBackground,
      paddingTop: 0,
    },
    checkedText: {
      textDecorationLine: 'line-through',
      color: colors.secondary,
    },
    amountContainer: {
      flex: 1,
    },
    ingredientContainer: {
      flex: 2,
    },
    amount: {
      textAlign: 'right',
      fontWeight: 'bold',
    },
    ingredient: {
      textAlign: 'left',
    },
    line: {
      height: layout.borderWidth,
      backgroundColor: colors.secondary,
      marginHorizontal: -1 * layout.spacer,
      marginTop: -1 * layout.spacer,
    },
    redLine: {
      backgroundColor: colors.indexCardRed,
    },
    blueLine: {
      backgroundColor: colors.indexCardBlue,
    },
  });
};

export { useStyles };
