import { Step } from '@/constants/Recipes';
import { useDishesTheme } from '@/constants/Theme';
import { StyleSheet } from 'react-native';
import { View } from '../Themed';
import { Text } from 'react-native-paper';

type Props = {
  method: Step[];
};

export default function Method({ method }: Props) {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preparation</Text>
      {method.map((step, index) => (
        <View
          key={`${step}`}
          style={styles.row}
        >
          <View style={styles.stepIndexContainer}>
            <Text
              style={[styles.text, styles.stepIndex]}
            >{`${index + 1}.`}</Text>
          </View>
          <View style={styles.stepContainer}>
            <Text style={[styles.text, styles.step]}>{step}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  return StyleSheet.create({
    container: {
      // padding: layout.spacer,
      // paddingVertical: layout.spacer * 2,
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
      // alignItems: 'center',
    },
    text: {
      // borderWidth: 1,
      // borderColor: 'red',
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
    },
    step: {
      textAlign: 'left',
    },
  });
};

export { useStyles };
