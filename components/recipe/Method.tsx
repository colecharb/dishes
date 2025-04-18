import { Step } from '@/constants/Recipes';
import { useDishesTheme } from '@/constants/Theme';
import {
  StyleSheet,
  Pressable,
  Animated,
  InteractionManager,
  Easing,
} from 'react-native';
import { View } from '../Themed';
import { Text } from 'react-native-paper';
import { useEffect, useRef, useState } from 'react';

type Props = {
  method: Step[];
};

export default function Method({ method }: Props) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>();
  const styles = useStyles();

  const animationsRef = useRef(method.map(() => new Animated.Value(0)));

  useEffect(() => {
    animationsRef.current = method.map(() => new Animated.Value(0));
  }, [method, method.length]);

  const animateStep = (index: number, toValue: number) => {
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(animationsRef.current[index], {
        toValue,
        duration: 200,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false, // useNativeDriver must be false for backgroundColor
      }).start();
    });
  };

  const onPressStep = (index: number) => () => {
    if (activeStepIndex === index) {
      animateStep(index, 0);
      setActiveStepIndex(undefined);
    } else {
      if (activeStepIndex !== undefined) {
        animateStep(activeStepIndex, 0);
      }
      animateStep(index, 1);
      setActiveStepIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preparation</Text>
      {method.map((step, index) => {
        const animation = animationsRef.current[index];

        const animatedStyle = {
          ...styles.activeStep,
          borderWidth: animation?.interpolate({
            inputRange: [0, 1],
            outputRange: [0, styles.activeStep.borderWidth],
          }),
          paddingHorizontal: animation?.interpolate({
            inputRange: [0, 1],
            outputRange: [
              styles.activeStep.paddingHorizontal,
              styles.activeStep.paddingHorizontal -
                styles.activeStep.borderWidth,
            ],
          }),
          paddingVertical: animation?.interpolate({
            inputRange: [0, 1],
            outputRange: [0, styles.activeStep.paddingVertical],
          }),
          shadowOffset: styles.activeStep.shadowOffset,
          shadowOpacity: animation?.interpolate({
            inputRange: [0, 1],
            outputRange: [0, styles.activeStep.shadowOpacity], // use a fallback if undefined
          }),
        };

        return (
          <Pressable
            key={index}
            onPress={onPressStep(index)}
            // following zIndex condition keep shadow on top of other steps
            style={{ zIndex: activeStepIndex === index ? 10 : 1 }}
          >
            <Animated.View style={[styles.row, animatedStyle]}>
              <View style={styles.stepIndexContainer}>
                <Text
                  style={[styles.text, styles.stepIndex]}
                >{`${index + 1}.`}</Text>
              </View>
              <View style={styles.stepContainer}>
                <Text style={[styles.text, styles.step]}>{step}</Text>
              </View>
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
}

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  return StyleSheet.create({
    container: {
      gap: layout.spacer,
    },
    title: {
      fontSize: 30,
      fontWeight: 200,
      color: colors.onBackground,
      marginBottom: layout.spacer / 2,
    },
    row: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      gap: layout.spacer,
      paddingHorizontal: layout.spacer,
    },
    activeStep: {
      paddingVertical: layout.spacer,
      paddingHorizontal: layout.spacer,
      borderRadius: layout.spacer,
      borderColor: colors.primary,
      borderWidth: layout.borderWidth,
      backgroundColor: colors.background,
      shadowColor: colors.shadow,
      shadowOffset: layout.shadowOffset,
      shadowOpacity: layout.shadowOpacity,
      shadowRadius: layout.shadowRadius,
    },
    text: {
      paddingTop: 0,
      fontSize: 16,
      color: colors.onBackground,
    },
    stepIndexContainer: {
      flex: 1,
    },
    stepContainer: {
      flex: 10,
    },
    stepIndex: {
      textAlign: 'right',
      fontWeight: 'bold',
    },
    step: {
      textAlign: 'left',
    },
  });
};

export { useStyles };
