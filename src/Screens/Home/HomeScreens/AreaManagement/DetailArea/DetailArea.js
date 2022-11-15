import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
  Keyboard,
  ScrollView,
  TextInput,
} from 'react-native';
import {colors, icons, images} from '../../../../../Constants';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AreaManagementAPI from '../../../../../Api/Home/AreaManagementAPI/AreaManagementAPI';

const DetailArea = props => {
  const navigation = useNavigation();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const token = useSelector(state => state?.token?.token);
  const route = useRoute();
  const [areaInfo, setAreaInfo] = useState(null);
  const [listEmployee, setListEmployee] = useState(null);
  useEffect(() => {
    getAreaDetail();
    getListEmployee();
  }, []);
  const getListEmployee = async () => {
    AreaManagementAPI.GetAreaUsersByIdAreaAPI(token, route.params)
      .then(res => {
        setListEmployee(res?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const getAreaDetail = async () => {
    AreaManagementAPI.GetAreaByIdAPI(token, route.params)
      .then(res => {
        setAreaInfo(res?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const renderListEmployee = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailAreaUser', item?.id)}
        style={styles.buttonRender}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={styles.imageRender}
            source={item?.avatar_img ? {uri: item?.avatar_img} : icons.ic_user}
          />
          <Text style={styles.content}>{item?.full_name}</Text>
        </View>
        <Text style={{fontSize: 14, color: colors.mainColor}}>
          {item?.role == 'EMPLOYEE'
            ? 'Nhân viên'
            : item?.role == 'AREA_MANAGER'
            ? 'Quản lý khu vực'
            : item?.role == 'GENERAL_MANAGER'
            ? 'Quản lý tổng'
            : null}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi tiết khu vực'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <View style={styles.viewRowSpace}>
          <Text style={styles.title}>Tên khu vực : </Text>
          <Text style={styles.content}>{areaInfo?.area_name}</Text>
        </View>
        <Text style={styles.content}>Danh sách nhân viên trong khu vực</Text>

        <View style={{flex: 1}}>
          <FlatList
            data={listEmployee}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => renderListEmployee(item, index)}
          />
        </View>
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
    marginTop: 10,
  },
  viewRowSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
  },
  title: {fontSize: 18, fontWeight: 'bold', color: 'grey'},
  content: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  buttonRender: {
    height: 70,
    marginVertical: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  imageRender: {width: 60, height: 60, borderRadius: 60, marginRight: 5},
});

export default DetailArea;
