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
  Alert,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CustomAppBar from '../../../../../../../Components/CustomAppBar';
import {colors, icons} from '../../../../../../../Constants';
import CustomTextButton from '../../../../../../../Components/CustomTextButton';
import CustomModalSelectOpticalCable from '../../../../../../../Components/CustomModalSelectOpticalCable';
import OpticalCablesAPI from '../../../../../../../Api/Home/OpticalCablesAPI/OpticalCablesAPI';
import {useSelector} from 'react-redux';
import CustomModalSelectUserAssigned from '../../../../../../../Components/CustomModalSelectUserAssigned';
import UsersAPI from '../../../../../../../Api/Home/UsersAPI/UsersAPI';
import CustomModalCamera from '../../../../../../../Components/CustomModalCamera';
import common from '../../../../../../../utils/common';
import ImagePicker from 'react-native-image-crop-picker';
import MaintenanceManagementAPI from '../../../../../../../Api/Home/MaintenanceManagementAPI/MaintenanceManagementAPI';
import {uuid} from '../../../../../../../utils/uuid';
import CustomModalPicker from '../../../../../../../Components/CustomModalPicker';
import {
  ReadUsersAPI,
  ReadOpticalCablesAPI,
  ReadUserByOpticalCablesIdAPI,
  ReadOpticalCablesByUserIdAPI,
} from '../../../../../../../Api/Home/Master-Data/MasterData';
import CustomButtonIcon from '../../../../../../../Components/CustomButtonIcon';
const DATA_PICKER = [
  {key: 'Theo tháng', value: 'MONTHLY'},
  {key: 'Theo quý', value: 'QUARTERLY'},
  {key: 'Theo năm', value: 'YEARLY'},
];
const EditMaintenance = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [repeatBy, setRepeatBy] = useState(null);
  const [opticalCableId, setOpticalCableId] = useState(null);
  const [userAssignedId, setUserAssignedId] = useState(null);
  const [description, setDescription] = useState('');
  const [modalOpticalCable, setModalOpticalCable] = useState(false);
  const [modaUserAssigned, setModalUserAssigned] = useState(false);
  const token = useSelector(state => state?.token?.token);
  const [listOpticalCables, setListOpticalCables] = useState([]);
  const [listOfEmployee, setListOfEmployee] = useState([]);
  const [isChoose, setIsChoose] = useState(false);

  const isReady = () =>
    opticalCableId != null && userAssignedId != null && description.length > 0;

  useEffect(() => {
    getListData();
  }, []);
  const getListData = async () => {
    await ReadOpticalCablesAPI(token)
      .then(res => {
        if (res?.status == 200) {
          setListOpticalCables(res?.data?.data);
        }
      })
      .catch(error => console.log(error));
    await ReadUsersAPI(token)
      .then(res => {
        if (res?.status == 200) {
          setListOfEmployee(res?.data?.data);
        }
      })
      .catch(error => console.log(error));
    let userId = route.params?.user_assigned_id;
    await UsersAPI.GetUsersByIdAPI(token, userId)
      .then(res => {
        if (res?.status == 200) {
          setUserAssignedId(res?.data?.data);
        }
      })
      .catch(error => console.log(error));
    let opticalId = route.params?.optical_cable_id;
    await OpticalCablesAPI.GetOpticalCablesByIdAPI(token, opticalId)
      .then(res => {
        if (res?.status == 200) {
          setOpticalCableId(res?.data?.data);
        }
      })
      .catch(error => console.log(error));
    let maintenanceId = route.params?.id;
    await MaintenanceManagementAPI.GetMaintenanceIssueByIdAPI(
      token,
      maintenanceId,
    )
      .then(res => {
        if (res?.status == 200) {
          setDescription(res?.data?.data?.description);
          setRepeatBy({value: res?.data?.data?.repeat_by});
        }
      })
      .catch(error => console.log(error));
  };
  const chooseOpticalCable = async item => {
    setModalOpticalCable(false);
    setOpticalCableId(item);
    let id = item?.id;
    await ReadUserByOpticalCablesIdAPI(token, id)
      .then(res => {
        if (res?.status == 200) {
          setListOfEmployee(res?.data?.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const chooseEmployee = async item => {
    setModalUserAssigned(false);
    setUserAssignedId(item);
    let id = item?.id;
    await ReadOpticalCablesByUserIdAPI(token, id)
      .then(res => {
        if (res?.status == 200) {
          setListOpticalCables(res?.data?.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateRequest = async () => {
    let idUpdate = route?.params?.id;
    console.log(idUpdate);
    let repeat_by = repeatBy?.value;
    let optical_cable_id = parseInt(opticalCableId?.id);
    let user_assigned_id = parseInt(userAssignedId?.id);
    let descrip = description;
    await MaintenanceManagementAPI.UpdateMaintenanceRequestAPI(
      token,
      idUpdate,
      repeat_by,
      descrip,
      optical_cable_id,
      user_assigned_id,
    )
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert(
            'Sửa yêu cầu xử lý bảo trì',
            'Sửa yêu cầu xử lý bảo trì thành công',
          );
          navigation.navigate('MaintenanceManagement');
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(
          'Sửa yêu cầu xử lý bảo trì',
          'Sửa yêu cầu xử lý bảo trì thất bại',
        );
      });
  };

  return (
    <View style={styles.container}>
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
      {isChoose && (
        <View style={styles.styleModal}>
          <CustomModalPicker
            data={DATA_PICKER}
            modalVisible={isChoose}
            onRequestClose={() => {
              setIsChoose(false);
            }}
            onPress={item => chooseEmployee(item)}
            onPressChoose={item => {
              setIsChoose(false);
              setRepeatBy(item);
            }}
          />
        </View>
      )}

      <KeyboardAvoidingView style={styles.container}>
        <CustomAppBar
          title={'Sửa cầu bảo trì'}
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

          <ButtonPicker
            repeatBy={
              repeatBy?.value == 'MONTHLY'
                ? 'Theo tháng'
                : repeatBy?.value == 'QUARTERLY'
                ? 'Theo quý'
                : repeatBy?.value == 'YEARLY'
                ? 'Theo năm'
                : null
            }
            onPressPicker={() => setIsChoose(true)}
          />

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

          <CustomTextButton
            disabled={isReady() ? false : true}
            label={'Xác nhận'}
            styleButton={[
              styles.customButtonText,
              {backgroundColor: isReady() ? colors.mainColor : 'grey'},
            ]}
            textStyle={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
            onPress={() => updateRequest()}
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
  viewRender: {
    height: 210,
    width: 210,
    borderWidth: 0.5,
    borderColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customButtonIcon: {position: 'absolute', right: 3, top: 3, zIndex: 1},
  imageStyle: {width: 20, height: 20, tintColor: 'red'},
});
const ButtonPicker = props => {
  const {repeatBy, onPressPicker} = props;
  return (
    <View>
      <Text style={styles.title}>Chu kỳ lặp lại</Text>
      <TouchableOpacity style={styles.buttonDateTime} onPress={onPressPicker}>
        <Text style={styles.textDateTime}>{repeatBy}</Text>
        <Image source={icons.ic_downArrow} style={{width: 15, height: 15}} />
      </TouchableOpacity>
    </View>
  );
};

export default EditMaintenance;
