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
function HomeScreen({navigation}) {
  const [data, setData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();

  const onGoBack = () => {
    navigation.goBack();
  };
  useEffect(() => {
    onGetDetail();
  }, [isFocused]);
  const onGetDetail = async () => {
    await axios
      .post(`${BASE_URL}/select_loaitruyen.php`, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res', res.data.loaitruyen);
        setData(res.data.loaitruyen);
        setRefresh(false);

        setDefaultData(res.data.loaitruyen);
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
  const onMoveDetail = item => {
    navigation.navigate('DetailCategory', {
      maloai: item.maloai,
      tenloai: item.tenloai,
    });
  };
  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity onPress={() => onMoveDetail(item)}>
        <View style={styles.card}>
          <View style={styles.column}>
            {item.hinhloai !== '' ? (
              <Image
                source={{uri: item.hinhloai}}
                style={{
                  width: 128,
                  height: 128,
                  borderRadius: 8,
                }}
              />
            ) : (
              <Image source={imgs.bookIcon} style={{width: 128, height: 128}} />
            )}
            <Text style={{fontWeight: 'bold', marginTop: 16}}>
              {item.tenloai}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const [name, setName] = useState('');
  const onMoveToAddCategory = () => {
    navigation.navigate('AddCategory');
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
    if (text) {
      const newData = data.filter(function (item) {
        const p = convertViToEn(item.tenloai, true);
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
      <Header title="Thể loại" goBack={onGoBack} shadow />
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
          numColumns={2}
          columnWrapperStyle={styles.list}
          onMomentumScrollBegin={() => onGetDetail()}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
        <ActionButton
          buttonColor={Colors.white}
          onPress={onMoveToAddCategory}
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
    width: wp(46),
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

export default HomeScreen;
