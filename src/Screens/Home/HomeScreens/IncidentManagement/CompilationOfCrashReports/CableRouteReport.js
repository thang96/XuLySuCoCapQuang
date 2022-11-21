import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {colors, icons} from '../../../../../Constants';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomInput from '../../../../../Components/CustomInput';
import {useSelector} from 'react-redux';
import OpticalCablesAPI from '../../../../../Api/Home/OpticalCablesAPI/OpticalCablesAPI';

const CableRouteReport = props => {
  const navigation = useNavigation();
  const [listOpticalCables, setListOpticalCables] = useState([]);
  const token = useSelector(state => state?.token?.token);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getListOpticalCablesAPI();
  }, []);
  const getListOpticalCablesAPI = async () => {
    await OpticalCablesAPI.GetOpticalCablesAPI(token)
      .then(res => {
        setListOpticalCables(res?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  const filteredOpticalCables = () =>
    listOpticalCables.filter(eachOpticalCables =>
      eachOpticalCables?.name
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()),
    );
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      getListOpticalCablesAPI();
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
          navigation.navigate('CompilationOfCrashReports', id);
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
        title={'Báo cáo sự cố tuyến cáp'}
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
                placeholder={'Tìm kiếm tuyến cáp'}
                source={icons.ic_seach}
                value={search}
                onChangeText={text => setSearch(text)}
              />

              <View style={styles.viewRow}>
                <Text style={[{width: '70%'}, styles.title]}>Tên tuyến</Text>
                <Text style={[{width: '30%'}, styles.title]}>Trạng thái</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            {filteredOpticalCables().length > 0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={filteredOpticalCables()}
                keyExtractor={key => key.id}
                renderItem={({item, index}) => renderItem(item, index)}
              />
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textWarning}>Không tìm thấy tuyến cáp</Text>
              </View>
            )}
          </View>
        </View>
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
export default CableRouteReport;
