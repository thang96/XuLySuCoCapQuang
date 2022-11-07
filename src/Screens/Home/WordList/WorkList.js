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
import CustomAppBar from '../../../Components/CustomAppBar';
import CustomTwoButtonFunction from '../../../Components/CustomTwoButtonFunction';
import {colors, icons, images} from '../../../Constants';
import CustomInput from '../../../Components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import CustomButtonIcon from '../../../Components/CustomButtonIcon';
import {useSelector} from 'react-redux';
import IncidentManagementAPI from '../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';
import MaintenanceManagementAPI from '../../../Api/Home/MaintenanceManagementAPI/MaintenanceManagementAPI';

const WordList = props => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const token = useSelector(state => state?.token?.token);
  const [listIncident, setListIncident] = useState(null);
  const [listMaintenance, setListMaintenance] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isIncident, setIsIncident] = useState(true);
  useEffect(() => {
    getResult();
  }, [navigation, token]);
  const getResult = async () => {
    await MaintenanceManagementAPI.GetMaintenanceIssuesAPI(token)
      .then(res => {
        setListMaintenance(res?.data?.data);
      })
      .catch(error => console.log(error));
    await IncidentManagementAPI.GetListIssuesAPI(token)
      .then(res => {
        setListIncident(res?.data?.data);
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
  return (
    <View style={styles.container}>
      <CustomAppBar title={'Danh sách công việc'} />
      <CustomTwoButtonFunction
        labelLeft={'Xử lý\nsự cố'}
        labelRight={'Bảo trì\nbảo dưỡng'}
        isChoose={isIncident}
        onPressLeftButton={() => setIsIncident(true)}
        onPressRightButton={() => setIsIncident(false)}
      />
      {isIncident ? (
        <CustomListIncident
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={listIncident}
          onPressItem={item => {
            let id = item?.id;
            navigation.navigate('StackIncidentManagement', {
              screen: 'IncidentDetail',
              params: id,
            });
          }}
        />
      ) : (
        <CustomListMaintenance
          data={listMaintenance}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onPressItem={item => {
            let id = item?.id;
            navigation.navigate('StackMaintenanceManagement', {
              screen: 'FiberOpticCableDetail',
              params: id,
            });
          }}
        />
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
  viewRowChildren: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginVertical: 5,
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  textTitleChildren: {fontSize: 16, fontWeight: 'bold', color: 'black'},
});

const CustomListIncident = props => {
  const {data, onPressItem, refreshing, onRefresh} = props;
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
        style={styles.viewRowChildren}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '55%'}}>
          <Text style={[styles.textTitleChildren, {marginRight: 10}]}>
            {item?.id}
          </Text>
          <Text style={[styles.textTitleChildren, {maxWidth: '90%'}]}>
            {item?.optical_cable}
          </Text>
        </View>
        <Text
          style={[
            styles.textTitleChildren,
            {
              color: item?.issue_status == 'CHƯA TIẾP NHẬN' ? 'red' : 'green',
              maxWidth: '40%',
            },
          ]}>
          {item?.issue_status}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        keyExtractor={key => key?.id}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </View>
  );
};

const CustomListMaintenance = props => {
  const {data, onPressItem, refreshing, onRefresh} = props;
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
        style={styles.viewRowChildren}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '55%'}}>
          <Text style={[styles.textTitleChildren, {marginRight: 10}]}>
            {item?.id}
          </Text>
          <Text style={[styles.textTitleChildren, {maxWidth: '90%'}]}>
            {item?.optical_cable}
          </Text>
        </View>
        <Text
          style={[
            styles.textTitleChildren,
            {
              color: item?.issue_status == 'CHƯA TIẾP NHẬN' ? 'red' : 'green',
              maxWidth: '40%',
            },
          ]}>
          {item?.issue_status}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={data}
        keyExtractor={key => key?.id}
        renderItem={({item, index}) => renderItem(item, index)}
      />
    </View>
  );
};

export default WordList;
