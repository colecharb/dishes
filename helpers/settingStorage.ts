import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_INDEX_KEY = 'settings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SETTING_KEYS = ['autoTheme', 'manualDarkTheme'] as const;
type SettingKey = (typeof SETTING_KEYS)[number];

type SettingBase = {
  name: string;
  description: string;
};

type SettingSwitch = SettingBase & {
  key: SettingKey;
  uiType: 'switch';
  defaultValue: boolean;
  value?: boolean;
};

type SettingSelectString<
  Options extends readonly string[] = readonly string[],
> = SettingBase & {
  key: SettingKey;
  uiType: 'select';
  options: Options;
  defaultValue: Options[number];
  value?: Options[number];
};

type Setting = SettingSwitch | SettingSelectString;

// SETTINGS CONSTRUCTORS //

const makeSettingSwitch = (
  key: SettingKey,
  name: string,
  description: string,
  defaultValue: boolean,
): SettingSwitch => ({
  key,
  name,
  description,
  uiType: 'switch',
  defaultValue,
});

const makeSettingSelectString = <T extends string[]>(
  key: SettingKey,
  name: string,
  description: string,
  options: T,
  defaultValue: T[number] = options[0],
): SettingSelectString<T> => ({
  key,
  name,
  description,
  uiType: 'select',
  options,
  defaultValue,
});

// SETTINGS MAP //

/**
 * TODO: Settings map should enforce keys matching the key within the setting object
 * */

type SettingsMap = Record<SettingKey, Setting>;

const SETTINGS_MAP: SettingsMap = {
  autoTheme: makeSettingSwitch(
    'autoTheme',
    'Auto Theme',
    'Automatically switch between light and dark themes based on device settings.',
    true,
  ),
  manualDarkTheme: makeSettingSwitch(
    'manualDarkTheme',
    'Manual Dark Theme',
    'Manually select the dark theme.',
    false,
  ),
};

/**
 * Joins SETTINGS_INDEX_KEY with settingKey separated by "."
 */
const makeFullKey = (settingKey: SettingKey): string => {
  return [SETTINGS_INDEX_KEY, settingKey].join('.');
};

/**
 * Get a setting value from storage.
 */
const getSetting = async (
  key: SettingKey,
): Promise<(typeof SETTINGS_MAP)[SettingKey]['defaultValue']> =>
  AsyncStorage.getItem(makeFullKey(key))
    .then((value) => {
      return value ? JSON.parse(value) : false;
    })
    .catch((error) => {
      console.error(`Error retrieving ${key} setting:`, error);
      return SETTINGS_MAP[key].defaultValue;
    });

/**
 * Set the auto theme setting value.
 */
const setSetting = async (
  key: SettingKey,
  value: (typeof SETTINGS_MAP)[SettingKey]['defaultValue'],
): Promise<void> =>
  AsyncStorage.setItem(makeFullKey(key), JSON.stringify(value)).catch(
    (error) => {
      console.error(`Error setting ${key} setting:`, error);
    },
  );

const SettingStorage = {
  getSetting,
  setSetting,
};

export type { Setting, SettingSwitch, SettingSelectString };
export { SettingKey, SettingsMap, SETTING_KEYS, SETTINGS_MAP };
export default SettingStorage;
