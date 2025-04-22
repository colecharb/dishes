import keyboardVisibleAtom from '@/jotai/keyboardVisibleAtom';
import { useAtom } from 'jotai';
import { Keyboard } from 'react-native';
import { useEffect } from 'react';

const useKeyboardVisible = () => {
  const [keyboardVisible, setKeyboardVisible] = useAtom(keyboardVisibleAtom);

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardWillShow', () =>
      setKeyboardVisible(true),
    );
    const hideListener = Keyboard.addListener('keyboardWillHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, [setKeyboardVisible]);

  return keyboardVisible;
};

export default useKeyboardVisible;
