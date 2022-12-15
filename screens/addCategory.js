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

import {Header, Input, Button} from '../component';
function AddCategory({navigation}) {
  const onGoBack = () => {
    navigation.goBack();
  };

  const onAddCategory = async () => {
    let formData = new FormData();

    formData.append('tenloai', storyName);
    formData.append('hinhloai', storyLink);
    console.log('formData', formData);
    await axios
      .post(`${BASE_URL}/insert_loaitruyen.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
        console.log('res', res.data);
        Alert.alert('Thông báo', 'Thêm thể loại thành công');
        setStoryName('');
        nameRef.current.clear();
      })
      .catch(err => {
        Alert.alert('Thông báo', 'Vui lòng kiểm tra lại kết nối mạng');
        console.log('err', err.response);
      });
  };

  const [storyName, setStoryName] = useState('');
  const [storyNameErr, setStoryNameErr] = useState('');
  const [storyLink, setStoryLink] = useState('');
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
    Keyboard.dismiss();
    onAddCategory();
  };
  return (
    <>
      <Header title="Thêm thể loại" goBack={onGoBack} shadow />
      <View style={styles.detail}>
        <Input
          placeholder="Nhập tên thể loại"
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
        <Button
          title="Hoàn thành"
          onPress={storyNameErr === '' ? onCheck : null}
          testID="test_Complete"
          containerStyle={{marginTop: 36}}
          backgroundColor={storyNameErr == '' ? Colors.background : '#827D82'}
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

export default AddCategory;
