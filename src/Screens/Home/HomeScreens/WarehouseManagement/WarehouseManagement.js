import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';
import CustomButtonFunction from '../../../../Components/CustomButtonFunction';
import {colors, icons} from '../../../../Constants';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const WarehouseManagement = () => {
  const windowHeight = Dimensions.get('window').height;
  const viewBottomHeight = windowHeight - 350;
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
          <Text style={styles.textQLKV}>Quản lý Kho</Text>
        </View>
        <View style={[styles.viewBottom, {height: viewBottomHeight}]}>
          <ScrollView style={{flex: 1}}>
            <View style={[styles.viewRow, {marginTop: 30}]}>
              <CustomButtonFunction
                styleView={styles.customButtonFunction}
                styleIcon={[{tintColor: colors.mainColor}, styles.styleIcon]}
                icon={icons.ic_listWarehouse}
                title={'Danh sách\ntổng kho'}
                titleColor={colors.mainColor}
                onPress={() => navigation.navigate('StableWarehouse')}
              />
              <CustomButtonFunction
                styleView={styles.customButtonFunction}
                styleIcon={[{tintColor: colors.mainColor}, styles.styleIcon]}
                icon={icons.ic_listSupplies}
                title={'Danh sách\nvật tư'}
                titleColor={colors.mainColor}
                onPress={() => navigation.navigate('ListSupplies')}
              />
            </View>
            <View style={styles.viewRow}>
              {userInfor?.role != 'EMPLOYEE' && (
                <CustomButtonFunction
                  styleView={styles.customButtonFunction}
                  styleIcon={[{tintColor: colors.mainColor}, styles.styleIcon]}
                  icon={icons.ic_receivingVoucher}
                  title={'Nhập kho'}
                  titleColor={colors.mainColor}
                  onPress={() =>
                    navigation.navigate('ListInventoryReceivingVoucher')
                  }
                />
              )}
              {userInfor?.role != 'EMPLOYEE' && (
                <CustomButtonFunction
                  styleView={styles.customButtonFunction}
                  styleIcon={[{tintColor: colors.mainColor}, styles.styleIcon]}
                  icon={icons.ic_deliveryVoucher}
                  title={'Chuyển kho'}
                  titleColor={colors.mainColor}
                  onPress={() =>
                    navigation.navigate('ListInventoryDeliveryVoucher')
                  }
                />
              )}
              {userInfor?.role != 'EMPLOYEE' && (
                <CustomButtonFunction
                  styleView={styles.customButtonFunction}
                  styleIcon={[{tintColor: colors.mainColor}, styles.styleIcon]}
                  icon={icons.ic_controlVoucher}
                  title={'Đối soát'}
                  titleColor={colors.mainColor}
                  onPress={() =>
                    navigation.navigate('ListInventoryControlVoucher')
                  }
                />
              )}
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
  viewRow: {
    height: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonFunction: {
    height: 150,
    width: 100,
    marginRight: 10,
  },
  customButtonFunction: {
    height: 150,
    width: 100,
    marginRight: 10,
  },
  styleIcon: {width: 60, height: 60},
});
export default WarehouseManagement;
