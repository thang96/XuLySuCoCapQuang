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
import CustomLoading from '../../../../../Components/CustomLoading';
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
  const [isLoading, setIsLoading] = useState(false);
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
    await UsersAPI.GetUsersAPI(token)
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
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        addResult(eachImg);
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
  const openGallery = () => {
    ImagePicker.openPicker({multiple: true})
      .then(image => {
        let albumImg = [];
        for (let index = 0; index < image.length; index++) {
          let element = image[index];
          let eachElement = {...element, uri: element?.path};
          albumImg.push(eachElement);
        }
        addResultGallery(albumImg);
        setModalCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };
  const addResultGallery = album => {
    const eachResult = [...albumImage];
    const newResult = eachResult.concat(album);
    setAlbumImage(newResult);
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
            source={{uri: item?.path}}
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
    setIsLoading(true);
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
          setIsLoading(false);
          Alert.alert('X??? l?? s??? c???', 'Y??u c???u x??? l?? s??? c??? th??nh c??ng');
          navigation.navigate('IncidentManagement');
        }
        if (res?.status == 200 && res?.data?.success == false) {
          setIsLoading(false);
          Alert.alert('X??? l?? s??? c???', 'Kh??ng th??? y??u c???u x??? l?? s??? c???');
          navigation.navigate('IncidentManagement');
        }
      })
      .catch(error => {
        // console.log(error);
        setIsLoading(false);
        Alert.alert('X??? l?? s??? c???', 'Y??u c???u x??? l?? s??? c??? th???t b???i');
      });
  };
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
            onRequestClose={() => setModalOpticalCable(false)}
            closeModal={() => setModalOpticalCable(false)}
            onPress={item => chooseOpticalCable(item)}
          />
        </View>
      )}
      {modaUserAssigned && (
        <View style={styles.styleModal}>
          <CustomModalSelectUserAssigned
            data={listOfEmployee}
            modalVisible={modaUserAssigned}
            onRequestClose={() => setModalUserAssigned(false)}
            closeModal={() => setModalUserAssigned(false)}
            onPress={item => chooseEmployee(item)}
          />
        </View>
      )}

      <KeyboardAvoidingView style={styles.container}>
        <CustomAppBar
          title={'T???o vi???c s??? c???'}
          iconsLeft={icons.ic_back}
          onPressIconsLeft={() => navigation.goBack()}
        />
        {loading ? (
          <ActivityIndicator size={'large'} color={colors.mainColor} />
        ) : (
          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Tuy???n c??p</Text>
            <TouchableOpacity
              onPress={() => setModalOpticalCable(true)}
              style={styles.buttonPicker}>
              <Text style={styles.textPicker}>
                {opticalCableId ? opticalCableId?.name : 'Ch???n tuy???n c??p'}
              </Text>
              <Image source={icons.ic_downArrow} style={styles.imagePicker} />
            </TouchableOpacity>
            <Text style={styles.title}>Nh??n vi??n k??? thu???t</Text>
            <TouchableOpacity
              onPress={() => setModalUserAssigned(true)}
              style={styles.buttonPicker}>
              <Text style={styles.textPicker}>
                {userAssignedId
                  ? userAssignedId?.full_name
                  : 'Ch???n nh??n vi??n k??? thu???t'}
              </Text>
              <Image source={icons.ic_downArrow} style={styles.imagePicker} />
            </TouchableOpacity>

            <Text style={styles.title}>N???i dung</Text>
            <View style={styles.viewContent}>
              <TextInput
                multiline
                style={{fontSize: 18}}
                placeholder={'Nh???p  n???i dung'}
                value={description}
                onChangeText={text => setDescription(text)}
              />
            </View>
            <Text style={styles.title}>File ????nh k??m</Text>
            <FlatList
              horizontal
              data={albumImage}
              keyExtractor={uuid}
              renderItem={({item}) => renderImage(item)}
            />
            <TouchableOpacity
              style={[styles.button, {marginTop: 10}]}
              onPress={() => setModalCamera(true)}>
              <Image
                style={[styles.imageUpload, {tintColor: colors.mainColor}]}
                source={icons.ic_upload}
              />
              <Text style={[styles.textUpload, {color: colors.mainColor}]}>
                Up ???nh
              </Text>
            </TouchableOpacity>
            <CustomTextButton
              disabled={isReady() ? false : true}
              label={'X??c nh???n'}
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
  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    position: 'absolute',
  },
});
export default CreateNewRequest;
