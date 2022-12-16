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
import {useSelector, useDispatch} from 'react-redux';
import {selectUsername} from '../redux/userName';

import {Header, Input} from '../component';
function MyStory({route, navigation}) {
  const {maloai} = route.params;
  console.log('maloai', maloai);
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();
  const [isLike, setLike] = useState(false);
  const userName = useSelector(selectUsername);

  const onGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    onGetDetail();
  }, [isFocused]);
  const onGetDetail = async () => {
    await axios
      .post(`${BASE_URL}/select_alltruyen.php`, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res detail phong', res.data.loaitruyen);
        const final = [];
        res.data.loaitruyen.forEach(i =>
          i.email == userName.email ? final.push(i) : null,
        );
        console.log('final', final);

        setData(final);
        console.log('alpha', data);
        setRefresh(false);
        setDefaultData(final);
        // if (res.data.status) {
        //   navigation.navigate('Home');
        // } else {
        //   Alert.alert('Thông báo', 'Không tìm thấy tài khoản');
        // }
        // setPhoto(res.data.photo.photo);
      })
      .catch(err => {
        Alert.alert('Thông báo', 'Vui lòng kiểm tra lại kết nối mạng');
        console.log('err', err.response);
      });
  };
  const onRefresh = () => {
    setRefresh(true);
    onGetDetail();
  };
  const onMoveDetailStory = item => {
    navigation.navigate('MyDetailStory', {item: item});
  };
  const renderItem = ({item, index}) => {
    console.log('alpha', item);
    return (
      <TouchableOpacity onPress={() => onMoveDetailStory(item)}>
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
                <Image source={imgs.showpassword} />
                <Text style={{marginLeft: 8}}>{item.luottruycap}</Text>
              </View>
              <View style={styles.row}>
                <TouchableOpacity onPress={() => setLike(index)}>
                  <Image
                    source={isLike == index ? imgs.heart : imgs.heartAround}
                    style={{width: 24, height: 24, marginRight: 8}}
                  />
                </TouchableOpacity>
                <Text style={{marginLeft: 8}}>{isLike == index ? 1 : 0}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const [name, setName] = useState('');
  const onMoveToAddStory = () => {
    navigation.navigate('AddStory', {maloai: maloai});
  };
  const convertViToEn = (str, toUpperCase = false) => {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    return toUpperCase ? str.toUpperCase() : str;
  };
  const onChangeSearch = text => {
    console.log('search', text);
    if (text) {
      const newData = data.filter(function (item) {
        const p = convertViToEn(item.tentruyen, true);
        const itemData = p ? p : ''.toUpperCase();
        const textData = convertViToEn(text, true).toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setData(newData);
      setName(text);
    } else {
      setData(defaultData);
      setName(text);
    }
  };
  const buttonIcon = () => {
    return <Image source={imgs.add} style={styles.add} />;
  };
  return (
    <>
      <Header title={'Truyện của tôi'} goBack={onGoBack} shadow />
      <View style={styles.detail}>
        <Input
          button
          leftImage={imgs.search}
          containerStyle={styles.search}
          value={name}
          onChangeText={onChangeSearch}
          autoCapitalize="none"
          placeholder="Tìm kiếm ..."
          returnKeyType="search"
          rightIcon
        />
        <FlatList
          data={data}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
        <ActionButton
          buttonColor={Colors.white}
          onPress={onMoveToAddStory}
          degrees={45}
          fixNativeFeedbackRadius
          renderIcon={buttonIcon}
          style={[Platform.OS === 'ios' ? {zIndex: 100} : {elevation: 100}]}
        />
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
    width: wp(100) - 24,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    shadowColor: 'black',
    paddingHorizontal: 16,
    paddingVertical: 16,
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
});

export default MyStory;
