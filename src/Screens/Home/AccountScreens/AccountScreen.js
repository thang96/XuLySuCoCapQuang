import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import AccountAPI from '../../../Api/Account/AccountAPI';
import CustomAppBar from '../../../Components/CustomAppBar';
import {icons, colors, images} from '../../../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AccountScreen = props => {
  const windowWidth = Dimensions.get('screen').width;
  const navigation = useNavigation();
  const token = useSelector(state => state?.token?.token);
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    readUser(token);
  }, [token]);
  const readUser = async token => {
    await AccountAPI.ReadUserAPI(token)
      .then(res => {
        setUserInfo(res?.data?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token').then(() => {
        alert('Đã đăng xuất');
        navigation.navigate('LoginNavigation');
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <CustomAppBar title={'Tài khoản'} />

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
        <TouchableOpacity style={styles.buttonRow} onPress={() => {}}>
          <View style={styles.viewRow}>
            <Image source={icons.ic_gear} style={styles.icon} />
            <Text style={styles.title}>Cài đặt ứng dụng</Text>
          </View>
          <Image source={icons.next} style={styles.iconNext} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRow} onPress={() => {}}>
          <View style={styles.viewRow}>
            <Image source={icons.ic_star} style={styles.icon} />
            <Text style={styles.title}>Việc đã lưu</Text>
          </View>
          <Image source={icons.next} style={styles.iconNext} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRow} onPress={() => {}}>
          <View style={styles.viewRow}>
            <Image source={icons.ic_chats} style={styles.icon} />
            <Text style={styles.title}>Hướng dẫn</Text>
          </View>
          <Image source={icons.next} style={styles.iconNext} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLogOut} onPress={() => logOut()}>
          <Text style={styles.textLogOut}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
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
  icon: {width: 30, height: 30, tintColor: colors.purple},
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
