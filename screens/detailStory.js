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
function DetailStory({route, navigation}) {
  const {item} = route.params;
  console.log('item phong', item);
  const onGoBack = () => {
    navigation.goBack();
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    updateAccess();
    getReview();
    getLikeByMatruyen();
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
  const getLikeByMatruyen = async () => {
    let formData = new FormData();
    formData.append('matruyen', item.matruyen);

    await axios
      .post(`${BASE_URL}/getLikeByMatruyen.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res like', res.data.liketruyen);

        if (res.data.liketruyen.find(i => i.email == userName.email)) {
          setLike(true);
        }
        // if (res.data.status) {
        //   navigation.navigate('Home');
        // } else {
        //   Alert.alert('Thông báo', 'Không tìm thấy tài khoản');
        // }
        // setPhoto(res.data.photo.photo);
      })
      .catch(err => {
        console.log('err like', err.response);
      });
  };
  const getReview = async () => {
    let formData = new FormData();
    formData.append('matruyen', item.matruyen);

    await axios
      .post(`${BASE_URL}/select_review.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res detail nguoi', res.data);
        setData(res.data.review);
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
  const insertReview = async () => {
    let formData = new FormData();
    formData.append('matruyen', item.matruyen);
    formData.append('idreview', moment().valueOf());
    formData.append('email', userName.email);
    formData.append('name', userName.name);
    formData.append('hinh', userName.hinh);
    formData.append('time', moment().valueOf());
    formData.append('message', value);
    formData.append('ratenumber', rating);
    formData.append('matruyen', item.matruyen);
    console.log('formData', formData);
    // (@Form(name ="idreview") String idreview,
    // @Form(name ="email") String email,
    // @Form(name ="name") String name,
    // @Form(name ="hinh") String hinh,
    // @Form(name ="time") String time,
    // @Form(name ="message") String message,
    // @Form(name ="ratenumber") String ratenumber,
    // @Form(name ="matruyen") int matruyen
    await axios
      .post(`${BASE_URL}/insert_review.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res detail nguoi', res.data);
        setShowModal(false);
        Alert.alert('Thông báo', 'Đánh giá thành công');
        getReview();
        setValue('');
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
  const insertCart = async () => {
    let formData = new FormData();
    formData.append('tentruyen', item.tentruyen);
    formData.append('hinhtruyen', item.hinhtruyen);
    formData.append('gia', item.gia);
    formData.append('email', userName.email);
    formData.append('name', userName.name);
    formData.append('timeoder', moment().valueOf());
    formData.append('soluong', 1);
    formData.append('matruyen', item.matruyen);
    formData.append('id', moment().valueOf());
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
      .post(`${BASE_URL}/insert_giohang.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res detail nguoi', res.data);
        Alert.alert('Thông báo', 'Thêm vào giỏ hàng thành công');
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
  const onLike = async () => {
    let formData = new FormData();
    formData.append('matruyen', item.matruyen);
    formData.append('time', moment().valueOf());
    formData.append('idlike', moment().valueOf());
    formData.append('email', userName.email);
    console.log('formData', formData);
    // (@Form(name ="idreview") String idreview,
    // @Form(name ="email") String email,
    // @Form(name ="name") String name,
    // @Form(name ="hinh") String hinh,
    // @Form(name ="time") String time,
    // @Form(name ="message") String message,
    // @Form(name ="ratenumber") String ratenumber,
    // @Form(name ="matruyen") int matruyen
    await axios
      .post(`${BASE_URL}/liketruyen.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res detail nguoi', res.data);
        setLike(!like);
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
  const updateAccess = async () => {
    let formData = new FormData();
    formData.append('matruyen', item.matruyen);
    formData.append('luottruycap', parseInt(item.luottruycap, 10) + 1);

    await axios
      .post(`${BASE_URL}/updateAccess.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res detail', res.data);

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
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          {item.hinh !== '' ? (
            <Image
              source={{uri: item.hinh}}
              style={{
                width: 64,
                height: 64,
                borderRadius: 64,
              }}
            />
          ) : (
            <Image
              source={imgs.personalgreen}
              style={{width: 64, height: 64}}
            />
          )}
          <View style={styles.column}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.background,
              }}>
              {item.name}
            </Text>
            <Text style={{color: Colors.itemInActive}}>
              {moment(parseInt(item.time)).format('DD/MM/YYYY HH:MM')}
            </Text>
            {item.message ? (
              <Text style={{fontWeight: '400', fontSize: 16}}>
                {item.message}
              </Text>
            ) : (
              <Text style={{fontWeight: '400', fontSize: 16}}>
                Chưa có đánh giá
              </Text>
            )}
          </View>
          <View style={{flexDirection: 'row'}}>
            <Rating
              startingValue={item.ratenumber}
              readonly={true}
              imageSize={12}
            />
            <Text style={{paddingLeft: 8}}>
              {parseFloat(item.ratenumber).toFixed(1)}
            </Text>
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
      <Header title={`Truyện ${item.tentruyen}`} goBack={onGoBack} shadow />
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
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Viết đánh giá</Text>
          <Input
            leftImage={imgs.title}
            placeholder={'Nhập đánh giá'}
            numberOfLines={4}
            height={48}
            value={value}
            onChangeText={text => setValue(text)}
          />
          <Rating
            minValue={1}
            jumpValue={0.5}
            startingValue={5}
            onFinishRating={ratingCompleted}
          />
          <Button onPress={() => insertReview()} title={'Gửi đánh giá'} />
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
          <Text style={{fontWeight: '400', fontSize: 20}}>
            {item.tentruyen}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: Colors.background,
            }}>
            đ{item.gia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          <TouchableOpacity onPress={() => insertCart()}>
            <View style={styles.button}>
              <Text style={{color: Colors.white}}>Thêm vào giỏ hàng</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: wp(100),
          justifyContent: 'space-around',
          marginTop: 24,
        }}>
        <TouchableOpacity
          onPress={() => onLike()}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={like ? imgs.heart : imgs.heartAround}
            style={{width: 24, height: 24, marginRight: 8}}
          />
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={imgs.title}
            style={{width: 20, height: 20, marginRight: 8}}
          />

          <Text style={{fontWeight: 'bold', fontSize: 18}}>Review</Text>
        </TouchableOpacity>
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
        {validURL(item.mota) ? (
          <TouchableOpacity onPress={() => openUrl(item.mota)}>
            <Text style={styles.link}>{item.mota}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={{fontSize: 16}}>{item.mota}</Text>
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
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Review</Text>
          <Text style={{fontSize: 16}}>{data.length} Đánh giá</Text>
        </View>
      </View>
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
    width: 148,
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

export default DetailStory;
