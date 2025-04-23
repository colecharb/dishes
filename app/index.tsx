import {
  Button,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ListRenderItem,
  SectionList,
  SectionListData,
  SectionListProps,
  StyleSheet,
} from 'react-native';

import { NEW_RECIPE_ID, type Recipe } from '@/constants/Recipes';
import RecipeListItem from '@/components/RecipeListItem';
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

const SPLASH_ICON_SOURCE = require('../assets/images/splash-icon.png');

type SearchResultSection = {
  title: string;
};

export default function Recipes() {
  const styles = useStyles();
  const { colors } = useDishesTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const keyboardVisible = useKeyboardVisible();

  const { recipes } = useRecipes();
  const [searchQuery, setSearchQuery] = useState('');

  const sortedRecipes = [...recipes].sort(
    (a, b) => b.modifiedAt.getTime() - a.modifiedAt.getTime(),
  );

  const titleFilteredRecipes = searchQuery
    ? sortedRecipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      )
    : [];

  const ingredientFilteredRecipes = searchQuery
    ? sortedRecipes.filter((recipe) =>
        recipe.ingredients.some((ingredientEntry) =>
          ingredientEntry.ingredient.includes(searchQuery.toLowerCase().trim()),
        ),
      )
    : [];

  const filteredRecipes: SectionListData<Recipe, SearchResultSection>[] = [
    {
      title: 'Name Matches',
      data: titleFilteredRecipes,
    },
    {
      title: 'Ingredient Matches',
      data: ingredientFilteredRecipes,
    },
  ];

  const renderItem: ListRenderItem<Recipe> = ({ item: recipe }) => (
    <View>
      <RecipeListItem recipe={recipe} />
    </View>
  );

  const renderSectionHeader: SectionListProps<
    Recipe,
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

  const ListFooterComponent: SectionListProps<
    Recipe,
    SearchResultSection
  >['renderSectionFooter'] = () => (
    <View style={styles.renderSectionFooter}>
      <Image
        source={SPLASH_ICON_SOURCE}
        style={styles.dishesIcon}
      />
    </View>
  );

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
          ]}
          locations={[0, 0.07, 0.3, 1]}
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
          <SectionList<Recipe, SearchResultSection>
            inverted
            // bottom becomes top because inverted={true}
            contentInset={{ bottom: safeAreaInsets.top }}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContentContainer}
            // data={filteredRecipes}
            sections={filteredRecipes}
            keyExtractor={(r) => r.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            stickySectionHeadersEnabled={false}
            ListFooterComponent={ListFooterComponent}
          />
        ) : (
          <FlatList<Recipe>
            inverted
            // bottom becomes top because inverted={true}
            contentInset={{ bottom: safeAreaInsets.top }}
            style={styles.flatList}
            contentContainerStyle={styles.flatListContentContainer}
            data={sortedRecipes}
            keyExtractor={(r) => r.id}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'
            ListFooterComponent={ListFooterComponent}
          />
        )}

        <View style={styles.divider} />

        <View
          style={[
            styles.bottomControlsContainer,
            keyboardVisible ? styles.searchBarContainerKeyboard : {},
          ]}
        >
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {!keyboardVisible && (
            <Link
              href={{
                pathname: '/recipe/[recipeId]/edit',
                params: { recipeId: NEW_RECIPE_ID },
              }}
              asChild
            >
              <Button
                color={colors.primary}
                title='New'
              />
            </Link>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { height: screenHeight } = Dimensions.get('screen');

  const footerHeight = screenHeight / 3;

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
    flatList: {
      // flex: 1,
    },
    flatListContentContainer: {
      paddingTop: layout.spacer,
    },
    keyboardAvoidingView: {
      flex: 1,
      backgroundColor: colors.background,
    },
    sectionHeaderContainer: {
      paddingVertical: layout.spacer / 2,
      paddingHorizontal: layout.spacer,
      flexDirection: 'row',
      alignItems: 'center',
      gap: layout.spacer / 2,
    },
    sectionHeaderText: {
      color: 'gray',
      fontSize: 20,
      fontWeight: '400',
      fontVariant: ['small-caps'],
    },
    bottomControlsContainer: {
      marginBottom: safeAreaInsets.bottom,
      padding: layout.spacer,
      gap: layout.spacer,
    },
    searchBarContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    searchBarContainerKeyboard: {
      marginBottom: 0,
    },
    searchBarText: {
      flex: 1,
      color: 'grey',
      fontSize: 25,
      fontWeight: 900,
      fontStyle: 'italic',
    },
    bottomButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
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
  });
};
