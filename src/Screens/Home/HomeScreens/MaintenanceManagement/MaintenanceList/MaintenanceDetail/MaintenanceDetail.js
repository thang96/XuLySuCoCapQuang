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
  ActivityIndicator,
  Alert,
} from 'react-native';
import {colors, icons, images} from '../../../../../../Constants';
import CustomAppBar from '../../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {uuid, isImage} from '../../../../../../utils/uuid';
import {downloadFile} from '../../../../../../utils/DownloadFile';
import {useSelector} from 'react-redux';
import MaintenanceManagementAPI from '../../../../../../Api/Home/MaintenanceManagementAPI/MaintenanceManagementAPI';
import CustomTextButton from '../../../../../../Components/CustomTextButton';
import CustomConfirm from '../../../../../../Components/CustomConfirm';
import CustomLoading from '../../../../../../Components/CustomLoading';
const FiberOpticCableDetail = props => {
  const navigation = useNavigation();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const token = useSelector(state => state?.token?.token);
  const route = useRoute();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getDetail();
  }, [route, token]);
  const getDetail = async () => {
    let id = route.params;
    await MaintenanceManagementAPI.GetMaintenanceIssueByIdAPI(token, id)
      .then(res => {
        setResult(res?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const rejectMaintenanceIssue = async () => {
    setIsLoading(true);
    let id = result?.id;
    await MaintenanceManagementAPI.RejectMaintenanceIssueAPI(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setIsLoading(false);
          Alert.alert('Bảo trì', 'Từ chối thành công');
          navigation.goBack();
        } else if (res?.status == 200 && res?.data?.success == false) {
          setIsLoading(false);
          Alert.alert('Bảo trì', 'Không thể từ chôi');
        }
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert('Bảo trì', 'Từ chối thất bại');
      });
  };
  const receiveMaintenanceIssue = async () => {
    setIsLoading(true);
    let id = result?.id;
    await MaintenanceManagementAPI.ReceiveMaintenanceIssueAPI(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setIsLoading(false);
          Alert.alert('Bảo trì', 'Tiếp nhận thành công');
          navigation.navigate('MaintenanceList');
        } else if (res?.status == 200 && res?.data?.success == false) {
          setIsLoading(false);
          Alert.alert('Bảo trì', 'Không thể tiếp nhận');
        }
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert('Bảo trì', 'Tiếp nhận thất bại');
      });
  };
  const reportRequest = () => {
    let id = result?.id;
    navigation.navigate('ReportMaintenance', id);
  };
  const acceptance = async () => {
    setIsLoading(true);
    let id = result?.id;
    await MaintenanceManagementAPI.AcceptanceMaintenanceRequestAPI(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setIsLoading(false);
          Alert.alert('Bảo trì', 'Nghiệm thu thành công');
          navigation.navigate('MaintenanceManagement');
        } else if (res?.status == 200 && res?.data?.success == false) {
          setIsLoading(false);
          Alert.alert('Bảo trì', 'Không thể nghiệm thu');
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        Alert.alert('Bảo trì', 'Nghiệm thu thất bại');
        console.log(error);
      });
  };
  const renderDocumentFiles = item => {
    return (
      <View>
        {isImage(`${item?.path}`) == true ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('ShowImageScreen', item)}
            style={{borderWidth: 1}}>
            <Image
              source={{uri: item?.path}}
              style={{width: 200, height: 200, marginRight: 5}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={[
              {width: 200, height: 200, marginRight: 5},
              styles.renderDocumentFiles,
            ]}>
            <TouchableOpacity
              onPress={() => downloadFile(item?.path)}
              style={styles.styleCenter}>
              <Text style={[styles.content, {color: colors.mainColor}]}>
                Download file
              </Text>
              <Image
                source={icons.ic_download}
                style={{width: 50, height: 50, tintColor: colors.mainColor}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  const [confirm, setConfirm] = useState(false);
  const deleteMaintenance = async () => {
    setIsLoading(true);
    let id = result?.id;
    await MaintenanceManagementAPI.DeleteMaintenanceIssueByIdAPI(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setIsLoading(false);
          Alert.alert(
            'Yêu cầu bảo trì',
            'Xóa yêu cầu xử lý bảo trì thành công',
          );
          navigation.goBack();
          setConfirm(false);
        } else if (res?.status == 200 && res?.data?.success == false) {
          setIsLoading(false);
          Alert.alert('Yêu cầu bảo trì', 'Không thể xóa yêu cầu xử lý bảo trì');
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        Alert.alert('Yêu cầu bảo trì', 'Xóa yêu cầu xử lý bảo trì thất bại');
      });
  };
  const [edit, setEdit] = useState(false);
  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.viewModal}>
          <CustomLoading
            modalVisible={isLoading}
            onRequestClose={() => setIsLoading(false)}
          />
        </View>
      )}
      <CustomAppBar
        title={'Chi tiết bảo trì'}
        iconsLeft={icons.ic_back}
        iconRight={userInfor?.role != 'EMPLOYEE' ? icons.ic_delete : null}
        iconFirtRight={userInfor?.role != 'EMPLOYEE' ? icons.ic_edit : null}
        onPressIconsLeft={() => navigation.navigate('MaintenanceList', result)}
        onPressIconsRight={() => setConfirm(true)}
        onPressFirtIconsRight={() => setEdit(true)}
      />
      {confirm && (
        <View style={styles.viewModal}>
          <CustomConfirm
            title={'Yêu cầu bảo trì'}
            content={'Bạn có muốn xóa yêu cầu bảo trì ?'}
            leftLabel={'Trở lại'}
            rightLabel={'Xóa'}
            leftPress={() => setConfirm(false)}
            rightPress={() => deleteMaintenance()}
          />
        </View>
      )}
      {edit && (
        <View style={styles.viewModal}>
          <CustomConfirm
            title={'Sửa yêu cầu bảo trì'}
            content={'Bạn có muốn sửa yêu cầu bảo trì ?'}
            leftLabel={'Trở lại'}
            rightLabel={'Sửa'}
            leftPress={() => setEdit(false)}
            rightPress={() => {
              navigation.navigate('EditMaintenance', result);
              setEdit(false);
            }}
          />
        </View>
      )}
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.mainColor} />
      ) : (
        <View style={{flex: 1}}>
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
                navigation.navigate(
                  'DetailOpticCable',
                  result?.optical_cable_id,
                )
              }
              content={result?.optical_cable}
            />
            <ComponentViewRow
              title={'Mô tả bảo trì : '}
              content={result?.description}
            />
            <ComponentViewRow
              title={'Lặp lại : '}
              content={
                result?.repeat_by == 'MONTHLY'
                  ? 'Hằng tháng'
                  : result?.repeat_by == 'QUARTERLY'
                  ? 'Hằng quý'
                  : result?.repeat_by == 'YEARLY'
                  ? 'Hằng năm'
                  : null
              }
            />

            <ComponentViewRow
              title={'Tình trạng : '}
              styleContent={{
                color:
                  result?.issue_status == 'CHƯA TIẾP NHẬN' ? 'red' : 'green',
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
            <ComponentViewRow
              title={'Tổng thời gian hoàn thành : '}
              content={
                result?.total_processing_time == null
                  ? ''
                  : `${result?.total_processing_time} phút`
              }
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
          {(result?.issue_status == 'CHƯA TIẾP NHẬN' ||
            result?.issue_status == 'ĐANG THỰC HIỆN') &&
            userInfor?.role != 'EMPLOYEE' && (
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
          {result?.issue_status == 'CHƯA TIẾP NHẬN' &&
            userInfor?.role == 'EMPLOYEE' && (
              <CustomTextButton
                styleButton={styles.viewCustomTextButton}
                label={'Tiếp nhận'}
                textStyle={styles.textCustomTextButton}
                onPress={() => receiveMaintenanceIssue()}
              />
            )}
          {result?.issue_status == 'ĐANG THỰC HIỆN' &&
            userInfor?.role == 'EMPLOYEE' && (
              <CustomTextButton
                styleButton={styles.viewCustomTextButton}
                label={'Báo cáo'}
                textStyle={styles.textCustomTextButton}
                onPress={() => reportRequest()}
              />
            )}
          {result?.issue_status == 'CHƯA NGHIỆM THU' &&
            userInfor?.role != 'EMPLOYEE' && (
              <View style={[styles.viewRow, {marginTop: 20}]}>
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
  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(119,119,119,0.5)',
    position: 'absolute',
    zIndex: 9999,
  },
  renderDocumentFiles: {
    borderWidth: 0.5,
    borderColor: colors.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleCenter: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    position: 'absolute',
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
          source={icons.ic_cancel}
          style={[styles.imageComponentTwoButton, {tintColor: 'grey'}]}
        />
        <Text style={{color: 'grey'}}>Từ chối</Text>
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
