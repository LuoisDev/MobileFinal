import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KeyBoardScroll = ({children, ...otherProps}) => (
  <KeyboardAwareScrollView
    extraScrollHeight={20}
    keyboardShouldPersistTaps="handled"
    contentContainerStyle={{flexGrow: 1}}
    enableResetScrollToCoords
    enableOnAndroid
    scrollEnabled
    showsVerticalScrollIndicator={false}
    alwaysBounceVertical={false}
    behavior="height"
    {...otherProps}>
    {children}
  </KeyboardAwareScrollView>
);

export default KeyBoardScroll;
