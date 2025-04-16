/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function View(props: ViewProps) {
  // const { colors } = useDishesTheme();

  const { style, lightColor, darkColor, ...otherProps } = props;

  return (
    <DefaultView
      style={[{ backgroundColor: 'transparent' }, style]}
      {...otherProps}
    />
  );
}
