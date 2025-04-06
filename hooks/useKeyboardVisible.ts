import { useState } from 'react';
import { Keyboard } from 'react-native';

const useKeyboardVisible = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  Keyboard.addListener('keyboardWillShow', () => setKeyboardVisible(true));
  Keyboard.addListener('keyboardWillHide', () => setKeyboardVisible(false));

  return [keyboardVisible];
};

export default useKeyboardVisible;
