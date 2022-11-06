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
import CustomAppBar from '../../../../../../../Components/CustomAppBar';
import CustomModalCamera from '../../../../../../../Components/CustomModalCamera';
import CustomTextButton from '../../../../../../../Components/CustomTextButton';
import CustomInput from '../../../../../../../Components/CustomInput';
import CustomTextInputChangeValue from '../../../../../../../Components/CustomTextInputChangeValue';
import {colors, icons} from '../../../../../../../Constants';
import common from '../../../../../../../utils/common';
import ImagePicker from 'react-native-image-crop-picker';
import MaintenanceManagementAPI from '../../../../../../../Api/Home/MaintenanceManagementAPI/MaintenanceManagementAPI';
import {useSelector} from 'react-redux';
import RNLocation from 'react-native-location';
const ReportMaintenanceDetail = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const [result, setResult] = useState(null);
  useEffect(() => {
    getReportIncidentDetail();
  }, []);
  const getReportIncidentDetail = async () => {
    let id = route.params;
    await MaintenanceManagementAPI.MaintenanceIssueReportDetailAPI(token, id)
      .then(res => {
        setResult(res?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <CustomAppBar
        title={'Chi tiết báo cáo'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <CustomViewRow
          title={'Mã sự cố : '}
          content={result?.maintenance_issue_code}
        />
        <CustomViewRow title={'ID sự cố : '} content={result?.id} />
        <CustomViewRow
          title={'Tọa độ longitude : '}
          content={result?.location_longitude}
        />
        <CustomViewRow
          title={'Tọa độ latitude  : '}
          content={result?.location_latitude}
        />
        <CustomViewRow
          title={'Kết quả đo tuyến cáp  : '}
          content={result?.measure_cable_result == true ? 'Đạt' : 'Không đạt'}
        />
        <CustomViewRow
          title={'Kết quả đo  : '}
          source={result?.measure_cable_result_document}
        />
        <CustomViewRow
          title={'Phát quang dọc tuyến cáp  : '}
          content={result?.clean_cable_result == true ? 'Đạt' : 'Không đạt'}
        />
        <CustomViewRow
          title={'Căng chỉnh các tuyến cáp quang treo : '}
          content={result?.adjust_tension_cable == true ? 'Đạt' : 'Không đạt'}
        />
        <CustomViewRow
          title={'Kiểm tra, chỉnh bị lại vật tư, phụ kiện treo cáp : '}
          content={result?.check_supplies == true ? 'Đạt' : 'Không đạt'}
        />
        <CustomViewRow
          title={'Vệ sinh công bể cáp ngầm : '}
          content={
            result?.clean_underground_cable == true ? 'Đạt' : 'Không đạt'
          }
        />
        <CustomViewRow
          title={'Kiểm tra làm gọn cáp dự phòng : '}
          content={result?.check_preventive_cable == true ? 'Đạt' : 'Không đạt'}
        />
        <CustomViewRow
          title={'Kiểm tra, vệ sinh măng xông nối cáp : '}
          content={result?.check_cable_socket == true ? 'Đạt' : 'Không đạt'}
        />
        <CustomViewRow
          title={'Kiểm tra, vệ sinh ODF và các đầu Adapter quang : '}
          content={
            result?.check_cable_odf_adapter == true ? 'Đạt' : 'Không đạt'
          }
        />
        <CustomViewRow
          title={'Phương án đề xuất tối ưu : '}
          content={result?.solution_provide}
        />
        <CustomViewRow
          title={'Hình ảnh báo cáo : '}
          source={result?.report_document}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1},
  title: {fontSize: 18, fontWeight: 'bold', color: 'grey', maxWidth: '30%'},
  content: {fontSize: 18, fontWeight: 'bold', color: 'black', maxWidth: '65%'},
  viewRow: {flexDirection: 'row', alignItems: 'center', minHeight: 50},
  customView: {
    backgroundColor: 'white',
    marginVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
});
const CustomViewRow = props => {
  const {title, content, source} = props;
  return (
    <View style={[styles.viewRow, styles.customView]}>
      <Text style={styles.title}>{title}</Text>
      {content && <Text style={styles.content}>{content}</Text>}
      {source && (
        <Image
          source={{uri: source}}
          style={{width: 250, height: 250}}
          resizeMode={'contain'}
        />
      )}
    </View>
  );
};
export default ReportMaintenanceDetail;
