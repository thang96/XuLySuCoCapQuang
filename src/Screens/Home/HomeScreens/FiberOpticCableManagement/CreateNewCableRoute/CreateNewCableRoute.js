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
          Alert.alert('Tuyến cáp', 'Đã tạo tuyến cáp thành công');
          navigation.navigate('FiberOpticCableManagement');
        }
      })
      .catch(function (error) {
        // console.log(JSON.stringify(error));
        Alert.alert('Tuyến cáp', 'Đã tạo tuyến cáp thất bại');
      });
  };

  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Tạo tuyến cáp'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Tên tuyến cáp : '}
          placeholder={'Nhập tên tuyến cáp'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={nameCable}
          onChangeText={text => setNameCable(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Thời gian nghiệm thu đưa vào sử dụng : '}
          placeholder={'Nhập thời gian nghiệm thu đưa vào sử dụng'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={acceptanceTime}
          onChangeText={text => setAcceptanceTime(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'Chiều dài tuyến cáp (KM) : '}
          placeholder={'Nhập chiều dài tuyến cáp'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={cableLength}
          onChangeText={text => setCableLength(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'Tổng số FO : '}
          placeholder={'Nhập tổng số FO'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={foTotal}
          onChangeText={text => setFoTotal(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'Số FO đã sử dụng : '}
          placeholder={'Nhập số FO đã sử dụng'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={foUsed}
          onChangeText={text => setFoUsed(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'Số FO free : '}
          placeholder={'Nhập số FO free'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={foFree}
          onChangeText={text => setFoFree(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'Số lượng Măng Xông có trên tuyến : '}
          placeholder={'Nhập số lượng Măng Xông'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={quantityOfSocket}
          onChangeText={text => setQuantityOfSocket(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Tỉnh/Thành phố : '}
          placeholder={'Nhập Tỉnh/Thành phố'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={city}
          onChangeText={text => setCity(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Chủ sở hữu : '}
          placeholder={'Nhập chủ sở hữu'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={cableOwner}
          onChangeText={text => setCableOwner(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Thuộc công trình/dự án : '}
          placeholder={'Nhập công trình/dự án'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={project}
          onChangeText={text => setProject(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Thuộc hợp đồng : '}
          placeholder={'Nhập hợp đồng'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={contract}
          onChangeText={text => setContract(text)}
        />

        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Tên trạm đầu : '}
          placeholder={'Nhập tên trạm đầu'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={startStationName}
          onChangeText={text => setStartStationName(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Tọa độ long trạm đầu : '}
          placeholder={'Nhập tọa độ long trạm đầu'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={startStationLong}
          onChangeText={text => setStartStationLong(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Tọa độ lat trạm đầu : '}
          placeholder={'Nhập tọa độ lat trạm đầu'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={startStationLat}
          onChangeText={text => setStartStationLat(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Địa chỉ trạm đầu : '}
          placeholder={'Nhập địa chỉ trạm đầu'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={startStationAddress}
          onChangeText={text => setStartStationAddress(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Tên trạm cuối : '}
          placeholder={'Nhập tên trạm cuối'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={endStationName}
          onChangeText={text => setEndStationName(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Tọa độ long trạm cuối : '}
          placeholder={'Nhập tọa độ long trạm cuối'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={endStationLong}
          onChangeText={text => setEndStationLong(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Tọa độ lat trạm cuối : '}
          placeholder={'Nhập tọa độ lat trạm cuối'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={endStationLat}
          onChangeText={text => setEndStationLat(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Địa chỉ trạm cuối : '}
          placeholder={'Nhập địa chỉ trạm cuối'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={endStationAddress}
          onChangeText={text => setEndStationAddress(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Chủng loại cáp : '}
          placeholder={'Nhập chủng loại cáp'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={cableType}
          onChangeText={text => setCableType(text)}
        />

        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Loại kết nối : '}
          placeholder={'Nhập loại kết nối'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={cableConnectionType}
          onChangeText={text => setCableConnectionType(text)}
        />

        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Loại ODF trạm đầu-cuối : '}
          placeholder={'Nhập loại ODF trạm đầu'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={startEndStationOdfType}
          onChangeText={text => setStartEndStationOdfType(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[styles.styleViewInputChange]}
          title={'Hạ tầng (Ngầm/Treo) : '}
          placeholder={'Nhập loại ODF trạm cuối'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={cableInfrastructure}
          onChangeText={text => setCableInfrastructure(text)}
        />
        <CustomTextInputChangeValue
          keyboardType={'numeric'}
          styleViewInput={[styles.styleViewInputChange]}
          title={'ID địa điểm : '}
          placeholder={'ID địa điểm'}
          styleTitle={styles.styleTitleInput}
          editable={true}
          styleInput={styles.styleValueInput}
          value={areaId}
          onChangeText={text => setAreaId(text)}
        />
        <TouchableOpacity
          onPress={() => setIsActive(prev => (prev == true ? false : true))}
          style={[styles.styleViewInputChange, {height: 50}]}>
          <Text style={styles.styleTitleInput}>Trạng thái : </Text>
          {isActive ? (
            <Text style={styles.styleValueInput}>Đã kích hoạt</Text>
          ) : (
            <Text style={styles.styleValueInput}>Chưa kích hoạt</Text>
          )}
        </TouchableOpacity>

        <CustomTextButton
          disabled={isValidate() ? false : true}
          styleButton={[
            styles.styleCustomTextButton,
            {backgroundColor: isValidate() ? colors.mainColor : colors.grey},
          ]}
          textStyle={styles.styleTextCustomTextButton}
          label={'Tạo tuyến cáp'}
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
    borderRadius: 10,
  },
  styleTextCustomTextButton: {fontSize: 18, fontWeight: 'bold', color: 'white'},
});
export default CreateNewCableRoute;
