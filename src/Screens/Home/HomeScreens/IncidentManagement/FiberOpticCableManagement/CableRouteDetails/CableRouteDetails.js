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
} from 'react-native';
import {colors, icons, images} from '../../../../../../Constants';
import CustomAppBar from '../../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomTextButton from '../../../../../../Components/CustomTextButton';
import CustomTextInputChangeValue from '../../../../../../Components/CustomTextInputChangeValue';
import CusttomTwoButtonBottom from '../../../../../../Components/CusttomTwoButtonBottom';
import {useSelector} from 'react-redux';
import OpticalCablesAPI from '../../../../../../Api/Home/OpticalCablesAPI/OpticalCablesAPI';
const CableRouteDetails = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const userInfor = useSelector(state => state?.userInfor?.userInfor);

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
  const [startStationOdfType, setStartStationOdfType] = useState('');
  const [endStationOdfType, setEndStationOdfType] = useState('');
  const [areaId, setAreaId] = useState('');
  const [isActive, setIsActive] = useState(null);

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
    setNameCable(route.params?.item?.name ?? '');
    setAcceptanceTime(route.params?.item?.acceptance_time ?? '');
    setCableLength(`${route.params?.item?.cable_length}` ?? '');
    setFoTotal(`${route.params?.item?.fo_total}` ?? '');
    setFoUsed(`${route.params?.item?.fo_used}` ?? '');
    setFoFree(`${route.params?.item?.fo_free}` ?? '');
    setQuantityOfSocket(`${route.params?.item?.quantity_of_socket}` ?? '');
    setCity(route.params?.item?.city ?? '');
    setCableOwner(route.params?.item?.cable_owner ?? '');
    setProject(route.params?.item?.project ?? '');
    setContract(route.params?.item?.contract ?? '');
    setStartStationName(route.params?.item?.start_station_name ?? '');
    setStartStationLong(route.params?.item?.start_station_long ?? '');
    setStartStationLat(route.params?.item?.start_station_lat ?? '');
    setStartStationAddress(route.params?.item?.start_station_address ?? '');
    setEndStationName(route.params?.item?.end_station_name ?? '');
    setEndStationLong(route.params?.item?.end_station_long ?? '');
    setEndStationLat(route.params?.item?.end_station_lat ?? '');
    setEndStationAddress(route.params?.item?.end_station_address ?? '');
    setCableType(route.params?.item?.cable_type ?? '');
    setCableConnectionType(route.params?.item?.cable_connection_type ?? '');
    setStartStationOdfType(route.params?.item?.start_station_odf_type ?? '');
    setEndStationOdfType(route.params?.item?.end_station_odf_type ?? '');
    setAreaId(`${route.params?.item?.area_id}` ?? '');
    setIsActive(`${route.params?.item?.is_active}` ?? '');
  }, []);
  const updateCable = async () => {
    setEditable(false);
    let id = route.params?.item?.area_id;
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
      start_station_odf_type: startStationOdfType,
      end_station_odf_type: endStationOdfType,
      area_id: parseInt(areaId),
      is_active: isActive,
    };
    await OpticalCablesAPI.UpdateOpticalCablesAPI(token, data, id)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          console.log(res?.data?.success);
          alert('Update tuyến cáp thành công');
          navigation.navigate('InformationListOfCableRoutes');
        }
      })
      .catch(function (error) {
        console.log(JSON.stringify(error));
        alert('Update tuyến cáp thất bại');
      });
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi tiết tuyến cáp'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() =>
          navigation.navigate('InformationListOfCableRoutes')
        }
      />
      <ScrollView style={styles.eachContainer}>
        {keyboardIsShow == false && (
          <Image source={images.im_map} style={styles.imageMap} />
        )}
        <View style={styles.viewRow}>
          <Text style={styles.title}>Chi tiết tuyến cáp</Text>
          <CustomTextButton
            styleButton={{height: 25}}
            label={'Lịch sử xử lý sự cố'}
            textStyle={{
              color: colors.mainColor,
              fontSize: 18,
              fontWeight: 'bold',
            }}
            onPress={() => {}}
          />
        </View>

        <CustomTextInputChangeValue
          styleViewInput={[
            styles.styleViewInputChange,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Tên tuyến cáp : '}
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
          title={'Thời gian nghiệm thu đưa vào sử dụng : '}
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
          title={'Chiều dài tuyến cáp (KM) : '}
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
          title={'Tổng số FO : '}
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
          title={'Số FO đã sử dụng : '}
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
          title={'Số FO free : '}
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
          title={'Số lượng Măng Xông có trên tuyến : '}
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
          title={'Tỉnh/thành : '}
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
          title={'Chủ sở hữu : '}
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
          title={'Thuộc công trình/dự án : '}
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
          title={'Thuộc hợp đồng : '}
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
          title={'Tên trạm đầu : '}
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
          title={'Tọa độ long trạm đầu : '}
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
          title={'Tọa độ lat trạm đầu : '}
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
          title={'Địa chỉ trạm đầu : '}
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
          title={'Tên trạm cuối : '}
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
          title={'Tọa độ long trạm cuối : '}
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
          title={'Tọa độ lat trạm cuối : '}
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
          title={'Địa chỉ trạm cuối : '}
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
          title={'Chủng loại cáp (Ngầm/Treo) : '}
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
          title={'Loại kết nối : '}
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
          title={'Loại ODF trạm đầu : '}
          styleTitle={styles.styleTitleInput}
          editable={editable}
          styleInput={styles.styleValueInput}
          value={startStationOdfType}
          onChangeText={text => setStartStationOdfType(text)}
        />
        <CustomTextInputChangeValue
          styleViewInput={[
            styles.styleViewInputChange,
            {backgroundColor: editable ? 'white' : colors.background},
          ]}
          title={'Loại ODF trạm cuối : '}
          styleTitle={styles.styleTitleInput}
          editable={editable}
          styleInput={styles.styleValueInput}
          value={endStationOdfType}
          onChangeText={text => setEndStationOdfType(text)}
        />

        {isActive ? (
          <TouchableOpacity
            disabled={!editable}
            onPress={() => setIsActive(false)}
            style={[styles.styleViewInputChange, {height: 50}]}>
            <Text style={styles.styleTitleInput}>Trạng thái : </Text>
            <Text style={styles.styleValueInput}>Đã kích hoạt</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            disabled={!editable}
            onPress={() => setIsActive(true)}
            style={[styles.styleViewInputChange, {height: 50}]}>
            <Text style={styles.styleTitleInput}>Trạng thái : </Text>
            <Text style={styles.styleValueInput}>Chưa kích hoạt</Text>
          </TouchableOpacity>
        )}
        {userInfor?.role == 'GENERAL_MANAGER' && (
          <CusttomTwoButtonBottom
            styleTwoButton={styles.viewCusttomTwoButtonBottom}
            styleButtonLeft={styles.button}
            styleIconLeft={[
              styles.icon,
              {tintColor: editable ? colors.grey : colors.mainColor},
            ]}
            iconLeft={icons.ic_edit}
            titleLeft={'Chỉnh sửa'}
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
            titleRight={'Lưu chỉnh sửa'}
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
});

export default CableRouteDetails;
