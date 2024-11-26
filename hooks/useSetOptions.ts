import RootStackParamList from '@/types/RootStackParamList';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';

const useSetOptions = (options: Partial<{}>) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useEffect(
    () => navigation.setOptions(options),
    [options]
  );
};

export default useSetOptions;