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
import {colors, icons, images} from '../../../../../../Constants';
import CustomAppBar from '../../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {uuid} from '../../../../../../utils/uuid';
import {useSelector} from 'react-redux';
import MaintenanceManagementAPI from '../../../../../../Api/Home/MaintenanceManagementAPI/MaintenanceManagementAPI';
import CustomTextButton from '../../../../../../Components/CustomTextButton';
const FiberOpticCableDetail = props => {
  const navigation = useNavigation();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const token = useSelector(state => state?.token?.token);
  const route = useRoute();
  const [result, setResult] = useState(null);
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
  const rejectMaintenanceIssue = async () => {
    let id = result?.id;
    await MaintenanceManagementAPI.RejectMaintenanceIssueAPI(token, id)
      .then(res => {
        if (res?.status == 200) {
          alert('Từ chối thành công');
          navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
        alert('Từ chối thất bại');
      });
  };
  const receiveMaintenanceIssue = async () => {
    let id = result?.id;
    await MaintenanceManagementAPI.ReceiveMaintenanceIssueAPI(token, id)
      .then(res => {
        if (res?.status == 200) {
          alert('Tiếp nhận thành công');
          navigation.navigate('ReportMaintenance', id);
        }
      })
      .catch(error => {
        console.log(error);
        alert('Tiếp nhận thất bại');
      });
  };
  const reportRequest = () => {
    let id = result?.id;
    navigation.navigate('ReportMaintenance', id);
  };
  const acceptance = async () => {
    let id = result?.id;
    await MaintenanceManagementAPI.AcceptanceMaintenanceRequestAPI(token, id)
      .then(res => {
        if (res?.status == 200) {
          alert('Nghiệm thu thành công');
          navigation.navigate('MaintenanceManagement');
        }
      })
      .catch(function (error) {
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
        title={'Chi tiết công việc'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.navigate('MaintenanceList')}
      />
      <ScrollView style={styles.eachContainer}>
        <Text style={[styles.title, {marginBottom: 10}]}>
          Thông tin công việc
        </Text>
        <ComponentViewRow title={'Mã VC : '} content={result?.code} />
        <ComponentViewRow title={'ID: '} content={result?.id} />

        <ComponentViewRow
          title={'Người được chỉ định : '}
          titleButton={'Chi tiết >>'}
          onPress={() =>
            navigation.navigate('DetailUser', result?.user_assigned_id)
          }
          content={result?.user_assigned}
        />
        <ComponentViewRow
          title={'Người tạo chỉ định : '}
          titleButton={'Chi tiết >>'}
          onPress={() =>
            navigation.navigate('DetailUser', result?.create_user_id)
          }
        />

        <ComponentViewRow
          title={'Thời gian yêu cầu : '}
          content={result?.required_time}
        />
        <ComponentViewRow
          title={'Tuyến cáp : '}
          titleButton={'Chi tiết >>'}
          onPress={() =>
            navigation.navigate('DetailOpticCable', result?.optical_cable_id)
          }
          content={result?.optical_cable}
        />
        <ComponentViewRow
          title={'Mô tả sự cố : '}
          content={result?.description}
        />
        <ComponentViewRow
          title={'Lặp lại : '}
          content={result?.repeat_by == 'MONTHLY' ? 'Hàng tháng' : ''}
        />
        <ComponentViewRow
          title={'Tình trạng : '}
          styleContent={{
            color: result?.issue_status == 'CHƯA TIẾP NHẬN' ? 'red' : 'green',
          }}
          content={result?.issue_status}
        />
        <View>
          <Text style={styles.content}>File đính kèm : </Text>
          <FlatList
            data={result?.document_files}
            keyExtractor={uuid}
            horizontal
            style={{height: 210}}
            renderItem={({item}) => renderDocumentFiles(item)}
          />
        </View>

        <ComponentViewRow
          title={'Thời gian tạo : '}
          content={result?.created_time}
        />
        <ComponentViewRow
          title={'Thời gian tiếp nhận : '}
          content={result?.received_time}
        />
        <ComponentViewRow
          title={'Thời gian hoàn thành : '}
          content={result?.completion_time}
        />
        {(result?.issue_status == 'CHƯA NGHIỆM THU' ||
          result?.issue_status == 'ĐÃ HOÀN THÀNH') && (
          <ComponentViewRow
            title={'Chi tiết báo cáo : '}
            titleButton={'Chi tiết >>'}
            onPress={() =>
              navigation.navigate('ReportMaintenanceDetail', result?.id)
            }
          />
        )}
      </ScrollView>
      {userInfor?.role == 'EMPLOYEE' &&
        result?.issue_status != 'CHƯA NGHIỆM THU' && (
          <ComponentTwoButton
            accept={result?.issue_status == 'ĐANG THỰC HIỆN'}
            disabledLeft={result?.issue_status == 'TỪ CHỐI' ? true : false}
            disabledRight={
              result?.issue_status == 'CHƯA TIẾP NHẬN' ? false : true
            }
            disableSecondRight={
              result?.issue_status == 'ĐANG THỰC HIỆN' ? false : true
            }
            onPressLeft={() => rejectMaintenanceIssue()}
            onPressRight={() => receiveMaintenanceIssue()}
            onPressSecondRight={() => reportRequest()}
          />
        )}
      {result?.issue_status == 'CHƯA NGHIỆM THU' &&
        userInfor?.role != 'EMPLOYEE' && (
          <View style={styles.viewRow}>
            <CustomTextButton
              styleButton={styles.viewCustomTextButton}
              label={'Từ chối'}
              textStyle={styles.textCustomTextButton}
              onPress={() => rejectMaintenanceIssue()}
            />
            <CustomTextButton
              styleButton={styles.viewCustomTextButton}
              label={'Nghiệm thu'}
              textStyle={styles.textCustomTextButton}
              onPress={() => acceptance()}
            />
          </View>
        )}
      {result?.issue_status == 'CHƯA TIẾP NHẬN' &&
        userInfor?.role != 'EMPLOYEE' && (
          <CustomTextButton
            styleButton={styles.viewCustomTextButton}
            label={'Hủy yêu cầu'}
            textStyle={styles.textCustomTextButton}
            onPress={() => rejectMaintenanceIssue()}
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
  content: {fontSize: 16, fontWeight: 'bold', color: 'black'},
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
  viewCustomTextButton: {
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.mainColor,
    alignSelf: 'center',
  },
  textCustomTextButton: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default FiberOpticCableDetail;

const ComponentViewRow = props => {
  const {
    title,
    content,
    styleTitle,
    styleContent,
    source,
    titleButton,
    onPress,
  } = props;
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
        <Text style={[styles.content, {maxWidth: '50%'}, styleContent]}>
          {content}
        </Text>
      )}
      {source && <Image style={[styles.image]} source={{uri: source}} />}
      {titleButton && (
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{fontSize: 16, color: colors.mainColor, fontWeight: 'bold'}}>
            {titleButton}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const ComponentTwoButton = props => {
  const {
    onPressLeft,
    onPressRight,
    disabledLeft,
    disabledRight,
    accept,
    onPressSecondRight,
    disableSecondRight,
  } = props;
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
      {accept ? (
        <TouchableOpacity
          disabled={disableSecondRight}
          onPress={onPressSecondRight}
          style={styles.buttonComponentTwoButton}>
          <Image
            source={icons.ic_document}
            style={[
              styles.imageComponentTwoButton,
              {tintColor: colors.mainColor},
            ]}
          />
          <Text style={{color: colors.mainColor}}>Báo cáo</Text>
        </TouchableOpacity>
      ) : (
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
      )}
    </View>
  );
};
