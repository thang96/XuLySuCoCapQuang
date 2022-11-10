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
import {colors, icons} from '../../../../../Constants';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomInput from '../../../../../Components/CustomInput';
import {uuid} from '../../../../../utils/uuid';
import {useSelector} from 'react-redux';
import IncidentManagementAPI from '../../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';

const CompilationOfCrashReports = props => {
  const navigation = useNavigation();
  const [listIncidentReport, setListIncidentReport] = useState([]);
  const token = useSelector(state => state?.token?.token);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const route = useRoute();
  useEffect(() => {
    getListOpticalCablesAPI();
  }, []);
  const getListOpticalCablesAPI = async () => {
    let id = route.params;
    await IncidentManagementAPI.GetListReportsIssuesAPI(token, id)
      .then(res => {
        setListIncidentReport(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const filteredListReport = () =>
    listIncidentReport.filter(eachListReport =>
      eachListReport?.code
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
    return (
      <TouchableOpacity
        style={styles.buttonRender}
        onPress={() => {
          let id = item?.id;
          navigation.navigate('DetailOfCrashReports', id);
        }}>
        <Text style={styles.titleRender}>{item?.code}</Text>
        <Text style={styles.titleRender}>{item?.description}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Báo cáo tổng hợp'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View>
        <View style={styles.eachContainer}>
          <CustomInput
            styleInput={{height: 50, marginVertical: 10}}
            placeholder={'Tìm kiếm mã công việc'}
            source={icons.ic_seach}
            value={search}
            onChangeText={text => setSearch(text)}
          />

          <View style={styles.viewRowBetween}>
            <Text style={[styles.title]}>Mã CV</Text>
            <Text style={[styles.title]}>Mô tả</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1}}>
        {filteredListReport().length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={filteredListReport()}
            keyExtractor={uuid}
            renderItem={({item, index}) => renderItem(item, index)}
          />
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.textWarning}>Không tìm thấy sự cố</Text>
          </View>
        )}
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
  titleRender: {fontSize: 15, fontWeight: '600', color: 'black'},
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
export default CompilationOfCrashReports;
