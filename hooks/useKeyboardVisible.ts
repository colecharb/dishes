import keyboardVisibleAtom from '@/jotai/keyboardVisibleAtom';
import { useAtom } from 'jotai';
import { Keyboard } from 'react-native';

const useKeyboardVisible = () => {
  const [keyboardVisible, setKeyboardVisible] = useAtom(keyboardVisibleAtom);
  Keyboard.addListener('keyboardWillShow', () => setKeyboardVisible(true));
  Keyboard.addListener('keyboardWillHide', () => setKeyboardVisible(false));

  return keyboardVisible;
};

export default useKeyboardVisible;
