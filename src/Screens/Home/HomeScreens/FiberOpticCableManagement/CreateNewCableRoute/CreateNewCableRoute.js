import {useNavigation} from '@react-navigation/native';
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
} from 'react-native';
import {useSelector} from 'react-redux';
import OpticalCablesAPI from '../../../../../Api/Home/OpticalCablesAPI/OpticalCablesAPI';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import CustomTextButton from '../../../../../Components/CustomTextButton';
import CustomTextInputChangeValue from '../../../../../Components/CustomTextInputChangeValue';
import {icons, colors} from '../../../../../Constants';
const CreateNewCableRoute = props => {
  const navigation = useNavigation();
  const token = useSelector(state => state?.token?.token);
  const isValidate = () =>
    city.length > 0 &&
    cableOwner.length > 0 &&
    project.length > 0 &&
    contract.length > 0 &&
    acceptanceTime.length > 0 &&
    nameCable.length > 0 &&
    startStationName.length > 0 &&
    startStationLong.length > 0 &&
    startStationLat.length > 0 &&
    startStationAddress.length > 0 &&
    endStationName.length > 0 &&
    endStationLong.length > 0 &&
    endStationLat.length > 0 &&
    endStationAddress.length > 0 &&
    cableType.length > 0 &&
    cableLength.length > 0 &&
    cableConnectionType.length > 0 &&
    foTotal.length > 0 &&
    foUsed.length > 0 &&
    foFree.length > 0 &&
    quantityOfSocket.length > 0 &&
    startEndStationOdfType.length > 0 &&
    cableInfrastructure.length > 0 &&
    areaId.length > 0;

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
  const [cableInfrastructure, setCableInfrastructure] = useState('');
  const [cableConnectionType, setCableConnectionType] = useState('');
  const [startEndStationOdfType, setStartEndStationOdfType] = useState('');
  const [areaId, setAreaId] = useState('');
  const [isActive, setIsActive] = useState(true);
  const createCableRoute = async () => {
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
      end_station_lat: startStationLat,
      end_station_address: endStationAddress,
      cable_type: cableType,
      cable_infrastructure: cableInfrastructure,
      cable_connection_type: cableConnectionType,
      start_end_station_odf_type: startEndStationOdfType,
      area_id: parseInt(areaId),
      is_active: isActive,
    };

    await OpticalCablesAPI.CreateOpticalCablesAPI(token, data)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert('Tuy???n c??p', '???? t???o tuy???n c??p th??nh c??ng');
          navigation.navigate('FiberOpticCableManagement');
        }
      })
      .catch(function (error) {
        // console.log(JSON.stringify(error));
        Alert.alert('Tuy???n c??p', '???? t???o tuy???n c??p th???t b???i');
      });
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'T???o tuy???n c??p'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'T??n tuy???n c??p : '}
          placeholder={'Nh???p t??n tuy???n c??p'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={nameCable}
          onChangeText={text => setNameCable(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Th???i gian nghi???m thu ????a v??o s??? d???ng : '}
          placeholder={'Nh???p th???i gian nghi???m thu ????a v??o s??? d???ng'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={acceptanceTime}
          onChangeText={text => setAcceptanceTime(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'Chi???u d??i tuy???n c??p (KM) : '}
          placeholder={'Nh???p chi???u d??i tuy???n c??p'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={cableLength}
          onChangeText={text => setCableLength(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'T???ng s??? FO : '}
          placeholder={'Nh???p t???ng s??? FO'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={foTotal}
          onChangeText={text => setFoTotal(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'S??? FO ???? s??? d???ng : '}
          placeholder={'Nh???p s??? FO ???? s??? d???ng'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={foUsed}
          onChangeText={text => setFoUsed(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'S??? FO free : '}
          placeholder={'Nh???p s??? FO free'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={foFree}
          onChangeText={text => setFoFree(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'S??? l?????ng M??ng X??ng c?? tr??n tuy???n : '}
          placeholder={'Nh???p s??? l?????ng M??ng X??ng'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={quantityOfSocket}
          onChangeText={text => setQuantityOfSocket(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'T???nh/Th??nh ph??? : '}
          placeholder={'Nh???p T???nh/Th??nh ph???'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={city}
          onChangeText={text => setCity(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Ch??? s??? h???u : '}
          placeholder={'Nh???p ch??? s??? h???u'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={cableOwner}
          onChangeText={text => setCableOwner(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Thu???c c??ng tr??nh/d??? ??n : '}
          placeholder={'Nh???p c??ng tr??nh/d??? ??n'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={project}
          onChangeText={text => setProject(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Thu???c h???p ?????ng : '}
          placeholder={'Nh???p h???p ?????ng'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={contract}
          onChangeText={text => setContract(text)}
        />

        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'T??n tr???m ?????u : '}
          placeholder={'Nh???p t??n tr???m ?????u'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={startStationName}
          onChangeText={text => setStartStationName(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'T???a ????? long tr???m ?????u : '}
          placeholder={'Nh???p t???a ????? long tr???m ?????u'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={startStationLong}
          onChangeText={text => setStartStationLong(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'T???a ????? lat tr???m ?????u : '}
          placeholder={'Nh???p t???a ????? lat tr???m ?????u'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={startStationLat}
          onChangeText={text => setStartStationLat(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'?????a ch??? tr???m ?????u : '}
          placeholder={'Nh???p ?????a ch??? tr???m ?????u'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={startStationAddress}
          onChangeText={text => setStartStationAddress(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'T??n tr???m cu???i : '}
          placeholder={'Nh???p t??n tr???m cu???i'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={endStationName}
          onChangeText={text => setEndStationName(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'T???a ????? long tr???m cu???i : '}
          placeholder={'Nh???p t???a ????? long tr???m cu???i'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={endStationLong}
          onChangeText={text => setEndStationLong(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'T???a ????? lat tr???m cu???i : '}
          placeholder={'Nh???p t???a ????? lat tr???m cu???i'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={endStationLat}
          onChangeText={text => setEndStationLat(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'?????a ch??? tr???m cu???i : '}
          placeholder={'Nh???p ?????a ch??? tr???m cu???i'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={endStationAddress}
          onChangeText={text => setEndStationAddress(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Ch???ng lo???i c??p : '}
          placeholder={'Nh???p ch???ng lo???i c??p'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={cableType}
          onChangeText={text => setCableType(text)}
        />

        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Lo???i k???t n???i : '}
          placeholder={'Nh???p lo???i k???t n???i'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={cableConnectionType}
          onChangeText={text => setCableConnectionType(text)}
        />

        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Lo???i ODF tr???m ?????u-cu???i : '}
          placeholder={'Nh???p lo???i ODF tr???m ?????u'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={startEndStationOdfType}
          onChangeText={text => setStartEndStationOdfType(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'H??? t???ng (Ng???m/Treo) : '}
          placeholder={'Nh???p lo???i ODF tr???m cu???i'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={cableInfrastructure}
          onChangeText={text => setCableInfrastructure(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'ID ?????a ??i???m : '}
          placeholder={'ID ?????a ??i???m'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={areaId}
          onChangeText={text => setAreaId(text)}
        />
        <TouchableOpacity
          onPress={() => setIsActive(prev => (prev == true ? false : true))}
          style={[styles.styleViewInputChange, {height: 50}]}>
          <Text style={styles.styleTitleInput}>Tr???ng th??i : </Text>
          {isActive ? (
            <Text style={styles.styleValueInput}>???? k??ch ho???t</Text>
          ) : (
            <Text style={styles.styleValueInput}>Ch??a k??ch ho???t</Text>
          )}
        </TouchableOpacity>

        <CustomTextButton
          disabled={isValidate() ? false : true}
          styleButton={[
            styles.styleCustomTextButton,
            {backgroundColor: isValidate() ? colors.mainColor : colors.grey},
          ]}
          textStyle={styles.styleTextCustomTextButton}
          label={'T???o tuy???n c??p'}
          onPress={() => createCableRoute()}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  styleViewInputChange: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  styleTitleInput: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    width: '30%',
  },
  styleValueInput: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'normal',
    width: '70%',
  },
  styleCustomTextButton: {
    height: 50,
    width: 150,
    marginVertical: 15,

    alignSelf: 'center',
    borderRadius: 15,
  },
  styleTextCustomTextButton: {fontSize: 18, fontWeight: 'bold', color: 'white'},
});
export default CreateNewCableRoute;
