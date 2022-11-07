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
} from 'react-native';
import CustomAppBar from '../../../../../../../Components/CustomAppBar';
import CustomModalCamera from '../../../../../../../Components/CustomModalCamera';
import CustomTextButton from '../../../../../../../Components/CustomTextButton';
import CustomInput from '../../../../../../../Components/CustomInput';
import CustomTextInputChangeValue from '../../../../../../../Components/CustomTextInputChangeValue';
import {colors, icons} from '../../../../../../../Constants';
import common from '../../../../../../../utils/common';
import ImagePicker from 'react-native-image-crop-picker';
import IncidentManagementAPI from '../../../../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';
import {useSelector} from 'react-redux';
import RNLocation from 'react-native-location';
const ReportIncident = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const [request, setRequest] = useState(null);
  const [autoLocation, setAutoLocation] = useState(false);
  const [autoTimeNow, setAutoTimeNow] = useState(false);

  const [startTime, setStartTime] = useState('');
  const [finishTime, setFinishTime] = useState('');
  const [totalProcessingTime, setTotalProcessingTime] = useState('');
  const [locationLongitude, setLocationLongitude] = useState('');
  const [locationLatitude, setLocationLatitude] = useState('');
  const [reason, setReason] = useState('');
  const [solution, setSolution] = useState('');
  const [reportDocument, setReportDocument] = useState(null);

  useEffect(() => {
    getRequest();
  }, []);
  const getRequest = async () => {
    let id = route.params;
    await IncidentManagementAPI.GetIncidentIssueByIdAPI(token, id)
      .then(res => {
        setRequest(res?.data?.data);
        setStartTime(res?.data?.data?.received_time);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const isValueOK = () =>
    startTime.length != '' &&
    finishTime.length != '' &&
    totalProcessingTime.length != '' &&
    locationLongitude.length != '' &&
    locationLatitude.length != '' &&
    reason.length != '' &&
    solution.length != '' &&
    reportDocument != null;

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
        detail: 'coarse',
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
    await IncidentManagementAPI.RejectIssueAPI(token)
      .then(res => {
        if (res?.data == 200) {
          alert('Từ chối thành công');
          navigation.navigate('IncidentList');
        }
      })
      .catch(error => {
        console.log(error);
        alert('Từ chối thất bại');
      });
  };
  console.log(totalProcessingTime, 'origin');
  const sendReport = async () => {
    let issueId = request?.id;
    await IncidentManagementAPI.IssueReportAPI(
      token,
      issueId,
      startTime,
      finishTime,
      totalProcessingTime,
      locationLongitude,
      locationLatitude,
      reason,
      solution,
      reportDocument,
    )
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          alert('Gửi báo cáo thành công');
          navigation.navigate('IncidentList');
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
        alert('Gửi báo cáo thất bại');
      });
  };
  const getTimeNow = () => {
    setAutoTimeNow(prev => (prev == false ? true : false));
    let now = new Date();
    const formatDate = date => {
      let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    };
    const options = {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    };
    const datenow = formatDate(now);
    const timenow = now.toLocaleTimeString('en-UK', options);
    setFinishTime(`${datenow} ${timenow}`);
  };
  return (
    <View style={styles.container}>
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
        onPressIconsLeft={() => navigation.goBack()}
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
        <Text style={styles.title}>{`Thời gian tiếp nhận : ${startTime}`}</Text>
        <View style={styles.viewRow}>
          <Text style={styles.title}>Thời gian hoàn thành</Text>
          <CustomTextButton
            textStyle={{color: colors.mainColor, fontWeight: 'bold'}}
            styleButton={{height: 50}}
            label={'Lấy thời gian >>'}
            onPress={() => getTimeNow()}
          />
        </View>
        {autoTimeNow == true ? (
          <View style={styles.viewCustomTextInputChangeValue}>
            <Text>{`${finishTime}`}</Text>
          </View>
        ) : (
          <CustomInput
            styleInput={{minHeight: 50, marginVertical: 5}}
            placeholder={'Thời gian hoàn thành'}
            value={finishTime}
            onChangeText={text => setFinishTime(text)}
          />
        )}

        <Text style={styles.title}>{'Tổng thời gian thực hiện (Giờ)'}</Text>
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={{height: 50, width: '100%', backgroundColor: 'white'}}
          placeholder={'Nhập giờ'}
          value={totalProcessingTime}
          onChangeText={text => setTotalProcessingTime(text)}
        />
        <Text style={styles.title}>Lý do</Text>
        <CustomTextInputChangeValue
          styleViewInput={{height: 50, width: '100%', backgroundColor: 'white'}}
          placeholder={'Nhập lý do'}
          value={reason}
          onChangeText={text => setReason(text)}
        />
        <Text style={styles.title}>Phương án đề xuất tối ưu</Text>
        <CustomTextInputChangeValue
          styleViewInput={{height: 50, width: '100%', backgroundColor: 'white'}}
          placeholder={'Nhập phương án tối ưu'}
          value={solution}
          onChangeText={text => setSolution(text)}
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
            <Text style={styles.textUpload}>Up ảnh</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <ComponentTwoButton
        disabledRight={isValueOK() ? false : true}
        onPressLeft={() => rejectIssue()}
        onPressRight={() => sendReport()}
      />
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
  iconButtonUpload: {width: 35, height: 35, marginRight: 5, marginBottom: 10},
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
export default ReportIncident;
