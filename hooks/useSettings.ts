import { useAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import settingsAtom from '@/jotai/settingsAtom';
import SettingStorage from '@/helpers/settingStorage';
import {
  SETTING_KEYS,
  SettingKey,
  SettingsMap,
  Setting,
} from '@/helpers/settingStorage';

const useSettings = () => {
  const [settings, setSettings] = useAtom(settingsAtom);

  const fetchSettings = useCallback(async () => {
    const settingsMap = { ...settings };
    for (const key of SETTING_KEYS) {
      const value = await SettingStorage.getSetting(key);
      const setting = settingsMap[key];
      settingsMap[key] = {
        ...setting,
        value,
      } as Setting;
    }
    setSettings(settingsMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSettings]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSetting = async (
    key: SettingKey,
    value: SettingsMap[SettingKey]['defaultValue'],
  ) => {
    await SettingStorage.setSetting(key, value);
    fetchSettings();
  };

  return {
    settings,
    updateSetting,
    reloadSettings: fetchSettings,
  };
};

export default useSettings;
