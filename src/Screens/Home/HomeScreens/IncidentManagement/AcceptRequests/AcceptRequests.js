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
  Keyboard,
  ScrollView,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {colors, icons, images} from '../../../../../Constants';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import IncidentManagementAPI from '../../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';
const AcceptRequests = props => {
  const navigation = useNavigation();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const token = useSelector(state => state?.token?.token);
  const [workList, setWorkList] = useState(null);
  const route = useRoute();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getResult();
  }, []);
  const getResult = async () => {
    await IncidentManagementAPI.GetListIssuesAPI(token)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          let workList = res?.data?.data;
          setWorkList(
            workList.filter(
              eachWork => eachWork?.issue_status == 'CHƯA TIẾP NHẬN',
            ),
          );
          setLoading(false);
        }
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
    let id = item?.id;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('IncidentDetail', id)}
        style={[styles.viewRow, {backgroundColor: 'white', height: 50}]}>
        <Text style={styles.titleRender}>{item?.id}</Text>
        <Text style={styles.titleRender}>{item?.optical_cable}</Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: item?.issue_status == 'CHƯA TIẾP NHẬN' ? 'red' : 'green',
            maxWidth: '33%',
          }}>
          {item?.issue_status}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Tiếp nhận yêu cầu'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.mainColor} />
      ) : (
        <View style={styles.eachContainer}>
          <View style={styles.viewRow}>
            <Text style={styles.title}>ID</Text>
            <Text style={styles.title}>Tuyến cáp</Text>
            <Text style={styles.title}>Tình trạng</Text>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={workList}
            keyExtractor={key => key?.id}
            renderItem={({item, index}) => renderItem(item, index)}
          />
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
    flex: 1,
    paddingHorizontal: 10,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    maxWidth: '33%',
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  titleRender: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    maxWidth: '33%',
  },
});

export default AcceptRequests;
