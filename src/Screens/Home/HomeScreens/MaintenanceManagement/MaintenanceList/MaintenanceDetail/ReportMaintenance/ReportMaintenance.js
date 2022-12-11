import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
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
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import CustomAppBar from '../../../../../../../Components/CustomAppBar';
import CustomModalCamera from '../../../../../../../Components/CustomModalCamera';
import {uuid} from '../../../../../../../utils/uuid';
import CustomButtonIcon from '../../../../../../../Components/CustomButtonIcon';
import CustomTextInputChangeValue from '../../../../../../../Components/CustomTextInputChangeValue';
import CustomLoading from '../../../../../../../Components/CustomLoading';
import {colors, icons} from '../../../../../../../Constants';
import common from '../../../../../../../utils/common';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import MaintenanceManagementAPI from '../../../../../../../Api/Home/MaintenanceManagementAPI/MaintenanceManagementAPI';
import CustomModalStableWarehouse from '../../../../../../../Components/CustomModalStableWarehouse';
import {
  GetStableWarehouseAPI,
  GetStableWarehouseSuppliesByIdAPI,
} from '../../../../../../../Api/Home/StableWarehouseAPI/StableWarehouseAPI';
const ReportMaintenance = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getResult();
  }, []);
  const getResult = async () => {
    let id = route.params;
    await MaintenanceManagementAPI.GetMaintenanceIssueByIdAPI(token, id)
      .then(res => {
        setRequest(res?.data?.data);
        setLoading(false);
      })
      .catch(error => {
        // console.log(error);
      });
    await GetStableWarehouseAPI(token)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setlistwarehouse(res?.data?.data);
          // setListSupplies(res?.data?.data);
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  const [measureCableResult, setMeasureCableResult] = useState(null);
  const [measureCableResultDocument, setMeasureCableResultDocument] = useState(
    [],
  );
  const [cleanCableResult, setCleanCableResult] = useState(null);
  const [adjustTensionCable, setAdjustTensionCable] = useState(null);
  const [checkSupplies, setCheckSupplies] = useState(null);
  const [cleanUndergroundCable, setCleanUndergroundCable] = useState(null);
  const [checkPreventiveCable, setCheckPreventiveCable] = useState(null);
  const [checkCableSocket, setCheckCableSocket] = useState(null);
  const [checkCableOdfAdapter, setCheckCableOdfAdapter] = useState(null);
  const [solutionProvide, setSolutionProvide] = useState('');
  const [documentFiles, setDocumentFiles] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [suppliesName, setSuppliesName] = useState([]);

  const [listSupplies, setListSupplies] = useState([]);
  const [listwarehouse, setlistwarehouse] = useState([]);
  const [warehouse, setwarehouse] = useState('');
  const [modalStableWarehouse, setModalStableWarehouse] = useState(false);

  const isValueOK = () =>
    measureCableResult != null &&
    measureCableResultDocument.length > 0 &&
    cleanCableResult != null &&
    adjustTensionCable != null &&
    checkSupplies != null &&
    cleanUndergroundCable != null &&
    checkPreventiveCable != null &&
    checkCableSocket != null &&
    checkCableOdfAdapter != null &&
    solutionProvide.length > 0 &&
    documentFiles.length > 0 &&
    supplies.length > 0;

  const [modalResultCamera, setModalResultCamera] = useState(false);
  const [modalCamera, setModalCamera] = useState(false);
  const [modalSupplies, setModalSupplies] = useState(false);
  const openResultCamera = () => {
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        addMeasureCableResultDocument(eachImg);
        setModalResultCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalResultCamera(false);
      });
  };
  const openResultGallery = () => {
    ImagePicker.openPicker({multiple: true})
      .then(image => {
        let albumImg = [];
        for (let index = 0; index < image.length; index++) {
          let element = image[index];
          let eachElement = {...element, uri: element?.path};
          albumImg.push(eachElement);
        }
        addMeasureCableResultDocumentGallery(albumImg);
        setModalResultCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalResultCamera(false);
      });
  };
  const addMeasureCableResultDocumentGallery = album => {
    const eachResult = [...measureCableResultDocument];
    const newResult = eachResult.concat(album);
    setMeasureCableResultDocument(newResult);
  };
  const addMeasureCableResultDocument = image => {
    const eachResult = [...measureCableResultDocument, image];
    setMeasureCableResultDocument(eachResult);
  };

  const openCamera = () => {
    ImagePicker.openCamera({width: 300, height: 400})
      .then(image => {
        let eachImg = {...image, uri: image?.path};
        addDocumentFiles(eachImg);
        setModalCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
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
        addDocumentFilesGallery(albumImg);
        setModalCamera(false);
      })
      .catch(e => {
        ImagePicker.clean();
        setModalCamera(false);
      });
  };
  const addDocumentFilesGallery = album => {
    const eachResult = [...documentFiles];
    const newResult = eachResult.concat(album);
    setDocumentFiles(newResult);
  };
  const addDocumentFiles = image => {
    const eachResult = [...documentFiles, image];
    setDocumentFiles(eachResult);
  };

  const renderMeasureCableResultDocument = (item, index) => {
    return (
      <View style={styles.viewRender}>
        <CustomButtonIcon
          imageStyle={styles.imageClear}
          source={icons.ic_cancel}
          styleButton={styles.buttonClear}
          onPress={() => removeMeasureCableResultDocument(index)}
        />
        <Image
          source={{uri: item?.uri}}
          style={{width: '100%', height: '100%', marginHorizontal: 5}}
          resizeMode={'contain'}
        />
      </View>
    );
  };
  const removeMeasureCableResultDocument = indexID => {
    const indexSelected = measureCableResultDocument[indexID];
    const newArray = measureCableResultDocument.filter(
      item => item != indexSelected,
    );
    setMeasureCableResultDocument(newArray);
  };
  const sendReport = async () => {
    setIsLoading(true);
    let issueId = request?.id;
    await MaintenanceManagementAPI.MaintenanceIssueReportAPI(
      token,
      issueId,
      measureCableResult,
      measureCableResultDocument,
      cleanCableResult,
      adjustTensionCable,
      checkSupplies,
      cleanUndergroundCable,
      checkPreventiveCable,
      checkCableSocket,
      checkCableOdfAdapter,
      solutionProvide,
      documentFiles,
      supplies,
    )
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setIsLoading(false);
          Alert.alert('Báo cáo', 'Gửi báo cáo thành công');
          navigation.navigate('MaintenanceManagement');
        } else if (res?.status == 200 && res?.data?.success == false) {
          setIsLoading(false);
          Alert.alert('Báo cáo', 'Không thể gửi báo cáo');
          navigation.navigate('MaintenanceManagement');
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        // console.log(error);
        Alert.alert('Báo cáo', 'Gửi báo cáo thất bại');
      });
  };

  const renderDocumentFiles = (item, index) => {
    return (
      <View style={styles.viewRender}>
        <CustomButtonIcon
          imageStyle={styles.imageClear}
          source={icons.ic_cancel}
          styleButton={styles.buttonClear}
          onPress={() => removeDocumentFiles(index)}
        />
        <Image
          source={{uri: item?.uri}}
          style={{width: '100%', height: '100%', marginHorizontal: 5}}
          resizeMode={'contain'}
        />
      </View>
    );
  };
  const removeDocumentFiles = indexID => {
    const indexSelected = documentFiles[indexID];
    const newArray = documentFiles.filter(item => item != indexSelected);
    setDocumentFiles(newArray);
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
  const getListSuppliesInfor = async id => {
    await GetStableWarehouseSuppliesByIdAPI(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          let eachSupplies = [];
          for (let index = 0; index < res?.data?.data?.data.length; index++) {
            let element = res?.data?.data?.data[index];
            let value = {
              name: element?.supplies?.name,
              id: element?.supplies_id,
            };
            eachSupplies.push(value);
          }
          setListSupplies(eachSupplies);
        }
      })
      .catch(function (error) {
        // console.log(error);
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
      <KeyboardAvoidingView style={styles.container}>
        {modalStableWarehouse && (
          <View style={styles.styleModal}>
            <CustomModalStableWarehouse
              data={listwarehouse}
              closeModal={() => setModalStableWarehouse(false)}
              onPress={item => {
                setwarehouse(item);
                getListSuppliesInfor(item?.id);
                setModalStableWarehouse(false);
              }}
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
        {modalResultCamera && (
          <View style={styles.styleModal}>
            <CustomModalCamera
              openCamera={() => {
                openResultCamera();
              }}
              openGallery={() => {
                openResultGallery();
              }}
              modalVisible={modalResultCamera}
              onRequestClose={() => {
                setModalResultCamera(false);
              }}
              cancel={() =>
                setModalResultCamera(prev => (prev == false ? true : false))
              }
            />
          </View>
        )}
        {modalCamera && (
          <View style={styles.styleModal}>
            <CustomModalCamera
              openCamera={() => {
                openCamera();
              }}
              openGallery={() => {
                openGallery();
              }}
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
        <CustomAppBar
          title={'Báo cáo kết quả'}
          iconsLeft={icons.ic_back}
          onPressIconsLeft={() => navigation.goBack()}
        />
        {loading ? (
          <ActivityIndicator size={'large'} color={colors.mainColor} />
        ) : (
          <View style={styles.container}>
            <ScrollView style={styles.eachContainer}>
              <Text style={styles.title}>Thông tin yêu cầu xử lý</Text>
              <Text style={styles.content}>{`Mã CV : ${request?.code}`}</Text>
              <Text
                style={
                  styles.content
                }>{`Nhân sự kỹ thuật : ${request?.user_assigned}`}</Text>
              <View style={[styles.line, {marginVertical: 10}]} />

              <View style={styles.viewItem}>
                <CustomComponentViewCheck
                  title={'Kết quả đo tuyến cáp'}
                  result={measureCableResult}
                  onPressOk={() => setMeasureCableResult(true)}
                  onPressNotOk={() => setMeasureCableResult(false)}
                />
                <FlatList
                  horizontal
                  data={measureCableResultDocument}
                  keyExtractor={uuid}
                  renderItem={({item, index}) =>
                    renderMeasureCableResultDocument(item, index)
                  }
                />
                <TouchableOpacity
                  onPress={() => setModalResultCamera(true)}
                  style={[styles.buttonUpload, {marginTop: 10}]}>
                  <Image
                    source={icons.ic_report}
                    style={[
                      styles.iconButtonUpload,
                      {tintColor: colors.mainColor},
                    ]}
                  />
                  <Text
                    style={[
                      styles.textButtonUpload,
                      {color: colors.mainColor},
                    ]}>
                    Chụp kết quả đo
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.viewItem}>
                <CustomComponentViewCheck
                  title={'Phát quang\ndọc tuyến cáp'}
                  result={cleanCableResult}
                  onPressOk={() => setCleanCableResult(true)}
                  onPressNotOk={() => setCleanCableResult(false)}
                />
              </View>
              <View style={styles.viewItem}>
                <CustomComponentViewCheck
                  title={'Căn chỉnh các tuyến\ncáp quang treo'}
                  result={adjustTensionCable}
                  onPressOk={() => setAdjustTensionCable(true)}
                  onPressNotOk={() => setAdjustTensionCable(false)}
                />
              </View>
              <View style={styles.viewItem}>
                <CustomComponentViewCheck
                  title={'Kiểm tra chỉnh lại vật tư\nphụ kiện treo cáp'}
                  result={checkSupplies}
                  onPressOk={() => setCheckSupplies(true)}
                  onPressNotOk={() => setCheckSupplies(false)}
                />
              </View>
              <View style={styles.viewItem}>
                <CustomComponentViewCheck
                  title={'Vệ sinh công bể\ncáp ngầm'}
                  result={cleanUndergroundCable}
                  onPressOk={() => setCleanUndergroundCable(true)}
                  onPressNotOk={() => setCleanUndergroundCable(false)}
                />
              </View>
              <View style={styles.viewItem}>
                <CustomComponentViewCheck
                  title={'Kiểm tra làm gọn cáp\ndự phòng'}
                  result={checkPreventiveCable}
                  onPressOk={() => setCheckPreventiveCable(true)}
                  onPressNotOk={() => setCheckPreventiveCable(false)}
                />
              </View>
              <View style={styles.viewItem}>
                <CustomComponentViewCheck
                  title={'Kiểm tra, vệ sinh\nmăng xông nối cáp'}
                  result={checkCableSocket}
                  onPressOk={() => setCheckCableSocket(true)}
                  onPressNotOk={() => setCheckCableSocket(false)}
                />
              </View>
              <View style={styles.viewItem}>
                <CustomComponentViewCheck
                  title={'Kiểm tra, vệ sinh ODF và\ncác đầu Adapter quang'}
                  result={checkCableOdfAdapter}
                  onPressOk={() => setCheckCableOdfAdapter(true)}
                  onPressNotOk={() => setCheckCableOdfAdapter(false)}
                />
              </View>
              <Text style={styles.title}>Phương án đề xuất tối ưu</Text>
              <CustomTextInputChangeValue
                styleViewInput={{
                  height: 50,
                  width: '100%',
                  backgroundColor: 'white',
                }}
                placeholder={'Nhập phương án'}
                value={solutionProvide}
                onChangeText={text => setSolutionProvide(text)}
              />
              <Text style={styles.title}>Hình ảnh báo cáo</Text>
              <FlatList
                horizontal
                data={documentFiles}
                keyExtractor={uuid}
                renderItem={({item, index}) => renderDocumentFiles(item, index)}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalCamera(true)}>
                <Image
                  style={[styles.imageUpload, {tintColor: colors.mainColor}]}
                  source={icons.ic_upload}
                />
                <Text style={[styles.textUpload, {color: colors.mainColor}]}>
                  Chụp báo cáo
                </Text>
              </TouchableOpacity>
              <Text style={styles.title}>Kho vật tư</Text>
              <TouchableOpacity
                onPress={() => setModalStableWarehouse(true)}
                style={styles.buttonPicker}>
                <Text style={styles.textPicker}>
                  {warehouse ? warehouse?.name : 'Chọn kho vật tư'}
                </Text>
                <Image source={icons.ic_downArrow} style={styles.imagePicker} />
              </TouchableOpacity>
              {warehouse && (
                <View>
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
                            keyboardType="numeric"
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
                </View>
              )}
            </ScrollView>
            <TouchableOpacity
              disabled={isValueOK() ? false : true}
              onPress={sendReport}
              style={[
                styles.styleButton,
                {backgroundColor: isValueOK() ? colors.mainColor : 'grey'},
              ]}>
              <Text style={styles.textSendReport}>Gửi báo cáo</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {flex: 1, paddingHorizontal: 10},
  styleModal: {
    backgroundColor: 'rgba(119,119,119,0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {color: 'black', fontSize: 18, fontWeight: 'bold', marginVertical: 10},
  content: {color: 'grey', fontSize: 18},
  line: {height: 1, width: '100%', backgroundColor: 'grey'},
  image: {
    width: 300,
    height: 300,
    marginVertical: 10,
    alignSelf: 'center',
  },
  viewCustomTextInputChangeValue: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  styleTitle: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  buttonUpload: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconButtonUpload: {
    width: 35,
    height: 35,
    marginRight: 5,
    marginBottom: 10,
  },
  textButtonUpload: {fontSize: 18, fontWeight: 'bold'},
  viewItem: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  imageUpload: {
    width: 25,
    height: 25,
    marginRight: 5,
  },
  textUpload: {
    fontSize: 16,
    fontWeight: 'bold',
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
  buttonClear: {position: 'absolute', top: 0, right: 0, zIndex: 2},
  imageClear: {width: 20, height: 20, tintColor: 'red'},
  viewRender: {
    width: 200,
    height: 200,
    borderWidth: 0.5,
    padding: 5,
    borderColor: colors.mainColor,
    backgroundColor: 'white',
  },
  styleButton: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSendReport: {fontSize: 18, color: 'white', fontWeight: 'bold'},
  styleCustomButtonIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 9999,
    position: 'absolute',
  },
});
const CustomComponentViewCheck = props => {
  const {title, result, onPressOk, onPressNotOk} = props;
  return (
    <View style={styleComponent.view}>
      <Text style={styles.title}>{title}</Text>
      <View>
        <TouchableOpacity
          onPress={onPressOk}
          style={styleComponent.buttonCheck}>
          <Text style={{fontSize: 14, color: 'black'}}>Đạt</Text>
          <Image
            source={result == true ? icons.ic_check : icons.ic_no_check}
            style={{height: 15, width: 15, marginLeft: 5}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressNotOk}
          style={styleComponent.buttonCheck}>
          <Text style={{fontSize: 14, color: 'black'}}>Không đạt</Text>
          <Image
            source={result == false ? icons.ic_check : icons.ic_no_check}
            style={{height: 15, width: 15, marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styleComponent = StyleSheet.create({
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 5,
  },
});

export default ReportMaintenance;
