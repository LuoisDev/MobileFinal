import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import axios from 'axios';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Input, InputPassword, Button, KeyBoardScroll} from '../component';
import langs from '../langs';
import {BASE_URL} from '../utlis';

const deviceWidth = Dimensions.get('window').width;

const Login = props => {
  const refPassword = useRef(null);
  const [email, setEmail] = useState('phong@gmail.com');
  const [pass, setPass] = useState('123456');
  const [errMail, setErrMail] = useState('');
  const [errNew, setErrNew] = useState('');
  const {navigation} = props;
  const isValidEmail = value => value && value.indexOf('@') > 0;

  const onRegister = () => {
    navigation.navigate(langs.navigator.register);
  };

  const onLogin = async () => {
    Keyboard.dismiss();
    if (
      email.trim().length === 0 ||
      !isValidEmail(email) ||
      pass.trim().length === 0 ||
      (pass.trim().length > 0 && pass.trim().length < 5)
    ) {
      if (email.trim().length === 0) {
        setErrMail(langs.emailInvalid);
      }
      if (email.trim().length > 0 && !isValidEmail(email)) {
        setErrMail(langs.emailInvalid);
        setErrMail(langs.alert.wrongEmail2);
      }

      if (pass.trim().length === 0) {
        setErrNew(langs.alert.invalidReNewPassword2);
      }
      if (pass.trim().length > 0 && pass.trim().length < 5) {
        setErrNew(langs.alert.lessReNewPassword2);
      }
    } else {
      let formData = new FormData();
      formData.append('email', email);
      formData.append('password', pass);

      console.log('formData', formData);
      await axios
        .post(`${BASE_URL}/login.php`, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        })
        .then(res => {
          console.log('res', res.data);
          if (res.data.status) {
            navigation.navigate('Home');
          } else {
            Alert.alert('Thông báo', 'Không tìm thấy tài khoản');
          }
          // setPhoto(res.data.photo.photo);
        })
        .catch(err => {
          Alert.alert('Thông báo', 'Vui lòng kiểm tra lại kết nối mạng');
          console.log('err', err.response);
        });
    }
  };

  const onChangeEmail = val => {
    setEmail(val);
    if (val.trim().length === 0 && (errMail !== '' || errNew !== '')) {
      setErrMail(langs.emailInvalid);
    } else if (!isValidEmail(val) && (errMail !== '' || errNew !== '')) {
      setErrMail(langs.alert.wrongEmail2);
    } else {
      setErrMail('');
    }
  };

  const onChangePass = val => {
    setPass(val);
    if (val === '' && (errMail !== '' || errNew !== '')) {
      setErrNew(langs.alert.invalidReNewPassword2);
    } else if (
      val.trim().length > 0 &&
      val.trim().length < 8 &&
      (errMail !== '' || errNew !== '')
    ) {
      setErrNew(langs.alert.lessReNewPassword2);
    } else {
      setErrNew('');
    }
  };

  return (
    <KeyBoardScroll>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.detail}>
            <View>
              <Input
                // leftImage={}
                // backgroundColor={'rgba(0,0,25,0.22)'}
                placeholder="Email công ty"
                testID="test_Username"
                containerStyle={[
                  styles.textInput,
                  {
                    marginTop: 16,
                    marginBottom: errMail !== '' ? 0 : 32,
                    borderColor: '#F32013',
                    borderWidth: errMail !== '' ? 1 : 0,
                  },
                ]}
                returnKeyType="next"
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={50}
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
                // backgroundColor={'rgba(0,0,25,0.22)'}
                placeholder={langs.passWord}
                containerStyle={[
                  styles.textInput,
                  {
                    marginTop: 16,
                    marginBottom: errNew !== '' ? 0 : 32,
                    borderColor: '#F32013',
                    borderWidth: errNew !== '' ? 1 : 0,
                  },
                ]}
                refInput={refPassword}
                maxLength={20}
                returnKeyType="done"
                value={pass}
                onChangeText={onChangePass}
              />
              {errNew !== '' ? (
                <Text style={styles.textErr}>{errNew}</Text>
              ) : null}
            </View>
            <Button
              backgroundColor={
                errMail === '' && errNew === '' ? 'rgb(47,172,79)' : '#E9E9E9'
              }
              title={langs.login}
              titleColor={errMail === '' && errNew === '' ? 'white' : '#827D82'}
              onPress={errMail === '' && errNew === '' ? onLogin : null}
              testID="test_Login"
            />
            <TouchableOpacity onPress={onRegister} style={styles.bottom}>
              <Text style={styles.register}>Đăng ký tài khoản</Text>
              {/* <Text>Vui lòng tạo</Text> */}
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={onPressForgot}
              testID="test_ForgotPass"
              style={styles.forgotPass}>
              <Text style={styles.textForgot}>{langs.forgotPassword}</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyBoardScroll>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
  },
  detail: {justifyContent: 'center'},
  logo: {},
  textInput: {
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 25,

    paddingHorizontal: 16,
  },
  hide: {
    height: 50,
    width: '40%',
    paddingHorizontal: 16,
    borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  forgotPass: {
    marginVertical: 8,
    padding: 4,
    width: deviceWidth / 2,
    alignSelf: 'center',
  },
  textForgot: {
    alignSelf: 'center',
    color: 'tomato',
    fontSize: 16,
  },
  checkBox: {
    marginLeft: (deviceWidth * 12.5) / 100,
  },
  register: {color: '#178CEB', fontSize: 16},
  bottom: {justifyContent: 'center', alignItems: 'center', marginVertical: 16},
  keyBoardScroll: {
    justifyContent: 'center',
    // flex: 1,
    // borderWidth: 1,
    height: hp(80),
  },
  textErr: {
    fontSize: 12,
    height: 24,
    marginTop: 8,
    color: '#F32013',
    marginLeft: 54,
  },
});

export default Login;
