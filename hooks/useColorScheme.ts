import { useColorScheme } from 'react-native';

export default () => {
  return useColorScheme() ?? 'dark';
};