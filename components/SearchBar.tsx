import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  ViewStyle,
} from 'react-native';
import { View } from './Themed';
import { useDishesTheme } from '@/constants/Theme';
import { useRef } from 'react';
import { FontAwesome } from '@expo/vector-icons';

type SearchBarProps = {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  onChangeText: (text: string) => void;
  buttonStyle?: StyleProp<ViewStyle>;
};

// eslint-disable-next-line react/display-name
const SearchBar = (props: SearchBarProps) => {
  const { buttonStyle, searchOpen, setSearchOpen, searchQuery, onChangeText } =
    props;

  const ref = useRef<TextInput>(null);

  const onPressClear = () => {
    onChangeText('');
    ref.current?.clear();
  };

  const { colors } = useDishesTheme();
  const styles = useStyles();

  if (searchOpen || searchQuery) {
    return (
      <View style={[buttonStyle, styles.searchBarContainer]}>
        <TextInput
          ref={ref}
          autoCorrect={false}
          autoCapitalize='none'
          selectionColor={colors.onBackground}
          style={styles.searchBarText}
          onChangeText={onChangeText}
          onBlur={() => setSearchOpen(false)}
          onFocus={() => setSearchOpen(true)}
          placeholder='Search...'
          returnKeyType='done'
        />

        {searchQuery && (
          <Pressable onPress={onPressClear}>
            <FontAwesome
              name='times'
              size={25}
              style={styles.clearIcon}
            />
          </Pressable>
        )}
      </View>
    );
  } else {
    return (
      <View style={styles.searchButtonContainer}>
        <Pressable
          onPress={() => {
            setSearchOpen(true);
            setTimeout(() => {
              ref.current?.focus();
            }, 10);
          }}
          style={buttonStyle}
        >
          <FontAwesome
            name='search'
            size={25}
            style={styles.searchIcon}
          />
        </Pressable>
      </View>
    );
  }
};

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  return StyleSheet.create({
    searchBarContainer: {
      height: 'auto',
      aspectRatio: undefined,

      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: layout.spacer,
      // borderColor: colors.secondary,
      // borderWidth: layout.borderWidth,
      borderRadius: layout.spacer * 2,
      padding: layout.spacer / 2,
      paddingHorizontal: layout.spacer,
      backgroundColor: colors.background,
    },
    searchBarText: {
      flex: 1,
      color: colors.secondary,
      fontSize: 25,
      fontWeight: 900,
      fontStyle: 'italic',
    },
    searchButtonContainer: {
      flexDirection: 'row',
    },
    searchIcon: {
      color: colors.secondary,
    },
    clearIcon: {
      color: colors.secondary,
      fontSize: 25,
    },
  });
};

export default SearchBar;
