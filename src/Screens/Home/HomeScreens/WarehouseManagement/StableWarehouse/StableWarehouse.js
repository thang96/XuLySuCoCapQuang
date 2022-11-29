import {useNavigation, useIsFocused} from '@react-navigation/native';
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
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {colors, icons} from '../../../../../Constants';
import {GetStableWarehouseAPI} from '../../../../../Api/Home/StableWarehouseAPI/StableWarehouseAPI';
import CustomButtonIcon from '../../../../../Components/CustomButtonIcon';
import CustomInput from '../../../../../Components/CustomInput';
const StableWarehouse = () => {
  const token = useSelector(state => state?.token?.token);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [listStableWarehouse, setListStableWarehouse] = useState(true);
  const userInfor = useSelector(state => state?.userInfor?.userInfor);

  useEffect(() => {
    getListStableWarehouse();
  }, [isFocused]);

  const getListStableWarehouse = async () => {
    await GetStableWarehouseAPI(token)
      .then(res => {
        setListStableWarehouse(res?.data?.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };
  const filteredStableWarehouse = () =>
    listStableWarehouse.filter(eachStableWarehouse =>
      eachStableWarehouse?.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()),
    );
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      getListStableWarehouse();
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
          navigation.navigate('DetailStableWarehouse', id);
        }}>
        <Text style={styles.titleRender}>{item?.name}</Text>
        <Text style={[styles.statusRender]}>{item?.code}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Danh sách tổng kho'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.mainColor} />
      ) : (
        <View style={{flex: 1}}>
          <View>
            <View style={styles.eachContainer}>
              <CustomInput
                styleInput={{height: 50, marginVertical: 10}}
                placeholder={'Tìm kiếm kho'}
                source={icons.ic_seach}
                value={search}
                onChangeText={test => setSearch(test)}
              />

              <View style={styles.viewRow}>
                <Text style={[{width: '70%'}, styles.title]}>Tên kho</Text>
                <Text style={[{width: '30%'}, styles.title]}>Mã</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            {filteredStableWarehouse().length > 0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={filteredStableWarehouse()}
                keyExtractor={key => key.id}
                renderItem={({item, index}) => renderItem(item, index)}
              />
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textWarning}>Không tìm thấy kho</Text>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {paddingHorizontal: 10, width: '100%'},
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
  imagePicker: {width: 25, height: 25, tintColor: colors.grey},
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
  viewRow: {flexDirection: 'row'},
  textWarning: {
    color: colors.mainColor,
    fontWeight: 'bold',
    fontSize: 20,
  },
  styleCustomButtonIcon: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
export default StableWarehouse;
