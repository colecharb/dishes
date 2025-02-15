import { StyleSheet, TextInput } from 'react-native';
import { View } from './Themed';
import { useDishesTheme } from '@/constants/Theme';

type Props = {
  onChangeText: (text: string) => void;
};

const SearchBar = ({ onChangeText }: Props) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={onChangeText}
        style={styles.text}
      />
    </View>
  );
};

const useStyles = () => {
  const { colors } = useDishesTheme();
  return StyleSheet.create({
    container: {
      height: 50,
    },
    text: {
      color: colors.primary,
    },
  });
};

export default SearchBar;
