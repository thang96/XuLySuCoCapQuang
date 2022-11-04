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
} from 'react-native';
import CustomAppBar from '../../../../Components/CustomAppBar';
import {colors, icons, images} from '../../../../Constants';
import CustomButtonIcon from '../../../../Components/CustomButtonIcon';
import {useNavigation} from '@react-navigation/native';
import CustomModalUploadImage from '../../../../Components/CustomModalUploadImage';
import {useDispatch, useSelector} from 'react-redux';
import common from '../../../../utils/common';
import CustomLoading from '../../../../Components/CustomLoading';
import ImagePicker from 'react-native-image-crop-picker';
import {updateUserInfor} from '../../../../Store/slices/userInfoSlice';
import AccountAPI from '../../../../Api/Account/AccountAPI';
const Personalinformation = props => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const token = useSelector(state => state?.token?.token);
  const [createImage, setCreateImage] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    readUser();
  }, []);
  const readUser = async () => {
    await AccountAPI.ReadUserAPI(token)
      .then(res => {
        dispatch(updateUserInfor(res?.data?.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const pickSingleWithCamera = () => {
    setCreateImage(true);
    ImagePicker.openCamera({
      cropperToolbarTitle: '',
    })
      .then(async image => {
        const imageConverted = await common.resizeImageNotVideo(image);
        await AccountAPI.UpdateUserAvatarAPI(token, imageConverted)
          .then(res => {
            if (res?.status == 200 && res?.data?.success == true) {
              setCreateImage(false);
              setModalVisible(false);
              readUser();
            }
          })
          .catch(error => {
            console.log(error);
            setModalVisible(false);
            setCreateImage(false);
          });
      })
      .catch(e => {
        ImagePicker.clean();
        setCreateImage(false);
        setModalVisible(false);
      });
  };

  const openGallery = () => {
    setCreateImage(true);
    ImagePicker.openPicker({})
      .then(async image => {
        const imageConverted2 = await common.resizeImageNotVideo(image);
        await AccountAPI.UpdateUserAvatarAPI(token, imageConverted2)
          .then(res => {
            if (res?.status == 200 && res?.data?.success == true) {
              setCreateImage(false);
              setModalVisible(false);
              readUser();
            }
          })
          .catch(function (error) {
            alert('Update avatar thất bại');
            setCreateImage(false);
            setModalVisible(false);
          });
      })
      .catch(e => {
        ImagePicker.clean();
        setCreateImage(false);
        setModalVisible(false);
      });
  };
  // if (createImage) {
  //   return <CustomLoading />;
  // }
  return (
    <View style={styles.container}>
      {modalVisible && (
        <CustomModalUploadImage
          onRequestClose={() => {
            setModalVisible(false);
          }}
          cancel={() => setModalVisible(false)}
          takePicture={() => {
            pickSingleWithCamera();
          }}
          uploadImage={() => {
            openGallery();
          }}
        />
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
        <View style={styles.viewRowInfor}>
          <Text style={styles.title}>Tên</Text>
          <Text style={styles.name}>{userInfor?.full_name}</Text>
        </View>
        <View style={styles.viewRowInfor}>
          <Text style={styles.title}>Số điện thoại</Text>
          <View style={styles.viewRow}>
            <Text style={styles.textInfor}>{userInfor?.phone_number}</Text>
            {/* <CustomButtonIcon
              source={icons.ic_pencil}
              styleButton={styles.customButtonIcon}
              onPress={() => navigation.navigate('ChangeNumberPhone')}
            /> */}
          </View>
        </View>
        <View style={styles.viewRowInfor}>
          <Text style={styles.title}>Email</Text>
          <View style={styles.viewRow}>
            <Text style={styles.textInfor}>{userInfor?.email}</Text>
            {/* <CustomButtonIcon
              source={icons.ic_pencil}
              styleButton={styles.customButtonIcon}
              onPress={() => navigation.navigate('ChangeEmail')}
            /> */}
          </View>
        </View>
        <View style={styles.viewRowInfor}>
          <Text style={styles.title}>Địa chỉ</Text>
          <View style={styles.viewRow}>
            <Text style={styles.textInfor} numberOfLines={1}>
              {userInfor?.address}
            </Text>
            {/* <CustomButtonIcon
              source={icons.ic_pencil}
              styleButton={styles.customButtonIcon}
              onPress={() => navigation.navigate('ChangeAddress')}
            /> */}
          </View>
        </View>
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
  title: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  name: {fontSize: 20, fontWeight: 'bold', color: colors.purple},
  viewRowInfor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  textInfor: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    maxWidth: 200,
  },
});
export default Personalinformation;
