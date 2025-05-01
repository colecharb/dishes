import { SETTINGS_MAP, type SettingsMap } from '@/helpers/settingStorage';
import { atom } from 'jotai';

export default atom<SettingsMap>(SETTINGS_MAP);
