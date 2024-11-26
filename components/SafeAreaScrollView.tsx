import { ScrollView, ScrollViewProps, StyleSheet } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeAreaScrollView = (
  props: ScrollViewProps
) => {
  const { children, ...spreadProps } = props;

  // Hooks //
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <ScrollView
      contentInset={safeAreaInsets}
      children={children}
      {...spreadProps}
    />
  );
};

export default SafeAreaScrollView;