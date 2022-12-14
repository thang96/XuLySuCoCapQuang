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
import {colors, icons, images} from '../../../../../Constants';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomTextButton from '../../../../../Components/CustomTextButton';
import CustomTextInputChangeValue from '../../../../../Components/CustomTextInputChangeValue';
import CusttomTwoButtonBottom from '../../../../../Components/CusttomTwoButtonBottom';
import {useSelector} from 'react-redux';
import OpticalCablesAPI from '../../../../../Api/Home/OpticalCablesAPI/OpticalCablesAPI';
import CustomConfirm from '../../../../../Components/CustomConfirm';
const FibelOpticCableDetail = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const [result, setResult] = useState(null);
  const [nameCable, setNameCable] = useState('');
  const [acceptanceTime, setAcceptanceTime] = useState('');
  const [cableLength, setCableLength] = useState('');
  const [foTotal, setFoTotal] = useState('');
  const [foUsed, setFoUsed] = useState('');
  const [foFree, setFoFree] = useState('');
  const [quantityOfSocket, setQuantityOfSocket] = useState('');
  const [city, setCity] = useState('');
  const [cableOwner, setCableOwner] = useState('');
  const [project, setProject] = useState('');
  const [contract, setContract] = useState('');
  const [startStationName, setStartStationName] = useState('');
  const [startStationLong, setStartStationLong] = useState('');
  const [startStationLat, setStartStationLat] = useState('');
  const [startStationAddress, setStartStationAddress] = useState('');
  const [endStationName, setEndStationName] = useState('');
  const [endStationLong, setEndStationLong] = useState('');
  const [endStationLat, setEndStationLat] = useState('');
  const [endStationAddress, setEndStationAddress] = useState('');
  const [cableType, setCableType] = useState('');
  const [cableConnectionType, setCableConnectionType] = useState('');
  const [startEndStationOdfType, setstartEndStationOdfType] = useState('');
  const [cableInfrastructure, setCableInfrastructure] = useState('');
  const [areaId, setAreaId] = useState('');
  const [isActive, setIsActive] = useState(null);

  useEffect(() => {
    getResult();
  }, []);

  const getResult = async () => {
    let id = route.params;
    await OpticalCablesAPI.GetOpticalCablesByIdAPI(token, id)
      .then(res => {
        setResult(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const [keyboardIsShow, setKeyboardIsShow] = useState(false);
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsShow(false);
    });
  }, []);
  useEffect(() => {
    setNameCable(result?.name ?? '');
    setAcceptanceTime(result?.acceptance_time ?? '');
    setCableLength(`${result?.cable_length}` ?? '');
    setFoTotal(`${result?.fo_total}` ?? '');
    setFoUsed(`${result?.fo_used}` ?? '');
    setFoFree(`${result?.fo_free}` ?? '');
    setQuantityOfSocket(`${result?.quantity_of_socket}` ?? '');
    setCity(result?.city ?? '');
    setCableOwner(result?.cable_owner ?? '');
    setProject(result?.project ?? '');
    setContract(result?.contract ?? '');
    setStartStationName(result?.start_station_name ?? '');
    setStartStationLong(result?.start_station_long ?? '');
    setStartStationLat(result?.start_station_lat ?? '');
    setStartStationAddress(result?.start_station_address ?? '');
    setEndStationName(result?.end_station_name ?? '');
    setEndStationLong(result?.end_station_long ?? '');
    setEndStationLat(result?.end_station_lat ?? '');
    setEndStationAddress(result?.end_station_address ?? '');
    setCableType(result?.cable_type ?? '');
    setCableConnectionType(result?.cable_connection_type ?? '');
    setstartEndStationOdfType(result?.start_end_station_odf_type ?? '');
    setCableInfrastructure(result?.cable_infrastructure ?? '');
    setAreaId(`${result?.area_id}` ?? '');
    setIsActive(result?.is_active ?? null);
  }, [result]);
  const updateCable = async () => {
    setEditable(false);
    let id = result?.id;
    let data = {
      name: nameCable,
      acceptance_time: acceptanceTime,
      cable_length: parseFloat(cableLength),
      fo_total: parseInt(foTotal),
      fo_used: parseInt(foUsed),
      fo_free: parseInt(foFree),
      quantity_of_socket: parseInt(quantityOfSocket),
      city: city,
      cable_owner: cableOwner,
      project: project,
      contract: contract,
      start_station_name: startStationName,
      start_station_long: startStationLong,
      start_station_lat: startStationLat,
      start_station_address: startStationAddress,
      end_station_name: endStationName,
      end_station_long: endStationLong,
      end_station_lat: endStationLat,
      end_station_address: endStationAddress,
      cable_type: cableType,
      cable_connection_type: cableConnectionType,
      start_end_station_odf_type: startEndStationOdfType,
      cable_infrastructure: cableInfrastructure,
      area_id: parseInt(areaId),
      is_active: isActive,
    };
    await OpticalCablesAPI.UpdateOpticalCablesAPI(token, data, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert('Tuy???n c??p', 'C???p nh???t tuy???n c??p th??nh c??ng');
          navigation.navigate('FiberOpticCableManagement');
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
        Alert.alert('Tuy???n c??p', 'C???p nh???t tuy???n c??p th???t b???i');
      });
  };

  const [confirm, setConfirm] = useState(false);
  const deleteOptical = async () => {
    let id = result?.id;
    await OpticalCablesAPI.DeleteOpticalCablesAPI(token, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert('Tuy???n c??p', 'X??a tuy???n c??p th??nh c??ng');
          navigation.goBack();
          setConfirm(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Tuy???n c??p', 'X??a tuy???n c??p th???t b???i');
      });
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi ti???t tuy???n c??p'}
        iconsLeft={icons.ic_back}
        iconRight={userInfor?.role != 'EMPLOYEE' ? icons.ic_delete : null}
        onPressIconsLeft={() => navigation.goBack()}
        onPressIconsRight={() => setConfirm(true)}
      />
      {confirm && (
        <View style={styles.viewModal}>
          <CustomConfirm
            title={'X??a tuy???n c??p'}
            content={'B???n c?? mu???n x??a tuy???n c??p ?'}
            leftLabel={'Tr??? l???i'}
            rightLabel={'X??a'}
            leftPress={() => setConfirm(false)}
            rightPress={() => deleteOptical()}
          />
        </View>
      )}
      {result ? (
        <ScrollView style={styles.eachContainer}>
          <View style={styles.viewRow}>
            <Text style={styles.title}>Chi ti???t tuy???n c??p</Text>
          </View>

          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'T??n tuy???n c??p : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={nameCable}
            onChangeText={text => setNameCable(text)}
          />
          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'Th???i gian nghi???m thu ????a v??o s??? d???ng : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={acceptanceTime}
            onChangeText={text => setAcceptanceTime(text)}
          />
          <CustomTextInputChangeValue
            keyboardType={'numeric'}
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'Chi???u d??i tuy???n c??p (KM) : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={cableLength}
            onChangeText={text => setCableLength(text)}
          />
          <CustomTextInputChangeValue
            keyboardType={'numeric'}
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'T???ng s??? FO : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={foTotal}
            onChangeText={text => setFoTotal(text)}
          />
          <CustomTextInputChangeValue
            keyboardType={'numeric'}
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'S??? FO ???? s??? d???ng : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={foUsed}
            onChangeText={text => setFoUsed(text)}
          />
          <CustomTextInputChangeValue
            keyboardType={'numeric'}
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'S??? FO free : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={foFree}
            onChangeText={text => setFoFree(text)}
          />
          <CustomTextInputChangeValue
            keyboardType={'numeric'}
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'S??? l?????ng M??ng X??ng c?? tr??n tuy???n : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={quantityOfSocket}
            onChangeText={text => setQuantityOfSocket(text)}
          />
          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'T???nh/th??nh : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={city}
            onChangeText={text => setCity(text)}
          />
          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'Ch??? s??? h???u : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={cableOwner}
            onChangeText={text => setCableOwner(text)}
          />
          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'Thu???c c??ng tr??nh/d??? ??n : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={project}
            onChangeText={text => setProject(text)}
          />
          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'Thu???c h???p ?????ng : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={contract}
            onChangeText={text => setContract(text)}
          />

          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'T??n tr???m ?????u : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={startStationName}
            onChangeText={text => setStartStationName(text)}
          />

          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'T???a ????? long tr???m ?????u : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={startStationLong}
            onChangeText={text => setStartStationLong(text)}
          />
          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'T???a ????? lat tr???m ?????u : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={startStationLat}
            onChangeText={text => setStartStationLat(text)}
          />

          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'?????a ch??? tr???m ?????u : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={startStationAddress}
            onChangeText={text => setStartStationAddress(text)}
          />
          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'T??n tr???m cu???i : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={endStationName}
            onChangeText={text => setEndStationName(text)}
          />

          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'T???a ????? long tr???m cu???i : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={endStationLong}
            onChangeText={text => setEndStationLong(text)}
          />
          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'T???a ????? lat tr???m cu???i : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={endStationLat}
            onChangeText={text => setEndStationLat(text)}
          />

          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'?????a ch??? tr???m cu???i : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={endStationAddress}
            onChangeText={text => setEndStationAddress(text)}
          />
          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'Ch???ng lo???i c??p : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={cableType}
            onChangeText={text => setCableType(text)}
          />

          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'Lo???i k???t n???i : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={cableConnectionType}
            onChangeText={text => setCableConnectionType(text)}
          />

          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'Lo???i ODF tr???m ?????u-cu???i : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={startEndStationOdfType}
            onChangeText={text => setstartEndStationOdfType(text)}
          />
          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'H??? t???ng (Ng???m/Treo) : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={cableInfrastructure}
            onChangeText={text => setCableInfrastructure(text)}
          />
          <CustomTextInputChangeValue
            styleViewInput={[
              styles.styleViewInputChange,
              {backgroundColor: editable ? 'white' : colors.background},
            ]}
            title={'Area ID : '}
            styleTitle={styles.styleTitleInput}
            editable={editable}
            styleInput={styles.styleValueInput}
            value={areaId}
            onChangeText={text => setAreaId(text)}
          />
          {isActive == true ? (
            <TouchableOpacity
              disabled={!editable}
              onPress={() => setIsActive(false)}
              style={[styles.styleViewInputChange, {height: 50}]}>
              <Text style={styles.styleTitleInput}>Tr???ng th??i : </Text>
              <Text style={styles.styleValueInput}>???? k??ch ho???t</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={!editable}
              onPress={() => setIsActive(true)}
              style={[styles.styleViewInputChange, {height: 50}]}>
              <Text style={styles.styleTitleInput}>Tr???ng th??i : </Text>
              <Text style={styles.styleValueInput}>Ch??a k??ch ho???t</Text>
            </TouchableOpacity>
          )}

          {userInfor?.role != 'EMPLOYEE' && (
            <CusttomTwoButtonBottom
              styleTwoButton={styles.viewCusttomTwoButtonBottom}
              styleButtonLeft={styles.button}
              styleIconLeft={[
                styles.icon,
                {tintColor: editable ? colors.grey : colors.mainColor},
              ]}
              iconLeft={icons.ic_edit}
              titleLeft={'Ch???nh s???a'}
              styleTitleLeft={[
                styles.text,
                {color: editable ? colors.grey : colors.mainColor},
              ]}
              disabledLeft={editable == false ? false : true}
              styleButtonRight={styles.button}
              styleIconRight={[
                styles.icon,
                {tintColor: editable ? colors.mainColor : colors.grey},
              ]}
              iconRight={icons.ic_document}
              titleRight={'L??u ch???nh s???a'}
              styleTitleRight={[
                styles.text,
                {color: editable ? colors.mainColor : colors.grey},
              ]}
              disabledRight={editable == false ? true : false}
              onPressLeftButton={() => setEditable(true)}
              onPressLeftRight={() => updateCable()}
            />
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color={colors.mainColor} />
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
  },
  imageMap: {
    height: 300,
    width: 300,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: colors.grey,
    fontWeight: 'normal',
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  styleViewInputChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  styleTitleInput: {
    fontSize: 16,
    color: colors.grey,
    fontWeight: 'normal',
    width: '30%',
  },
  styleValueInput: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    width: '70%',
  },
  viewCusttomTwoButtonBottom: {
    height: 50,
    flexDirection: 'row',
    marginVertical: 5,
  },
  button: {
    height: 50,
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.background,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    borderRadius: 5,
  },
  icon: {width: 30, height: 30, marginRight: 5},
  text: {fontSize: 14, fontWeight: 'normal'},
  viewRowText: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
  },
  styleViewInputChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  viewModal: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(119,119,119,0.5)',
    position: 'absolute',
    zIndex: 9999,
  },
});

export default FibelOpticCableDetail;
