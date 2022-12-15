import React, {useState, useEffect, useRef} from 'react';
import {
  TextInputProps,
  TouchableOpacity,
  TextInput,
  Image,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {imgs} from '../../utlis';

interface Props extends TextInputProps {
  leftImage?: String | Number;
  width?: String | Number;
  height?: Number;
  borderRadius?: Number;
  backgroundColor?: String;
  containerStyle?: ViewStyle;
  refInput?: React.Ref;
  value?: String;
  onChangeText?: Function;
  placeholderTextColor?: String;
  tintColor?: String;
}

InputPassword.defaultProps = {
  width: wp(80),
  height: 50,
  borderRadius: 8,
  backgroundColor: 'rgb(227, 230, 229)',
  leftImage: imgs.lock,
  placeholderTextColor: 'grey',
  tintColor: 'black',
};

export default function InputPassword(props?: Props) {
  const {
    leftImage,
    width,
    height,
    borderRadius,
    backgroundColor,
    containerStyle,
    refInput,
    testID,
    value,
    onChangeText,
    placeholderTextColor,
    tintColor,
    ...otherProps
  } = props;
  const [showPass, setShowHidePass] = useState(false);
  const [text, setText] = useState(value || '');

  const onShowHidePass = () => {
    setShowHidePass(!showPass);
  };
  const [isFocus, setIsFocus] = useState(false);
  const onFocus = () => {
    setIsFocus(true);
  };
  const onChangeTextInput = input => {
    onChangeText && onChangeText(input);

    // setIsFocus(true);
    setText(input);
  };
  const onBlur = () => {
    setIsFocus(false);
  };
  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor,
        },
        containerStyle,
      ]}>
      {leftImage && (
        <Image
          source={leftImage}
          style={[styles.image, {tintColor}]}
          resizeMode="contain"
        />
      )}
      <TextInput
        testID={testID}
        ref={refInput}
        style={styles.textInput}
        selectionColor="black"
        placeholderTextColor={placeholderTextColor}
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={!showPass}
        clearButtonMode="never"
        textContentType="oneTimeCode"
        onBlur={onBlur}
        onFocus={onFocus}
        onChangeText={txtValue => onChangeTextInput(txtValue)}
        value={text}
        {...otherProps}
      />
      {text !== '' && (
        <TouchableOpacity
          onPress={onShowHidePass}
          style={styles.btnShowHidePass}>
          <Image
            source={showPass ? imgs.showpassword : imgs.hidepassword}
            style={[styles.showHidePassword, {tintColor}]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 24,
    height: 24,
  },
  textInput: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 16,
    color: 'black',
  },
  btnShowHidePass: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  showHidePassword: {
    width: 24,
    height: 24,
  },
});
