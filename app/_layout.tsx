import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
// import { useThemeColor } from '@/components/Themed';
import { PaperProvider } from 'react-native-paper';
import { dishesTheme, lightTheme, useDishesTheme } from '@/constants/Theme';
import useColorScheme from '@/hooks/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  const colorScheme = useColorScheme();

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = colorScheme === 'dark' ? dishesTheme : lightTheme;

  return (
    <PaperProvider theme={theme}>
      <RootLayoutNav />
    </PaperProvider>
  );
}

function RootLayoutNav() {
  const { colors } = useDishesTheme();

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.primary,
        headerLargeTitleStyle: { fontWeight: '900', color: colors.onBackground },
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
          title: 'Recipes',
        }}
      />
      <Stack.Screen name='recipe' />
      <Stack.Screen name='new-recipe' />
      <Stack.Screen
        name='settings'
        options={{
          presentation: 'modal',
          title: 'Settings',
        }}
      />
    </Stack>
  );
}
