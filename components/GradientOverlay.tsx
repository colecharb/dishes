import { StyleSheet } from 'react-native';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

function GradientOverlay(props: LinearGradientProps) {
  const { style: styleFromProps, ...propsMinusStyle } = props;

  const styles = StyleSheet.create({
    gradient: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flex: 1,
      zIndex: 10,
    },
  });

  return (
    <LinearGradient
      pointerEvents='none'
      {...propsMinusStyle}
      style={[styles.gradient, styleFromProps]}
    />
  );
}

export default GradientOverlay;
