import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import AccountAPI from '../../../Api/Account/AccountAPI';
import CustomAppBar from '../../../Components/CustomAppBar';
import {icons, colors, images} from '../../../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DeleteNotificationAPI} from '../../../Api/NotificationAPI/NotificationAPI';
const AccountScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const token = useSelector(state => state?.token?.token);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const deviceInfo = Platform.OS === 'android' ? 'android' : 'ios';
  useEffect(() => {
    readUser(token);
  }, [token, isFocused]);
  const readUser = async token => {
    await AccountAPI.ReadUserAPI(token)
      .then(res => {
        if (res?.status == 200) {
          setUserInfo(res?.data?.data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const logOut = async () => {
    await AsyncStorage.getItem('fcmToken').then(async value => {
      let data = {
        token: value,
        device_info: deviceInfo,
      };
      await DeleteNotificationAPI(token, data)
        .then(async res => {
          await AsyncStorage.setItem('token', '1')
            .then(async () => {
              Alert.alert('Đăng xuất', 'Đăng xuất thành công');
              navigation.navigate('LoginNavigation');
            })
            .catch(function (error) {
              console.log(error);
            });
        })
        .catch(function (error) {
          // console.log(error);
        });
    });
  };
  return (
    <View style={styles.container}>
      <CustomAppBar title={'Tài khoản'} />
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.mainColor} />
      ) : (
        <View style={styles.eachContainer}>
          <View style={styles.viewUse}>
            <Image
              source={
                userInfo?.avatar_img
                  ? {uri: `${userInfo?.avatar_img}`}
                  : icons.user
              }
              style={styles.imageUser}
            />
            <View style={styles.viewRowUser}>
              <Text style={styles.useName}>{userInfo?.full_name}</Text>
              <Text style={styles.textMSNV}>{`ID : ${userInfo?.id}`}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonRow}
            onPress={() => navigation.navigate('Personalinformation')}>
            <View style={styles.viewRow}>
              <Image source={icons.ic_information} style={styles.icon} />
              <Text style={styles.title}>Thông tin cá nhân</Text>
            </View>
            <Image source={icons.next} style={styles.iconNext} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRow}
            onPress={() => navigation.navigate('ChangePassword')}>
            <View style={styles.viewRow}>
              <Image source={icons.ic_key} style={styles.icon} />
              <Text style={styles.title}>Đổi mật khẩu</Text>
            </View>
            <Image source={icons.next} style={styles.iconNext} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonLogOut}
            onPress={() => logOut()}>
            <Text style={styles.textLogOut}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  viewUse: {
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 50,
  },
  useName: {
    color: 'rgb(119,119,119)',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  textMSNV: {
    color: 'rgb(119,119,119)',
    fontSize: 16,
  },
  imageUser: {width: 60, height: 60, borderRadius: 60, marginRight: 5},
  viewRowUser: {flexDirection: 'column', justifyContent: 'center'},
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  icon: {width: 30, height: 30, tintColor: colors.mainColor},
  title: {fontSize: 16, marginLeft: 5, color: colors.grey},
  iconNext: {width: 15, height: 15, tintColor: 'rgb(119,119,119)'},
  buttonLogOut: {
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    alignSelf: 'center',
    marginTop: 20,
    borderBottomColor: colors.grey,
  },
  textLogOut: {color: colors.grey, fontSize: 24, fontWeight: '400'},
});
export default AccountScreen;
