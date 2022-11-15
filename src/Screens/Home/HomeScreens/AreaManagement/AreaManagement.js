import React, {useCallback, useEffect, useState} from 'react';
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
import {colors, icons} from '../../../../Constants';
import CustomAppBar from '../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomInput from '../../../../Components/CustomInput';
import CustomButtonIcon from '../../../../Components/CustomButtonIcon';
import {useSelector} from 'react-redux';
import OpticalCablesAPI from '../../../../Api/Home/OpticalCablesAPI/OpticalCablesAPI';
import AreaManagementAPI from '../../../../Api/Home/AreaManagementAPI/AreaManagementAPI';

const AreaManagement = props => {
  const navigation = useNavigation();
  const [listArea, setListArea] = useState(null);
  const token = useSelector(state => state?.token?.token);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  useEffect(() => {
    getListArea();
  }, []);

  const getListArea = async () => {
    await AreaManagementAPI.GetAreaAPI(token)
      .then(res => {
        setListArea(res?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        onPress={() => navigation.navigate('DetailArea', item?.id)}>
        <Text style={styles.titleRender}>{item?.area_name}</Text>
        <Text style={styles.titleRender}>{item?.id}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Danh sách khu vực'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View>
        <View style={styles.eachContainer}>
          <CustomInput
            styleInput={{height: 50, marginVertical: 10}}
            placeholder={'Tìm kiếm khu vực'}
            source={icons.ic_seach}
            value={search}
            onChangeText={text => setSearch(text)}
          />

          <View style={styles.viewRow}>
            <Text style={[{width: '70%'}, styles.title]}>Khu vực</Text>
            <Text style={[{width: '30%'}, styles.title]}>ID</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={listArea}
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
export default AreaManagement;
