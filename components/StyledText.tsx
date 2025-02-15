import { TextProps } from 'react-native-paper';
import { Text } from 'react-native-paper';

export function MonoText(props: TextProps<{}>) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: 'SpaceMono' }]}
    />
  );
}
