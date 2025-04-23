// import {
//   type Theme,
//   DarkTheme,
//   DefaultTheme,
// } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, useTheme } from 'react-native-paper';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

const layout = {
  spacer: 16,
  borderWidth: 2,
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 12,
  shadowOpacity: 0.5,
} as const;

// colors used across all themes
const dishesColors = {
  primary: '#DA9E2F',
  secondary: '#7F7F7F',
  danger: '#FF0000',

  indexCardRed: '#EE606050',
  indexCardBlue: '#6060EE50',
} as const;

// Colors present in both themes
const commonColors: Partial<MD3Colors> & typeof dishesColors = {
  ...dishesColors,
} as const;

const dishesTheme = {
  ...MD3DarkTheme,
  layout: layout,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#000000',
    onBackground: '#FFFFFF',
    shadow: '#FFFFFF',
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
    background: '#FFFFFF',
    onBackground: '#000000',
    surface: '#FFFFFF',
    ...commonColors,
  },
  fonts: {
    ...MD3LightTheme.fonts,
  },
};

const useDishesTheme = () => useTheme<DishesTheme>();

export { dishesTheme, lightTheme, useDishesTheme };
