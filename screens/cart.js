import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Alert,
  Linking,
} from 'react-native';
import {Button, Header, Input} from '../component';
import {BASE_URL, Colors, imgs} from '../utlis';
import {useIsFocused} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Rating, AirbnbRating} from 'react-native-ratings';
import moment from 'moment';
import Modal from 'react-native-modal';
import {useSelector, useDispatch} from 'react-redux';
import {selectUserEmail, updateEmail} from '../redux/userEmail';
import {selectUsername} from '../redux/userName';
function CartScreen({route, navigation}) {
  const onGoBack = () => {
    navigation.goBack();
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    getReview();
  }, [isFocused, showModal]);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [like, setLike] = useState(false);
  const userEmail = useSelector(selectUserEmail);
  const userName = useSelector(selectUsername);
  console.log('userName', userName);
  const onHideModal = () => {
    setShowModal(false);
  };
  const onRefresh = () => {
    setRefresh(true);
    getReview();
  };

  const getReview = async () => {
    let formData = new FormData();
    formData.append('email', userName.email);

    await axios
      .post(`${BASE_URL}/getGioHangByEmail.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res detail nguoi', res.data);
        setData(res.data.giohang);
        setRefresh(false);
        // if (res.data.status) {
        //   navigation.navigate('Home');
        // } else {
        //   Alert.alert('Thông báo', 'Không tìm thấy tài khoản');
        // }
        // setPhoto(res.data.photo.photo);
      })
      .catch(err => {
        console.log('err', err.response);
      });
  };
  const [value, setValue] = useState('');
  const renderItem = ({item, index}) => {
    return (
      <View>
        <View style={styles.card}>
          <View style={styles.row}>
            {item.hinhtruyen !== '' ? (
              <Image
                source={{uri: item.hinhloai}}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                }}
              />
            ) : (
              <Image source={imgs.bookIcon} style={{width: 80, height: 80}} />
            )}
            <View style={styles.column}>
              <Text style={{fontWeight: '400', fontSize: 16}}>
                {item.tentruyen}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: Colors.background,
                }}>
                đ{item.gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View style={styles.row}>
                <Text style={{marginLeft: 8}}>Số lượng: {item.soluong}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const ratingCompleted = rate => {
    console.log('rate', rate);
    setRating(rate);
  };
  const validURL = str => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  };
  const openUrl = i => {
    console.log('web view', i);
    Linking.openURL(i);
  };
  return (
    <View style={{backgroundColor: Colors.white, flex: 1}}>
      <Header title={`Giỏ hàng`} goBack={onGoBack} shadow />
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    width: 120,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.waiting,
    borderRadius: 8,
  },
  card: {
    borderRadius: 16,
    marginTop: 11,
    width: wp(90),
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    shadowColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 16,
    flex: 1,
    height: 64,
  },
  link: {textDecorationLine: 'underline', color: 'blue'},
});

export default CartScreen;
