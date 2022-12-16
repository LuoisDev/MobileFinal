/**
 * Created by phongdt on Sun Nov 15 2020
 * Copyright (c) 2020 phongdt
 */

import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as SCREEN,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button, Input, InputPassword} from '../component';
import langs from '../langs';
import {BASE_URL, Colors, imgs} from '../utlis';

const {height} = Dimensions.get('window');

const Register = props => {
  const {navigation} = props;

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [termOfService, setTermOfService] = useState(true);
  const [privacyPolicy, setPrivacyPolicy] = useState(true);
  const [confirmCode, setConfirmCode] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [errNew, setErrNew] = useState('');
  const [errConfirm, setErrConfirm] = useState('');
  const [errMail, setErrMail] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const onGoBack = () => {
    navigation.navigate('Login');
  };
  const onChangeEmail = val => {
    setEmail(val);
    if (
      val.trim().length === 0 &&
      (errMail !== '' ||
        errMail !== '' ||
        errConfirm !== '' ||
        errNew !== '' ||
        errConfirm !== '')
    ) {
      setErrMail(langs.emailInvalid);
    } else if (
      !isValidEmail(val) &&
      (errMail !== '' ||
        errConfirm !== '' ||
        errNew !== '' ||
        errConfirm !== '')
    ) {
      setErrMail(langs.alert.wrongEmail2);
    } else {
      setErrMail('');
    }
  };
  const onChangePass = val => {
    setNewPassword(val);
    if (
      val === '' &&
      (errMail !== '' ||
        errConfirm !== '' ||
        errNew !== '' ||
        errConfirm !== '')
    ) {
      setErrNew(langs.alert.invalidReNewPassword2);
    } else if (
      val.trim().length > 0 &&
      val.trim().length < 8 &&
      (errMail !== '' ||
        errConfirm !== '' ||
        errNew !== '' ||
        errConfirm !== '')
    ) {
      setErrNew(langs.alert.lessReNewPassword2);
    } else {
      setErrNew('');
    }
  };

  const onChangeConfirmPassword = val => {
    setConfirmPassword(val);
    if (
      val === '' &&
      (errMail !== '' ||
        errConfirm !== '' ||
        errNew !== '' ||
        errConfirm !== '')
    ) {
      setErrConfirm(langs.alert.invalidRePassword2);
    } else if (
      val.trim().length > 0 &&
      val.trim().length < 8 &&
      (errMail !== '' ||
        errConfirm !== '' ||
        errNew !== '' ||
        errConfirm !== '')
    ) {
      setErrConfirm(langs.alert.lessRePassword2);
    } else if (
      val !== newPassword &&
      (errMail !== '' ||
        errConfirm !== '' ||
        errNew !== '' ||
        errConfirm !== '')
    ) {
      setErrConfirm(langs.alert.notCoincideRepass);
    } else {
      setErrConfirm('');
    }
  };
  const onAcceptTermOfService = () => {
    setTermOfService(!termOfService);
  };
  const onAcceptPrivacyPolicy = () => {
    setPrivacyPolicy(!privacyPolicy);
  };
  const refPassword = useRef(null);
  const refRePassword = useRef(null);
  const refVerifyCode = useRef(null);
  useEffect(() => {
    if (Platform.OS === 'android') {
      refPassword.current.setNativeProps({
        style: {fontFamily: 'Quicksand-Regular'},
      });
      refRePassword.current.setNativeProps({
        style: {fontFamily: 'Quicksand-Regular'},
      });
      refVerifyCode.current.setNativeProps({
        style: {fontFamily: 'Quicksand-Regular'},
      });
    }
  }, []);
  const isValidEmail = value => value && value.indexOf('@') > 0;
  const onRegister = async () => {
    Keyboard.dismiss();
   

    if (
      email.trim().length === 0 ||
      !isValidEmail(email) ||
      newPassword.trim().length === 0 ||
      (newPassword.trim().length > 0 && newPassword.trim().length < 8) ||
      confirmPassword.trim().length === 0 ||
      (confirmPassword.trim().length > 0 &&
        confirmPassword.trim().length < 8) ||
      newPassword !== confirmPassword 
    ) {
      if (email.trim().length === 0) {
        setErrMail(langs.emailInvalid);
      }
      if (email.trim().length > 0 && !isValidEmail(email)) {
        setErrMail(langs.alert.wrongEmail2);
      }
      if (newPassword.trim().length === 0) {
        setErrNew(langs.alert.invalidReNewPassword2);
      }
      if (newPassword.trim().length > 0 && newPassword.trim().length < 8) {
        setErrNew(langs.alert.lessReNewPassword2);
      }

      if (confirmPassword.trim().length === 0) {
        setErrConfirm(langs.alert.invalidRePassword2);
      }
      if (
        confirmPassword.trim().length > 0 &&
        confirmPassword.trim().length < 8
      ) {
        setErrConfirm(langs.alert.lessRePassword2);
      }
      if (newPassword !== confirmPassword) {
        setErrConfirm(langs.alert.notCoincideRepass);
      }

      // if (!termOfService) {
      //   _global.Alert.alert({
      //     title: langs.alert.notify,
      //     message: langs.alert.termOfService,
      //     leftButton: {text: langs.alert.ok},
      //   });

      //   return;
      // }
      // if (!privacyPolicy) {
      //   _global.Alert.alert({
      //     title: langs.alert.notify,
      //     message: langs.alert.privacyPolicy,
      //     leftButton: {text: langs.alert.ok},
      //   });

      //   return;
      // }
    } else {
      //   register(data);
      let formData = new FormData();
      formData.append('email', email);
      formData.append('password', newPassword);
      formData.append('name', name);

      formData.append('hinh', verifyCode);
      console.log('form phing', formData);
      await axios
        .post(`${BASE_URL}/register.php`, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(res => {
          console.log('res', res.data.users[0].name);
          navigation.navigate('Login');

          Alert.alert('Thông báo', 'Đăng ký thành công');

          // setPhoto(res.data.photo.photo);
        })
        .catch(err => {
          Alert.alert('Thông báo', 'Vui lòng kiểm tra lại kết nối mạng');
          console.log('err', err.response);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewMiddle}>
        <View>
          <View style={styles.viewInput}>
            <View>
              <Input
                // leftImage={}
                // backgroundColor={'rgba(0,0,25,0.22)'}
                placeholder="Tên"
                testID="test_Username"
                returnKeyType="next"
                autoCapitalize="none"
                maxLength={50}
                containerStyle={[
                  styles.textInput,
                  {
                    borderColor: '#F32013',
                    marginBottom: 28,
                  },
                ]}
                value={name}
                onChangeText={val => setName(val)}
                rightIcon
              />
              <Input
                // leftImage={}
                // backgroundColor={'rgba(0,0,25,0.22)'}
                placeholder="Email"
                testID="test_Username"
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={50}
                containerStyle={[
                  styles.textInput,
                  {
                    marginBottom: errMail !== '' ? 0 : 28,
                    borderColor: '#F32013',
                    borderWidth: errMail !== '' ? 1 : 0,
                  },
                ]}
                onSubmitEditing={() => refPassword.current.focus()}
                value={email}
                onChangeText={onChangeEmail}
                rightIcon
              />
              {errMail !== '' ? (
                <Text style={styles.textErr}>{errMail}</Text>
              ) : null}
            </View>
            <View>
              <InputPassword
                testID="test_Password"
                containerStyle={[
                  styles.textInput,
                  {
                    marginBottom: errNew !== '' ? 0 : 28,
                    borderColor: '#F32013',
                    borderWidth: errNew !== '' ? 1 : 0,
                  },
                ]}
                // backgroundColor={'rgba(0,0,25,0.22)'}
                placeholder="Mật khẩu mới"
                // refInput={refPassword}
                maxLength={20}
                returnKeyType="next"
                value={newPassword}
                onChangeText={onChangePass}
                refInput={refPassword}
                onSubmitEditing={() => refRePassword.current.focus()}
              />
              {errNew !== '' ? (
                <Text style={styles.textErr}>{errNew}</Text>
              ) : null}
            </View>
            <View>
              <InputPassword
                testID="test_Password"
                containerStyle={[
                  styles.textInput,
                  {
                    marginBottom: errConfirm !== '' ? 0 : 28,
                    borderColor: '#F32013',
                    borderWidth: errConfirm !== '' ? 1 : 0,
                  },
                ]}
                // backgroundColor={'rgba(0,0,25,0.22)'}
                placeholder="Nhập lại mật khẩu"
                refInput={refRePassword}
                maxLength={20}
                returnKeyType="next"
                value={confirmPassword}
                onChangeText={onChangeConfirmPassword}
                onSubmitEditing={() => refVerifyCode.current.focus()}
              />
              {errConfirm !== '' ? (
                <Text style={styles.textErr}>{errConfirm}</Text>
              ) : null}
            </View>
            <View>
              <InputPassword
                testID="test_Password"
                containerStyle={[
                  styles.textInput,
                  {
                    borderColor: '#F32013',
                  },
                ]}
                // backgroundColor={'rgba(0,0,25,0.22)'}
                placeholder="Link hình đại diện"
                // refInput={refPassword}
                maxLength={20}
                returnKeyType="done"
                value={verifyCode}
                onChangeText={val => setVerifyCode(val)}
                leftImage={imgs.key}
                refInput={refVerifyCode}
              />
            </View>
          </View>
          {/* <View style={[styles.viewCheckbox, {marginBottom: 8}]}> */}
          {/* <Checkbox
                title={'Điều khoản dịch vụ'}
                // title2={`(${langs.link})`}
                checked={termOfService}
                onChange={onAcceptTermOfService}
                containerStyle={styles.checkBox}

                // onPressTitle={onOpenTermOfService}
              />
              <Checkbox
                containerStyle={styles.checkBox}
                title={'Chính sách quyền riêng tư'}
                // title2={`(${langs.link})`}
                checked={privacyPolicy}
                onChange={onAcceptPrivacyPolicy}
                // onPressTitle={onOpenPrivacyPolicy}
              /> */}
          {/* </View> */}
        </View>
        <Button
          title="Tạo tài khoản"
          onPress={
            errMail === '' && errNew === '' && errConfirm === ''
              ? onRegister
              : null
          }
          rounded
          containerStyle={[
            styles.viewInButton,
            {
              marginTop: errConfirm === '' ? 36 : 8,
            },
          ]}
          titleColor={
            errMail === '' && errNew === '' && errConfirm === ''
              ? 'white'
              : '#827D82'
          }
          backgroundColor={
            errMail === '' && errNew === '' && errConfirm === ''
              ? 'rgb(47,172,79)'
              : '#E9E9E9'
          }
        />
      </View>
      <TouchableOpacity style={styles.goBack} onPress={onGoBack}>
        <Text>Bạn đã có tài khoản?</Text>
        <Text style={styles.logIn}>Đăng nhập</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  viewLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
  },
  viewMiddle: {
    alignItems: 'center',
    // flex: 1,
    // justifyContent: 'space-around',
  },
  viewFooter: {
    flex: 1,
    alignItems: 'center',
  },
  viewInput: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: (height - 568) / 6,
  },
  viewButton: {},
  viewAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },

  input: {
    marginBottom: 22,
  },
  btnBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  txtTitle: {
    fontSize: 16,
    color: 'white',
    marginLeft: 4,
    marginBottom: 2,
  },
  txtLabel: {
    fontSize: 16,
  },
  viewCheckbox: {
    width: '80%',
    paddingLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewContry: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 32,
  },
  btnCountry: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageFlag: {
    width: 25,
    height: 19,
    opacity: 0.8,
    marginRight: 8,
  },
  callingCodeText: {
    color: 'white',
  },
  txtLabelCountry: {
    color: 'white',
    marginRight: 16,
  },
  checkBox: {
    marginVertical: 8,
    width: 200,
    alignSelf: 'center',
  },
  textInput: {
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  viewInButton: {},
  bottom: {height: 1, width: '100%', backgroundColor: '#E4E4E4'},
  goBack: {alignSelf: 'center', flexDirection: 'row'},
  containerBottom: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: hp(90),
  },

  logIn: {color: Colors.blue, marginLeft: 4},
  textErr: {
    fontSize: 12,
    height: 24,
    marginTop: 4,
    color: '#F32013',
    marginLeft: 32,
  },
});
export default Register;
