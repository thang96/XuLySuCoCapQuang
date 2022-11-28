import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import CustomButtonFunction from '../../../../Components/CustomButtonFunction';
import {colors, icons} from '../../../../Constants';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const IncidentManagement = () => {
  const windowHeight = Dimensions.get('window').height;
  const viewBottomHeight = windowHeight - 350;
  const navigation = useNavigation();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  useEffect(() => {
    checkPerLocation();
  }, []);
  const checkPerLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Truy cập vị trí',
            message: 'Cho phép ứng dụng truy cập vị trí để báo cáo',
            buttonNeutral: 'Hỏi sau',
            buttonNegative: 'Hủy',
            buttonPositive: 'Chấp nhận',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('OK');
        } else {
          // console.log('NO');
        }
      } catch (error) {
        // console.log(error);
      }
    }
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
            {userInfor?.role != 'EMPLOYEE' ? (
              <Image source={icons.ic_medal} style={{width: 25, height: 30}} />
            ) : null}
          </TouchableOpacity>

          <Text
            style={styles.textQLKV}>{`SĐT : ${userInfor?.phone_number}`}</Text>
          <Text style={styles.textQLKV}>Quản lý sự cố</Text>
        </View>
        <View style={[styles.viewBottom, {height: viewBottomHeight}]}>
          <ScrollView style={{flex: 1}}>
            <View style={styles.viewRow}>
              <CustomButtonFunction
                styleView={styles.customButtonFunction}
                styleIcon={{tintColor: colors.mainColor}}
                icon={icons.ic_documentManagement}
                title={'Tổng hợp\nbáo cáo\nsự cố'}
                titleColor={colors.mainColor}
                onPress={() => navigation.navigate('CableRouteReport')}
              />
            </View>
            <View style={styles.viewRow}>
              {userInfor?.role == 'EMPLOYEE' ? (
                <CustomButtonFunction
                  styleView={styles.customButtonFunction}
                  styleIcon={{tintColor: colors.mainColor}}
                  icon={icons.ic_receive_request}
                  title={'Tiếp nhận\nyêu cầu\nsự cố'}
                  titleColor={colors.mainColor}
                  onPress={() => navigation.navigate('AcceptRequests')}
                />
              ) : (
                <CustomButtonFunction
                  styleView={styles.customButtonFunction}
                  styleIcon={{tintColor: colors.mainColor}}
                  icon={icons.ic_edit}
                  title={'Tạo mới\nyêu cầu\nsự cố'}
                  titleColor={colors.mainColor}
                  onPress={() => navigation.navigate('CreateNewRequest')}
                />
              )}
              <CustomButtonFunction
                styleView={styles.customButtonFunction}
                styleIcon={{tintColor: colors.mainColor}}
                icon={icons.ic_checkList}
                title={'Danh sách\nsự cố'}
                titleColor={colors.mainColor}
                onPress={() => navigation.navigate('IncidentList')}
              />
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
    top: '100',
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
  viewRowFunction: {
    flexDirection: 'row',
    marginTop: 70,
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  customInput: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  textNews: {
    color: 'black',
    marginLeft: 15,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewRow: {
    height: 120,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    marginTop: 30,
    flexDirection: 'row',
  },
  customButtonFunction: {height: 80, width: 80, marginRight: 5},
});
export default IncidentManagement;
