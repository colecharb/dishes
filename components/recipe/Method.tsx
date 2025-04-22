import { Step } from '@/constants/Recipes';
import { useDishesTheme } from '@/constants/Theme';
import { StyleSheet, Pressable } from 'react-native';
import { View } from '../Themed';
import { Text } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type Props = {
  method: Step[];
};

function StepComponent({
  step,
  index,
  isActive,
  onPress: _onPress,
}: {
  step: Step;
  index: number;
  isActive: boolean;
  onPress: () => void;
}) {
  const styles = useStyles();

  const animation = useSharedValue(0);

  const animate = useCallback(
    (toValue: number) => {
      animation.value = withTiming(toValue, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
    },
    [animation],
  );

  useEffect(() => {
    animate(isActive ? 1 : 0);
  }, [animate, isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    borderWidth: animation.value * styles.activeStep.borderWidth,
    paddingHorizontal:
      styles.activeStep.paddingHorizontal -
      animation.value * styles.activeStep.borderWidth,
    paddingVertical: animation.value * styles.activeStep.paddingVertical,
    shadowOpacity: animation.value * styles.activeStep.shadowOpacity,
  }));

  return (
    <Pressable
      key={index}
      onPress={_onPress}
      style={{ zIndex: isActive ? 10 : 1 }}
    >
      <Animated.View style={[styles.row, styles.activeStep, animatedStyle]}>
        <View style={styles.stepIndexContainer}>
          <Text style={[styles.text, styles.stepIndex]}>{`${index + 1}.`}</Text>
        </View>
        <View style={styles.stepContainer}>
          <Text style={[styles.text, styles.step]}>{step}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function Method({ method }: Props) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>();
  const styles = useStyles();

  const onPressStep = (index: number) => () => {
    setActiveStepIndex(activeStepIndex === index ? undefined : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preparation</Text>
      {method.map((step, index) => (
        <StepComponent
          key={`${index}-${step}`}
          step={step}
          index={index}
          isActive={activeStepIndex === index}
          onPress={onPressStep(index)}
        />
      ))}
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
