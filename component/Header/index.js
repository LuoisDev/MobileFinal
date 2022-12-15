import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { imgs } from '../../utlis';

HeaderCustom.defaultProps = {
  width: wp(100),
  height: 60,
  button: false,
  fontSize: 20,
  rightImage: imgs.add,
  backgroundColor: Colors.white,
  textPress: false,
  size: 32,
};

export default function HeaderCustom(props?: Props) {
  const {
    leftImage,
    width,
    height,
    backgroundColor,
    containerStyle,
    title,
    goBack,
    rightButton,
    onRight,
    fontSize,
    rightImage,
    textPress,
    size,
    shadow,
    ...otherProps
  } = props;

  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          width,
          height,
          // backgroundColor,
          marginTop: insets.top,
        },
        containerStyle,
      ]}>
      <View style={styles.viewRow}>
        <TouchableOpacity onPress={goBack} style={styles.button}>
          {/* <Image source={leftImage} style={styles.image} resizeMode="contain" /> */}
          <Image
            source={imgs.returnIcon}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View style={styles.viewMiddle}>
          <Text
            style={[styles.title, {fontSize: wp(100) < 400 ? 18 : 24}]}
            {...otherProps}>
            {title}
          </Text>
        </View>
        {rightButton ? (
          <TouchableOpacity style={styles.right} onPress={onRight}>
            {textPress ? (
              <Text style={styles.txtBt}>Xong</Text>
            ) : (
              <Image source={rightImage} style={styles.img} />
            )}
          </TouchableOpacity>
        ) : (
          <View style={{width: '15%'}} />
        )}
      </View>
      {shadow ? (
        <LinearGradient
          style={[styles.gradient, containerStyle]}
          colors={['#D5D5D5', '#F2F2F2']}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: 'white',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  button: {width: '15%', justifyContent: 'flex-start'},
  image: {
    width: 24,
    height: 24,
  },
  title: {
    fontWeight: '600',
    color: Colors.black,
  },
  right: {width: '15%'},
  img: {
    width: 20,
    height: 20,
    tintColor: 'black',
  },
  txtBt: {
    fontSize: 18,
    fontWeight: '300',
    color: Colors.background,
    textAlign: 'center',
  },
  viewMiddle: {
    flex: 1,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient: {
    width: wp(100),
    height: 4,
  },
});
