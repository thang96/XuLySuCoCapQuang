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
  ActivityIndicator,
} from 'react-native';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {colors, icons} from '../../../../../Constants';
import {uuid} from '../../../../../utils/uuid';
import IncidentManagementAPI from '../../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';
import {useSelector} from 'react-redux';
const DetailOfCrashReports = props => {
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
    await IncidentManagementAPI.DetailIssueReportAPI(token, id)
      .then(res => {
        setResult(res?.data);
        setLoading(false);
      })
      .catch(function (error) {
        // console.log(error);
      });
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
        title={'Chi tiết báo cáo'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      {loading ? (
        <ActivityIndicator size={'large'} color={colors.mainColor} />
      ) : (
        <ScrollView style={styles.container}>
          <CustomViewRow title={'Mã sự cố : '} content={result?.issue_code} />
          <CustomViewRow title={'ID sự cố : '} content={result?.id} />

          <CustomViewRow
            title={'Tọa độ longitude : '}
            content={result?.location_longitude}
          />
          <CustomViewRow
            title={'Tọa độ latitude  : '}
            content={result?.location_latitude}
          />
          <CustomViewRow title={'Lý do  : '} content={result?.reason} />
          <CustomViewRow title={'Giải pháp  : '} content={result?.solution} />
          <View>
            <Text style={styles.title}>File báo cáo </Text>
            <FlatList
              style={{height: 210, backgroundColor: 'white'}}
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
export default DetailOfCrashReports;
