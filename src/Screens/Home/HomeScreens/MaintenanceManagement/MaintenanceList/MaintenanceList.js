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
  ActivityIndicator,
} from 'react-native';
import {colors, icons} from '../../../../../Constants';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import CustomInput from '../../../../../Components/CustomInput';
import {useSelector} from 'react-redux';
import MaintenanceManagementAPI from '../../../../../Api/Home/MaintenanceManagementAPI/MaintenanceManagementAPI';

const MaintenanceList = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [workList, setWorkList] = useState([]);
  const token = useSelector(state => state?.token?.token);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListOpticalCablesAPI();
  }, [isFocused]);
  const getListOpticalCablesAPI = async () => {
    await MaintenanceManagementAPI.GetMaintenanceIssuesAPI(token)
      .then(res => {
        setWorkList(res?.data?.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  };
  filteredworkList;
  const filteredworkList = () =>
    workList.filter(eachworkList =>
      eachworkList?.optical_cable
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()),
    );
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
    let id = item?.id;
    return (
      <TouchableOpacity
        style={styles.buttonRender}
        onPress={() => navigation.navigate('MaintenanceDetail', id)}>
        <Text style={styles.titleRender}>{item?.optical_cable}</Text>
        <Text
          style={[
            styles.statusRender,
            {color: item?.issue_status != 'CH??A TI???P NH???N' ? 'green' : 'red'},
          ]}>
          {item?.issue_status}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Danh s??ch b???o tr??'}
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
                placeholder={'T??m ki???m b???o tr??'}
                source={icons.ic_seach}
                value={search}
                onChangeText={text => setSearch(text)}
              />
              <View style={[styles.viewRowBetween, {marginVertical: 5}]}>
                <Text style={styles.title}>L???c</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={styles.stylePicker}>
                  <Text style={{color: 'black', fontSize: 16}}>
                    Theo th???i gian
                  </Text>
                  <Image
                    source={icons.ic_downArrow}
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.viewRow}>
                <Text style={[{width: '70%'}, styles.title]}>T??n tuy???n</Text>
                <Text style={[{width: '30%'}, styles.title]}>Tr???ng th??i</Text>
              </View>
            </View>
          </View>
          <View style={{flex: 1}}>
            {filteredworkList().length > 0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={filteredworkList()}
                keyExtractor={key => key?.id}
                renderItem={({item, index}) => renderItem(item, index)}
              />
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textWarning}>Kh??ng t??m th???y b???o tr??</Text>
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
  stylePicker: {
    height: 50,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textWarning: {
    color: colors.mainColor,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
export default MaintenanceList;
