import { IngredientEntry } from '@/constants/Recipes';
import { useDishesTheme } from '@/constants/Theme';
import { Pressable, StyleSheet } from 'react-native';
import { View } from '../Themed';
import { Text } from 'react-native-paper';
import { useState } from 'react';

type RenderIngredientProps = {
  ingredientEntry: IngredientEntry;
};

function RenderIngredient({ ingredientEntry }: RenderIngredientProps) {
  const { amount, ingredient } = ingredientEntry;

  const [isChecked, setIsChecked] = useState(false);
  const styles = useStyles();

  return (
    <Pressable
      onPress={() => setIsChecked((prev) => !prev)}
      key={ingredient}
      style={styles.row}
    >
      <View style={styles.amountContainer}>
        <Text
          style={[styles.text, styles.amount, isChecked && styles.checkedText]}
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
  );
}

type IngredientsCardProps = {
  ingredients: IngredientEntry[];
};

export default function IngredientsCard({ ingredients }: IngredientsCardProps) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredients</Text>

      {ingredients.map((entry, index) => (
        <RenderIngredient
          ingredientEntry={entry}
          key={`${index}-${entry.ingredient}`}
        />
      ))}
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

      shadowColor: colors.shadow,
      shadowOffset: layout.shadowOffset,
      shadowRadius: layout.shadowRadius,
      shadowOpacity: layout.shadowOpacity,
    },
    title: {
      fontSize: 30,
      fontWeight: 200,
      color: colors.onBackground,
    },
    row: {
      flexDirection: 'row',
      gap: layout.spacer,
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
