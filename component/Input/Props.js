import React from 'react';
import {TextInputProps, ViewStyle} from 'react-native';
export interface Props extends TextInputProps {
  leftImage?: String | Number;
  width?: String | Number;
  height?: Number;
  borderRadius?: Number;
  backgroundColor?: String;
  containerStyle?: ViewStyle;
  refInput?: React.Ref;
}
