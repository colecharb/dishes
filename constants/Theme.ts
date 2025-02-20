// import {
//   type Theme,
//   DarkTheme,
//   DefaultTheme,
// } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

const Layout = {
  spacer: 16,
  borderWidth: 1,
} as const;

const dishesColors = {
  primary: '#FDB955',
  secondary: '#777777',
  danger: '#FF0000',
} as const;

// Colors present in both themes
const commonColors: Partial<MD3Colors> & typeof dishesColors = {
  ...dishesColors,
} as const;

const dishesTheme = {
  ...MD3DarkTheme,
  layout: Layout,
  colors: {
    ...MD3DarkTheme.colors,
    // black background
    background: '#000000',
    ...commonColors,
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
    ...commonColors,
  },
  fonts: {
    ...MD3LightTheme.fonts,
  },
};

const useDishesTheme = () => useTheme<DishesTheme>();

export { dishesTheme, lightTheme, useDishesTheme };
