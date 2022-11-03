import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
import {colors, icons, images} from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {updateToken} from '../Store/slices/tokenSlice';
import {updateUserInfor} from '../Store/slices/userInfoSlice';
import LoginTestToken from '../Api/Login/LoginTestToken';

const Splash = () => {
  const token = useSelector(state => state?.token?.token);
  const user = useSelector(state => state?.user?.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    loginTokenApi();
  }, [token, user]);
  const loginTokenApi = async () => {
    try {
      await AsyncStorage.getItem('token').then(token => {
        dispatch(updateToken(token));
        callApiToken(token);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const callApiToken = async token => {
    await LoginTestToken(token)
      .then(res => {
        if (res?.status == 200) {
          navigation.navigate('HomeNavigation');
        }
      })
      .catch(error => {
        navigation.navigate('LoginNavigation');
      });
  };

  return (
    <ImageBackground source={images.im_plash} style={styles.container}>
      <Image resizeMode="cover" source={icons.ic_logo} style={styles.image} />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {width: 250, height: 60},
});
export default Splash;
