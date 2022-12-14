import React, {useEffect, useState} from 'react';
import {
  Alert,
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
  ActivityIndicator,
} from 'react-native';
import {colors, icons, images} from '../../../../../../Constants';
import CustomAppBar from '../../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomTextButton from '../../../../../../Components/CustomTextButton';
import CustomTextInputChangeValue from '../../../../../../Components/CustomTextInputChangeValue';
import CustomLoading from '../../../../../../Components/CustomLoading';
import {useSelector} from 'react-redux';
import CustomConfirm from '../../../../../../Components/CustomConfirm';
import {
  GetInventoryDeliveryVoucherByIDAPI,
  RejectInventoryDeliveryVoucher,
  ApproveInventoryDeliveryVoucher,
  GetStableWarehouseByIdAPI,
  ReceivingApproveInventoryDeliveryVoucher,
  ReceivingRejectInventoryDeliveryVoucher,
} from '../../../../../../Api/Home/StableWarehouseAPI/StableWarehouseAPI';
import {uuid, isImage} from '../../../../../../utils/uuid';
import {downloadFile} from '../../../../../../utils/DownloadFile';
const DetalInventoryDeliveryVoucher = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(true);
  const [destinationStableWarehouse, setDestinationStableWarehouse] =
    useState(true);
  const [edit, setEdit] = useState(false);
  //"destination_stable_warehouse_id": 4,
  useEffect(() => {
    getResult();
  }, []);
  const getResult = async () => {
    let id = route.params;
    await GetInventoryDeliveryVoucherByIDAPI(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setResult(res?.data?.data);
          getDestination(res?.data?.data?.destination_stable_warehouse_id);
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const getDestination = async id => {
    await GetStableWarehouseByIdAPI(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setDestinationStableWarehouse(res?.data?.data);
          setLoading(false);
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const receivingApprove = async () => {
    setIsLoading(true);
    let id = result?.id;
    await ReceivingApproveInventoryDeliveryVoucher(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setIsLoading(false);
          Alert.alert('Chuy???n kho', 'Duy???t phi???u chuy???n kho th??nh c??ng');
          navigation.navigate('ListInventoryDeliveryVoucher');
        } else if (res?.status == 200 && res?.data?.success == false) {
          setIsLoading(false);
          Alert.alert('Chuy???n kho', 'Kh??ng th??? duy???t phi???u chuy???n kho');
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        Alert.alert('Chuy???n kho', 'Duy???t phi???u chuy???n kho th???t b???i');
        // console.log(error);
      });
  };
  const receivingReject = async () => {
    setIsLoading(true);
    let id = result?.id;
    await ReceivingRejectInventoryDeliveryVoucher(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setIsLoading(false);
          Alert.alert('Chuy???n kho', 'T??? ch???i phi???u xu???t kho th??nh c??ng');
          navigation.navigate('ListInventoryDeliveryVoucher');
        } else if (res?.status == 200 && res?.data?.success == false) {
          setIsLoading(false);
          Alert.alert('Chuy???n kho', 'Kh??ng th??? t??? ch???i phi???u xu???t kho');
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        Alert.alert('Xu???t kho', 'T??? ch???i phi???u xu???t kho th???t b???i');
        // console.log(error);
      });
  };
  const approve = async () => {
    setIsLoading(true);
    let id = result?.id;
    await ApproveInventoryDeliveryVoucher(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setIsLoading(false);
          Alert.alert('Xu???t kho', 'Ch???p thu???n phi???u xu???t kho th??nh c??ng');
          navigation.navigate('ListInventoryDeliveryVoucher');
        } else if (res?.status == 200 && res?.data?.success == false) {
          setIsLoading(false);
          Alert.alert('Xu???t kho', 'Kh??ng th??? ch???p thu???n phi???u xu???t kho');
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        Alert.alert('Xu???t kho', 'Ch???p thu???n phi???u xu???t kho th???t b???i');
        // console.log(error);
      });
  };

  const reject = async () => {
    setIsLoading(true);
    let id = result?.id;
    await RejectInventoryDeliveryVoucher(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setIsLoading(false);
          Alert.alert('Nh???p kho', 'T??? ch???i phi???u nh???p kho th??nh c??ng');
          navigation.navigate('ListInventoryDeliveryVoucher');
        } else if (res?.status == 200 && res?.data?.success == false) {
          setIsLoading(false);
          Alert.alert('Nh???p kho', 'Kh??ng th??? t??? ch???i phi???u nh???p kho');
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        Alert.alert('Nh???p kho', 'T??? ch???i phi???u nh???p kho th???t b???i');
        // console.log(error);
      });
  };
  const renderDocumentFiles = item => {
    return (
      <View>
        {isImage(`${item?.path}`) == true ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('ShowImageScreen', item)}
            style={styles.renderDocumentFiles}>
            <Image
              source={{uri: item?.path}}
              style={{width: 200, height: 200, marginRight: 5}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : (
          <View
            style={[
              {width: 200, height: 200, marginRight: 5},
              styles.renderDocumentFiles,
            ]}>
            <TouchableOpacity
              onPress={() => downloadFile(item?.path)}
              style={styles.styleCenter}>
              <Text style={[styles.content, {color: colors.mainColor}]}>
                Download file
              </Text>
              <Image
                source={icons.ic_download}
                style={{width: 50, height: 50, tintColor: colors.mainColor}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
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
      {edit && (
        <View style={styles.viewModal}>
          <CustomConfirm
            title={'S???a phi???u xu???t kho'}
            content={'B???n c?? mu???n s???a phi???u xu???t kho ?'}
            leftLabel={'Tr??? l???i'}
            rightLabel={'S???a'}
            leftPress={() => setEdit(false)}
            rightPress={() => {
              let id = result?.id;
              navigation.navigate('UpdateInventoryDeliveryVoucher', id);
              setEdit(false);
            }}
          />
        </View>
      )}
      <CustomAppBar
        title={'Chi ti???t chuy???n kho'}
        iconsLeft={icons.ic_back}
        iconFirtRight={icons.ic_edit}
        onPressIconsLeft={() => navigation.goBack()}
        onPressFirtIconsRight={() => setEdit(true)}
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.mainColor} />
      ) : (
        <ScrollView style={styles.eachContainer}>
          <View style={styles.viewRow}>
            <Text style={styles.styleContent}>Chi ti???t chuy???n kho :</Text>
            <CustomViewRow title={'ID : '} content={result?.id} />
            <CustomViewRow
              title={'Th???i gian t???o : '}
              content={result?.created_time}
            />
            <CustomViewRow
              title={'Th???i gian xu???t : '}
              content={result?.delivery_time}
            />
            <CustomViewRow title={'L?? do : '} content={result?.reason} />
            <CustomViewRow title={'N???i dung : '} content={result?.content} />
            <CustomViewRow
              title={'Tr???ng th??i : '}
              content={
                result?.status == 'NEW'
                  ? 'Ch??a ph?? duy???t'
                  : result?.status == 'RECEIVING_APPROVED'
                  ? '???? ph?? duy???t'
                  : result?.status == 'RECEIVING_REJECTED'
                  ? 'T??? ch???i ph?? duy???t'
                  : result?.status == 'APPROVED'
                  ? '???? ch???p thu???n'
                  : result?.status == 'REJECTED'
                  ? 'T??? ch???i ch???p thu???n'
                  : null
              }
            />
            <Text style={styles.styleContent}>Chi ti???t v???t t?? : </Text>
            {result?.supplies?.map((item, index) => {
              return (
                <View key={item?.id} style={styles.viewVoucher}>
                  <CustomViewRow
                    title={'M?? : '}
                    content={item?.supplies?.code}
                  />
                  <CustomViewRow
                    title={'T??n v???t t?? : '}
                    content={item?.supplies?.name}
                  />
                  <CustomViewRow
                    title={'????n v??? : '}
                    content={item?.supplies?.unit}
                  />
                  <CustomViewRow
                    title={'S??? l?????ng : '}
                    content={item?.quantity}
                  />
                </View>
              );
            })}
            <View>
              <Text style={styles.styleContent}>File ????nh k??m : </Text>
              <FlatList
                style={{height: 210}}
                horizontal
                data={result?.document_files}
                keyExtractor={uuid}
                renderItem={({item}) => renderDocumentFiles(item)}
              />
            </View>
          </View>

          <View style={[styles.viewRow, {marginTop: 10}]}>
            <Text style={styles.styleContent}>Chi ti???t kho chuy???n : </Text>
            <CustomViewRow
              title={'T??n kho : '}
              content={result?.stable_warehouse?.name}
            />
            <CustomViewRow
              title={'M?? kho : '}
              content={result?.stable_warehouse?.code}
            />
            <CustomViewRow
              title={'Th???i gian t???o : '}
              content={result?.stable_warehouse?.created_time}
            />
            <CustomViewRow
              title={'M?? t??? : '}
              content={result?.stable_warehouse?.description}
            />
          </View>
          <View style={[styles.viewRow, {marginTop: 10}]}>
            <Text style={styles.styleContent}>Chi ti???t kho nh???n : </Text>
            <CustomViewRow
              title={'T??n kho : '}
              content={destinationStableWarehouse.name}
            />
            <CustomViewRow
              title={'M?? kho : '}
              content={destinationStableWarehouse.code}
            />
            <CustomViewRow
              title={'Th???i gian t???o : '}
              content={destinationStableWarehouse.created_time}
            />
            <CustomViewRow
              title={'M?? t??? : '}
              content={destinationStableWarehouse.description}
            />
          </View>
          <View style={[styles.viewRow, {marginTop: 10}]}>
            <Text style={styles.styleContent}>Ng?????i ph?? duy???t : </Text>
            <Image
              style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
                borderRadius: 200,
                marginVertical: 10,
              }}
              source={{uri: result?.approve_user?.avatar_img}}
              resizeMode={'cover'}
            />
            <CustomViewRow
              title={'T??n : '}
              content={result?.approve_user?.full_name}
            />
            <CustomViewRow
              title={'Email : '}
              content={result?.approve_user?.email}
            />
            <CustomViewRow
              title={'S??T : '}
              content={result?.approve_user?.phone_number}
            />
            <CustomViewRow
              title={'Ch???c v??? : '}
              content={
                result?.approve_user?.role == 'AREA_MANAGER'
                  ? 'Qu???n l?? khu v???c'
                  : result?.approve_user?.role == 'GENERAL_MANAGER'
                  ? 'Qu???n l?? chung'
                  : result?.approve_user?.role == 'EMPLOYEE'
                  ? 'Nh??n vi??n'
                  : null
              }
            />
          </View>
          {userInfor?.role != 'EMPLOYEE' && result?.status == 'APPROVED' && (
            <View style={[styles.viewRowButton, {marginTop: 20}]}>
              <CustomTextButton
                styleButton={styles.viewCustomTextButton}
                label={'T??? ch???i'}
                textStyle={styles.textCustomTextButton}
                onPress={() => receivingReject()}
              />
              <CustomTextButton
                styleButton={styles.viewCustomTextButton}
                label={'Duy???t nh???p kho'}
                textStyle={styles.textCustomTextButton}
                onPress={() => receivingApprove()}
              />
            </View>
          )}
          {userInfor?.role != 'EMPLOYEE' && result?.status == 'NEW' && (
            <View style={[styles.viewRowButton, {marginTop: 20}]}>
              <CustomTextButton
                styleButton={styles.viewCustomTextButton}
                label={'T??? ch???i'}
                textStyle={styles.textCustomTextButton}
                onPress={() => reject()}
              />
              <CustomTextButton
                styleButton={styles.viewCustomTextButton}
                label={'Duy???t xu???t kho'}
                textStyle={styles.textCustomTextButton}
                onPress={() => approve()}
              />
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  viewRow: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  styleTitle: {color: 'grey', fontSize: 18, fontWeight: 'bold', width: '30%'},
  styleContent: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: '65%',
  },
  styleViewInputChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  styleTitleInput: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    width: '25%',
  },
  styleValueInput: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    width: '70%',
  },
  buttonUpdate: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: colors.mainColor,
    width: 60,
    height: 60,
    borderRadius: 60,
    zIndex: 9999,
  },
  textUpdate: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewVoucher: {
    borderWidth: 0.5,
    padding: 5,
    borderRadius: 10,
    marginBottom: 5,
    borderColor: colors.mainColor,
  },

  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(119,119,119,0.5)',
    position: 'absolute',
    zIndex: 9999,
  },
  viewCustomTextButton: {
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.mainColor,
    alignSelf: 'center',
  },
  textCustomTextButton: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  viewRowButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  styleCenter: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderDocumentFiles: {
    borderWidth: 0.5,
    borderColor: colors.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {fontSize: 16, fontWeight: 'bold', color: 'grey'},
  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    position: 'absolute',
  },
});
const CustomViewRow = props => {
  const {title, content} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 50,
      }}>
      <Text style={styles.styleTitle}>{title}</Text>
      <Text style={styles.styleContent}>{content}</Text>
    </View>
  );
};

export default DetalInventoryDeliveryVoucher;
