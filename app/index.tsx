import { Button, FlatList, Keyboard, KeyboardAvoidingView, ListRenderItem, Pressable, SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native';

import { type Recipe, RECIPES } from '@/constants/Recipes';
import RecipeListItem from '@/components/RecipeListItem';
import Layout from '@/constants/Layout';
import { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from '@/components/Themed';



export default function TabOneScreen() {
  const styles = useStyles();
  const safeAreaInsets = useSafeAreaInsets();

  const searchInputRef = useRef<TextInput>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const filteredRecipes = RECIPES.filter(
    (recipe) => [
      recipe.name,
      // ...recipe.ingredients,
      // ...recipe.method,
    ].some((value) => (
      value.toLowerCase().includes(
        searchQuery.toLowerCase().trim()
      ))
    )
  );

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

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior='height'
    >
      <StatusBar hidden />

      <FlatList<Recipe>
        inverted
        contentInset={{ bottom: safeAreaInsets.top }}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContentContainer}
        data={filteredRecipes}
        keyExtractor={(r) => r.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.divider} />

      <View style={[styles.searchBarContainer, keyboardVisible ? styles.searchBarContainerKeyboard : {}]}>
        <TextInput
          ref={searchInputRef}
          selectionColor={'white'}
          style={styles.searchBarText}
          onChangeText={(text) => setSearchQuery(text)}
          placeholder='Search...'
        />

        <Button
          title='clear'
          onPress={onPressClearSearch}
        />
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
      // padding: Layout.spacer,
      // gap: Layout.spacer,
      paddingTop: Layout.spacer,
    },
    keyboardAvoidingView: {
      flex: 1,

      // backgroundColor: 'grey',
      // borderColor: 'red',
      // borderWidth: 3,
    },
    searchBarContainer: {
      backgroundColor: 'transparent',
      marginBottom: safeAreaInsets.bottom,
      padding: Layout.spacer,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    searchBarContainerKeyboard: {
      marginBottom: 0,
    },
    searchBarText: {
      color: 'grey',
      fontSize: 25,
      fontWeight: 900,
      fontStyle: 'italic',
      // borderColor: 'grey',
      // borderWidth: 2,
      // paddingVertical: Layout.spacer / 2,
      // paddingHorizontal: Layout.spacer,
      // borderRadius: 50
    },
    searchBarClearButton: {

    },
    divider: {
      marginHorizontal: Layout.spacer,
      height: Layout.borderWidth,
      backgroundColor: 'grey'
    }
  });
};
