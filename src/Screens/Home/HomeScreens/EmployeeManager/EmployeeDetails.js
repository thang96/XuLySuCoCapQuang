import {useNavigation, useRoute} from '@react-navigation/native';
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
import {ScrollView} from 'react-native-gesture-handler';
import CustomAppBar from '../../../../Components/CustomAppBar';
import {colors, icons} from '../../../../Constants';
import UsersAPI from '../../../../Api/Home/UsersAPI/UsersAPI';
import {useSelector} from 'react-redux';
const EmployeeDetails = props => {
  const route = useRoute();
  const navigation = useNavigation();
  const [result, setResult] = useState('');
  const token = useSelector(state => state?.token?.token);
  useEffect(() => {
    getResult();
  }, []);
  const getResult = async () => {
    await UsersAPI.GetUsersByIdAPI(token, route.params)
      .then(res => {
        setResult(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi tiết thông tin NV'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <ScrollView style={styles.eachContainer}>
        <View style={styles.viewAvatar}>
          <Image
            source={
              result?.avatar_img
                ? {
                    uri: `${result?.avatar_img}`,
                  }
                : icons.ic_user
            }
            style={styles.avatarEmployee}
          />
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textTitle}>Tên : </Text>
          <Text style={styles.textContent}>{result?.full_name}</Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textTitle}>Địa Chỉ : </Text>
          <Text style={styles.textContent}>{result?.address}</Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textTitle}>SĐT : </Text>
          <Text style={styles.textContent}>{result?.phone_number}</Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textTitle}>ID : </Text>
          <Text style={styles.textContent}>{result?.id}</Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textTitle}>Area ID : </Text>
          <Text style={styles.textContent}>{result?.area_id}</Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textTitle}>Chức vụ : </Text>
          <Text style={styles.textContent}>{result?.role}</Text>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.background},
  eachContainer: {flex: 1, paddingHorizontal: 10},
  avatarEmployee: {height: 200, width: 200, borderRadius: 200},
  viewAvatar: {width: '100%', alignItems: 'center', marginVertical: 20},
  viewRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    height: 45,
  },
  textTitle: {color: 'black', fontSize: 18, fontWeight: 'bold', width: '30%'},
  textContent: {
    width: '65%',
    color: colors.mainColor,
    fontSize: 18,
    fontWeight: '800',
  },
});
export default EmployeeDetails;
