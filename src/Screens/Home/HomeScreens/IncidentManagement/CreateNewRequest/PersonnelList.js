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
  ScrollView,
} from 'react-native';
import CustomInput from '../../../../../Components/CustomInput';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import CustomTwoButtonFunction from '../../../../../Components/CustomTwoButtonFunction';
import {colors, icons} from '../../../../../Constants';
import CustomTextButton from '../../../../../Components/CustomTextButton';
import CustomButtonIcon from '../../../../../Components/CustomButtonIcon';
const FAKE_DATA = [
  {name: 'Nguyễn văn A', MSNV: 123456},
  {name: 'Nguyễn văn B', MSNV: 123457},
  {name: 'Nguyễn văn C', MSNV: 123458},
  {name: 'Nguyễn văn D', MSNV: 123459},
  {name: 'Nguyễn văn E', MSNV: 123451},
  {name: 'Nguyễn văn F', MSNV: 123452},
  {name: 'Nguyễn văn G', MSNV: 123453},
  {name: 'Nguyễn văn H', MSNV: 123454},
  {name: 'Nguyễn văn K', MSNV: 123455},
  {name: 'Nguyễn văn L', MSNV: 123450},
];
const PersonnelList = props => {
  const windowWidth = Dimensions.get('window').width;
  const route = useRoute();
  const [isChoose, setIsChoose] = useState(route.params.params.isChoose);
  const navigation = useNavigation();

  const renderItem = (item, index) => {
    return (
      <View style={[styles.renderViewRow, {width: windowWidth - 20}]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image source={icons.user} style={styles.imageUse} />
          <View>
            <Text style={styles.useName}>{item.name}</Text>
            <Text style={styles.employeeNumber}>{`MSNV : ${item.MSNV}`}</Text>
          </View>
        </View>
        <CustomTextButton
          label={'Gửi yêu cầu >'}
          colorText={colors.purple}
          onPress={() => navigation.navigate('CreateRequest', {params: {item}})}
        />
      </View>
    );
  };
  const renderItemPages = (item, index) => {
    return (
      <View
        style={{
          height: 50,
          width: 60,
          marginRight: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 40,
            backgroundColor: colors.purple,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>{index + 1}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar title={'Danh sách nhân sự'} />
      <CustomTwoButtonFunction
        labelLeft={'Quản lý khu vực'}
        labelRight={'Nhân viên'}
        onPressLeftButton={() => setIsChoose(true)}
        onPressRightButton={() => setIsChoose(false)}
        isChoose={isChoose}
      />
      <CustomInput styleInput={styles.customInput} placeholder={'Tìm kiếm'} />
      <Text style={styles.title}>Danh sách nhân viên</Text>
      <FlatList
        keyExtractor={key => key.MSNV.toString()}
        data={FAKE_DATA}
        renderItem={({item, index}) => renderItem(item, index)}
      />
      <View style={[styles.viewPages, {width: windowWidth}]}>
        <CustomButtonIcon source={icons.back} imageStyle={styles.customImage} />
        <View style={{width: 200, height: 50}}>
          <FlatList
            horizontal
            keyExtractor={key => key.MSNV.toString()}
            data={FAKE_DATA}
            renderItem={({item, index}) => renderItemPages(item, index)}
          />
        </View>
        <TouchableOpacity style={styles.buttonPages}>
          <Text style={{color: 'white'}}>{FAKE_DATA.length + 1}</Text>
        </TouchableOpacity>
        <CustomButtonIcon source={icons.next} imageStyle={styles.customImage} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  customInput: {
    width: '100%',
    height: 50,
    marginVertical: 20,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  renderViewRow: {
    flexDirection: 'row',

    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  imageUse: {width: 50, height: 50, borderRadius: 50, marginRight: 10},
  useName: {
    color: colors.purple,
    fontSize: 18,
    fontWeight: 'bold',
  },
  employeeNumber: {
    fontSize: 16,
    color: 'black',
  },
  viewPages: {
    height: 50,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customImage: {
    tintColor: colors.purple,
  },
  buttonPages: {
    width: 60,
    height: 40,
    backgroundColor: colors.purple,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default PersonnelList;
