import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import CustomButtonFunction from '../../../../Components/CustomButtonFunction';
import {colors, icons} from '../../../../Constants';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const FAKE_DATA = [{id: 1}, {id: 2}, {id: 3}];
const MaintenanceManagement = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);

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
          <Text style={styles.textQLKV}>Quản lý bảo trì</Text>
        </View>
        <View style={[styles.viewBottom, {height: windowHeight - 270}]}>
          <View style={styles.viewRow}>
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.ic_manage}
              title={'Quản lý\nthông tin tuyến'}
              titleColor={colors.mainColor}
              onPress={() => navigation.navigate('FiberOpticCableManagement')}
            />
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.ic_report}
              title={'Kết xuất\ntổng hợp'}
              titleColor={colors.mainColor}
              onPress={() => navigation.navigate('ContinueScreen')}
            />
          </View>
          <View style={styles.viewRow}>
            {userInfor?.role == 'GENERAL_MANAGER' ? (
              <CustomButtonFunction
                styleView={styles.customButtonFunction}
                icon={icons.ic_edit}
                title={'Tạo mới\nyêu cầu'}
                titleColor={colors.mainColor}
                onPress={() => navigation.navigate('CreateAMaintenanceRequest')}
              />
            ) : (
              <CustomButtonFunction
                styleView={styles.customButtonFunction}
                icon={icons.ic_checkList}
                title={'Tiếp nhận\nyêu cầu'}
                titleColor={colors.mainColor}
                onPress={() => navigation.navigate('AcceptMaintenanceRequests')}
              />
            )}
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.ic_list}
              title={'Danh sách\nbảo trì'}
              titleColor={colors.mainColor}
              onPress={() => navigation.navigate('MaintenanceList')}
            />
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.ic_report}
              title={'Kết xuất\nbáo cáo'}
              titleColor={colors.mainColor}
              onPress={() => navigation.navigate('ContinueScreen')}
            />
          </View>
          <View style={styles.viewRow}>
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.ic_gear}
              title={'Quản trị'}
              titleColor={colors.mainColor}
              onPress={() => navigation.navigate('ContinueScreen')}
            />
          </View>
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
    height: 250,
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
    height: 110,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    marginTop: 30,
    flexDirection: 'row',
  },
  customButtonFunction: {
    height: 80,
    width: 80,
    marginRight: 5,
  },
});
export default MaintenanceManagement;
