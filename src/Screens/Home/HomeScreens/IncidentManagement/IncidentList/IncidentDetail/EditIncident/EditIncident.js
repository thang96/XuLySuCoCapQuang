import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import CustomAppBar from '../../../../../../../Components/CustomAppBar';
import {colors, icons} from '../../../../../../../Constants';
import CustomTextButton from '../../../../../../../Components/CustomTextButton';
import CustomModalSelectOpticalCable from '../../../../../../../Components/CustomModalSelectOpticalCable';
import {useSelector} from 'react-redux';
import CustomModalSelectUserAssigned from '../../../../../../../Components/CustomModalSelectUserAssigned';
import {
  ReadUsersAPI,
  ReadOpticalCablesAPI,
  ReadUserByOpticalCablesIdAPI,
  ReadOpticalCablesByUserIdAPI,
} from '../../../../../../../Api/Home/Master-Data/MasterData';
import UsersAPI from '../../../../../../../Api/Home/UsersAPI/UsersAPI';
import OpticalCablesAPI from '../../../../../../../Api/Home/OpticalCablesAPI/OpticalCablesAPI';
import IncidentManagementAPI from '../../../../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';
const EditIncident = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [opticalCableId, setOpticalCableId] = useState(null);
  const [userAssignedId, setUserAssignedId] = useState(null);
  const [description, setDescription] = useState('');
  const [modalOpticalCable, setModalOpticalCable] = useState(false);
  const [modaUserAssigned, setModalUserAssigned] = useState(false);
  const token = useSelector(state => state?.token?.token);
  const [listOpticalCables, setListOpticalCables] = useState([]);
  const [listOfEmployee, setListOfEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
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
          setLoading(false);
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
    let incidentId = route.params?.id;
    await IncidentManagementAPI.GetIncidentIssueByIdAPI(token, incidentId)
      .then(res => {
        if (res?.status == 200) {
          setDescription(res?.data?.data?.description);
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
        setListOpticalCables(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const updateRequest = async () => {
    let idUpdate = parseInt(route.params?.id);
    let descriptionS = description;
    let optical_cable_id = parseInt(opticalCableId?.id);
    let user_assigned_id = parseInt(userAssignedId?.id);
    await IncidentManagementAPI.UpdateIssuesRequestAPI(
      token,
      idUpdate,
      descriptionS,
      optical_cable_id,
      user_assigned_id,
    )
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert(
            'Sửa yêu cầu xử lý sự cố',
            'Sửa yêu cầu xử lý sự cố thành công',
          );
          navigation.navigate('IncidentManagement');
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert(
          'Sửa yêu cầu xử lý sự cố',
          'Sửa yêu cầu xử lý sự cố thất bại',
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
      <KeyboardAvoidingView style={styles.container}>
        <CustomAppBar
          title={'Sửa việc sự cố'}
          iconsLeft={icons.ic_back}
          onPressIconsLeft={() => navigation.goBack()}
        />
        {loading ? (
          <ActivityIndicator size={'large'} color={colors.mainColor} />
        ) : (
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
                {backgroundColor: isReady() ? colors.mainColor : colors.grey},
              ]}
              textStyle={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
              onPress={() => updateRequest()}
            />
          </ScrollView>
        )}
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
  },
  textUpload: {
    fontSize: 16,
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
  customButtonIcon: {position: 'absolute', right: 3, top: 3, zIndex: 1},
  imageStyle: {width: 20, height: 20, tintColor: 'red'},
  viewRender: {
    height: 210,
    width: 210,
    borderWidth: 0.5,
    borderColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default EditIncident;
