import { Image, StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { RECIPES } from '@/constants/Recipes';
import RecipeStorage from '@/helpers/recipeStorage';
import { useDishesTheme } from '@/constants/Theme';
import { Button } from 'react-native-paper';
import useRecipes from '@/hooks/useRecipes';
import { useNavigation } from 'expo-router';

export default function ModalScreen() {
  const { reloadRecipes } = useRecipes();
  const navigation = useNavigation();
  const styles = useStyles();
  const onPressResetRecipes = () => {
    RecipeStorage.saveMultiple(RECIPES)
      .then(reloadRecipes)
      .then(navigation.goBack);
  };
  const onPressLogRecipes = () => {
    RecipeStorage.getAll().then((recipes) => {
      const sansDetail = recipes.map(({ id, name }) => ({ id, name }));
      console.log(JSON.stringify(sansDetail, null, 2));
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash-icon.png')}
        style={{ width: 100, height: 100 }}
      />

      <Button
        mode='outlined'
        onPress={onPressResetRecipes}
      >
        Add Dummy Recipes
      </Button>

      <Button
        mode='outlined'
        onPress={onPressLogRecipes}
      >
        log recipes in local storage
      </Button>
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
