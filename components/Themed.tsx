/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';

import { useDishesTheme } from '@/constants/Theme';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

// export function useThemeColor(
//   props: { light?: string; dark?: string },
//   colorName: keyof typeof Colors.light & keyof typeof Colors.dark
// ) {
//   const theme = useColorScheme() ?? 'light';
//   const colorFromProps = props[theme];

//   if (colorFromProps) {
//     return colorFromProps;
//   } else {
//     return Colors[theme][colorName];
//   }
// }

export function Text(props: TextProps) {
  const { colors } = useDishesTheme();
  const { style, lightColor, darkColor, ...otherProps } = props;

  return (
    <DefaultText
      style={[{ color: colors.primary, fontSize: 18 }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { colors } = useDishesTheme();

  const { style, lightColor, darkColor, ...otherProps } = props;

  return (
    <DefaultView
      style={[{ backgroundColor: colors.background }, style]}
      {...otherProps}
    />
  );
}
