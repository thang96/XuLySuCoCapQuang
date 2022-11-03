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
import CustomButtonFunction from '../../../../../Components/CustomButtonFunction';
import CustomViewRowFunction from '../../../../../Components/CustomViewRowFunction';
import {colors, icons} from '../../../../../Constants';
import CustomInput from '../../../../../Components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import CustomButtonText from '../../../../../Components/CustomTextButton';
const FAKE_DATA = [
  {name: 'Cáp A1', amount: '100', id: 1},
  {name: 'Cáp A2', amount: '400', id: 2},
  {name: 'Cáp A3', amount: '200', id: 3},
  {name: 'Cáp A4', amount: '600', id: 4},
  {name: 'Cáp A5', amount: '900', id: 5},
  {name: 'Cáp A6', amount: '200', id: 6},
  {name: 'Cáp A7', amount: '300', id: 7},
  {name: 'Cáp A8', amount: '300', id: 8},
  {name: 'Cáp A9', amount: '170', id: 9},
  {name: 'Cáp A10', amount: '250', id: 10},
];
const ListOfSupplies = props => {
  const navigation = useNavigation();
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('SuppliesInformation', {item})}
        style={styles.buttonRender}>
        <Image source={icons.receipt} style={styles.imageRender} />
        <View>
          <Text style={styles.titleRender}>{item.name}</Text>
          <Text style={styles.amountRender}>{item.amount}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Danh sách vật tư'}
        iconsLeft={icons.back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <CustomInput
          placeholder={'Tìm kiếm vật tư'}
          styleInput={styles.customInput}
          source={icons.seach}
        />
        <FlatList
          data={FAKE_DATA}
          keyExtractor={key => key.id}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      </View>
      <Text
        style={[
          styles.titleRender,
          {marginVertical: 3},
        ]}>{`Tổng số : ${FAKE_DATA.length} vật tư`}</Text>
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
  customInput: {height: 50, marginVertical: 10},
  buttonRender: {
    height: 60,
    borderRadius: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  imageRender: {height: 50, width: 50, marginRight: 10},
  titleRender: {color: colors.grey, fontWeight: 'bold', fontSize: 18},
  amountRender: {color: colors.grey, fontSize: 16},
});
export default ListOfSupplies;
