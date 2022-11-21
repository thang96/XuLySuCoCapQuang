import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import CustomAppBar from '../../../../Components/CustomAppBar';
import {colors, icons, images} from '../../../../Constants';
import CustomButtonIcon from '../../../../Components/CustomButtonIcon';
import {useNavigation} from '@react-navigation/native';
import CustomModalCamera from '../../../../Components/CustomModalCamera';
import {useDispatch, useSelector} from 'react-redux';
import common from '../../../../utils/common';
import ImagePicker from 'react-native-image-crop-picker';
import {updateUserInfor} from '../../../../Store/slices/userInfoSlice';
import AccountAPI from '../../../../Api/Account/AccountAPI';
import CustomTextInputChangeValue from '../../../../Components/CustomTextInputChangeValue';
import CustomTextButton from '../../../../Components/CustomTextButton';
const Personalinformation = props => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const token = useSelector(state => state?.token?.token);
  const [editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const [result, setResult] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  useEffect(() => {
    readUser();
  }, []);
  const readUser = async () => {
    await AccountAPI.ReadUserAPI(token)
      .then(res => {
        dispatch(updateUserInfor(res?.data?.data));
        setResult(res?.data?.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    setFullName(result?.full_name);
    setEmail(result?.email);
    setPhoneNumber(result?.phone_number);
    setAddress(result?.address);
  }, [result]);
  const pickSingleWithCamera = () => {
    ImagePicker.openCamera({
      cropperToolbarTitle: '',
    })
      .then(async image => {
        const imageConverted = await common.resizeImageNotVideo(image);
        await AccountAPI.UpdateUserAvatarAPI(token, imageConverted)
          .then(res => {
            if (res?.status == 200 && res?.data?.success == true) {
              setModalVisible(false);
              readUser();
            }
          })
          .catch(error => {
            console.log(error);
            setModalVisible(false);
          });
      })
      .catch(e => {
        ImagePicker.clean();
        setModalVisible(false);
      });
  };

  const openGallery = () => {
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted2 = await common.resizeImageNotVideo(image);
        await AccountAPI.UpdateUserAvatarAPI(token, imageConverted2)
          .then(res => {
            if (res?.status == 200 && res?.data?.success == true) {
              setModalVisible(false);
              readUser();
            }
          })
          .catch(function (error) {
            alert('Update avatar thất bại');
            setModalVisible(false);
          });
      })
      .catch(e => {
        ImagePicker.clean();
        setModalVisible(false);
      });
  };
  const updateUser = async () => {
    let data = {
      full_name: fullName,
      email: email,
      phone_number: phoneNumber,
      address: address,
    };
    await AccountAPI.UpdateUserMeAPI(token, data)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setEditable(false);
          Alert.alert('Cập nhật thông tin', 'Cập nhật thông tin thành công');
          readUser();
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Cập nhật thông tin', 'Cập nhật thông tin thất bại');
      });
  };

  return (
    <View style={styles.container}>
      {modalVisible && (
        <View style={styles.styleModal}>
          <CustomModalCamera
            openCamera={() => {
              pickSingleWithCamera();
            }}
            openGallery={() => {
              openGallery();
            }}
            modalVisible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
            cancel={() =>
              setModalVisible(prev => (prev == false ? true : false))
            }
          />
        </View>
      )}
      <CustomAppBar
        title={'Thông tin cá nhân'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <View style={styles.viewRowUser}>
          <Text style={styles.title}>Ảnh đại diện</Text>
          <View style={[styles.viewRow]}>
            <Image
              source={
                userInfor?.avatar_img
                  ? {uri: `${userInfor?.avatar_img}`}
                  : icons.ic_user
              }
              style={styles.imageUser}
            />
            <CustomButtonIcon
              imageStyle={{tintColor: colors.mainColor, width: 25, height: 25}}
              source={icons.ic_pencil}
              styleButton={[styles.customButtonIcon, {marginTop: 10}]}
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
        <CustomTextInputChangeValue
          styleViewInput={[
            styles.viewRowInfor,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Tên : '}
          styleTitle={styles.title}
          editable={editable}
          styleInput={styles.name}
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[
            styles.viewRowInfor,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Số điện thoại : '}
          styleTitle={styles.title}
          editable={editable}
          styleInput={styles.name}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[
            styles.viewRowInfor,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Email : '}
          styleTitle={styles.title}
          editable={editable}
          styleInput={styles.name}
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[
            styles.viewRowInfor,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Địa chỉ : '}
          styleTitle={styles.title}
          editable={editable}
          styleInput={styles.name}
          value={address}
          onChangeText={text => setAddress(text)}
        />
        {editable == false ? (
          <CustomTextButton
            label={'Thay đổi thông tin'}
            textStyle={[styles.textButton]}
            styleButton={[styles.viewRowInfor, {marginTop: 50}]}
            onPress={() => setEditable(true)}
          />
        ) : (
          <CustomTextButton
            label={'Lưu thông tin'}
            textStyle={styles.textButton}
            styleButton={[styles.viewRowInfor, {marginTop: 50}]}
            onPress={() => updateUser()}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  eachContainer: {flex: 1, paddingHorizontal: 10, paddingTop: 30},
  viewRowUser: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    width: '100%',
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  customButtonIcon: {width: 40, height: 40},
  imageUser: {width: 60, height: 60, borderRadius: 60},
  title: {fontSize: 18, fontWeight: 'bold', color: 'black', width: '30%'},
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.mainColor,
    width: '70%',
  },
  viewRowInfor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.mainColor,
  },
});
export default Personalinformation;
