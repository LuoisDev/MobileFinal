import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import axios from 'axios';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BASE_URL, Colors, imgs} from '../utlis';
import ActionButton from 'react-native-action-button';
import {useIsFocused} from '@react-navigation/native';

import {Header, Input} from '../component';
function PerScreen({navigation}) {
  const onGoBack = () => {
    navigation.goBack();
  };
  return (
    <>
      <Header title="Cá nhân" shadow />
      <View style={styles.detail}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.card}>
          <Image  style={{marginRight:24}} source={imgs.appInfor} />
          <Text>Giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangePass')}
          style={styles.card}>
          <Image style={{marginRight:24}} source={imgs.changePassIcon} />
          <Text>Đổi mật khẩu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.card}>
          <Image style={{marginRight:24}} source={imgs.logout} />
          <Text>Đăng xuất</Text>
        </TouchableOpacity>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  detail: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    borderRadius: 16,
    marginTop: 11,
    width: wp(90),
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 16,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
  },
  search: {
    alignSelf: 'center',
    borderRadius: 12,
    height: 50,
    width: wp(90),
    marginVertical: 8,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  add: {
    alignSelf: 'center',
    height: 16,
    width: 16,
  },
  list: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default PerScreen;
