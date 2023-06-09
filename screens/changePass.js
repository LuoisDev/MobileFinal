import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  LayoutAnimation,
  SafeAreaView,
  StatusBar,
  Platform,
  Keyboard,
  Alert,
} from 'react-native';
import {Button, Header, InputPassword} from '../component';
import langs from '../langs';
import {BASE_URL, Colors, imgs} from '../utlis';
import {useSelector, useDispatch} from 'react-redux';
import {selectUsername} from '../redux/userName';
const ChangePass = props => {
  const {token, changePass, navigation} = props;
  const refNew = useRef(null);
  const refConfirm = useRef(null);
  const refRecent = useRef(null);
  useEffect(() => {}, []);

  const onGoBack = () => {
    navigation.goBack();
  };
  const userName = useSelector(selectUsername);

  const [recentPass, setRecentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errRecent, setErrRecent] = useState('');
  const [errNew, setErrNew] = useState('');
  const [errConfirm, setErrConfirm] = useState('');
  const onChangeRecent = val => {
    setRecentPass(val);
    if (val === '' && errRecent !== '') {
      setErrRecent(langs.alert.invalidPassword2);
    } else if (
      val.trim().length > 0 &&
      val.trim().length < 8 &&
      (errRecent !== '' || errNew !== '' || errConfirm !== '')
    ) {
      setErrRecent(langs.alert.lessPassword2);
    } else {
      setErrRecent('');
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };
  const onChangeNew = val => {
    setNewPass(val);
    if (val === '' && errNew !== '') {
      setErrNew(langs.alert.invalidReNewPassword2);
    } else if (
      val.trim().length > 0 &&
      val.trim().length < 8 &&
      (errRecent !== '' || errNew !== '' || errConfirm !== '')
    ) {
      setErrNew(langs.alert.lessReNewPassword2);
    } else {
      setErrNew('');
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };
  const onChangeConfirm = val => {
    setConfirmPass(val);
    if (val === '' && errConfirm !== '') {
      setErrConfirm(langs.alert.invalidRePassword2);
    } else if (
      val.trim().length > 0 &&
      val.trim().length < 8 &&
      (errRecent !== '' || errNew !== '' || errConfirm !== '')
    ) {
      setErrConfirm(langs.alert.lessRePassword2);
    } else if (
      val !== newPass &&
      (errRecent !== '' || errNew !== '' || errConfirm !== '')
    ) {
      setErrConfirm(langs.alert.notCoincideRepass);
    } else {
      setErrConfirm('');
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  const onCheck = () => {
    if (
      recentPass === '' ||
      (recentPass.trim().length > 0 && recentPass.trim().length < 5) ||
      newPass === '' ||
      (newPass.trim().length > 0 && newPass.trim().length < 8) ||
      confirmPass === '' ||
      (confirmPass.trim().length > 0 && confirmPass.trim().length < 8) ||
      confirmPass !== newPass
    ) {
      if (recentPass === '') {
        setErrRecent(langs.alert.invalidPassword2);
      }
      if (recentPass.trim().length > 0 && recentPass.trim().length < 5) {
        setErrRecent(langs.alert.lessPassword2);
      }
      if (newPass.trim().length === 0) {
        setErrNew(langs.alert.invalidReNewPassword2);
      }
      if (newPass.trim().length > 0 && newPass.trim().length < 8) {
        setErrNew(langs.alert.lessReNewPassword2);
      }
      if (confirmPass.trim().length === 0) {
        setErrConfirm(langs.alert.invalidRePassword2);
      }
      if (confirmPass.trim().length > 0 && confirmPass.trim().length < 8) {
        setErrConfirm(langs.alert.lessRePassword2);
      }
      if (confirmPass !== newPass) {
        setErrConfirm(langs.alert.notCoincideRepass);
      }
    } else {
      Keyboard.dismiss();
      onChangePass();
    }
  };
  const onChangePass = async () => {
    let formData = new FormData();
    formData.append('email', userName.email);
    formData.append('oldpassword', recentPass);
    formData.append('newpassword', newPass);

    await axios
      .post(`${BASE_URL}/update_password.php`, formData, {
        headers: {'Content-Type': 'multipart/form-data'},
      })
      .then(res => {
      navigation.goBack();
      Alert.alert('Thông báo', 'Đổi mật khẩu thành công');
        // setPhoto(res.data.photo.photo);
      })
      .catch(err => {
        Alert.alert('Thông báo', 'Vui lòng kiểm tra lại kết nối mạng');
        console.log('err', err.response);
      });
    errRecent === '' && errNew === '' && errConfirm === ''
      ? changePass(data)
      : null;
  };
  return (
    <View style={{backgroundColor: 'white', ...StyleSheet.absoluteFill}}>
      {/* <BarStatus
        backgroundColor={Colors.white}
        height={Platform.OS === 'ios' ? 26 : StatusBar.currentHeight}
      /> */}

      <Header title="Đổi mật khẩu" shadow  goBack={onGoBack}  />

      <InputPassword
        placeholder={langs.recentPassWord}
        returnKeyType="go"
        value={recentPass}
        onChangeText={onChangeRecent}
        containerStyle={[
          styles.textInput,
          {
            marginTop: 36,
            borderColor: '#F32013',
            borderWidth: errRecent !== '' ? 1 : 0,
            marginBottom: errRecent !== '' ? 0 : 28,
          },
        ]}
        refInput={refRecent}
        onSubmitEditing={() => refNew.current.focus()}
        leftImage={imgs.lock}
      />
      {errRecent !== '' ? (
        <Text style={styles.textErr}>{errRecent}</Text>
      ) : null}

      <InputPassword
        placeholder={langs.newPassWord}
        returnKeyType="go"
        value={newPass}
        onChangeText={onChangeNew}
        containerStyle={[
          styles.textInput,
          {
            marginTop: 16,
            borderColor: '#F32013',
            borderWidth: errNew !== '' ? 1 : 0,
            marginBottom: errNew !== '' ? 0 : 28,
          },
        ]}
        refInput={refNew}
        onSubmitEditing={() => refConfirm.current.focus()}
        leftImage={imgs.changePassIcon}
      />
      {errNew !== '' ? <Text style={styles.textErr}>{errNew}</Text> : null}

      <InputPassword
        placeholder={langs.confirmPassWord}
        returnKeyType="go"
        value={confirmPass}
        onChangeText={onChangeConfirm}
        containerStyle={[
          styles.textInput,
          {
            marginTop: 16,
            borderColor: '#F32013',
            borderWidth: errConfirm !== '' ? 1 : 0,
          },
        ]}
        refInput={refConfirm}
        leftImage={imgs.changePassIcon}
      />
      {errConfirm !== '' ? (
        <Text style={styles.textErr}>{errConfirm}</Text>
      ) : null}

      <Button
        title="Hoàn thành"
        onPress={
          errRecent === '' && errNew === '' && errConfirm === ''
            ? onCheck
            : null
        }
        testID="test_Complete"
        containerStyle={{marginTop: errConfirm !== '' ? 8 : 36}}
        backgroundColor={
          errRecent === '' && errNew === '' && errConfirm === ''
            ? Colors.background
            : '#827D82'
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {borderRadius: 32, alignSelf: 'center'},
  container: {justifyContent: 'center', alignItems: 'center'},
  button: {
    marginTop: 36,
  },
  textPass: {fontSize: 16, height: 24, marginTop: 4, marginLeft: 32},
  textErr: {
    fontSize: 12,
    height: 24,
    marginTop: 4,
    color: '#F32013',
    alignSelf: 'center',
    left: -24,
  },
});
export default ChangePass;
