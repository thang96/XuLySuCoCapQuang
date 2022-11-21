import {useNavigation} from '@react-navigation/native';
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
  RefreshControl,
} from 'react-native';
import CustomAppBar from '../../../../Components/CustomAppBar';
import CustomInput from '../../../../Components/CustomInput';
import {colors, icons} from '../../../../Constants';
import UsersAPI from '../../../../Api/Home/UsersAPI/UsersAPI';
import {useSelector} from 'react-redux';
const EmployeeManager = props => {
  const navigation = useNavigation();
  const token = useSelector(state => state?.token?.token);
  const [searchEmployee, setSearchEmployee] = useState('');
  const [listOfEmployee, setListOfEmployee] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getListData();
  }, []);
  const getListData = async () => {
    await UsersAPI.GetUsersAPI(token)
      .then(res => {
        let allUser = res?.data?.data;
        let staff = allUser.filter(eachUsers => eachUsers?.role == 'EMPLOYEE');
        setListOfEmployee(staff);
      })
      .catch(error => console.log(error));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      getListData();
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('EmployeeDetails', item?.id)}
        style={styles.buttonEmployee}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              item?.avatar_img
                ? {
                    uri: `${item?.avatar_img}`,
                  }
                : icons.ic_user
            }
            style={styles.avatarEmployee}
          />
          <View>
            <Text style={styles.textEmployee}>{item?.full_name}</Text>
            <Text style={{color: 'grey', fontSize: 14}}>
              SĐT : {item?.phone_number}
            </Text>
          </View>
        </View>
        <Text
          style={{color: colors.mainColor, fontWeight: '900', fontSize: 15}}>
          {'Chi tiết >>'}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Danh sách nhân viên'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <CustomInput
          value={searchEmployee}
          onChangeText={text => setSearchEmployee(text)}
          styleInput={styles.styleInput}
          source={icons.ic_seach}
          placeholder={'Tìm kiếm nhân viên'}
          onPress={() => {}}
        />
        <Text style={styles.title}>Danh sách nhân viên</Text>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={listOfEmployee}
          keyExtractor={key => key.id}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },
  title: {color: 'black', fontSize: 18, fontWeight: 'bold'},
  styleInput: {
    height: 50,
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
  },
  textEmployee: {color: 'black', fontSize: 16},
  buttonEmployee: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  avatarEmployee: {width: 50, height: 50, borderRadius: 50, marginRight: 5},
});
export default EmployeeManager;
