import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  LayoutAnimation,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {BASE_URL, Colors, imgs} from '../utlis';
import {selectUsername} from '../redux/userName';
import {useSelector, useDispatch} from 'react-redux';

import {Header, Input, Button} from '../component';
function AddStory({route, navigation}) {
  const {maloai} = route.params;
  const onGoBack = () => {
    navigation.goBack();
  };
  const userName = useSelector(selectUsername);

  const onAddStory = async () => {
    let formData = new FormData();

    formData.append('tentruyen', storyName);
    formData.append('hinhtruyen', storyLink);
    formData.append('maloai', maloai);
    formData.append('gia', price);
    formData.append('mota', descriptionLink);
    formData.append('email', userName.email);

    console.log('formData', formData);
    await axios
      .post(`${BASE_URL}/insert_truyen.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res', res.data);
        Alert.alert('Thông báo', 'Thêm truyện thành công');
        onGoBack();
      })
      .catch(err => {
        Alert.alert('Thông báo', 'Vui lòng kiểm tra lại kết nối mạng');
        console.log('err', err.response);
      });
  };

  const [storyName, setStoryName] = useState('');
  const [storyNameErr, setStoryNameErr] = useState('');
  const [storyLink, setStoryLink] = useState('');
  const [price, setPrice] = useState('');
  const [descriptionLink, setDescriptionLink] = useState('');
  const [descriptionLinkErr, setDescriptionLinkErr] = useState('');
  const [priceErr, setPriceErr] = useState('');
  const onChangePrice = val => {
    setPrice(val);
    if (val === '' && price !== '') {
      setPriceErr('Không được để trống giá');
    
    } else {
      setPriceErr('');
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };
  const onChangeDescriptionLink = val => {
    setDescriptionLink(val);
    if (val === '' && descriptionLink !== '') {
      setDescriptionLinkErr('Không được để trống link');
    } else if (
      val.trim().length > 0 &&
      val.trim().length < 8 &&
      descriptionLink !== ''
    ) {
      setDescriptionLinkErr('Link quá ngắn');
    } else {
      setDescriptionLinkErr('');
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };
  const onChangeRecent = val => {
    setStoryName(val);
    if (val === '' && storyNameErr !== '') {
      setStoryNameErr('Không được để trống tên');
    } else if (
      val.trim().length > 0 &&
      val.trim().length < 8 &&
      storyNameErr !== ''
    ) {
      setStoryNameErr('Tên quá ngắn');
    } else {
      setStoryNameErr('');
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };
  const onChangeStoryLink = val => {
    setStoryLink(val);
  };
  const nameRef = useRef();
  const linkRef = useRef();
  const onCheck = () => {
    if (storyName === '') {
      setStoryNameErr('Không được để trống tên');
      return;
    }
    if (storyName.trim().length > 0 && storyName.trim().length < 8) {
      setStoryNameErr('Tên quá ngắn');
      return;
    }
    if (descriptionLink === '') {
      setDescriptionLinkErr('Không được để trống link');
      return;
    }
    if (
      descriptionLink.trim().length > 0 &&
      descriptionLink.trim().length < 8
    ) {
      setDescriptionLinkErr('Link quá ngắn');
      return;
    }
    if (price === '') {
      setPriceErr('Không được để trống giá');
      return;
    }
    Keyboard.dismiss();
    onAddStory();
  };
  return (
    <>
      <Header title="Thêm truyện" goBack={onGoBack} shadow />
      <View style={styles.detail}>
        <Input
          placeholder="Nhập tên truyện"
          returnKeyType="go"
          value={storyName}
          onChangeText={onChangeRecent}
          containerStyle={[
            styles.textInput,
            {
              marginTop: 36,
              borderColor: '#F32013',
              borderWidth: storyNameErr !== '' ? 1 : 0,
              marginBottom: storyNameErr !== '' ? 0 : 28,
            },
          ]}
          refInput={nameRef}
          onSubmitEditing={() => linkRef.current.focus()}
          leftImage={imgs.stampCheck}
        />
        {storyNameErr !== '' ? (
          <Text style={styles.textErr}>{storyNameErr}</Text>
        ) : null}

        <Input
          placeholder="Nhập đường dẫn hình ảnh"
          returnKeyType="go"
          value={storyLink}
          onChangeText={onChangeStoryLink}
          containerStyle={[
            styles.textInput,
            {
              marginTop: 16,
              borderColor: '#F32013',
              marginBottom: 28,
            },
          ]}
          refInput={linkRef}
          leftImage={imgs.inforsolidblack}
        />
        <Input
          placeholder="Nhập link mô tả"
          returnKeyType="go"
          value={descriptionLink}
          onChangeText={onChangeDescriptionLink}
          containerStyle={[
            styles.textInput,
            {
              marginTop: 16,
              borderColor: '#F32013',
              borderWidth: descriptionLinkErr !== '' ? 1 : 0,
              marginBottom: descriptionLinkErr !== '' ? 0 : 28,
            },
          ]}
          refInput={nameRef}
          onSubmitEditing={() => linkRef.current.focus()}
          leftImage={imgs.stampCheck}
        />
        {descriptionLinkErr !== '' ? (
          <Text style={styles.textErr}>{descriptionLinkErr}</Text>
        ) : null}
        <Input
          placeholder="Nhập giá truyện (VND)"
          returnKeyType="go"
          value={price}
          keyboardType="numeric"
          onChangeText={onChangePrice}
          containerStyle={[
            styles.textInput,
            {
              marginTop: 16,
              borderColor: '#F32013',
              borderWidth: priceErr !== '' ? 1 : 0,
              marginBottom: priceErr !== '' ? 0 : 28,
            },
          ]}
          refInput={nameRef}
          onSubmitEditing={() => linkRef.current.focus()}
          leftImage={imgs.stampCheck}
        />
        {priceErr !== '' ? (
          <Text style={styles.textErr}>{priceErr}</Text>
        ) : null}
        <Button
          title="Hoàn thành"
          onPress={storyNameErr === '' ? onCheck : null}
          testID="test_Complete"
          containerStyle={{marginTop: 36}}
          backgroundColor={
            storyNameErr !== '' || priceErr !== '' || descriptionLinkErr !== ''
              ? '#827D82'
              : Colors.background
          }
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
  textInput: {
    borderRadius: 32,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    width: wp(90),
    height: 50,
    paddingHorizontal: 16,
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
    marginLeft: 16,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
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
  textErr: {
    fontSize: 12,
    height: 24,
    marginTop: 8,
    color: '#F32013',
    alignSelf: 'center',
  },
});

export default AddStory;
