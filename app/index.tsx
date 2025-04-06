import {
  Button,
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ListRenderItem,
  Pressable,
  SectionList,
  SectionListData,
  SectionListProps,
  StyleSheet,
  TextInput,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { NEW_RECIPE_ID, type Recipe } from '@/constants/Recipes';
import RecipeListItem from '@/components/RecipeListItem';
import { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';
import { Text } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import useRecipes from '@/hooks/useRecipes';
import { useDishesTheme } from '@/constants/Theme';
import useKeyboardVisible from '@/hooks/useKeyboardVisible';

const SPLASH_ICON_SOURCE = require('../assets/images/splash-icon.png');

type SearchResultSection = {
  title: string;
};

export default function Recipes() {
  const styles = useStyles();
  const { colors } = useDishesTheme();
  const safeAreaInsets = useSafeAreaInsets();

  const searchInputRef = useRef<TextInput>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const keyboardVisible = useKeyboardVisible();

  const { recipes } = useRecipes();

  const titleFilteredRecipes = searchQuery
    ? recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase().trim()),
      )
    : [];

  const ingredientFilteredRecipes = searchQuery
    ? recipes.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
          ingredient.includes(searchQuery.toLowerCase().trim()),
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

  const onPressClearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.clear();
    Keyboard.dismiss();
  };

  const renderItem: ListRenderItem<Recipe> = ({ item: recipe }) => (
    <View style={styles.renderItem}>
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
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior='height'
      >
        <StatusBar hidden />

        <LinearGradient
          colors={[
            colors.background,
            colors.background,
            colors.background + '00', // background + transparency
            colors.background + '00',
          ]}
          locations={[0, 0.04, 0.25, 1]}
          pointerEvents='none'
          style={styles.gradient}
        />

        {!keyboardVisible && (
          <View
            pointerEvents='auto'
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
            data={recipes}
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
          <View style={[styles.searchBarContainer]}>
            <TextInput
              autoCapitalize='none'
              ref={searchInputRef}
              selectionColor={'white'}
              style={styles.searchBarText}
              onChangeText={(text) => setSearchQuery(text)}
              placeholder='Search...'
              returnKeyType='done'
            />

            {searchQuery && (
              <Pressable onPress={onPressClearSearch}>
                <Text>clear</Text>
              </Pressable>
            )}
          </View>

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
    gradient: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      flex: 1,
      zIndex: 10,
    },
    settingsButtonContainer: {
      zIndex: 10,
    },
    settingsButton: {
      position: 'absolute',
      color: colors.onBackground,
      margin: layout.spacer * 1.5,
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
      // textAlign: 'center',
      color: 'gray',
      fontSize: 20,
      fontWeight: '400',
      fontVariant: ['small-caps'],
    },
    renderItem: {
      // flexDirection: 'row',
      // justifyContent: 'space-between',
    },
    bottomControlsContainer: {
      marginBottom: safeAreaInsets.bottom,
      padding: layout.spacer,
      gap: layout.spacer,
    },
    searchBarContainer: {
      // backgroundColor: 'transparent',

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
    searchBarClearButton: {},
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
