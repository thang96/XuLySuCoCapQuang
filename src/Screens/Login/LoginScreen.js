import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import {icons, images, colors} from '../../Constants';
import CustomInput from '../../Components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {updateToken} from '../../Store/slices/tokenSlice';
import {updateUser} from '../../Store/slices/userSlice';
import LoginAccessToken from '../../Api/Login/LoginAccessToken';
import CustomLoading from '../../Components/CustomLoading';
import CustomTextButton from '../../Components/CustomTextButton';

const LoginScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async () => {
    let user = {username: userName, password: password};
    setIsLoading(true);
    await LoginAccessToken(userName, password)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          let token = res?.data?.data?.access_token;
          AsyncStorage.setItem('token', token);
          dispatch(updateToken(token));
          navigation.navigate('HomeNavigation');
          setIsLoading(false);
        } else if (res?.status == 500) {
          alert('Đang bảo trì server');
          setIsLoading(false);
        }
      })
      .catch(error => {
        alert('Sai tài khoản hoặc mật khẩu');
        setIsLoading(false);
      });
  };
  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <View style={styles.container}>
      <Image resizeMode="cover" source={icons.ic_logo} style={styles.image} />
      <CustomInput
        onChangeText={text => setUserName(text)}
        value={userName}
        placeholder={'Tên đăng nhập'}
        styleInput={[styles.styleInput, {marginTop: 50}]}
      />
      <CustomInput
        secureTextEntry={!showPass}
        source={showPass ? icons.ic_show : icons.ic_hidden}
        onPress={() => setShowPass(prev => (prev == false ? true : false))}
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder={'Mật khẩu'}
        styleInput={[styles.styleInput, {marginTop: 20}]}
      />
      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('ForgotPassword');
        }}
        style={styles.fogetPassButton}>
        <Text style={[styles.fogetPassText, {color: colors.mainColor}]}>
          Quên mật khẩu ?
        </Text>
      </TouchableOpacity> */}
      <CustomTextButton
        textStyle={styles.textStyle}
        onPress={() => login()}
        label={'Đăng nhập'}
        styleButton={[styles.styleButton, {backgroundColor: colors.mainColor}]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {width: 250, height: 60, alignSelf: 'center'},
  fogetPassButton: {
    height: 40,
    paddingLeft: 30,
    justifyContent: 'center',
  },
  fogetPassText: {
    fontSize: 16,
    fontWeight: '500',
  },
  styleInput: {width: 300, height: 50, alignSelf: 'center'},
  styleButton: {
    width: 120,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
export default LoginScreen;
