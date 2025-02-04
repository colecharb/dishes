import { Button, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { RECIPES } from '@/constants/Recipes';
import RecipeStorage from '@/helpers/RecipeStorage';
import { useDishesTheme } from '@/constants/Theme';

export default function ModalScreen() {
  const styles = useStyles();
  const onPressResetRecipes = () => {
    RecipeStorage.saveMultiple(RECIPES);
  };

  return (
    <View style={styles.container}>
      <Button
        title='Add Dummy Recipes'
        onPress={onPressResetRecipes}
      />
    </View>
  );
}

const useStyles = () => {
  const { layout } = useDishesTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: layout.spacer,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
};
