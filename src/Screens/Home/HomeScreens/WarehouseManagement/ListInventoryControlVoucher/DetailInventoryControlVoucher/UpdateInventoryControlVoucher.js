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
  UpdateAInventoryControlVoucherAPI,
  UpdateAInventoryDeliveryVoucherAPI,
} from '../../../../../../Api/Home/StableWarehouseAPI/StableWarehouseAPI';
import UsersAPI from '../../../../../../Api/Home/UsersAPI/UsersAPI';
import CustomButtonIcon from '../../../../../../Components/CustomButtonIcon';
import CustomModalDateTimePicker from '../../../../../../Components/CustomModalDateTimePicker';
import CustomModalStableWarehouse from '../../../../../../Components/CustomModalStableWarehouse';
import CustomModalSelectUserAssigned from '../../../../../../Components/CustomModalSelectUserAssigned';
import {GetListSuppliesAPI} from '../../../../../../Api/Home/Master-Data/MasterData';
import {GetInventoryControlVoucherByIDAPI} from '../../../../../../Api/Home/StableWarehouseAPI/StableWarehouseAPI';
const UpdateInventoryControlVoucher = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const [modalStableWarehouse, setModalStableWarehouse] = useState(false);
  const [modalDate, setModalDate] = useState(false);
  const [modalApproveUser, setModalApproveUser] = useState(false);
  const [modalSupplies, setModalSupplies] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = useSelector(state => state?.token?.token);
  const [idUpdate, setIdUpdate] = useState('');
  const [stableWarehouseId, setStableWarehouseId] = useState('');
  const [forControlTime, setForControlTime] = useState('');
  const [reason, setReason] = useState('');
  const [content, setContent] = useState('');
  const [approveUserId, setApproveUserId] = useState('');
  const [supplies, setSupplies] = useState([]);
  const [suppliesName, setSuppliesName] = useState([]);

  const isReady = () =>
    stableWarehouseId !== '' &&
    forControlTime !== '' &&
    reason !== '' &&
    content !== '' &&
    approveUserId !== '' &&
    supplies !== '';

  const [listStableWarehouse, setListStableWarehouse] = useState([]);
  const [listManage, setListManage] = useState([]);
  const [listSupplies, setListSupplies] = useState([]);
  const [date, setDate] = useState(new Date());
  const [formatsDate, setFormatsDate] = useState('');

  function dateToYMD(value) {
    var d = value.getDate();
    var m = value.getMonth() + 1;
    var y = value.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }
  const updateDate = value => {
    let newDate = dateToYMD(value);
    setFormatsDate(newDate);
    let newValue = value?.toISOString();
    setForControlTime(newValue);
  };

  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    let id = route?.params;
    await GetInventoryControlVoucherByIDAPI(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setIdUpdate(res?.data?.data?.id);
          setStableWarehouseId(res?.data?.data?.stable_warehouse);
          setForControlTime(res?.data?.data?.for_control_time);
          setFormatsDate(res?.data?.data?.for_control_time);
          setLoading(false);
          setReason(res?.data?.data?.reason);
          setContent(res?.data?.data?.content);
          setApproveUserId(res?.data?.data?.approve_user);
          setSuppliesName(res?.data?.data?.supplies);
          for (let i = 0; i < res?.data?.data?.supplies.length; i++) {
            let item = res?.data?.data?.supplies[i];
            let value = {
              id: item?.supplies?.id,
              name: item?.supplies?.name,
              quantity: item?.supplies?.minimum_quantity,
            };
            supplies.push(value);
          }
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    await GetStableWarehouseAPI(token)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setListStableWarehouse(res?.data?.data);
        }
      })
      .catch(function (error) {
        console.log(error);
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
        console.log(error);
      });
    await GetListSuppliesAPI(token)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setListSupplies(res?.data?.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {}, []);

  const updateVoucher = async () => {
    let stable_warehouse_id = parseFloat(stableWarehouseId?.id);
    let id = parseFloat(idUpdate);
    let approve_user_id = parseFloat(approveUserId?.id);
    await UpdateAInventoryControlVoucherAPI(
      token,
      id,
      stable_warehouse_id,
      forControlTime,
      reason,
      content,
      approve_user_id,
      supplies,
    )
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert('S???a phi???u l??u kho', 'S???a phi???u l??u kho th??nh c??ng');
          navigation.navigate('ListInventoryControlVoucher');
        } else if (res?.status == 200 && res?.data?.success == false) {
          Alert.alert('S???a phi???u l??u kho', 'Kh??ng th??? s???a phi???u l??u kho');
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('S???a phi???u l??u kho', 'S???a phi???u xu???t l??u th???t b???i');
      });
  };

  const addSupplies = item => {
    let newValue = {
      id: item?.id,
      name: item?.name,
      quantity: '',
    };
    setSupplies([...supplies, newValue]);
    setModalSupplies(false);
  };
  return (
    <View style={styles.container}>
      {modalSupplies && (
        <View style={styles.styleModal}>
          <CustomModalStableWarehouse
            data={listSupplies}
            onPress={item => addSupplies(item)}
          />
        </View>
      )}
      {modalStableWarehouse && (
        <View style={styles.styleModal}>
          <CustomModalStableWarehouse
            data={listStableWarehouse}
            onPress={item => {
              setStableWarehouseId(item);
              setModalStableWarehouse(false);
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
            title={'S???a phi???u l??u kho'}
            iconsLeft={icons.ic_back}
            onPressIconsLeft={() => navigation.goBack()}
          />

          <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Kho</Text>
            <TouchableOpacity
              onPress={() => setModalStableWarehouse(true)}
              style={styles.buttonPicker}>
              <Text style={styles.textPicker}>
                {stableWarehouseId?.name ? stableWarehouseId?.name : 'Ch???n kho'}
              </Text>
              <Image source={icons.ic_downArrow} style={styles.imagePicker} />
            </TouchableOpacity>
            <Text style={styles.title}>Th???i gian</Text>
            <View style={styles.viewDateTime}>
              <TouchableOpacity
                onPress={() => setModalDate(true)}
                style={styles.buttonPicker}>
                <Text style={styles.textPicker}>{`${formatsDate}`}</Text>
                <Image source={icons.ic_downArrow} style={styles.imagePicker} />
              </TouchableOpacity>
            </View>
            <Text style={styles.title}>L?? do</Text>
            <View style={styles.viewContent}>
              <TextInput
                multiline
                style={{fontSize: 18}}
                placeholder={'Nh???p l?? do'}
                value={reason}
                onChangeText={text => setReason(text)}
              />
            </View>
            <Text style={styles.title}>N???i dung</Text>
            <View style={styles.viewContent}>
              <TextInput
                multiline
                style={{fontSize: 18}}
                placeholder={'Nh???p n???i dung'}
                value={content}
                onChangeText={text => setContent(text)}
              />
            </View>
            <Text style={styles.title}>Ch???n ng?????i ph?? duy???t</Text>
            <TouchableOpacity
              onPress={() => setModalApproveUser(true)}
              style={styles.buttonPicker}>
              <Text style={styles.textPicker}>
                {approveUserId?.full_name
                  ? approveUserId?.full_name
                  : 'Ch???n ng?????i ph?? duy???t'}
              </Text>
              <Image source={icons.ic_downArrow} style={styles.imagePicker} />
            </TouchableOpacity>
            <Text style={styles.title}>V???t t??</Text>
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 10,
              }}>
              {supplies.map((item, index) => {
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
                      placeholder={'Nh???p s??? l?????ng'}
                      defaultValue={`${item?.quantity}`}
                      onEndEditing={evt => {
                        let eachSupplies = [...supplies];
                        let value = {
                          id: item?.id,
                          name: item?.name,
                          quantity: evt.nativeEvent.text,
                        };
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
              <Text style={{color: colors.mainColor}}>Th??m v???t t??</Text>
            </View>
            <CustomTextButton
              disabled={isReady() ? false : true}
              label={'X??c nh???n'}
              styleButton={[
                styles.customButtonText,
                {backgroundColor: isReady() ? colors.mainColor : colors.grey},
              ]}
              textStyle={{color: 'white', fontSize: 16, fontWeight: 'bold'}}
              onPress={() => updateVoucher()}
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
export default UpdateInventoryControlVoucher;
