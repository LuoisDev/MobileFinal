import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

interface Props {
  containerStyle?: ViewStyle;
  backgroundColor?: String;
  disable?: Boolean;
  title?: String;
  width?: Number | String;
  height?: Number;
  borderRadius?: Number;
  titleStyle?: TextStyle;
  titleColor?: String;
  onPress?: () => void;
}

Button.defaultProps = {
  backgroundColor: 'rgb(20, 170,245)',
  width: wp(75),
  height: 50,
  borderRadius: 50,
  titleColor: 'white',
};

export default function Button(props?: Props) {
  const {
    title,
    containerStyle,
    backgroundColor,
    disable,
    width,
    height,
    borderRadius,
    titleStyle,
    titleColor,
    loading,
    onPress,
    testID,
  } = props;
  const ButtonComponent = loading || disable ? View : TouchableOpacity;

  return (
    <ButtonComponent
      testID={testID}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor,
          width,
          height,
          borderRadius,
        },
        containerStyle,
      ]}>
      {!loading ? (
        <Text style={[styles.txtTitle, {color: titleColor}, titleStyle]}>
          {title}
        </Text>
      ) : (
        <View style={{flexDirection: 'row'}}>
          <ActivityIndicator size="small" color="white" />
          <Text style={[styles.txtTitle, {color: titleColor}, titleStyle]}>
            {title}
          </Text>
        </View>
      )}
    </ButtonComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 8,
  },
  txtTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
