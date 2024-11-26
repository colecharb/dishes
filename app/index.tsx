import { FlatList, KeyboardAvoidingView, ListRenderItem, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import LongText from '@/components/LongText';
import SafeAreaFlatList from '@/components/SafeAreaFlatList';
import { Recipe, RECIPES } from '@/constants/Recipes';
import RecipeListItem from '@/components/RecipeListItem';
import RecipeRenderItem from '@/components/RecipeListItem';
import Layout from '@/constants/Layout';
import SearchBar from '@/components/SearchBar';
import { useState } from 'react';



export default function TabOneScreen() {
  const styles = useStyles();

  const [searchQuery, setSearchQuery] = useState('');

  const renderItem: ListRenderItem<Recipe> = (
    { item: recipe }
  ) => (
    <RecipeListItem recipe={recipe} />
  );

  const ListHeaderComponent = () => (
    <SearchBar
      onChangeText={(text) => setSearchQuery(text.toLowerCase().trim())}
    />
  );

  return (
    <KeyboardAvoidingView
      behavior='height'
    >
      <SafeAreaFlatList<Recipe>
        inverted
        keyExtractor={(r) => r.id}
        style={styles.flatList}
        contentContainerStyle={styles.flatListContentContainer}
        data={RECIPES}
        renderItem={renderItem}
      />
    </KeyboardAvoidingView>
  );
}

const useStyles = () => {
  return StyleSheet.create({
    flatList: {
      // flex: 1,
    },
    flatListContentContainer: {
      padding: Layout.spacer
    }
    // title: {
    //   fontSize: 20,
    //   fontWeight: 'bold',
    // },
    // separator: {
    //   marginVertical: 30,
    //   height: 1,
    //   width: '80%',
    // },
  });
};
