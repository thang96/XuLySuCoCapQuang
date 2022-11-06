import {useNavigation, useRoute} from '@react-navigation/native';
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
  KeyboardAvoidingView,
} from 'react-native';
import CustomAppBar from '../../../../../../../Components/CustomAppBar';
import CustomModalCamera from '../../../../../../../Components/CustomModalCamera';
import CustomTextButton from '../../../../../../../Components/CustomTextButton';
import CustomInput from '../../../../../../../Components/CustomInput';
import CustomTextInputChangeValue from '../../../../../../../Components/CustomTextInputChangeValue';
import {colors, icons} from '../../../../../../../Constants';
import common from '../../../../../../../utils/common';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import RNLocation from 'react-native-location';
import MaintenanceManagementAPI from '../../../../../../../Api/Home/MaintenanceManagementAPI/MaintenanceManagementAPI';
const ReportMaintenance = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const [request, setRequest] = useState(null);
  const [autoLocation, setAutoLocation] = useState(false);
  useEffect(() => {
    getRequest();
  }, []);
  const getRequest = async () => {
    let id = route.params;
    await MaintenanceManagementAPI.GetMaintenanceIssueByIdAPI(token, id)
      .then(res => {
        setRequest(res?.data?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const [locationLongitude, setLocationLongitude] = useState('');
  const [locationLatitude, setLocationLatitude] = useState('');
  const [measureCableResult, setMeasureCableResult] = useState(null);
  const [measureCableResultDocument, setMeasureCableResultDocument] =
    useState(null);
  const [cleanCableResult, setCleanCableResult] = useState(null);
  const [adjustTensionCable, setAdjustTensionCable] = useState(null);
  const [checkSupplies, setCheckSupplies] = useState(null);
  const [cleanUndergroundCable, setCleanUndergroundCable] = useState(null);
  const [checkPreventiveCable, setCheckPreventiveCable] = useState(null);
  const [checkCableSocket, setCheckCableSocket] = useState(null);
  const [checkCableOdfAdapter, setCheckCableOdfAdapter] = useState(null);
  const [solutionProvide, setSolutionProvide] = useState('');
  const [reportDocument, setReportDocument] = useState(null);

  const isValueOK = () =>
    locationLongitude.length > 0 &&
    locationLatitude.length > 0 &&
    measureCableResult != null &&
    measureCableResultDocument != null &&
    cleanCableResult != null &&
    adjustTensionCable != null &&
    checkSupplies != null &&
    cleanUndergroundCable != null &&
    checkPreventiveCable != null &&
    checkCableSocket != null &&
    checkCableOdfAdapter != null &&
    solutionProvide.length > 0 &&
    reportDocument != null;
  const [modalResultCamera, setModalResultCamera] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const getLocation = () => {
    setAutoLocation(prev => (prev == true ? false : true));
    RNLocation.configure({
      distanceFilter: 10, // Meters
      desiredAccuracy: {
        ios: 'best',
        android: 'balancedPowerAccuracy',
      },
      // Android only
      androidProvider: 'auto',
      interval: 3000, // Milliseconds
      fastestInterval: 5000, // Milliseconds
      maxWaitTime: 3000, // Milliseconds
      // iOS Only
      activityType: 'other',
      allowsBackgroundLocationUpdates: false,
      headingFilter: 1, // Degrees
      headingOrientation: 'portrait',
      pausesLocationUpdatesAutomatically: false,
      showsBackgroundLocationIndicator: false,
    });
    RNLocation.requestPermission({
      ios: 'whenInUse',
      android: {
        detail: 'fine',
      },
    }).then(granted => {
      if (granted) {
        RNLocation.subscribeToLocationUpdates(locations => {
          setLocationLongitude(locations[0].longitude);
          setLocationLatitude(locations[0].latitude);
        });
      }
    });
  };
  const openResultCamera = () => {
    ImagePicker.openCamera({width: 300, height: 400})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        setMeasureCableResultDocument(imageConverted1);
        setModalResultCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalResultCamera(false);
      });
  };
  const openCamera = () => {
    ImagePicker.openCamera({width: 300, height: 400})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        setReportDocument(imageConverted1);
        setModalCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };
  const openResultGallery = () => {
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        setMeasureCableResultDocument(imageConverted1);
        setModalResultCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalResultCamera(false);
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        setReportDocument(imageConverted1);
        setModalCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };
  const rejectIssue = async () => {
    let issueId = request?.id;
    await MaintenanceManagementAPI.RejectMaintenanceIssueAPI(token, issueId)
      .then(res => {
        if (res?.data == 200) {
          alert('Từ chối thành công');
          navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const sendReport = async () => {
    let issueId = request?.id;
    await MaintenanceManagementAPI.MaintenanceIssueReportAPI(
      token,
      issueId,
      locationLongitude,
      locationLatitude,
      measureCableResult,
      measureCableResultDocument,
      cleanCableResult,
      adjustTensionCable,
      checkSupplies,
      cleanUndergroundCable,
      checkPreventiveCable,
      checkCableSocket,
      checkCableOdfAdapter,
      solutionProvide,
      reportDocument,
    )
      .then(res => {
        if (res?.status == 200) {
          alert('Gửi báo cáo thành công');
          navigation.navigate('MaintenanceManagement');
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
        alert('Gửi báo cáo thất bại');
      });
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        {modalResultCamera && (
          <View style={styles.styleModal}>
            <CustomModalCamera
              openCamera={() => {
                openResultCamera();
              }}
              openGallery={() => {
                openResultGallery();
              }}
              modalVisible={modalResultCamera}
              onRequestClose={() => {
                setModalResultCamera(false);
              }}
              cancel={() =>
                setModalResultCamera(prev => (prev == false ? true : false))
              }
            />
          </View>
        )}
        {modalCamera && (
          <View style={styles.styleModal}>
            <CustomModalCamera
              openCamera={() => {
                openCamera();
              }}
              openGallery={() => {
                openGallery();
              }}
              modalVisible={modalCamera}
              onRequestClose={() => {
                setModalCamera(false);
              }}
              cancel={() =>
                setModalCamera(prev => (prev == false ? true : false))
              }
            />
          </View>
        )}
        <CustomAppBar
          title={'Báo cáo kết quả'}
          iconsLeft={icons.ic_back}
          onPressIconsLeft={() => navigation.navigate('FiberOpticCableDetail')}
        />

        <ScrollView style={styles.eachContainer}>
          <Text style={styles.title}>Thông tin yêu cầu xử lý</Text>
          <Text style={styles.content}>{`Mã CV : ${request?.code}`}</Text>
          <Text
            style={
              styles.content
            }>{`Nhân sự kỹ thuật : ${request?.user_assigned}`}</Text>
          <View style={[styles.line, {marginVertical: 10}]} />
          <View style={styles.viewRow}>
            <Text style={styles.title}>Nhập thông tin vị trí</Text>
            <CustomTextButton
              textStyle={{color: colors.mainColor, fontWeight: 'bold'}}
              styleButton={{height: 50}}
              label={'Tự động lấy vị trí >>'}
              onPress={() => getLocation()}
            />
          </View>
          {autoLocation == true ? (
            <View style={styles.viewCustomTextInputChangeValue}>
              <Text style={styles.styleTitle}>Longitude : </Text>
              <Text>{locationLongitude}</Text>
            </View>
          ) : (
            <CustomInput
              styleInput={{minHeight: 50, marginVertical: 5}}
              placeholder={'Longitude'}
              value={locationLongitude}
              onChangeText={text => setLocationLongitude(text)}
            />
          )}
          {autoLocation == true ? (
            <View style={styles.viewCustomTextInputChangeValue}>
              <Text style={styles.styleTitle}>Latitude : </Text>
              <Text>{locationLatitude}</Text>
            </View>
          ) : (
            <CustomInput
              styleInput={{minHeight: 50, marginVertical: 5}}
              placeholder={'Latitude'}
              value={locationLatitude}
              onChangeText={text => setLocationLatitude(text)}
            />
          )}

          <View style={styles.viewItem}>
            <CustomComponentViewCheck
              title={'Kết quả đo tuyến cáp'}
              result={measureCableResult}
              onPressOk={() => setMeasureCableResult(true)}
              onPressNotOk={() => setMeasureCableResult(false)}
            />
            {measureCableResultDocument ? (
              <Image
                source={{
                  uri:
                    Platform.OS == 'ios'
                      ? measureCableResultDocument?.path
                      : measureCableResultDocument?.uri,
                }}
                style={styles.image}
                resizeMode={'contain'}
              />
            ) : (
              <TouchableOpacity
                onPress={() => setModalResultCamera(true)}
                style={styles.buttonUpload}>
                <Image
                  source={icons.ic_report}
                  style={styles.iconButtonUpload}
                />
                <Text style={styles.textButtonUpload}>Chụp kết quả đo</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.viewItem}>
            <CustomComponentViewCheck
              title={'Phát quang\ndọc tuyến cáp'}
              result={cleanCableResult}
              onPressOk={() => setCleanCableResult(true)}
              onPressNotOk={() => setCleanCableResult(false)}
            />
          </View>
          <View style={styles.viewItem}>
            <CustomComponentViewCheck
              title={'Căn chỉnh các tuyến\ncáp quang treo'}
              result={adjustTensionCable}
              onPressOk={() => setAdjustTensionCable(true)}
              onPressNotOk={() => setAdjustTensionCable(false)}
            />
          </View>
          <View style={styles.viewItem}>
            <CustomComponentViewCheck
              title={'Kiểm tra chỉnh lại vật tư\nphụ kiện treo cáp'}
              result={checkSupplies}
              onPressOk={() => setCheckSupplies(true)}
              onPressNotOk={() => setCheckSupplies(false)}
            />
          </View>
          <View style={styles.viewItem}>
            <CustomComponentViewCheck
              title={'Vệ sinh công bể\ncáp ngầm'}
              result={cleanUndergroundCable}
              onPressOk={() => setCleanUndergroundCable(true)}
              onPressNotOk={() => setCleanUndergroundCable(false)}
            />
          </View>
          <View style={styles.viewItem}>
            <CustomComponentViewCheck
              title={'Kiểm tra làm gọn cáp\ndự phòng'}
              result={checkPreventiveCable}
              onPressOk={() => setCheckPreventiveCable(true)}
              onPressNotOk={() => setCheckPreventiveCable(false)}
            />
          </View>
          <View style={styles.viewItem}>
            <CustomComponentViewCheck
              title={'Kiểm tra, vệ sinh\nmăng xông nối cáp'}
              result={checkCableSocket}
              onPressOk={() => setCheckCableSocket(true)}
              onPressNotOk={() => setCheckCableSocket(false)}
            />
          </View>
          <View style={styles.viewItem}>
            <CustomComponentViewCheck
              title={'Kiểm tra, vệ sinh ODF và\ncác đầu Adapter quang'}
              result={checkCableOdfAdapter}
              onPressOk={() => setCheckCableOdfAdapter(true)}
              onPressNotOk={() => setCheckCableOdfAdapter(false)}
            />
          </View>
          <Text style={styles.title}>Phương án đề xuất tối ưu</Text>
          <CustomTextInputChangeValue
            styleViewInput={{
              height: 50,
              width: '100%',
              backgroundColor: 'white',
            }}
            placeholder={'Nhập phương án'}
            value={solutionProvide}
            onChangeText={text => setSolutionProvide(text)}
          />
          <Text style={styles.title}>Hình ảnh báo cáo</Text>
          {reportDocument ? (
            <Image
              source={{
                uri:
                  Platform.OS == 'ios'
                    ? reportDocument?.path
                    : reportDocument?.uri,
              }}
              style={styles.image}
              resizeMode={'contain'}
            />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalCamera(true)}>
              <Image style={styles.imageUpload} source={icons.ic_upload} />
              <Text style={styles.textUpload}>Chụp báo cáo</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <ComponentTwoButton
          disabledRight={isValueOK() ? true : false}
          onPressLeft={() => rejectIssue()}
          onPressRight={() => sendReport()}
        />
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {flex: 1, paddingHorizontal: 10},
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {color: 'black', fontSize: 18, fontWeight: 'bold', marginVertical: 10},
  content: {color: 'grey', fontSize: 18},
  line: {height: 1, width: '100%', backgroundColor: 'grey'},
  image: {
    width: 300,
    height: 300,
    marginVertical: 10,
    alignSelf: 'center',
  },
  viewCustomTextInputChangeValue: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  styleTitle: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  buttonUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconButtonUpload: {
    width: 35,
    height: 35,
    marginRight: 5,
    marginBottom: 10,
    tintColor: colors.mainColor,
  },
  textButtonUpload: {color: colors.mainColor, fontSize: 18, fontWeight: 'bold'},
  viewItem: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  imageUpload: {
    width: 25,
    height: 25,
    marginRight: 5,
    tintColor: colors.mainColor,
  },
  textUpload: {
    fontSize: 16,
    color: colors.mainColor,
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
const CustomComponentViewCheck = props => {
  const {title, result, onPressOk, onPressNotOk} = props;
  return (
    <View style={styleComponent.view}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <TouchableOpacity
          onPress={onPressOk}
          style={styleComponent.buttonCheck}>
          <Text style={{fontSize: 14, color: 'black'}}>Đạt</Text>
          <Image
            source={result == true ? icons.ic_check : icons.ic_no_check}
            style={{height: 15, width: 15, marginLeft: 5}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressNotOk}
          style={styleComponent.buttonCheck}>
          <Text style={{fontSize: 14, color: 'black'}}>Không đạt</Text>
          <Image
            source={result == false ? icons.ic_check : icons.ic_no_check}
            style={{height: 15, width: 15, marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styleComponent = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
});
const ComponentTwoButton = props => {
  const {onPressLeft, onPressRight, disabledLeft, disabledRight} = props;
  return (
    <View style={styleComponentTwoButton.viewComponentTwoButton}>
      <TouchableOpacity
        disabled={disabledLeft}
        onPress={onPressLeft}
        style={styleComponentTwoButton.buttonComponentTwoButton}>
        <Image
          source={icons.ic_edit}
          style={[
            styleComponentTwoButton.imageComponentTwoButton,
            {tintColor: 'grey'},
          ]}
        />
        <Text>Từ chối</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabledRight}
        onPress={onPressRight}
        style={styleComponentTwoButton.buttonComponentTwoButton}>
        <Image
          source={icons.ic_document}
          style={[
            styleComponentTwoButton.imageComponentTwoButton,
            {tintColor: colors.mainColor},
          ]}
        />
        <Text style={{color: colors.mainColor}}>Gửi báo cáo</Text>
      </TouchableOpacity>
    </View>
  );
};
const styleComponentTwoButton = StyleSheet.create({
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
export default ReportMaintenance;
