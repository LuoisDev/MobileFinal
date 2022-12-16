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
function MyDetailStory({route, navigation}) {
  const {item} = route.params;
  console.log('item phong', item);
  const onGoBack = () => {
    navigation.goBack();
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    getTruyen();
  }, [isFocused, showModal]);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [rating, setRating] = useState(5);
  const userEmail = useSelector(selectUserEmail);
  const userName = useSelector(selectUsername);
  console.log('userName', userName);
  const onHideModal = () => {
    setShowModal(false);
  };
  const onHideModal2 = () => {
    setShowModal2(false);
  };
  const onRefresh = () => {
    setRefresh(true);
    getTruyen();
  };

  const getTruyen = async () => {
    let formData = new FormData();
    formData.append('matruyen', item.matruyen);

    await axios
      .post(`${BASE_URL}/select_myTruyen.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res detail nguoi nay', res.data.truyen[0].tentruyen);
        setNameStory(res.data.truyen[0].tentruyen);
        setImageStory(res.data.truyen[0].hinhtruyen);
        setDesStory(res.data.truyen[0].mota);
        setPriceStory(res.data.truyen[0].gia);
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
  const [nameStory, setNameStory] = useState(item.tentruyen);
  const [imageStory, setImageStory] = useState(item.hinhtruyen);
  const [desStory, setDesStory] = useState(item.mota);
  const [priceStory, setPriceStory] = useState(item.gia);

  const updateStory = async () => {
    let formData = new FormData();
    formData.append('matruyen', item.matruyen);
    formData.append('tentruyen', nameStory);
    formData.append('hinhtruyen', imageStory);
    formData.append('mota', desStory);
    formData.append('gia', priceStory);
    formData.append('maloai', item.maloai);
    console.log('formData cart', formData);
    // (@Form(name ="idreview") String idreview,
    // @Form(name ="email") String email,
    // @Form(name ="name") String name,
    // @Form(name ="hinh") String hinh,
    // @Form(name ="time") String time,
    // @Form(name ="message") String message,
    // @Form(name ="ratenumber") String ratenumber,
    // @Form(name ="matruyen") int matruyen
    await axios
      .post(`${BASE_URL}/update_truyen.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res detail nguoi', res.data);
        getTruyen();
        setShowModal(false);
        Alert.alert('Thông báo', 'Cập nhật thành công');
        // setData(res.data.review);
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
  const deleteStory = async () => {
    let formData = new FormData();
    formData.append('matruyen', item.matruyen);
    formData.append('maloai', item.maloai);
    console.log('formData cart', formData);
    // (@Form(name ="idreview") String idreview,
    // @Form(name ="email") String email,
    // @Form(name ="name") String name,
    // @Form(name ="hinh") String hinh,
    // @Form(name ="time") String time,
    // @Form(name ="message") String message,
    // @Form(name ="ratenumber") String ratenumber,
    // @Form(name ="matruyen") int matruyen
    await axios
      .post(`${BASE_URL}/delete_truyen.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res detail nguoi', res.data);
        setShowModal2(false);
        navigation.goBack();
        Alert.alert('Thông báo', 'Xoá thành công');
        // setData(res.data.review);
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
      <Header title={`Truyện ${nameStory}`} goBack={onGoBack} shadow />
      <Modal isVisible={showModal} onBackdropPress={onHideModal}>
        <View
          style={{
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
            alignItems: 'center',
            height: hp(80),
            justifyContent: 'space-around',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Cập nhật truyện
          </Text>
          <Input
            leftImage={imgs.title}
            placeholder={'Tên truyện'}
            numberOfLines={4}
            height={48}
            value={nameStory}
            onChangeText={text => setNameStory(text)}
          />
          <Input
            leftImage={imgs.title}
            placeholder={'Hình truyện'}
            numberOfLines={4}
            height={48}
            value={imageStory}
            onChangeText={text => setImageStory(text)}
          />
          <Input
            leftImage={imgs.title}
            placeholder={'Mô tả'}
            numberOfLines={4}
            height={48}
            value={desStory}
            onChangeText={text => setDesStory(text)}
          />
          <Input
            leftImage={imgs.title}
            placeholder={'Giá truyện'}
            numberOfLines={4}
            height={48}
            value={priceStory}
            onChangeText={text => setPriceStory(text)}
          />
          <Button onPress={() => updateStory(true)} title={'Hoàn tất'} />
        </View>
      </Modal>
      <Modal isVisible={showModal2} onBackdropPress={onHideModal2}>
        <View
          style={{
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
            alignItems: 'center',
            height: 180,
            justifyContent: 'space-around',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Cập nhật truyện
          </Text>
          <Text style={{fontSize: 16, textAlign: 'center', marginVertical: 32}}>
            Bạn có chắc chắn muốn xoá truyện không
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: wp(90),
            }}>
            <Button
              width={wp(30)}
              onPress={() => setShowModal2(false)}
              title={'Hủy bỏ'}
            />
            <Button
              width={wp(30)}
              onPress={() => deleteStory(true)}
              title={'Hoàn tất'}
              backgroundColor={Colors.itemInActive}
            />
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 12,
        }}>
        <Image
          source={imgs.bookIcon}
          style={{width: 120, height: 120, flex: 1 / 2}}
          resizeMode="contain"
        />
        <View
          style={{
            flexDirection: 'column',
            flex: 1 / 2,
            justifyContent: 'space-around',
            height: 120,
          }}>
          <Text style={{fontWeight: '400', fontSize: 20}}>{nameStory}</Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: Colors.background,
            }}>
            đ{priceStory.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <View style={styles.button}>
                <Text style={{color: Colors.white}}>Sửa</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowModal2(true)}>
              <View style={[styles.button, {backgroundColor: Colors.danger}]}>
                <Text style={{color: Colors.white}}>Xoá</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          width: wp(100),
          backgroundColor: Colors.ink500,
          marginTop: 24,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          width: wp(90),
          alignSelf: 'center',
          marginTop: 24,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Mô tả</Text>
        {validURL(desStory) ? (
          <TouchableOpacity onPress={() => openUrl(desStory)}>
            <Text style={styles.link}>{desStory}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{fontSize: 16}}>{desStory}</Text>
        )}
      </View>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            width: wp(90),
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginTop: 24,
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Lượt xem</Text>
          <Text style={{fontSize: 16}}>{item.luottruycap} lượt xem</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    width: 86,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.waiting,
    borderRadius: 8,
    marginRight: 8,
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

export default MyDetailStory;
