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
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.text, styles.stepIndex]}
            >{`${index + 1}.`}</Text>
          </View>
          <View style={{ flex: 10 }}>
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
      fontSize: 16,
      color: colors.onBackground,
    },
    stepIndex: {
      textAlign: 'right',
    },
    step: {
      textAlign: 'left',
    },
  });
};
