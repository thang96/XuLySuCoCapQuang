import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  BackHandler,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButtonFunction from '../../../Components/CustomButtonFunction';
import {colors, icons} from '../../../Constants';
import CustomInput from '../../../Components/CustomInput';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector, useIsFocused} from 'react-redux';
import AccountAPI from '../../../Api/Account/AccountAPI';
import {updateUserInfor} from '../../../Store/slices/userInfoSlice';
import {RegisterNotificationAPI} from '../../../Api/NotificationAPI/NotificationAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  requestUserPermission,
  NotificationServices,
} from '../../../utils/PushNotification';
const HomeScreen = () => {
  const navigation = useNavigation();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const token = useSelector(state => state?.token?.token);
  const deviceId = Platform.OS === 'android' ? 'android' : 'ios';
  const windowHeight = Dimensions.get('window').height;
  const viewBottomHeight = windowHeight - 350;
  const dispatch = useDispatch();
  useEffect(() => {
    requestUserPermission();
    NotificationServices();
    readUser();
    sendNotification();
    checkPerWriteStore();
  }, []);

  const checkPerWriteStore = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Quyền truy cập bộ nhớ',
            message: 'Cấp quyền truy cập để tải file về',
            buttonNeutral: 'Hỏi sau',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('Ok');
        } else {
          // console.log('No ok');
        }
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const sendNotification = async () => {
    await AsyncStorage.getItem('fcmToken')
      .then(async fcmToken => {
        // console.log(fcmToken);
        let data = {
          token: fcmToken,
          device_info: deviceId,
        };
        await RegisterNotificationAPI(token, data)
          .then(res => {
            // console.log(res?.status);
          })
          .catch(function (error) {
            // console.log(error);
          });
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  useEffect(() => {
    readUser();
  }, [token]);
  const readUser = async () => {
    await AccountAPI.ReadUserAPI(token)
      .then(res => {
        dispatch(updateUserInfor(res?.data?.data));
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.viewTop}>
          <TouchableOpacity
            style={styles.viewUse}
            onPress={() => navigation.navigate('StackAccountNavigation')}>
            <Image
              source={
                userInfor?.avatar_img
                  ? {uri: `${userInfor?.avatar_img}`}
                  : icons.user
              }
              style={styles.imageUser}
            />
            <View style={styles.viewRowUser}>
              <Text style={styles.useName}>{userInfor?.full_name}</Text>
              <Text
                style={
                  styles.textMSNV
                }>{`Area ID : ${userInfor?.area_id}`}</Text>
            </View>
            {userInfor?.role == 'GENERAL_MANAGER' ? (
              <Image source={icons.ic_medal} style={{width: 25, height: 30}} />
            ) : null}
          </TouchableOpacity>

          <Text
            style={styles.textQLKV}>{`SĐT : ${userInfor?.phone_number}`}</Text>
          <Text style={styles.textQLKV}>{`Trang chủ`}</Text>
        </View>

        <View style={[styles.viewBottom, {height: viewBottomHeight}]}>
          <ScrollView>
            <View
              style={{
                height: 120,
                marginTop: 30,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <ScrollView horizontal>
                <CustomButtonFunction
                  styleView={styles.customButtonFunction}
                  styleIcon={{tintColor: colors.mainColor}}
                  icon={icons.ic_incidentManagement}
                  titleColor={colors.mainColor}
                  title={'Quản lý\nsự cố'}
                  onPress={() => navigation.navigate('StackIncidentManagement')}
                />
                <CustomButtonFunction
                  styleView={styles.customButtonFunction}
                  styleIcon={{tintColor: colors.mainColor}}
                  icon={icons.ic_maintenanceMaintenance}
                  titleColor={colors.mainColor}
                  title={'Bảo trì\nbảo dưỡng'}
                  onPress={() =>
                    navigation.navigate('StackMaintenanceManagement')
                  }
                />
                <CustomButtonFunction
                  styleView={styles.customButtonFunction}
                  styleIcon={{tintColor: colors.mainColor}}
                  icon={icons.ic_warehouseManagement}
                  titleColor={colors.mainColor}
                  title={'Quản lý kho'}
                  onPress={() =>
                    navigation.navigate('StackWarehouseManagement')
                  }
                />
                {/* <CustomButtonFunction
                  styleView={styles.customButtonFunction}
                  styleIcon={{tintColor: colors.mainColor}}
                  icon={icons.ic_documentManagement}
                  titleColor={colors.mainColor}
                  title={'Quản lý\nvăn bản'}
                  onPress={() => navigation.navigate('ContinueScreen')}
                /> */}
              </ScrollView>
            </View>
            <View
              style={{
                height: 120,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <ScrollView horizontal>
                <CustomButtonFunction
                  styleView={styles.customButtonFunction}
                  styleIcon={{tintColor: colors.mainColor}}
                  icon={icons.ic_optical}
                  title={'Quản lý\nthông tin\ntuyến'}
                  titleColor={colors.mainColor}
                  onPress={() =>
                    navigation.navigate('StackFiberOpticCableManagement')
                  }
                />
                {userInfor?.role != 'EMPLOYEE' && (
                  <CustomButtonFunction
                    styleView={styles.customButtonFunction}
                    styleIcon={{tintColor: colors.mainColor}}
                    icon={icons.ic_group}
                    titleColor={colors.mainColor}
                    title={'Quản lý\nnhân viên'}
                    onPress={() => navigation.navigate('StackEmployeeManager')}
                  />
                )}
                {userInfor?.role != 'EMPLOYEE' && (
                  <CustomButtonFunction
                    styleView={styles.customButtonFunction}
                    styleIcon={{tintColor: colors.mainColor}}
                    icon={icons.ic_area_manage}
                    titleColor={colors.mainColor}
                    title={'Quản lý\nkhu vực'}
                    onPress={() => navigation.navigate('StackAreaNavigation')}
                  />
                )}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  viewTop: {
    backgroundColor: colors.mainColor,
    width: '100%',
    height: '100%',
    paddingStart: 30,
  },
  viewUse: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
  },
  useName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  textMSNV: {
    color: 'white',
    fontSize: 16,
  },
  textQLKV: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
  },
  imageUser: {width: 60, height: 60, borderRadius: 60, marginRight: 5},
  viewRowUser: {flexDirection: 'column', justifyContent: 'center'},
  customViewRowFunction: {
    width: '100%',
    height: 100,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 180,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBottom: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
  },

  buttonNews: {
    height: 200,
    backgroundColor: colors.background,
    borderRadius: 15,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  customButtonFunction: {
    height: 120,
    width: 70,
    marginRight: 10,
  },
});
export default HomeScreen;
