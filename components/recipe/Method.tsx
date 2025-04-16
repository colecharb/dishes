import { Step } from '@/constants/Recipes';
import { useDishesTheme } from '@/constants/Theme';
import { StyleSheet } from 'react-native';
import { View } from '../Themed';
import { Text } from 'react-native-paper';
import { useState } from 'react';
import { Pressable } from 'react-native';

type Props = {
  method: Step[];
};

export default function Method({ method }: Props) {
  const [activeStepIndex, setActiveStepIndex] = useState<number>();

  const styles = useStyles();

  const onPressStep = (index: number) => () => {
    setActiveStepIndex((prev) => (prev === index ? undefined : index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preparation</Text>
      {method.map((step, index) => (
        <Pressable
          key={`${step}`}
          onPress={onPressStep(index)}
          style={[styles.row, activeStepIndex === index && styles.activeStep]}
        >
          <View style={styles.stepIndexContainer}>
            <Text
              style={[styles.text, styles.stepIndex]}
            >{`${index + 1}.`}</Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={[styles.text, styles.step]}>{step}</Text>
          </View>
        </Pressable>
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
    },
    activeStep: {
      paddingVertical: layout.spacer,
      borderRadius: layout.spacer / 2,
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
