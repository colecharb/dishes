import Layout from '@/constants/Layout';
import { Dispatch, SetStateAction } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useThemeColor, View } from './Themed';

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
  return StyleSheet.create({
    container: {
      height: 50,
    },
    text: {
      color: useThemeColor({}, 'text')
    }
  });
};

export default SearchBar;