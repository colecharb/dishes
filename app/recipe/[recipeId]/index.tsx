import { Image, ScrollView, StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import { Text } from 'react-native-paper';
import RootStackParamList from '@/types/RootStackParamList';
import { Link, useLocalSearchParams } from 'expo-router';
import useSetOptions from '@/hooks/useSetOptions';
import useRecipe from '@/hooks/useRecipe';
import { useDishesTheme } from '@/constants/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import GradientOverlay from '@/components/GradientOverlay';
import Ingredients from '@/components/recipe/Ingredients';
import Method from '@/components/recipe/Method';
import { useState } from 'react';
import formatDate from '@/helpers/formatDate.helper';

const SPLASH_ICON = require('@/assets/images/splash-icon.png');

type Params = RootStackParamList['recipe'];

export default function RecipeScreen() {
  const { layout, colors } = useDishesTheme();
  const { recipeId } = useLocalSearchParams<Params>();
  const [recipe] = useRecipe(recipeId);

  const [showDates, setShowDates] = useState(false);

  const EditButton = () => (
    <Link
      asChild
      href={{
        pathname: '/recipe/[recipeId]/edit',
        params: { recipeId },
      }}
    >
      <FontAwesome
        size={layout.spacer * 1.5}
        name='edit'
        color={colors.primary}
      />
    </Link>
  );

  useSetOptions({
    title: recipe?.name,
    headerRight: EditButton,
  });

  const styles = useStyles();

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found.</Text>
      </View>
    );
  }

  const { ingredients, method, createdAt, modifiedAt } = recipe;

  return (
    <View style={styles.container}>
      <GradientOverlay
        colors={[
          colors.background,
          colors.background + '00',
          colors.background + '00',
          colors.background,
        ]}
        locations={[0, 0.05, 0.8, 1]}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={({ nativeEvent }) => {
          setShowDates(nativeEvent.contentOffset.y < 0);
        }}
        // scrollEventThrottle={16}
      >
        {showDates && (
          <View style={styles.dateContainer}>
            <View style={[styles.dateRow, styles.createdRow]}>
              <View style={styles.dateTextContainer}>
                <Text style={[styles.dateText, styles.dateLabel]}>
                  Created:
                </Text>
              </View>
              <View style={[styles.dateTextContainer, { flexShrink: 2 }]}>
                <Text style={[styles.dateText, styles.dateValue]}>
                  {formatDate(createdAt)}
                </Text>
              </View>
            </View>
            <View style={[styles.dateRow, styles.dateBox]}>
              <View style={styles.dateTextContainer}>
                <Text style={[styles.dateText, styles.dateLabel]}>
                  Modified:
                </Text>
              </View>
              <View style={[styles.dateTextContainer, { flexShrink: 2 }]}>
                <Text style={[styles.dateText, styles.dateValue]}>
                  {formatDate(modifiedAt)}
                </Text>
              </View>
            </View>
          </View>
        )}

        <Ingredients ingredients={ingredients} />

        <Method method={method} />

        <Image
          source={SPLASH_ICON}
          style={styles.dishesImage}
        />
      </ScrollView>
    </View>
  );
}

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  const safeAreaInsets = useSafeAreaInsets();

  return StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollView: {
      backgroundColor: colors.background,
      flex: 1,
    },
    scrollViewContent: {
      backgroundColor: colors.background,
      paddingHorizontal: layout.spacer,
      paddingTop: layout.spacer * 2,
      paddingBottom: safeAreaInsets.bottom * 2,
      gap: layout.spacer * 2,
    },
    dateContainer: {
      position: 'absolute',
      top: -64,
      alignSelf: 'center',
      gap: layout.spacer / 2,
    },
    dateBox: {
      backgroundColor: colors.background,
      opacity: 1,
      padding: layout.spacer / 2,
      borderRadius: layout.spacer / 2,
      borderWidth: layout.borderWidth,
      borderColor: colors.secondary,
      gap: layout.spacer / 2,
    },
    dateRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: layout.spacer / 2,
    },
    createdRow: {
      opacity: 0.75,
    },
    dateTextContainer: {
      flexShrink: 1,
    },
    dateText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.secondary,
    },
    dateLabel: {
      textAlign: 'right',
      flexShrink: 1,
    },
    dateValue: {
      // flex: 2,
      textAlign: 'left',
    },
    dishesImage: {
      aspectRatio: 1,
      height: 50,
      alignSelf: 'center',
      margin: layout.spacer,
    },
  });
};
