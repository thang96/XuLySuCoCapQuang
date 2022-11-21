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
  Platform,
  ActivityIndicator,
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
import {uuid} from '../../../../../utils/uuid';
import ImagePicker from 'react-native-image-crop-picker';
import {
  ReadUsersAPI,
  ReadOpticalCablesAPI,
  ReadUserByOpticalCablesIdAPI,
  ReadOpticalCablesByUserIdAPI,
} from '../../../../../Api/Home/Master-Data/MasterData';
import IncidentManagementAPI from '../../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';
import CustomButtonIcon from '../../../../../Components/CustomButtonIcon';
const CreateNewRequest = props => {
  const navigation = useNavigation();
  const [opticalCableId, setOpticalCableId] = useState(null);
  const [userAssignedId, setUserAssignedId] = useState(null);
  const [description, setDescription] = useState('');
  const [albumImage, setAlbumImage] = useState([]);
  const [modalOpticalCable, setModalOpticalCable] = useState(false);
  const [modaUserAssigned, setModalUserAssigned] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const token = useSelector(state => state?.token?.token);
  const [listOpticalCables, setListOpticalCables] = useState([]);
  const [listOfEmployee, setListOfEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const isReady = () =>
    opticalCableId != null &&
    userAssignedId != null &&
    description.length > 0 &&
    albumImage.length > 0;

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
      .catch(function (error) {
        // console.log(error)
      });
    await ReadUsersAPI(token)
      .then(res => {
        if (res?.status == 200) {
          setListOfEmployee(res?.data?.data);
        }
      })
      .catch(function (error) {
        // console.log(error)
      });
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
        // console.log(error);
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
        // console.log(error);
      });
  };
  const openCamera = () => {
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
  const addResult = image => {
    const eachResult = [...albumImage, image];
    setAlbumImage(eachResult);
  };

  const renderImage = (item, index) => {
    return (
      <View>
        <View style={styles.viewRender}>
          <CustomButtonIcon
            onPress={() => deleteItem(item, index)}
            styleButton={styles.customButtonIcon}
            imageStyle={styles.imageStyle}
            source={icons.ic_cancel}
          />
          <Image
            source={{uri: item?.uri}}
            style={{width: 200, height: 200, marginHorizontal: 5}}
            resizeMode={'contain'}
          />
        </View>
      </View>
    );
  };
  const deleteItem = (item, index) => {
    let result = [...albumImage];
    let newResult = result.filter(itemResult => itemResult !== item);

    setAlbumImage(newResult);
  };
  const createRequest = async () => {
    let descriptionS = description;
    let optical_cable_id = parseInt(opticalCableId?.id);
    let user_assigned_id = parseInt(userAssignedId?.id);
    let document_files = albumImage;
    await IncidentManagementAPI.CreateIssuesRequestAPI(
      token,
      descriptionS,
      optical_cable_id,
      user_assigned_id,
      document_files,
    )
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert('Xử lý sự cố', 'Yêu cầu xử lý sự cố thành công');
          navigation.navigate('IncidentManagement');
        }
      })
      .catch(error => {
        console.log(error.response);
        Alert.alert('Xử lý sự cố', 'Yêu cầu xử lý sự cố thất bại');
      });
  };
  return (
    <View style={styles.container}>
      {modalCamera && (
        <View style={styles.styleModal}>
          <CustomModalCamera
            openCamera={() => openCamera()}
            openGallery={() => openGallery()}
            modalVisible={modalCamera}
            onRequestClose={() => setModalCamera(false)}
            cancel={() => setModalCamera(false)}
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

      <KeyboardAvoidingView style={styles.container}>
        <CustomAppBar
          title={'Tạo việc sự cố'}
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
            <Text style={styles.title}>File đính kèm</Text>
            <FlatList
              horizontal
              data={albumImage}
              keyExtractor={uuid}
              renderItem={({item}) => renderImage(item)}
            />
            <TouchableOpacity
              disabled={albumImage.length < 5 ? false : true}
              style={[styles.button, {marginTop: 10}]}
              onPress={() => setModalCamera(true)}>
              <Image
                style={[
                  styles.imageUpload,
                  {
                    tintColor:
                      albumImage.length < 5 ? colors.mainColor : 'grey',
                  },
                ]}
                source={icons.ic_upload}
              />
              <Text
                style={[
                  styles.textUpload,
                  {color: albumImage.length < 5 ? colors.mainColor : 'grey'},
                ]}>
                Up ảnh
              </Text>
            </TouchableOpacity>
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
export default CreateNewRequest;
