import React, {useEffect, useState, useCallback} from 'react';
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
  RefreshControl,
} from 'react-native';
import {colors, icons} from '../../../../../Constants';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomInput from '../../../../../Components/CustomInput';
import CustomButtonIcon from '../../../../../Components/CustomButtonIcon';
import {useSelector} from 'react-redux';
import OpticalCablesAPI from '../../../../../Api/Home/OpticalCablesAPI/OpticalCablesAPI';
import {ScreenStackHeaderSearchBarView} from 'react-native-screens';

const FiberOpticCableManagement = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [listOpticalCables, setListOpticalCables] = useState(null);
  const token = useSelector(state => state?.token?.token);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  useEffect(() => {
    getListOpticalCablesAPI();
  }, [route]);
  const getListOpticalCablesAPI = async () => {
    await OpticalCablesAPI.GetOpticalCablesAPI(token)
      .then(res => {
        setListOpticalCables(res?.data?.data);
      })
      .catch(error => console.log(error));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      getListOpticalCablesAPI();
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.buttonRender}
        onPress={() => {
          let id = item?.id;
          navigation.navigate('FibelOpticCableDetail', id);
        }}>
        <Text style={styles.titleRender}>{item?.name}</Text>
        <Text
          style={[
            styles.statusRender,
            {color: item?.is_active ? 'green' : 'red'},
          ]}>
          {item?.is_active ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Danh sách tuyến cáp'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View>
        <View style={styles.eachContainer}>
          <CustomInput
            styleInput={{height: 50, marginVertical: 10}}
            placeholder={'Tìm kiếm tuyến cáp'}
            source={icons.ic_seach}
            value={search}
            onChangeText={test => setSearch(test)}
          />
          <View style={styles.viewRowBetween}>
            <View style={{alignItems: 'flex-start'}}>
              <Text style={styles.title}>Lọc</Text>
              <TouchableOpacity style={styles.buttonPicker}>
                <Text style={styles.textPicker}>Lọc theo trạng thái</Text>
                <Image source={icons.ic_down} style={styles.imagePicker} />
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: colors.mainColor}}>Tạo tuyến cáp</Text>
              <CustomButtonIcon
                styleButton={styles.styleCustomButtonIcon}
                imageStyle={{width: 40, height: 40}}
                source={icons.ic_plusPurple}
                onPress={() => navigation.navigate('CreateNewCableRoute')}
              />
            </View>
          </View>

          <View style={styles.viewRow}>
            <Text style={[{width: '70%'}, styles.title]}>Tên tuyến</Text>
            <Text style={[{width: '30%'}, styles.title]}>Trạng thái</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={listOpticalCables}
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
    paddingHorizontal: 10,
    width: '100%',
  },
  viewRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  textPicker: {color: 'grey', fontSize: 16, fontWeight: '500'},
  buttonPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    borderRadius: 10,
    width: 200,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  imagePicker: {width: 25, height: 25, tintColor: colors.grey},
  styleCustomButtonIcon: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRow: {flexDirection: 'row'},
  titleRender: {width: '70%', fontSize: 15, fontWeight: '600', color: 'black'},
  statusRender: {width: '30%', fontSize: 15, fontWeight: '600'},
  buttonRender: {
    backgroundColor: 'white',
    height: 60,
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default FiberOpticCableManagement;
