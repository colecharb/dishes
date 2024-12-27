import { Button, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import Layout from '@/constants/Layout';
import { RECIPES } from '@/constants/Recipes';
import RecipeStorage from '@/helpers/RecipeStorage';

export default function ModalScreen() {

  const onPressResetRecipes = () => {
    RecipeStorage.saveMultiple(RECIPES);
  }

  return (
    <View style={styles.container}>

      <Button
        title='Add Dummy Recipes'
        onPress={onPressResetRecipes}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Layout.spacer,
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
