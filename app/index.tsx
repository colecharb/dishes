import { Button, FlatList, Keyboard, KeyboardAvoidingView, ListRenderItem, Pressable, SafeAreaView, ScrollView, SectionList, SectionListData, SectionListProps, StyleSheet, TextInput } from 'react-native';

import { type Recipe, RECIPES } from '@/constants/Recipes';
import RecipeListItem from '@/components/RecipeListItem';
import Layout from '@/constants/Layout';
import { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, View } from '@/components/Themed';
import { FontAwesome, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';
import { Link } from 'expo-router';

type SearchResultSection = {
  title: string;
}

export default function TabOneScreen() {
  const styles = useStyles();
  const safeAreaInsets = useSafeAreaInsets();

  const searchInputRef = useRef<TextInput>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const titleFilteredRecipes = (
    searchQuery
      ? RECIPES.filter(
        (recipe) => recipe.name.toLowerCase().includes(
          searchQuery.toLowerCase().trim()
        )
      )
      : []
  );

  const ingredientFilteredRecipes = (
    searchQuery
      ? RECIPES.filter(
        (recipe) => (
          recipe.ingredients.some(
            (ingredient) => ingredient.includes(searchQuery.toLowerCase().trim())
          )
        )
      )
      : []
  );

  const filteredRecipes: SectionListData<Recipe, SearchResultSection>[] = [
    {
      title: 'Name Matches',
      data: titleFilteredRecipes,
    },
    {
      title: 'Ingredient Matches',
      data: ingredientFilteredRecipes,
    }
  ]

  Keyboard.addListener('keyboardWillShow', () => setKeyboardVisible(true));
  Keyboard.addListener('keyboardWillHide', () => setKeyboardVisible(false));

  const onPressClearSearch = () => {
    setSearchQuery('');
    searchInputRef.current?.clear();
    Keyboard.dismiss();
  }

  const renderItem: ListRenderItem<Recipe> = (
    { item: recipe }
  ) => (
    <RecipeListItem recipe={recipe} />
  );

  const renderSectionHeader: SectionListProps<Recipe, SearchResultSection>['renderSectionHeader'] = (
    ({ section }) => section.data[0]
      ? (
        <View style={styles.sectionHeaderContainer}>
          <FontAwesome name='arrow-up' color='gray' size={15} />
          <Text style={styles.sectionHeaderText}>
            {section.title}
          </Text>
        </View>
      )
      : null
  );

  const renderSectionFooter: SectionListProps<Recipe, SearchResultSection>['renderSectionHeader'] = (
    () => <View style={{ height: Layout.spacer }} />
  )

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior='height'
    >
      <StatusBar hidden />

      {
        searchQuery
          ? (
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
            />
          )
          : (
            <FlatList<Recipe>
              inverted
              // bottom becomes top because inverted={true}
              contentInset={{ bottom: safeAreaInsets.top }}
              style={styles.flatList}
              contentContainerStyle={styles.flatListContentContainer}
              data={RECIPES}
              keyExtractor={(r) => r.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps='handled'
            />
          )
      }


      <View style={styles.divider} />

      <View style={[
        styles.bottomControlsContainer,
        keyboardVisible ? styles.searchBarContainerKeyboard : {},
      ]}>

        <View
          style={[styles.searchBarContainer]}
        >
          <TextInput
            autoCapitalize='none'
            ref={searchInputRef}
            selectionColor={'white'}
            style={styles.searchBarText}
            onChangeText={(text) => setSearchQuery(text)}
            placeholder='Search...'
          />

          {
            searchQuery && (
              <Pressable
                onPress={onPressClearSearch}
              >
                <Text>
                  clear
                </Text>
              </Pressable>
            )
          }
        </View>

        {
          !keyboardVisible
          && (<Link href='/new-recipe' asChild >
            <Button title='New' />
          </Link>)
        }

      </View>

    </KeyboardAvoidingView>
  );
}

const useStyles = () => {
  const safeAreaInsets = useSafeAreaInsets();

  return StyleSheet.create({
    flatList: {
      // flex: 1,
    },
    flatListContentContainer: {
      paddingTop: Layout.spacer,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    sectionHeaderContainer: {
      paddingVertical: Layout.spacer / 2,
      paddingHorizontal: Layout.spacer,
      flexDirection: 'row',
      alignItems: 'center',
      gap: Layout.spacer / 2,
    },
    sectionHeaderText: {
      // textAlign: 'center',
      color: 'gray',
      fontSize: 20,
      fontWeight: '400',
      fontVariant: [
        'small-caps'
      ],
    },
    bottomControlsContainer: {
      marginBottom: safeAreaInsets.bottom,
      padding: Layout.spacer,
      gap: Layout.spacer,
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
    searchBarClearButton: {

    },
    bottomButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    divider: {
      marginHorizontal: Layout.spacer,
      height: Layout.borderWidth,
      backgroundColor: 'grey'
    }
  });
};
