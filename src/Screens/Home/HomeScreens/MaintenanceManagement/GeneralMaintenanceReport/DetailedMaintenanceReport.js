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
} from 'react-native';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {colors, icons} from '../../../../../Constants';
import {uuid} from '../../../../../utils/uuid';
import MaintenanceManagementAPI from '../../../../../Api/Home/MaintenanceManagementAPI/MaintenanceManagementAPI';
import {useSelector} from 'react-redux';
const DetailedMaintenanceReport = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state?.token?.token);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getReportIncidentDetail();
  }, []);
  const getReportIncidentDetail = async () => {
    let id = route.params;
    await MaintenanceManagementAPI.MaintenanceIssueReportDetailAPI(token, id)
      .then(res => {
        setResult(res?.data);
        setLoading(false);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };
  const renderResultDocumentFiles = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ShowImageScreen', item)}
        style={{padding: 5, borderWidth: 0.5, borderColor: colors.mainColor}}>
        <Image
          resizeMode={'contain'}
          source={{uri: item?.path}}
          style={{width: 200, height: 200, marginRight: 5}}
        />
      </TouchableOpacity>
    );
  };
  const renderDocumentFiles = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ShowImageScreen', item)}
        style={{padding: 5, borderWidth: 0.5, borderColor: colors.mainColor}}>
        <Image
          resizeMode={'contain'}
          source={{uri: item?.path}}
          style={{width: 200, height: 200, marginRight: 5}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <CustomAppBar
        title={'Chi ti???t b??o c??o'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.mainColor} />
      ) : (
        <ScrollView style={styles.container}>
          <CustomViewRow
            title={'M?? b???o tr?? : '}
            content={result?.maintenance_issue_code}
          />
          <CustomViewRow title={'ID b???o tr?? : '} content={result?.id} />

          <CustomViewRow
            title={'K???t qu??? ??o tuy???n c??p  : '}
            content={result?.measure_cable_result == true ? '?????t' : 'Kh??ng ?????t'}
          />
          <View style={{backgroundColor: 'white', paddingHorizontal: 5}}>
            <Text style={styles.title}>K???t qu??? ??o</Text>
            <FlatList
              style={{height: 200}}
              horizontal
              data={result?.measure_cable_result_document_files}
              keyExtractor={uuid}
              renderItem={({item, index}) =>
                renderResultDocumentFiles(item, index)
              }
            />
          </View>

          <CustomViewRow
            title={'Ph??t quang d???c tuy???n c??p  : '}
            content={result?.clean_cable_result == true ? '?????t' : 'Kh??ng ?????t'}
          />
          <CustomViewRow
            title={'C??ng ch???nh c??c tuy???n c??p quang treo : '}
            content={result?.adjust_tension_cable == true ? '?????t' : 'Kh??ng ?????t'}
          />
          <CustomViewRow
            title={'Ki???m tra, ch???nh b??? l???i v???t t??, ph??? ki???n treo c??p : '}
            content={result?.check_supplies == true ? '?????t' : 'Kh??ng ?????t'}
          />
          <CustomViewRow
            title={'V??? sinh c??ng b??? c??p ng???m : '}
            content={
              result?.clean_underground_cable == true ? '?????t' : 'Kh??ng ?????t'
            }
          />
          <CustomViewRow
            title={'Ki???m tra l??m g???n c??p d??? ph??ng : '}
            content={
              result?.check_preventive_cable == true ? '?????t' : 'Kh??ng ?????t'
            }
          />
          <CustomViewRow
            title={'Ki???m tra, v??? sinh m??ng x??ng n???i c??p : '}
            content={result?.check_cable_socket == true ? '?????t' : 'Kh??ng ?????t'}
          />
          <CustomViewRow
            title={'Ki???m tra, v??? sinh ODF v?? c??c ?????u Adapter quang : '}
            content={
              result?.check_cable_odf_adapter == true ? '?????t' : 'Kh??ng ?????t'
            }
          />
          <CustomViewRow
            title={'Ph????ng ??n ????? xu???t t???i ??u : '}
            content={result?.solution_provide}
          />
          <View style={{backgroundColor: 'white', paddingHorizontal: 5}}>
            <Text style={styles.title}>H??nh ???nh b??o c??o</Text>
            <FlatList
              style={{height: 200}}
              horizontal
              data={result?.document_files}
              keyExtractor={uuid}
              renderItem={({item, index}) => renderDocumentFiles(item, index)}
            />
          </View>
        </ScrollView>
      )}
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
export default DetailedMaintenanceReport;
