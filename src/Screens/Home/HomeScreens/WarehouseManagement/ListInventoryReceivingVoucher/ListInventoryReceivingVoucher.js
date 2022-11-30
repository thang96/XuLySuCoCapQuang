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
import {colors, icons} from '../../../../../Constants';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import CustomInput from '../../../../../Components/CustomInput';
import CustomButtonIcon from '../../../../../Components/CustomButtonIcon';
import {useSelector} from 'react-redux';
import {GetInventoryReceivingVoucherAPI} from '../../../../../Api/Home/StableWarehouseAPI/StableWarehouseAPI';

const ListInventoryReceivingVoucher = props => {
  const navigation = useNavigation();
  const IsFocused = useIsFocused();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const [listVoucher, setListVoucher] = useState([]);
  const token = useSelector(state => state?.token?.token);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getlistVoucherAPI();
  }, [IsFocused]);
  const getlistVoucherAPI = async () => {
    await GetInventoryReceivingVoucherAPI(token)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setListVoucher(res?.data?.data);
          setLoading(false);
        }
      })
      .catch(error => {
        // console.log(error);
      });
  };
  const filteredVoucher = () =>
    listVoucher.filter(eachVoucher =>
      eachVoucher?.reason
        ? eachVoucher?.reason
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        : null,
    );
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      getlistVoucherAPI();
      setRefreshing(false);
    } catch (error) {
      // console.log(error);
    }
  }, []);
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.buttonRender}
        onPress={() => {
          let id = item?.id;
          navigation.navigate('DetailInventoryReceivingVoucher', id);
        }}>
        <Text style={styles.titleRender}>{item?.reason}</Text>
        <Text
          style={[
            styles.statusRender,
            {
              color:
                item?.status == 'NEW'
                  ? 'blue'
                  : item?.status == 'APPROVED'
                  ? 'green'
                  : item?.status == 'REJECTED'
                  ? 'red'
                  : null,
            },
          ]}>
          {item?.status == 'NEW'
            ? 'Chưa phê duyệt'
            : item?.status == 'APPROVED'
            ? 'Đã phê duyệt'
            : item?.status == 'REJECTED'
            ? 'Đã từ chối'
            : null}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Danh sách phiếu nhập kho'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      {loading == false ? (
        <View style={{flex: 1}}>
          <View>
            <View style={styles.eachContainer}>
              <CustomInput
                styleInput={{height: 50, marginVertical: 10}}
                placeholder={'Tìm kiếm phiếu theo lý do'}
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
                {userInfor?.role != 'EMPLOYEE' && (
                  <View style={{alignItems: 'center'}}>
                    <Text style={{color: colors.mainColor}}>Tạo phiếu</Text>
                    <CustomButtonIcon
                      styleButton={styles.styleCustomButtonIcon}
                      imageStyle={{
                        width: 40,
                        height: 40,
                        tintColor: colors.mainColor,
                      }}
                      source={icons.ic_plusPurple}
                      onPress={() =>
                        navigation.navigate('CreateAInventoryReceivingVoucher')
                      }
                    />
                  </View>
                )}
              </View>

              <View style={styles.viewRow}>
                <Text style={[{width: '70%'}, styles.title]}>Lý do</Text>
                <Text style={[{width: '30%'}, styles.title]}>Trạng thái</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            {filteredVoucher().length > 0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={filteredVoucher()}
                keyExtractor={key => key.id}
                renderItem={({item, index}) => renderItem(item, index)}
              />
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textWarning}>Không tìm thấy phiếu</Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <ActivityIndicator color={colors.mainColor} size={'large'} />
      )}
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
  textWarning: {
    color: colors.mainColor,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default ListInventoryReceivingVoucher;
