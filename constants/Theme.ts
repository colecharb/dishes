// import {
//   type Theme,
//   DarkTheme,
//   DefaultTheme,
// } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';

const Layout = {
  spacer: 16,
  borderWidth: 1,
} as const;

const dishesTheme = {
  ...MD3DarkTheme,
  layout: Layout,
  colors: {
    ...MD3DarkTheme.colors,
  },
  fonts: {
    ...MD3DarkTheme.fonts,
  },
};

type DishesTheme = typeof dishesTheme;

const lightTheme: DishesTheme = {
  ...dishesTheme,
  colors: {
    ...MD3LightTheme.colors,
  },
  fonts: {
    ...MD3LightTheme.fonts,
  },
};

const useDishesTheme = () => useTheme<DishesTheme>();

export { dishesTheme, lightTheme, useDishesTheme };
