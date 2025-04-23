import { Pressable, StyleSheet, TextInput } from 'react-native';
import { View } from './Themed';
import { useDishesTheme } from '@/constants/Theme';
import { Text } from 'react-native-paper';
import { useRef } from 'react';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
};

// eslint-disable-next-line react/display-name
const SearchBar = (props: SearchBarProps) => {
  const { searchQuery, setSearchQuery } = props;

  const ref = useRef<TextInput>(null);

  const onPressClear = () => {
    setSearchQuery('');
    ref.current?.clear();
    ref.current?.blur();
  };

  const styles = useStyles();

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        ref={ref}
        autoCorrect={false}
        autoCapitalize='none'
        selectionColor={'white'}
        style={styles.searchBarText}
        onChangeText={setSearchQuery}
        placeholder='Search...'
        returnKeyType='done'
      />

      {searchQuery && (
        <Pressable onPress={onPressClear}>
          <Text>clear</Text>
        </Pressable>
      )}
    </View>
  );
};

const useStyles = () => {
  const { colors } = useDishesTheme();
  return StyleSheet.create({
    searchBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    searchBarText: {
      flex: 1,
      color: colors.secondary,
      fontSize: 25,
      fontWeight: 900,
      fontStyle: 'italic',
    },
  });
};

export default SearchBar;
