import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {colors, icons, images} from '../../../../../Constants';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import MaintenanceManagementAPI from '../../../../../Api/Home/MaintenanceManagementAPI/MaintenanceManagementAPI';
import {uuid} from '../../../../../utils/uuid';
const DetailMaintenanceRequests = props => {
  const navigation = useNavigation();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const token = useSelector(state => state?.token?.token);
  const [result, setResult] = useState(null);
  const route = useRoute();
  useEffect(() => {
    getDetail();
  }, [route, token]);
  const getDetail = async () => {
    let id = route.params;
    await MaintenanceManagementAPI.GetMaintenanceIssueByIdAPI(token, id)
      .then(res => {
        setResult(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const rejectIssue = async () => {
    await MaintenanceManagementAPI.RejectMaintenanceIssueAPI(token, result?.id)
      .then(res => {
        if (res?.status == 200) {
          alert('Từ chối thành công');
          navigation.navigate('MaintenanceManagement');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const receiveIssue = async () => {
    let id = result?.id;
    await MaintenanceManagementAPI.ReceiveMaintenanceIssueAPI(token, id)
      .then(res => {
        if (res?.status == 200) {
          alert('Tiếp nhận thành công');
          navigation.navigate('MaintenanceManagement');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const renderDocumentFiles = item => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ShowImageScreen', item)}
        style={{borderWidth: 1}}>
        <Image
          source={{uri: item?.path}}
          style={{width: 200, height: 200, marginRight: 5}}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi tiết yêu cầu'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() =>
          navigation.navigate('AcceptMaintenanceRequests')
        }
      />
      <ScrollView style={styles.eachContainer}>
        <Text style={[styles.title, {marginBottom: 10}]}>
          Thông tin công việc
        </Text>
        <ComponentViewRow title={'Mã VC : '} content={result?.code} />
        <ComponentViewRow title={'ID: '} content={result?.id} />
        <ComponentViewRow
          title={'Nhân sự kỹ thuật : '}
          content={result?.user_assigned}
        />
        <ComponentViewRow
          title={'Tình trạng : '}
          styleContent={{
            color: result?.issue_status == 'CHƯA TIẾP NHẬN' ? 'red' : 'green',
          }}
          content={result?.issue_status}
        />
        <ComponentViewRow
          title={'Tuyến cáp : '}
          content={result?.optical_cable}
        />
        <ComponentViewRow
          title={'Thời gian yêu cầu : '}
          content={result?.required_time}
        />
        <ComponentViewRow
          title={'Mô tả sự cố : '}
          content={result?.description}
        />
        <View>
          <Text style={styles.content}>File đính kèm : </Text>
          <FlatList
            style={{height: 210}}
            horizontal
            data={result?.document_files}
            keyExtractor={uuid}
            renderItem={({item}) => renderDocumentFiles(item)}
          />
        </View>
        <ComponentViewRow
          title={'Thời gian tiếp nhận : '}
          content={result?.received_time}
        />
        <ComponentViewRow
          title={'Thời gian hoàn thành : '}
          content={result?.completion_time}
        />
      </ScrollView>
      {userInfor?.role != 'GENERAL_MANAGER' && (
        <ComponentTwoButton
          disabledLeft={result?.issue_status == 'TỪ CHỐI' ? true : false}
          disabledRight={
            result?.issue_status == 'CHƯA TIẾP NHẬN' ? false : true
          }
          onPressLeft={() => rejectIssue()}
          onPressRight={() => receiveIssue()}
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
    marginTop: 10,
  },
  title: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  content: {fontSize: 16, fontWeight: 'bold'},
  image: {width: '70%', height: 150},
  viewComponentTwoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
  },
  buttonComponentTwoButton: {
    height: 50,
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageComponentTwoButton: {height: 25, width: 25, marginRight: 5},
});

export default DetailMaintenanceRequests;

const ComponentViewRow = props => {
  const {title, content, styleTitle, styleContent, source} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
      }}>
      <Text style={[styles.content, {width: '25%'}, styleTitle]}>{title}</Text>
      {content && (
        <Text style={[styles.content, {width: '70%'}, styleContent]}>
          {content}
        </Text>
      )}
      {source && <Image style={[styles.image]} source={{uri: source}} />}
    </View>
  );
};
const ComponentTwoButton = props => {
  const {onPressLeft, onPressRight, disabledLeft, disabledRight} = props;
  return (
    <View style={styles.viewComponentTwoButton}>
      <TouchableOpacity
        disabled={disabledLeft}
        onPress={onPressLeft}
        style={styles.buttonComponentTwoButton}>
        <Image
          source={icons.ic_back}
          style={[styles.imageComponentTwoButton, {tintColor: 'grey'}]}
        />
        <Text style={{color: 'grey'}}>Quay lại</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabledRight}
        onPress={onPressRight}
        style={styles.buttonComponentTwoButton}>
        <Image
          source={icons.ic_document}
          style={[
            styles.imageComponentTwoButton,
            {tintColor: colors.mainColor},
          ]}
        />
        <Text style={{color: colors.mainColor}}>Tiếp nhận</Text>
      </TouchableOpacity>
    </View>
  );
};
