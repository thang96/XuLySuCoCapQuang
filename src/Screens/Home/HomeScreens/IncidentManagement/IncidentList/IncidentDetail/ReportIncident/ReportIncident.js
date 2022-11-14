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
  PermissionsAndroid,
} from 'react-native';
import CustomAppBar from '../../../../../../../Components/CustomAppBar';
import CustomModalCamera from '../../../../../../../Components/CustomModalCamera';
import CustomTextButton from '../../../../../../../Components/CustomTextButton';
import CustomInput from '../../../../../../../Components/CustomInput';
import CustomTextInputChangeValue from '../../../../../../../Components/CustomTextInputChangeValue';
import {colors, icons} from '../../../../../../../Constants';
import common from '../../../../../../../utils/common';
import {uuid} from '../../../../../../../utils/uuid';
import ImagePicker from 'react-native-image-crop-picker';
import IncidentManagementAPI from '../../../../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';
import {useSelector} from 'react-redux';
import CustomButtonIcon from '../../../../../../../Components/CustomButtonIcon';
import Geolocation from '@react-native-community/geolocation';
const ReportIncident = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const [request, setRequest] = useState(null);
  const [locationLongitude, setLocationLongitude] = useState('');
  const [locationLatitude, setLocationLatitude] = useState('');
  const [reason, setReason] = useState('');
  const [solution, setSolution] = useState('');
  const [reportDocument, setReportDocument] = useState([]);

  useEffect(() => {
    getRequest();
    checkPer();
  }, []);
  const getRequest = async () => {
    let id = route.params;
    await IncidentManagementAPI.GetIncidentIssueByIdAPI(token, id)
      .then(res => {
        setRequest(res?.data?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const checkPer = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Truy cập vị trí',
          message: 'Cho phép ứng dụng truy cập vị trí để báo cáo',
          buttonNeutral: 'Hỏi sau',
          buttonNegative: 'Hủy',
          buttonPositive: 'Chấp nhận',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('OK');
      } else {
        console.log('NO');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const isValueOK = () =>
    locationLongitude.length != '' &&
    locationLatitude.length != '' &&
    reason.length != '' &&
    solution.length != '' &&
    reportDocument.length > 0;

  const [modalCamera, setModalCamera] = useState(false);

  const getLocation = () => {
    Geolocation.getCurrentPosition(info => {
      setLocationLongitude(info?.coords?.longitude);
      setLocationLatitude(info?.coords?.latitude);
    });
  };
  const openCamera = () => {
    setModalCamera(true);
    ImagePicker.openCamera({width: 300, height: 400})
      .then(async image => {
        const imageConverted = await common.resizeImageNotVideo(image);
        addResult(imageConverted);
        setModalCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const openGallery = () => {
    setModalCamera(true);
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted = await common.resizeImageNotVideo(image);
        addResult(imageConverted);
        setModalCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };

  const sendReport = async () => {
    let issueId = request?.id;
    await IncidentManagementAPI.IssueReportAPI(
      token,
      issueId,
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
        console.log(JSON.stringify(error?.status));
        alert('Gửi báo cáo thất bại');
      });
  };
  const addResult = image => {
    const eachResult = [...reportDocument, image];
    setReportDocument(eachResult);
  };
  const renderImage = (image, index) => {
    return (
      <View style={styles.viewRender}>
        <CustomButtonIcon
          imageStyle={styles.imageClear}
          source={icons.cancel}
          styleButton={styles.buttonClear}
          onPress={() => removeImage(index)}
        />
        <Image
          source={{uri: image?.uri}}
          style={{width: '100%', height: '100%', marginHorizontal: 5}}
          resizeMode={'contain'}
        />
      </View>
    );
  };
  const removeImage = indexID => {
    const indexSelected = reportDocument[indexID];
    const newArray = reportDocument.filter(item => item != indexSelected);
    setReportDocument(newArray);
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
            textStyle={{
              color: colors.mainColor,
              fontWeight: 'bold',
              fontSize: 18,
            }}
            styleButton={{height: 50}}
            label={'Lấy vị trí >>'}
            onPress={() => getLocation()}
          />
        </View>

        <View style={styles.viewCustomTextInputChangeValue}>
          <Text style={styles.styleTitle}>Longitude : </Text>
          <Text>{locationLongitude}</Text>
        </View>
        <View style={styles.viewCustomTextInputChangeValue}>
          <Text style={styles.styleTitle}>Latitude : </Text>
          <Text>{locationLatitude}</Text>
        </View>

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
        <FlatList
          horizontal
          style={{height: 210}}
          data={reportDocument}
          keyExtractor={uuid}
          renderItem={({item, index}) => renderImage(item, index)}
        />
        <TouchableOpacity
          disabled={reportDocument.length < 5 ? false : true}
          style={[styles.button, {marginTop: 10}]}
          onPress={() => setModalCamera(true)}>
          <Image
            style={[
              styles.imageUpload,
              {
                tintColor:
                  reportDocument.length < 5 ? colors.mainColor : 'grey',
              },
            ]}
            source={icons.ic_upload}
          />
          <Text
            style={[
              styles.textUpload,
              {color: reportDocument.length < 5 ? colors.mainColor : 'grey'},
            ]}>
            Up ảnh
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        disabled={isValueOK() ? false : true}
        onPress={sendReport}
        style={[
          styles.styleButton,
          {backgroundColor: isValueOK() ? colors.mainColor : 'grey'},
        ]}>
        <Text style={styles.textSendReport}>Gửi báo cáo</Text>
      </TouchableOpacity>
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
  },
  textUpload: {
    fontSize: 16,

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
  buttonClear: {position: 'absolute', top: 0, right: 0, zIndex: 2},
  imageClear: {width: 20, height: 20, tintColor: 'red'},
  viewRender: {
    width: 200,
    height: 200,
    borderWidth: 0.5,
    padding: 5,
    borderColor: colors.mainColor,
  },
  styleButton: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSendReport: {fontSize: 18, color: 'white', fontWeight: 'bold'},
});

export default ReportIncident;
