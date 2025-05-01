import {
  SettingSelectString,
  SettingSwitch,
  Setting,
} from '@/helpers/settingStorage';
import useSettings from '@/hooks/useSettings';
import { useState, useEffect } from 'react';
import { View } from '@/components/Themed';
import { Switch, Menu, Button, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type SwitchSettingProps = {
  setting: SettingSwitch;
  updateSetting: ReturnType<typeof useSettings>['updateSetting'];
};

function SwitchSetting({ setting, updateSetting }: SwitchSettingProps) {
  const { name, key, value, defaultValue } = setting;
  const [localValue, setLocalValue] = useState(value ?? defaultValue);
  const styles = useStyles();

  // Update local value when the setting value changes
  useEffect(() => {
    setLocalValue(value ?? defaultValue);
  }, [value, defaultValue]);

  const handleValueChange = (newValue: boolean) => {
    // Update local state immediately for smooth animation
    setLocalValue(newValue);
    // Update the actual setting asynchronously
    updateSetting(key, newValue);
  };

  return (
    <View style={styles.settingRow}>
      <Text style={styles.settingName}>{name}</Text>
      {/* <Text>{description}</Text> */}
      <Switch
        value={localValue}
        onValueChange={handleValueChange}
      />
    </View>
  );
}

type SelectStringSettingProps = {
  setting: SettingSelectString;
  updateSetting: ReturnType<typeof useSettings>['updateSetting'];
};

function SelectStringSetting({
  setting,
  updateSetting,
}: SelectStringSettingProps) {
  const { name, key, options } = setting;
  const [menuVisible, setMenuVisible] = useState(false);
  const styles = useStyles();

  return (
    <View style={styles.settingRow}>
      <Text>{name}</Text>
      {/* <Text>{description}</Text> */}
      <Menu
        visible={menuVisible}
        anchor={<Button onPress={() => setMenuVisible(true)}>Show menu</Button>}
      >
        {options.map((option) => (
          <Menu.Item
            key={option}
            onPress={() => updateSetting(key, option)}
            title={option}
          />
        ))}
      </Menu>
    </View>
  );
}

type SettingProps = {
  setting: Setting;
  updateSetting: ReturnType<typeof useSettings>['updateSetting'];
};

function SettingComponent({ setting, updateSetting }: SettingProps) {
  if (setting.uiType === 'switch') {
    return (
      <SwitchSetting
        setting={setting}
        updateSetting={updateSetting}
      />
    );
  }
  return (
    <SelectStringSetting
      setting={setting}
      updateSetting={updateSetting}
    />
  );
}

const useStyles = () => {
  return StyleSheet.create({
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    settingName: {
      fontSize: 16,
    },
  });
};

export default SettingComponent;
