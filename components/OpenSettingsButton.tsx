import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { Text } from './Themed';

const OpenSettingsButton = () => {
  return (
    <Link href="/SettingsModal" asChild>
      <Pressable>
        {({ pressed }) => (
          <Text>
            <FontAwesome
              name="info-circle"
            // size={25}
            // style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          </Text>

        )}
      </Pressable>
    </Link>
  );
};

export default OpenSettingsButton();