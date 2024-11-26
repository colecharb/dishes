import { FlatList, FlatListProps, ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaFlatList = <T,>(props: FlatListProps<T>) => {
  const { style, children, ...spreadProps } = props;

  // Hooks //
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <FlatList
      contentInset={safeAreaInsets}
      children={children}
      {...spreadProps}
    />
  );
};

export default SafeAreaFlatList;