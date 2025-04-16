import { Alert, Image, StyleSheet } from 'react-native';

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
  const onPressAddDummyRecipes = () => {
    RecipeStorage.saveMultiple(RECIPES)
      .then(reloadRecipes)
      .then(navigation.goBack);
  };
  const onPressLogRecipes = () => {
    RecipeStorage.getAll().then((recipes) => {
      const simplified = recipes.map(({ id, name, createdAt, modifiedAt }) => ({
        id,
        name,
        createdAt: createdAt.toLocaleString(),
        modifiedAt: modifiedAt.toLocaleString(),
      }));
      console.log(JSON.stringify(simplified, null, 2));
    });
  };
  const onPressDeleteAllRecipes = () => {
    RecipeStorage.deleteAll().then(() => {
      reloadRecipes();
      navigation.goBack();
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
        onPress={onPressAddDummyRecipes}
      >
        Add Dummy Recipes
      </Button>

      <Button
        mode='outlined'
        onPress={() =>
          Alert.alert(
            'Delete all recipes',
            'Are you sure you want to delete all recipes?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                onPress: () => onPressDeleteAllRecipes(),
                style: 'destructive',
              },
            ],
          )
        }
      >
        Delete all Recipes
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
  const { layout, colors } = useDishesTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: layout.spacer,
      backgroundColor: colors.background,
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
