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
import CustomAppBar from '../../../../../../Components/CustomAppBar';
import {colors, icons} from '../../../../../../Constants';
import CustomTextButton from '../../../../../../Components/CustomTextButton';
import {useSelector} from 'react-redux';
import CustomModalCamera from '../../../../../../Components/CustomModalCamera';
import common from '../../../../../../utils/common';
import {uuid} from '../../../../../../utils/uuid';
import ImagePicker from 'react-native-image-crop-picker';
import {
  GetStableWarehouseAPI,
  CreateAInventoryDeliveryVoucherAPI,
} from '../../../../../../Api/Home/StableWarehouseAPI/StableWarehouseAPI';
import UsersAPI from '../../../../../../Api/Home/UsersAPI/UsersAPI';
import CustomButtonIcon from '../../../../../../Components/CustomButtonIcon';
import CustomModalDateTimePicker from '../../../../../../Components/CustomModalDateTimePicker';
import CustomModalStableWarehouse from '../../../../../../Components/CustomModalStableWarehouse';
import CustomModalSelectUserAssigned from '../../../../../../Components/CustomModalSelectUserAssigned';
import {GetListSuppliesAPI} from '../../../../../../Api/Home/Master-Data/MasterData';
const CreateAInventoryDeliveryVoucher = props => {
  const navigation = useNavigation();

  const [modalCamera, setModalCamera] = useState(false);
  const [modalStableWarehouse, setModalStableWarehouse] = useState(false);
  const [modalDate, setModalDate] = useState(false);
  const [modalStableWarehouseDelivery, setModalStableWarehouseDelivery] =
    useState(false);
  const [modalApproveUser, setModalApproveUser] = useState(false);
  const [modalSupplies, setModalSupplies] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = useSelector(state => state?.token?.token);
  const [stableWarehouseId, setStableWarehouseId] = useState('');
  const [destinationStableWarehouseId, setDestinationStableWarehouseId] =
    useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [reason, setReason] = useState('');
  const [content, setContent] = useState('');
  const [albumImage, setAlbumImage] = useState([]);
  const [approveUserId, setApproveUserId] = useState('');
  const [supplies, setSupplies] = useState([]);
  const [suppliesName, setSuppliesName] = useState([]);

  const isReady = () =>
    stableWarehouseId !== '' &&
    destinationStableWarehouseId !== '' &&
    deliveryTime !== '' &&
    reason !== '' &&
    content !== '' &&
    albumImage.length > 0 &&
    approveUserId !== '' &&
    supplies.length > 0;

  const [listStableWarehouse, setListStableWarehouse] = useState([]);
  const [listManage, setListManage] = useState([]);
  const [listSupplies, setListSupplies] = useState([]);
  const [date, setDate] = useState(new Date());
  const [formatsDate, setFormatsDate] = useState('');

  function dateToYMD(value) {
    var d = value.getDate();
    var m = value.getMonth() + 1; //Month from 0 to 11
    var y = value.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }
  const updateDate = value => {
    let newDate = dateToYMD(value);
    setFormatsDate(newDate);
    setDeliveryTime(value);
  };

  useEffect(() => {
    getResult();
  }, []);
  const getResult = async () => {
    await GetStableWarehouseAPI(token)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setListStableWarehouse(res?.data?.data);
          setLoading(false);
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
    await UsersAPI.GetUsersAPI(token)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          let manage = res?.data?.data;
          setListManage(
            manage.filter(eachItem => eachItem?.role == 'GENERAL_MANAGER'),
          );
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
    await GetListSuppliesAPI(token)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setListSupplies(res?.data?.data);
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const addSupplies = item => {
    let idSupplies = item?.id;
    let value = {id: idSupplies, quantity: ''};
    let eachValue = {id: idSupplies, name: item?.name};
    let newSupplies = [...supplies, value];
    let eachNewSupplies = [...suppliesName, eachValue];
    setSupplies(newSupplies);
    setSuppliesName(eachNewSupplies);
    setModalSupplies(false);
  };

  const createVoucher = async () => {
    let stable_warehouse_id = parseFloat(stableWarehouseId?.id);
    let destination_stable_warehouse_id = parseFloat(
      destinationStableWarehouseId?.id,
    );
    let approve_user_id = parseFloat(approveUserId?.id);
    let document_files = albumImage;
    await CreateAInventoryDeliveryVoucherAPI(
      token,
      stable_warehouse_id,
      destination_stable_warehouse_id,
      deliveryTime,
      reason,
      content,
      document_files,
      approve_user_id,
      supplies,
    )
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert('Tạo phiếu xuất kho', 'Tạo phiếu xuất kho thành công');
          navigation.navigate('ListInventoryDeliveryVoucher');
        } else if (res?.status == 200 && res?.data?.success == false) {
          Alert.alert('Tạo phiếu xuất kho', 'Không thể tạo phiếu xuất kho');
        }
      })
      .catch(function (error) {
        // console.log(error, error?.response?.data);
        Alert.alert('Tạo phiếu xuất kho', 'Tạo phiếu xuất kho thất bại');
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
      {modalSupplies && (
        <View style={styles.styleModal}>
          <CustomModalStableWarehouse
            data={listSupplies}
            closeModal={() => setModalSupplies(false)}
            onPress={item => addSupplies(item)}
          />
        </View>
      )}
      {modalStableWarehouse && (
        <View style={styles.styleModal}>
          <CustomModalStableWarehouse
            data={listStableWarehouse}
            closeModal={() => setModalStableWarehouse(false)}
            onPress={item => {
              setStableWarehouseId(item);
              setModalStableWarehouse(false);
            }}
          />
        </View>
      )}
      {modalStableWarehouseDelivery && (
        <View style={styles.styleModal}>
          <CustomModalStableWarehouse
            data={listStableWarehouse}
            closeModal={() => setModalStableWarehouseDelivery(false)}
            onPress={item => {
              setDestinationStableWarehouseId(item);
              setModalStableWarehouseDelivery(false);
            }}
          />
        </View>
      )}
      {modalDate && (
        <View style={styles.styleModal}>
          <CustomModalDateTimePicker
            onCancel={() => setModalDate(false)}
            value={date}
            mode={'date'}
            openPicker={modalDate}
            onDateChange={value => updateDate(value)}
            onPress={() => setModalDate(false)}
          />
        </View>
      )}
      {modalApproveUser && (
        <View style={styles.styleModal}>
          <CustomModalSelectUserAssigned
            modalVisible={modalApproveUser}
            data={listManage}
            closeModal={() => setModalApproveUser(false)}
            onPress={item => {
              setApproveUserId(item);
              setModalApproveUser(false);
            }}
          />
        </View>
      )}
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.mainColor} />
      ) : (
        <KeyboardAvoidingView style={styles.container}>
          <CustomAppBar
            title={'Tạo phiếu xuất kho'}
            iconsLeft={icons.ic_back}
            onPressIconsLeft={() => navigation.goBack()}
          />

          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Kho chuyển</Text>
            <TouchableOpacity
              onPress={() => setModalStableWarehouse(true)}
              style={styles.buttonPicker}>
              <Text style={styles.textPicker}>
                {stableWarehouseId ? stableWarehouseId?.name : 'Chọn kho chyển'}
              </Text>
              <Image source={icons.ic_downArrow} style={styles.imagePicker} />
            </TouchableOpacity>
            <Text style={styles.title}>Kho nhận</Text>
            <TouchableOpacity
              onPress={() => setModalStableWarehouseDelivery(true)}
              style={styles.buttonPicker}>
              <Text style={styles.textPicker}>
                {destinationStableWarehouseId
                  ? destinationStableWarehouseId?.name
                  : 'Chọn kho nhận'}
              </Text>
              <Image source={icons.ic_downArrow} style={styles.imagePicker} />
            </TouchableOpacity>
            <Text style={styles.title}>Thời gian</Text>
            <View style={styles.viewDateTime}>
              <TouchableOpacity
                onPress={() => setModalDate(true)}
                style={styles.buttonPicker}>
                <Text style={styles.textPicker}>{`${formatsDate}`}</Text>
                <Image source={icons.ic_downArrow} style={styles.imagePicker} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>Lý do</Text>
            <View style={styles.viewContent}>
              <TextInput
                multiline
                style={{fontSize: 18}}
                placeholder={'Nhập lý do'}
                value={reason}
                onChangeText={text => setReason(text)}
              />
            </View>
            <Text style={styles.title}>Nội dung</Text>
            <View style={styles.viewContent}>
              <TextInput
                multiline
                style={{fontSize: 18}}
                placeholder={'Nhập nội dung'}
                value={content}
                onChangeText={text => setContent(text)}
              />
            </View>
            <Text style={styles.title}>Chọn người phê duyệt</Text>
            <TouchableOpacity
              onPress={() => setModalApproveUser(true)}
              style={styles.buttonPicker}>
              <Text style={styles.textPicker}>
                {approveUserId?.full_name
                  ? approveUserId?.full_name
                  : 'Chọn người phê duyệt'}
              </Text>
              <Image source={icons.ic_downArrow} style={styles.imagePicker} />
            </TouchableOpacity>
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
            <Text style={styles.title}>Vật tư</Text>
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 10,
              }}>
              {suppliesName.map((item, index) => {
                return (
                  <View
                    key={`${index}`}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 5,
                    }}>
                    <Text
                      style={[
                        styles.textPicker,
                        {width: '65%'},
                      ]}>{`${item?.name} : `}</Text>
                    <TextInput
                      style={{fontSize: 16, width: '35%', height: 50}}
                      placeholder={'Nhập số lượng'}
                      defaultValue={''}
                      onEndEditing={evt => {
                        value = {
                          id: item?.id,
                          quantity: evt.nativeEvent.text,
                        };
                        let eachSupplies = [...supplies];
                        eachSupplies[index] = value;
                        setSupplies(eachSupplies);
                      }}
                    />
                  </View>
                );
              })}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomButtonIcon
                styleButton={styles.styleCustomButtonIcon}
                imageStyle={{
                  width: 40,
                  height: 40,
                  tintColor: colors.mainColor,
                }}
                source={icons.ic_plusPurple}
                onPress={() => setModalSupplies(true)}
              />
              <Text style={{color: colors.mainColor}}>Thêm vật tư</Text>
            </View>
            <CustomTextButton
              disabled={isReady() ? false : true}
              label={'Xác nhận'}
              styleButton={[
                styles.customButtonText,
                {backgroundColor: isReady() ? colors.mainColor : colors.grey},
              ]}
              textStyle={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
              onPress={() => createVoucher()}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
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
    height: 50,
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
  styleCustomButtonIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CreateAInventoryDeliveryVoucher;
