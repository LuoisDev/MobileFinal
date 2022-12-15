import React from 'react';
import {StatusBar, View, Platform, StyleSheet} from 'react-native';
interface Props extends ImageProps {
  containerStyle?: ImageStyle;
}

BarStatus.defaultProps = {
  height: Platform.OS === 'ios' ? 0 : 20,
};

export default function BarStatus(props?: Props) {
  const {backgroundColor, height} = props;
  return (
    <View style={{backgroundColor, height}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}
