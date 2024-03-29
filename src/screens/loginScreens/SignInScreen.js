import React from 'react';
import {
  View,
  Alert,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {signin} from '../../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../components/context';
import images from '../../images';
import loginStyles from './loginComponentsStyles';
import Button from '../../components/button';
import {setuser} from '../../constants/tokenHandler';
import Toaster from '../../services/toasterService';
import {phoneHeight} from '../../constants/phoneHeight';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    emailId: '',
    passwordCheck: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidpasswordCheck: true,
  });

  const {signIn} = React.useContext(AuthContext);

  const onSignIn = () => {
    if (validate(data.emailId)) {
      if (data.passwordCheck.length > 7) {
        signin(data.emailId, data.passwordCheck).then(res => {
          console.log(res);
          console.log('in main tab');

          if (res.code == 200) {
            if (res.success == 'false') {
              alert(res.message);
              navigation.navigate('SignInScreen');
            } else {
              console.log(res['merchant_details']['access_token_db']);
              const foundUser = async () => {
                console.log('Inside setData function');
                try {
                  await AsyncStorage.setItem(
                    'userToken',
                    res['merchant_details']['access_token_db'],
                  );
                } catch (error) {
                  console.log('setData error', e);
                }
              };

              foundUser();
              setuser(res['merchant_details']['access_token_db']);
              signIn(res['merchant_details']['access_token_db']);

              //navigation.navigate('MainTabScreen')
            }
          } else {
            Toaster.show(res.message, 3000);
          }
        });
      } else {
        Toaster.show('Please enter correct password', 3000);
      }
    } else {
      Toaster.show('Please enter correct Email', 3000);
    }
  };

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        emailId: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        emailId: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlepasswordCheckChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        passwordCheck: val,
        isValidpasswordCheck: true,
      });
    } else {
      setData({
        ...data,
        passwordCheck: val,
        isValidpasswordCheck: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={{flex:1, backgroundColor: '#000'}}>
        <View style={loginStyles.header}>
          <Animatable.Image
            animation="fadeInUpBig"
            duraton="2000"
            source={images.logo}
            style={loginStyles.logo}
            resizeMode="stretch"
          />
        </View>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : null}>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={loginStyles.text_header}>Log In</Text>

            <View style={loginStyles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />

              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#fff"
                style={loginStyles.textInput}
                keyboardtype="email-address"
                autoCapitalize="none"
                onChangeText={val => textInputChange(val)}
                onEndEditing={e => handleValidUser(e.nativeEvent.text)}
              />
              {data.check_textInputChange ? (
                <Animatable.View animation="bounceIn">
                  <Feather name="check-circle" color="green" size={20} />
                </Animatable.View>
              ) : null}
            </View>
            {data.isValidUser ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Email Id must be 4 characters long.
                </Text>
              </Animatable.View>
            )}

            <View style={loginStyles.action}>
              <Feather name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="password"
                placeholderTextColor="#fff"
                secureTextEntry={data.secureTextEntry ? true : false}
                style={loginStyles.textInput}
                autoCapitalize="none"
                onChangeText={val => handlepasswordCheckChange(val)}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            {data.isValidpasswordCheck ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>
                  Password must be 8 characters long.
                </Text>
              </Animatable.View>
            )}
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={{color: '#fff',}}>
                Forgot password?
              </Text>
            </TouchableOpacity>

            <View style={{alignItems: 'center'}}>
              <Button style={loginStyles.submit} onPress={() => onSignIn()}>
                <Text style={{color: '#fff', fontSize: 17}}>Sign In</Text>
              </Button>
            </View>
          </Animatable.View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    backgroundColor: '#333',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  errorMsg: {
    marginTop: -15,
    color: '#FF0000',
    fontSize: 14,
  },
});

export default SignInScreen;