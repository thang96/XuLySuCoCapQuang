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
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {colors, icons, images} from '../../../../../Constants';
import CustomInput from '../../../../../Components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import CustomButtonIcon from '../../../../../Components/CustomButtonIcon';
import {useSelector} from 'react-redux';
import IncidentManagementAPI from '../../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';

const IncidentList = props => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const token = useSelector(state => state?.token?.token);
  const [workList, setWorkList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  useEffect(() => {
    getResult();
  }, []);
  filteredworkList;
  const filteredworkList = () =>
    workList.filter(eachworkList =>
      eachworkList?.optical_cable
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()),
    );
  const getResult = async () => {
    await IncidentManagementAPI.GetListIssuesAPI(token)
      .then(res => {
        setWorkList(res?.data?.data);
      })
      .catch(error => console.log(error));
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      getResult();
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }, []);
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('IncidentDetail', item?.id)}
        style={styles.viewRowChildren}>
        <Text style={styles.textTitleChildren}>{item?.id}</Text>
        <Text style={styles.textTitleChildren}>{item?.optical_cable}</Text>
        <Text
          style={[
            styles.textTitleChildren,
            {color: item?.issue_status == 'CHƯA TIẾP NHẬN' ? 'red' : 'green'},
          ]}>
          {item?.issue_status}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconsLeft={icons.ic_back}
        title={'Danh sách sự cố'}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <View style={styles.viewRow}>
          <CustomInput
            disabled={true}
            styleInput={{flex: 1}}
            placeholder={'Tìm kiếm sự cố'}
            source={icons.seach}
            value={search}
            onChangeText={text => setSearch(text)}
          />
        </View>
        <View style={[styles.viewRowParents, {marginVertical: 5}]}>
          <Text style={styles.title}>Lọc</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.stylePicker}>
            <Text style={{color: 'black', fontSize: 16}}>Theo thời gian</Text>
            <Image
              source={icons.ic_downArrow}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.viewRowParents}>
          <Text style={styles.textTitle}>ID</Text>
          <Text style={styles.textTitle}>Tuyến cáp</Text>
          <Text style={styles.textTitle}>Tình trạng</Text>
        </View>
        <View style={{flex: 1}}>
          {filteredworkList().length > 0 ? (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={filteredworkList()}
              keyExtractor={key => key?.id}
              renderItem={({item, index}) => renderItem(item, index)}
            />
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.textWarning}>Không tìm thấy sự cố</Text>
            </View>
          )}
        </View>
        <View
          style={[styles.viewRowParents, {height: 30, alignItems: 'center'}]}>
          <Text>{`Tổng số : ${workList?.length}`}</Text>
        </View>
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
  styleButton: {
    height: 50,
    width: 70,
    marginStart: 10,
    backgroundColor: 'rgb(147,148,149)',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50,
    marginBottom: 10,
  },
  viewRow: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  customButtonText: {
    height: 50,
    width: 120,
    backgroundColor: colors.purple,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  viewRowParents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  textTitle: {
    color: colors.grey,
    fontWeight: '700',
    fontSize: 18,
  },
  viewRowChildren: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 5,
    marginVertical: 5,
  },
  textTitleChildren: {
    fontWeight: 'bold',
    fontSize: 14,
    maxWidth: '30%',
  },
  buttonRowBottom: {flexDirection: 'row', alignItems: 'center'},
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
export default IncidentList;
