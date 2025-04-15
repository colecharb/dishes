import { IngredientEntry } from '@/constants/Recipes';
import { useDishesTheme } from '@/constants/Theme';
import { StyleSheet } from 'react-native';
import { View } from '../Themed';
import { Text } from 'react-native-paper';

type Props = {
  ingredients: IngredientEntry[];
};

export default function IngredientsCard({ ingredients }: Props) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Ingredients</Text> */}
      {ingredients.map(({ amount, ingredient }) => (
        <View
          key={ingredient}
          style={styles.row}
        >
          <View style={styles.amountContainer}>
            <Text style={[styles.text, styles.amount]}>{amount}</Text>
          </View>
          <View style={styles.ingredientContainer}>
            <Text style={[styles.text, styles.ingredient]}>{ingredient}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  return StyleSheet.create({
    container: {
      padding: layout.spacer,
      paddingVertical: layout.spacer * 2,
      gap: layout.spacer,
      backgroundColor: colors.secondary + '33',
      borderRadius: layout.spacer,
    },
    title: {
      fontSize: 30,
      fontWeight: 200,
      color: colors.onBackground,
      marginBottom: layout.spacer / 2,
    },
    row: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      gap: layout.spacer,
      // alignItems: 'center',
    },
    text: {
      fontSize: 16,
      color: colors.onBackground,
      paddingTop: 0,
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
  });
};

export { useStyles };
