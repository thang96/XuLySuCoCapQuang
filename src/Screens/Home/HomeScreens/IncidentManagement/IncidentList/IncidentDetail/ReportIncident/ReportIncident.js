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
  ActivityIndicator,
  Alert,
} from 'react-native';
import CustomAppBar from '../../../../../../../Components/CustomAppBar';
import CustomModalCamera from '../../../../../../../Components/CustomModalCamera';
import CustomTextButton from '../../../../../../../Components/CustomTextButton';
import CustomLoading from '../../../../../../../Components/CustomLoading';
import CustomTextInputChangeValue from '../../../../../../../Components/CustomTextInputChangeValue';
import {colors, icons} from '../../../../../../../Constants';
import common from '../../../../../../../utils/common';
import {uuid} from '../../../../../../../utils/uuid';
import ImagePicker from 'react-native-image-crop-picker';
import IncidentManagementAPI from '../../../../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';
import {useSelector} from 'react-redux';
import CustomButtonIcon from '../../../../../../../Components/CustomButtonIcon';
import Geolocation from '@react-native-community/geolocation';
import CustomModalStableWarehouse from '../../../../../../../Components/CustomModalStableWarehouse';
import {
  GetStableWarehouseSuppliesByIdAPI,
  GetStableWarehouseAPI,
} from '../../../../../../../Api/Home/StableWarehouseAPI/StableWarehouseAPI';
const ReportIncident = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const [request, setRequest] = useState(null);
  const [locationLongitude, setLocationLongitude] = useState('');
  const [locationLatitude, setLocationLatitude] = useState('');
  const [reason, setReason] = useState('');
  const [solution, setSolution] = useState('');
  const [reportDocument, setReportDocument] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supplies, setSupplies] = useState([]);
  const [suppliesName, setSuppliesName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listSupplies, setListSupplies] = useState([]);
  const [listwarehouse, setlistwarehouse] = useState([]);
  const [warehouse, setwarehouse] = useState('');
  useEffect(() => {
    getResult();
  }, []);
  const getResult = async () => {
    let id = route.params;
    await IncidentManagementAPI.GetIncidentIssueByIdAPI(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setRequest(res?.data?.data);
          setLoading(false);
        }
      })
      .catch(error => {
        console.log(error);
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

  const isValueOK = () =>
    locationLongitude.length != '' &&
    locationLatitude.length != '' &&
    reason.length != '' &&
    solution.length != '' &&
    reportDocument.length > 0 &&
    supplies.length > 0;

  const [modalCamera, setModalCamera] = useState(false);
  const [modalSupplies, setModalSupplies] = useState(false);
  const [modalStableWarehouse, setModalStableWarehouse] = useState(false);

  const getLocation = () => {
    Geolocation.getCurrentPosition(info => {
      setLocationLongitude(info?.coords?.longitude);
      setLocationLatitude(info?.coords?.latitude);
    });
  };
  const openCamera = () => {
    setModalCamera(true);
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

  const openGallery = () => {
    setModalCamera(true);
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
    const eachResult = [...reportDocument];
    const newResult = eachResult.concat(album);
    setReportDocument(newResult);
  };
  const sendReport = async () => {
    setIsLoading(true);
    let issueId = request?.id;
    await IncidentManagementAPI.IssueReportAPI(
      token,
      issueId,
      locationLongitude,
      locationLatitude,
      reason,
      solution,
      reportDocument,
      supplies,
    )
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setIsLoading(false);
          Alert.alert('B??o c??o', 'G???i b??o c??o th??nh c??ng');
          navigation.navigate('IncidentList');
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        Alert.alert('B??o c??o', 'G???i b??o c??o th???t b???i');
      });
  };
  const addResult = image => {
    const eachResult = [...reportDocument, image];
    setReportDocument(eachResult);
  };
  const renderImage = (image, index) => {
    return (
      <View style={styles.viewRender}>
        <CustomButtonIcon
          imageStyle={styles.imageClear}
          source={icons.ic_cancel}
          styleButton={styles.buttonClear}
          onPress={() => removeImage(index)}
        />
        <Image
          source={{uri: image?.path}}
          style={{width: '100%', height: '100%', marginHorizontal: 5}}
          resizeMode={'contain'}
        />
      </View>
    );
  };
  const removeImage = indexID => {
    const indexSelected = reportDocument[indexID];
    const newArray = reportDocument.filter(item => item != indexSelected);
    setReportDocument(newArray);
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
        title={'B??o c??o k???t qu???'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.mainColor} />
      ) : (
        <View style={{flex: 1}}>
          <ScrollView style={styles.eachContainer}>
            <Text style={styles.title}>Th??ng tin y??u c???u x??? l??</Text>
            <Text style={styles.content}>{`M?? CV : ${request?.code}`}</Text>
            <Text
              style={
                styles.content
              }>{`Nh??n s??? k??? thu???t : ${request?.user_assigned}`}</Text>
            <View style={[styles.line, {marginVertical: 10}]} />
            <View style={styles.viewRow}>
              <Text style={styles.title}>Nh???p th??ng tin v??? tr??</Text>
              <CustomTextButton
                textStyle={{
                  color: colors.mainColor,
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
                styleButton={{height: 50}}
                label={'L???y v??? tr?? >>'}
                onPress={() => getLocation()}
              />
            </View>

            <View style={styles.viewCustomTextInputChangeValue}>
              <Text style={styles.styleTitle}>Longitude : </Text>
              <Text>{locationLongitude}</Text>
            </View>
            <View style={styles.viewCustomTextInputChangeValue}>
              <Text style={styles.styleTitle}>Latitude : </Text>
              <Text>{locationLatitude}</Text>
            </View>

            <Text style={styles.title}>L?? do</Text>
            <CustomTextInputChangeValue
              styleViewInput={{
                height: 50,
                width: '100%',
                backgroundColor: 'white',
              }}
              placeholder={'Nh???p l?? do'}
              value={reason}
              onChangeText={text => setReason(text)}
            />
            <Text style={styles.title}>Ph????ng ??n ????? xu???t t???i ??u</Text>
            <CustomTextInputChangeValue
              styleViewInput={{
                height: 50,
                width: '100%',
                backgroundColor: 'white',
              }}
              placeholder={'Nh???p ph????ng ??n t???i ??u'}
              value={solution}
              onChangeText={text => setSolution(text)}
            />
            <Text style={styles.title}>H??nh ???nh b??o c??o</Text>
            <FlatList
              horizontal
              data={reportDocument}
              keyExtractor={uuid}
              renderItem={({item, index}) => renderImage(item, index)}
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
            <Text style={styles.title}>Kho v???t t??</Text>
            <TouchableOpacity
              onPress={() => setModalStableWarehouse(true)}
              style={styles.buttonPicker}>
              <Text style={styles.textPicker}>
                {warehouse ? warehouse?.name : 'Ch???n kho v???t t??'}
              </Text>
              <Image source={icons.ic_downArrow} style={styles.imagePicker} />
            </TouchableOpacity>
            {warehouse && (
              <View>
                <Text style={styles.title}>V???t t??</Text>
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
                          placeholder={'Nh???p s??? l?????ng'}
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
                  <Text style={{color: colors.mainColor}}>Th??m v???t t??</Text>
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
            <Text style={styles.textSendReport}>G???i b??o c??o</Text>
          </TouchableOpacity>
        </View>
      )}
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
  iconButtonUpload: {width: 35, height: 35, marginRight: 5, marginBottom: 10},
  textButtonUpload: {color: colors.mainColor, fontSize: 18, fontWeight: 'bold'},
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

export default ReportIncident;
