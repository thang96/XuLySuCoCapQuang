import {useNavigation, useRoute} from '@react-navigation/native';
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
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import UsersAPI from '../../../../../../../Api/Home/UsersAPI/UsersAPI';
import CustomAppBar from '../../../../../../../Components/CustomAppBar';
import {colors, icons} from '../../../../../../../Constants';
const DetailUserIncident = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const token = useSelector(state => state?.token?.token);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUserDetail();
  }, [route]);
  const getUserDetail = async () => {
    let id = route.params;
    await UsersAPI.GetUsersByIdAPI(token, id)
      .then(res => {
        setUserInfo(res?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi tiết User'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.mainColor} />
      ) : (
        <ScrollView style={styles.eachContainer}>
          <Image
            resizeMode={'contain'}
            style={styles.avatar}
            source={
              userInfo?.avatar_img ? {uri: userInfo?.avatar_img} : icons.ic_user
            }
          />
          <CustomViewRow title={'Tên : '} content={userInfo?.full_name} />
          <CustomViewRow title={'SĐT : '} content={userInfo?.phone_number} />
          <CustomViewRow title={'Email : '} content={userInfo?.email} />
          <CustomViewRow title={'Địa chỉ : '} content={userInfo?.address} />
          <CustomViewRow
            title={'Chức vụ : '}
            content={
              userInfo?.role == 'GENERAL_MANAGER' ? 'Quản lý' : 'Nhân viên'
            }
          />
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 250,
  },
  styleTitle: {color: 'grey', fontSize: 18, fontWeight: 'bold', width: '25%'},
  styleContent: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: '70%',
  },
});
const CustomViewRow = props => {
  const {title, content} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
      }}>
      <Text style={styles.styleTitle}>{title}</Text>
      <Text style={styles.styleContent}>{content}</Text>
    </View>
  );
};
export default DetailUserIncident;
