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
} from 'react-native';
import {useSelector} from 'react-redux';
import OpticalCablesAPI from '../../../../../../../Api/Home/OpticalCablesAPI/OpticalCablesAPI';
import CustomAppBar from '../../../../../../../Components/CustomAppBar';
import {icons, images} from '../../../../../../../Constants';
const DetailOpticCableIncident = props => {
  const navigation = useNavigation();
  const token = useSelector(state => state?.token?.token);
  const route = useRoute();
  const [result, setResult] = useState(null);
  console.log(result);
  useEffect(() => {
    getOpticCableDetail();
  }, []);
  const getOpticCableDetail = async () => {
    let id = route.params;
    await OpticalCablesAPI.GetOpticalCablesByIdAPI(token, id)
      .then(res => {
        setResult(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi tiết tuyến cáp'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.navigate('IncidentDetail')}
      />

      <ScrollView style={styles.eachContainer}>
        <CustomViewRow title={'Tên tuyến cáp : '} content={result?.name} />
        <CustomViewRow
          title={'Thời gian nghiệm thu đưa vào vận hành : '}
          content={result?.acceptance_time}
        />
        <CustomViewRow
          title={'Chiều dài tuyến cáp (KM) : '}
          content={result?.cable_length}
        />
        <CustomViewRow title={'Tổng số FO : '} content={result?.fo_total} />
        <CustomViewRow
          title={'Số FO đã sử dụng : '}
          content={result?.fo_used}
        />
        <CustomViewRow title={'Số FO free : '} content={result?.fo_free} />
        <CustomViewRow
          title={'Số lượng Măng Xông có trên tuyến : '}
          content={result?.quantity_of_socket}
        />
        <CustomViewRow title={'Tỉnh/Thành phố : '} content={result?.city} />
        <CustomViewRow title={'Chủ sở hữu : '} content={result?.cable_owner} />
        <CustomViewRow
          title={'Thuộc công trình/dự án : '}
          content={result?.project}
        />
        <CustomViewRow title={'Thuộc hợp đồng : '} content={result?.contract} />
        <CustomViewRow
          title={'Tên trạm đầu : '}
          content={result?.start_station_name}
        />
        <CustomViewRow
          title={'Tọa độ long trạm đầu : '}
          content={result?.start_station_long}
        />
        <CustomViewRow
          title={'Tọa độ lat trạm đầu : '}
          content={result?.start_station_lat}
        />
        <CustomViewRow
          title={'Địa chỉ trạm đầu : '}
          content={result?.start_station_address}
        />
        <CustomViewRow
          title={'Tên trạm cuối : '}
          content={result?.end_station_name}
        />
        <CustomViewRow
          title={'Tọa độ long trạm cuối : '}
          content={result?.end_station_long}
        />
        <CustomViewRow
          title={'Tọa độ lat trạm cuối : '}
          content={result?.end_station_lat}
        />
        <CustomViewRow
          title={'Địa chỉ trạm cuối : '}
          content={result?.end_station_address}
        />
        <CustomViewRow
          title={'Chủng loại cáp : '}
          content={result?.cable_type}
        />
        <CustomViewRow
          title={'Loại kết nối : '}
          content={result?.cable_connection_type}
        />
        <CustomViewRow
          title={'Loại ODF trạm đầu : '}
          content={result?.start_station_odf_type}
        />
        <CustomViewRow
          title={'Loại ODF trạm cuối : '}
          content={result?.end_station_odf_type}
        />
        <CustomViewRow
          title={'Trạng thái : '}
          content={result?.is_active ? 'Đã kích hoạt' : 'Chưa kích hoạt'}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  eachContainer: {flex: 1, paddingHorizontal: 10},
  styleTitle: {color: 'grey', fontSize: 18, fontWeight: 'bold', width: '30%'},
  styleContent: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: '65%',
  },
});
const CustomViewRow = props => {
  const {title, content} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
      }}>
      <Text style={styles.styleTitle}>{title}</Text>
      <Text style={styles.styleContent}>{content}</Text>
    </View>
  );
};
export default DetailOpticCableIncident;
