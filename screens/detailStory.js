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
} from 'react-native';
import {Header} from '../component';
import {BASE_URL, Colors, imgs} from '../utlis';
import {useIsFocused} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Rating, AirbnbRating} from 'react-native-ratings';
import moment from 'moment';

function DetailStory({route, navigation}) {
  const {item} = route.params;
  const onGoBack = () => {
    navigation.goBack();
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    updateAccess();
    getReview();
  }, [isFocused]);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const onRefresh = () => {
    setRefresh(true);
    getReview();
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
  return (
    <>
      <Header title={`Truyện ${item.tentruyen}`} goBack={onGoBack} shadow />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 12,
          backgroundColor: 'white',
        
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
          <TouchableOpacity>
            <View style={styles.button}>
              <Text style={{color: Colors.white}}>Mua ngay</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: StyleSheet.hairlineWidth,
          width: wp(100),
          backgroundColor: Colors.ink500,
          marginTop: 32,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          width: wp(100),
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image source={imgs.heartAround} style={{width: 24, height: 24}} />
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Like</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={imgs.heartAround} style={{width: 20, height: 20}} />

          <Text style={{fontWeight: 'bold', fontSize: 18}}>Review</Text>
        </View>
      </View>
      <View
        style={{flexDirection: 'column', width: wp(90), alignSelf: 'center'}}>
        <Text style={{fontWeight: 'bold', fontSize: 18}}>Mô tả</Text>
        <Text style={{fontSize: 16}}>{item.mota}</Text>
      </View>
      <View style={{flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'row',
            width: wp(90),
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>Review</Text>
          <Text style={{fontSize: 16}}>{data.length} Đánh giá</Text>
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
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
  },
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
});

export default DetailStory;
