import {useNavigation} from '@react-navigation/native';
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
} from 'react-native';
import CustomAppBar from '../../../../../../../Components/CustomAppBar';
import CustomInput from '../../../../../../../Components/CustomInput';
import {colors, icons} from '../../../../../../../Constants';

const FAKE_DATA = [
  {title: 'Sự cố đứt cáp', time: '30/09/2022', id: 1},
  {title: 'Sự cố gián đoạn', time: '25/09/2022', id: 2},
  {title: 'Sự cố mất mạng', time: '21/09/2022', id: 3},
  {title: 'Sự cố mất cáp', time: '03/08/2022', id: 4},
  {title: 'Sự cố gián đoạn', time: '02/08/2022', id: 5},
  {title: 'Sự cố đứt cáp', time: '21/07/2022', id: 6},
  {title: 'Sự cố đứt cáp', time: '01/07/2022', id: 7},
  {title: 'Sự cố đứt cáp', time: '05/06/2022', id: 8},
  {title: 'Sự cố đứt cáp', time: '27/03/2022', id: 9},
  {title: 'Sự cố đứt cáp', time: '01/03/2022', id: 10},
  {title: 'Sự cố đứt cáp', time: '20/01/2022', id: 11},
];
const IncidentHistory = props => {
  const navigation = useNavigation();
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          marginTop: 10,
          height: 60,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={icons.ic_incidentManagement}
          style={{width: 50, height: 50}}
        />
        <View>
          <Text>{item.title}</Text>
          <Text>{item.time}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Lịch sử xử lý sự cố'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <CustomInput
          styleInput={{height: 50, marginVertical: 10}}
          placeholder={'Tìm kiếm sự cố'}
          source={icons.ic_seach}
        />
        <FlatList
          data={FAKE_DATA}
          keyExtractor={key => key.id}
          renderItem={({item, index}) => renderItem(item, index)}
        />
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
  },
});
export default IncidentHistory;
