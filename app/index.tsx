import {
  Animated,
  Dimensions,
  FlatListProps,
  Image,
  KeyboardAvoidingView,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  SectionListData,
  SectionListProps,
  StyleSheet,
} from 'react-native';

import { NEW_RECIPE_ID, type Recipe } from '@/constants/Recipes';
import RecipeCard, {
  useStyles as useRecipeCardStyles,
} from '@/components/recipe-list/RecipeCard';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';
import { Text } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import useRecipes from '@/hooks/useRecipes';
import { useDishesTheme } from '@/constants/Theme';
import useKeyboardVisible from '@/hooks/useKeyboardVisible';
import GradientOverlay from '@/components/GradientOverlay';
import SearchBar from '@/components/SearchBar';
import RecipeListItemCellRenderer, {
  MaybeFilteredRecipe,
} from '@/components/recipe-list/RecipeListItemCellRenderer';
import { useSharedValue } from 'react-native-reanimated';
import { CARD_HEIGHT, PEEK_HEIGHT } from '@/components/recipe-list/RecipeCard';
const SPLASH_ICON_SOURCE = require('../assets/images/splash-icon.png');

type SearchResultSection = {
  title: string;
  filteredBy: 'name' | 'ingredient';
};

export default function Recipes() {
  const styles = useStyles();
  const { colors } = useDishesTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const keyboardVisible = useKeyboardVisible();

  const scrollY = useSharedValue<number>(0);

  const { recipes } = useRecipes();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeText = (text: string) => {
    setSearchQuery(text);
  };

  const [searchOpen, setSearchOpen] = useState(false);

  const sortedRecipes = [...recipes].sort(
    (a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime(),
  );

  const nameFilteredRecipes = searchQuery
    ? sortedRecipes
        .filter((recipe) =>
          recipe.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
        )
        .map<MaybeFilteredRecipe>((recipe) => ({
          ...recipe,
          filteredBy: 'name',
        }))
    : [];

  const ingredientFilteredRecipes = searchQuery
    ? sortedRecipes
        .filter((recipe) =>
          recipe.ingredients.some((ingredientEntry) =>
            ingredientEntry.ingredient.includes(
              searchQuery.toLowerCase().trim(),
            ),
          ),
        )
        .map<MaybeFilteredRecipe>((recipe) => ({
          ...recipe,
          filteredBy: 'ingredient',
        }))
    : [];

  const filteredRecipes: SectionListData<
    MaybeFilteredRecipe,
    SearchResultSection
  >[] = [
    {
      title: 'Name Matches',
      filteredBy: 'name',
      data: nameFilteredRecipes,
    },
    {
      title: 'Ingredient Matches',
      filteredBy: 'ingredient',
      data: ingredientFilteredRecipes,
    },
  ];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // console.log('onScroll', event.nativeEvent.contentOffset.y);
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  const renderItem: ListRenderItem<Recipe> = ({ item: recipe, index }) => {
    return (
      <RecipeCard
        recipe={recipe}
        index={index}
      />
    );
  };

  const renderSectionHeader: SectionListProps<
    MaybeFilteredRecipe,
    SearchResultSection
  >['renderSectionHeader'] = ({ section }) =>
    section.data[0] ? (
      <View style={styles.sectionHeaderContainer}>
        <FontAwesome
          name='arrow-up'
          color='gray'
          size={15}
        />
        <Text style={styles.sectionHeaderText}>{section.title}</Text>
      </View>
    ) : null;

  const ListFooterComponent = () => (
    <View style={styles.renderSectionFooter}>
      <Image
        source={SPLASH_ICON_SOURCE}
        style={styles.dishesIcon}
      />
    </View>
  );

  /** Common props for both FlatList and SectionList */
  const commonListProps: Omit<FlatListProps<MaybeFilteredRecipe>, 'data'> &
    Omit<
      SectionListProps<MaybeFilteredRecipe, SearchResultSection>,
      'sections'
    > = {
    // List configuration
    inverted: true,
    snapToInterval: PEEK_HEIGHT,
    snapToAlignment: 'start',
    decelerationRate: 'fast',
    showsVerticalScrollIndicator: false,
    keyboardShouldPersistTaps: 'handled',
    // Data and rendering
    keyExtractor: (r: Recipe) => r.id,
    renderItem: renderItem,
    CellRendererComponent: (props) => {
      return (
        <RecipeListItemCellRenderer
          {...props}
          scrollY={scrollY}
        />
      );
    },
    // Styling
    style: styles.list,
    contentContainerStyle: styles.listContentContainer,
    contentInset: {
      bottom: safeAreaInsets.top, // bottom becomes top because inverted={true}
    },
    // Components
    ListFooterComponent: ListFooterComponent,
    // Events
    onScroll: onScroll,
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior='height'
      >
        <GradientOverlay
          colors={[
            colors.background,
            colors.background,
            colors.background + '00', // background + transparency
            colors.background + '00',
            colors.background,
            colors.background,
          ]}
          locations={[0, 0.07, 0.3, 0.7, 0.97, 1]}
        />

        {!keyboardVisible && (
          <View
            // pointerEvents='box-none'
            style={styles.settingsButtonContainer}
          >
            <Link
              asChild
              href={'/settings'}
            >
              <FontAwesome
                style={styles.settingsButton}
                name='gears'
                size={25}
              />
            </Link>
          </View>
        )}

        {searchQuery ? (
          <Animated.SectionList<MaybeFilteredRecipe, SearchResultSection>
            sections={filteredRecipes}
            renderSectionHeader={renderSectionHeader}
            stickySectionHeadersEnabled={false}
            renderSectionFooter={() => null}
            {...commonListProps}
          />
        ) : (
          <Animated.FlatList<Recipe>
            data={sortedRecipes}
            {...commonListProps}
          />
        )}

        <View
          style={[
            styles.bottomControlsContainer,
            keyboardVisible ? styles.searchBarContainerKeyboard : {},
          ]}
        >
          {!searchOpen && (
            <Pressable style={styles.bottomButton}>
              <FontAwesome
                name='sort'
                size={25}
                color={colors.secondary}
              />
            </Pressable>
          )}

          <SearchBar
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            searchQuery={searchQuery}
            onChangeText={onChangeText}
          />

          {!searchOpen && (
            <Link
              href={{
                pathname: '/recipe/[recipeId]/edit',
                params: { recipeId: NEW_RECIPE_ID },
              }}
              asChild
            >
              <Pressable style={styles.bottomButton}>
                <FontAwesome
                  name='plus'
                  size={25}
                  color={colors.secondary}
                />
              </Pressable>
            </Link>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const useStyles = () => {
  const recipeCardStyles = useRecipeCardStyles();
  const { layout, colors } = useDishesTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const keyboardVisible = useKeyboardVisible();
  const { height: screenHeight } = Dimensions.get('screen');

  const footerHeight = screenHeight / 2;
  const bottomControlsContainerHeight = layout.spacer * 4;

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    settingsButtonContainer: {
      marginTop: safeAreaInsets.top,
      zIndex: 10,
    },
    settingsButton: {
      position: 'absolute',
      color: colors.onBackground,
      margin: layout.spacer,
      flexDirection: 'row',
    },
    list: {
      // flex: 1,
    },
    listContentContainer: {
      padding: layout.spacer * 2,
      paddingTop:
        // bottomControlsContainerHeight +
        CARD_HEIGHT +
        layout.spacer +
        (keyboardVisible ? 0 : safeAreaInsets.bottom + layout.spacer),
    },
    keyboardAvoidingView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    sectionHeaderContainer: recipeCardStyles.container,
    // {
    //   height: CARD_HEIGHT,
    //   paddingVertical: layout.spacer / 2,
    //   paddingHorizontal: layout.spacer,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   gap: layout.spacer / 2,
    // },
    sectionHeaderText: {
      color: 'gray',
      fontSize: 20,
      fontWeight: '400',
      fontVariant: ['small-caps'],
    },
    bottomControlsContainer: {
      zIndex: 10,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: bottomControlsContainerHeight,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: safeAreaInsets.bottom,
      paddingBottom: layout.spacer,
      paddingHorizontal: keyboardVisible
        ? layout.spacer
        : safeAreaInsets.bottom,
      gap: layout.spacer,
      // borderWidth: layout.borderWidth,
      // borderColor: colors.secondary,
    },
    searchBarContainerKeyboard: {
      marginBottom: 0,
    },
    divider: {
      marginHorizontal: layout.spacer,
      height: layout.borderWidth,
      backgroundColor: 'grey',
    },
    renderSectionFooter: {
      height: footerHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dishesIcon: {
      height: 75,
      aspectRatio: 1,
      opacity: 0.2,
    },
    bottomButton: {
      borderColor: colors.secondary,
      borderWidth: layout.borderWidth,
      borderRadius: '100%',
      height: layout.spacer * 3,
      aspectRatio: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
    },
  });
};
