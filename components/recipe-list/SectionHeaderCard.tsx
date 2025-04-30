import { SectionListData } from 'react-native';
import { View } from '../Themed';
import { FontAwesome } from '@expo/vector-icons';
import {
  MaybeFilteredRecipe,
  SearchResultSection,
} from './RecipeListItemCellRenderer';
import { useStyles as useRecipeCardStyles } from './RecipeCard';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useDishesTheme } from '@/constants/Theme';

const SectionHeaderCard = ({
  section,
}: {
  section: SectionListData<MaybeFilteredRecipe, SearchResultSection>;
}) => {
  const styles = useStyles();
  return section.data[0] ? (
    <View style={styles.container}>
      <View style={styles.tab}>
        <View style={styles.textContainer}>
          <FontAwesome
            name='arrow-up'
            color='gray'
            size={15}
          />
          <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
      </View>
      <View style={styles.folderBody} />
    </View>
  ) : null;
};

const useStyles = () => {
  const { layout, colors } = useDishesTheme();
  const recipeCardStyles = useRecipeCardStyles();
  return StyleSheet.create({
    container: {
      ...recipeCardStyles.container,
      backgroundColor: 'transparent',
      padding: 0,
      paddingTop: 0,
    },
    folderBody: {
      zIndex: 0,
      flex: 1,
      marginTop: layout.spacer,
      borderRadius: layout.spacer / 2,
      backgroundColor: colors.background,
    },
    tab: {
      zIndex: 1,
      position: 'absolute',
      top: 0,
      right: 0,
      paddingTop: layout.spacer / 2,
      paddingHorizontal: layout.spacer,
      borderTopLeftRadius: layout.spacer / 2,
      borderTopRightRadius: layout.spacer / 2,
      // borderWidth: layout.borderWidth,
      // borderColor: 'red',
      backgroundColor: colors.background,
    },
    textContainer: {
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
  });
};

export default SectionHeaderCard;
