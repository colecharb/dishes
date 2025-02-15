import { Image, StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { RECIPES } from '@/constants/Recipes';
import RecipeStorage from '@/helpers/RecipeStorage';
import { useDishesTheme } from '@/constants/Theme';
import { Button } from 'react-native-paper';

export default function ModalScreen() {
  const styles = useStyles();
  const onPressResetRecipes = () => {
    RecipeStorage.saveMultiple(RECIPES);
  };

  return (
    <View style={styles.container}>
      {/* add image 'assets/images/splash-icon.png */}
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
