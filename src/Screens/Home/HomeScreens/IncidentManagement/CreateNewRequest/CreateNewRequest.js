import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {colors, icons} from '../../../../../Constants';
import CustomTextButton from '../../../../../Components/CustomTextButton';
import CustomModalSelectOpticalCable from '../../../../../Components/CustomModalSelectOpticalCable';
import OpticalCablesAPI from '../../../../../Api/Home/OpticalCablesAPI/OpticalCablesAPI';
import {useSelector} from 'react-redux';
import CustomModalSelectUserAssigned from '../../../../../Components/CustomModalSelectUserAssigned';
import UsersAPI from '../../../../../Api/Home/UsersAPI/UsersAPI';
import CustomModalCamera from '../../../../../Components/CustomModalCamera';
import common from '../../../../../utils/common';
import ImagePicker from 'react-native-image-crop-picker';
import IncidentManagementAPI from '../../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';
import CustomModalDateTimePicker from '../../../../../Components/CustomModalDateTimePicker';
const CreateNewRequest = props => {
  const navigation = useNavigation();
  const [opticalCableId, setOpticalCableId] = useState(null);
  const [userAssignedId, setUserAssignedId] = useState(null);
  const [requiredTime, setRequiredTime] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [modalOpticalCable, setModalOpticalCable] = useState(false);
  const [modaUserAssigned, setModalUserAssigned] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const token = useSelector(state => state?.token?.token);
  const [listOpticalCables, setListOpticalCables] = useState([]);
  const [listOfEmployee, setListOfEmployee] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [formatValueDate, setFormaValuetDate] = useState();
  const [formatValueTime, setFormaValuetTime] = useState();
  const [modalDate, setModalDate] = useState(false);
  const [modalTime, setModalTime] = useState(false);
  console.log(formatValueTime);
  const isReady = () =>
    opticalCableId != null &&
    userAssignedId != null &&
    requiredTime.length > 0 &&
    description.length > 0 &&
    image != null;

  useEffect(() => {
    getListData();
  }, []);
  const options = {
    timeZone:"Asia/Ho_Chi_Minh",
    hour12 : false,
    hour:  "2-digit",
    minute: "2-digit",
 }
 console.log(formatValueTime);
  useEffect(() => {
    setFormaValuetDate(formatDate(date));
    setFormaValuetTime(time.toLocaleTimeString('en-UK',options));
    setRequiredTime(`${formatValueDate} ${formatValueTime}`);
  }, [date, time]);
  const formatDate = date => {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  };
  const getListData = async () => {
    await OpticalCablesAPI.GetOpticalCablesAPI(token)
      .then(res => {
        setListOpticalCables(res?.data?.data);
      })
      .catch(error => console.log(error));
    await UsersAPI.GetUsersAPI(token)
      .then(res => {
        let allUser = res?.data?.data;
        let staff = allUser.filter(
          eachUsers => eachUsers?.role != 'GENERAL_MANAGER',
        );
        setListOfEmployee(staff);
      })
      .catch(error => console.log(error));
  };
  const chooseOpticalCable = item => {
    setModalOpticalCable(false);
    setOpticalCableId(item);
  };
  const chooseEmployee = item => {
    setModalUserAssigned(false);
    setUserAssignedId(item);
  };
  const openCamera = () => {
    ImagePicker.openCamera({width: 300, height: 400})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        setImage(imageConverted1);
        setModalCamera(false)
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false)
      });
  };
  const openGallery = () => {
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted1 = await common.resizeImageNotVideo(image);
        setImage(imageConverted1);
        setModalCamera(false)
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false)
      });
  };

  const createRequest = async () => {
    const optical_cable_id = parseInt(opticalCableId?.id);
    const user_assigned_id = parseInt(userAssignedId?.id);
    const required_time = requiredTime;
    const descrip = description;
    const img = image;
    await IncidentManagementAPI.CreateIssuesRequestAPI(
      token,
      optical_cable_id,
      user_assigned_id,
      required_time,
      descrip,
      img,
    )
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          alert('Tạo yêu cầu thành công');
          navigation.navigate('IncidentManagement');
        }
      })
      .catch(function(error){
        console.log(error);
        alert('Tạo yêu cầu thất bại')
      });
  };
  return (
    <View style={styles.container}>
      {modalCamera && (
        <View style={styles.styleModal}>
          <CustomModalCamera
            openCamera={() => 
              openCamera()}
            openGallery={() => 
              openGallery()
             }
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
      {modalOpticalCable && (
        <View style={styles.styleModal}>
          <CustomModalSelectOpticalCable
            data={listOpticalCables}
            modalVisible={modalOpticalCable}
            onRequestClose={() => {
              setModalOpticalCable(false);
            }}
            onPress={item => chooseOpticalCable(item)}
          />
        </View>
      )}
      {modaUserAssigned && (
        <View style={styles.styleModal}>
          <CustomModalSelectUserAssigned
            data={listOfEmployee}
            modalVisible={modaUserAssigned}
            onRequestClose={() => {
              setModalUserAssigned(false);
            }}
            onPress={item => chooseEmployee(item)}
          />
        </View>
      )}
      {modalDate && (
        <View style={styles.styleModal}>
          <CustomModalDateTimePicker
            mode={'date'}
            modalVisible={modalDate}
            onRequestClose={() => setModalDate(false)}
            openPicker={modalDate}
            value={date}
            onCancel={() => setModalDate(false)}
            onDateChange={date => {
              setDate(date);
            }}
            onPress={() => setModalDate(false)}
          />
        </View>
      )}
      {modalTime && (
        <View style={styles.styleModal}>
          <CustomModalDateTimePicker
            mode={'time'}
            modalVisible={modalTime}
            onRequestClose={() => setModalTime(false)}
            openPicker={modalTime}
            value={time}
            onCancel={() => setModalTime(false)}
            onDateChange={date => {
              setTime(date);
            }}
            onPress={() => setModalTime(false)}
          />
        </View>
      )}
      <KeyboardAvoidingView style={styles.container}>
        <CustomAppBar
          title={'Tạo việc'}
          iconsLeft={icons.ic_back}
          onPressIconsLeft={() => navigation.goBack()}
        />
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Tuyến cáp</Text>
          <TouchableOpacity
            onPress={() => setModalOpticalCable(true)}
            style={styles.buttonPicker}>
            <Text style={styles.textPicker}>
              {opticalCableId ? opticalCableId?.name : 'Chọn tuyến cáp'}
            </Text>
            <Image source={icons.ic_downArrow} style={styles.imagePicker} />
          </TouchableOpacity>
          <Text style={styles.title}>Nhân viên kỹ thuật</Text>
          <TouchableOpacity
            onPress={() => setModalUserAssigned(true)}
            style={styles.buttonPicker}>
            <Text style={styles.textPicker}>
              {userAssignedId
                ? userAssignedId?.full_name
                : 'Chọn nhân viên kỹ thuật'}
            </Text>
            <Image source={icons.ic_downArrow} style={styles.imagePicker} />
          </TouchableOpacity>
          <Text style={styles.title}>Thời gian yêu cầu</Text>
          <View style={styles.viewDateTime}>
            <TouchableOpacity
              style={styles.buttonDateTime}
              onPress={() => setModalTime(true)}>
              <Text style={styles.textDateTime}>{formatValueTime}</Text>
              <Image
                source={icons.ic_downArrow}
                style={{width: 15, height: 15}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonDateTime}
              onPress={() => setModalDate(true)}>
              <Text style={styles.textDateTime}>{formatValueDate}</Text>
              <Image
                source={icons.ic_downArrow}
                style={{width: 15, height: 15}}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Nội dung</Text>
          <View style={styles.viewContent}>
            <TextInput
              multiline
              style={{fontSize: 18}}
              placeholder={'Nhập  nội dung'}
              value={description}
              onChangeText={text => setDescription(text)}
            />
          </View>
          <Text style={styles.title}>File đính kèm</Text>
          {image ? (
            <Image
              source={{uri: Platform.OS == 'ios' ? image?.path : image?.uri}}
              style={{
                width: 300,
                height: 300,
                marginVertical: 10,
                alignSelf: 'center',
              }}
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
          <CustomTextButton
            disabled={isReady() ? false : true}
            label={'Xác nhận'}
            styleButton={[
              styles.customButtonText,
              {backgroundColor: isReady() ? colors.mainColor : colors.grey},
            ]}
            textStyle={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
            onPress={() => createRequest()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },

  viewContent: {
    width: '100%',
    height: 150,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 5,
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
  customButtonText: {
    width: 120,
    height: 50,
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonPicker: {
    width: '100%',
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textPicker: {fontSize: 18, color: 'black'},
  imagePicker: {width: 25, height: 25},
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
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  buttonDateTime: {
    width: '45%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  textDateTime: {color: 'black', fontSize: 16},
  viewDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default CreateNewRequest;
