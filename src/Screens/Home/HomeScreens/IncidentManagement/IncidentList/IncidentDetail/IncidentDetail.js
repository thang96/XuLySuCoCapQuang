import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
  Alert,
} from 'react-native';
import {colors, icons, images} from '../../../../../../Constants';
import CustomAppBar from '../../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import CustomTextButton from '../../../../../../Components/CustomTextButton';
import IncidentManagementAPI from '../../../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';
import {uuid} from '../../../../../../utils/uuid';
const IncidentDetail = props => {
  const navigation = useNavigation();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const token = useSelector(state => state?.token?.token);
  const route = useRoute();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getResult();
  }, [route, token]);
  const getResult = async () => {
    let id = route.params;
    await IncidentManagementAPI.GetIncidentIssueByIdAPI(token, id)
      .then(res => {
        setResult(res?.data?.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const rejectIssue = async () => {
    await IncidentManagementAPI.RejectIssueAPI(token, result?.id)
      .then(res => {
        if (res?.status == 200) {
          alert('Từ chối thành công');
          navigation.navigate('IncidentManagement');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const receiveIssue = async () => {
    let id = result?.id;
    await IncidentManagementAPI.ReceiveIssueAPI(token, id)
      .then(res => {
        console.log(res);
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert('Sự cố', 'Tiếp nhận sự cố thành công');
          navigation.navigate('IncidentList');
        } else {
          Alert.alert('Sự cố', 'Tiếp nhận sự cố thất bại');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Sự cố', 'Tiếp nhận sự cố thất bại');
      });
  };
  const reportRequest = () => {
    let id = result?.id;
    navigation.navigate('ReportIncident', id);
  };
  const acceptance = async () => {
    let id = result?.id;
    await IncidentManagementAPI.AcceptIssueRequestAPI(token, id)
      .then(res => {
        if (res?.status == 200) {
          alert('Nghiệm thu thành công');
          navigation.navigate('IncidentManagement');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const renderDocumentFiles = item => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ShowImageScreen', item)}
        style={styles.renderDocumentFiles}>
        <Image
          source={{uri: item?.path}}
          style={{width: 200, height: 200, marginRight: 5}}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi tiết công việc'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.navigate('IncidentList')}
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.mainColor} />
      ) : (
        <View style={{flex: 1}}>
          <ScrollView style={styles.eachContainer}>
            <Text style={[styles.title, {marginBottom: 10}]}>
              Thông tin công việc
            </Text>
            <ComponentViewRow title={'Mã VC : '} content={result?.code} />
            <ComponentViewRow title={'ID: '} content={result?.id} />
            <ComponentViewRow
              title={'Người tạo việc : '}
              titleButton={'Chi tiết >>'}
              onPress={() =>
                navigation.navigate(
                  'DetailUserIncident',
                  result?.create_user_id,
                )
              }
            />
            <ComponentViewRow
              title={'Nhân sự kỹ thuật : '}
              titleButton={'Chi tiết >>'}
              onPress={() =>
                navigation.navigate(
                  'DetailUserIncident',
                  result?.user_assigned_id,
                )
              }
              content={result?.user_assigned}
            />
            <ComponentViewRow
              title={'Tình trạng : '}
              styleContent={{
                color:
                  result?.issue_status == 'CHƯA TIẾP NHẬN' ? 'red' : 'green',
              }}
              content={result?.issue_status}
            />
            <ComponentViewRow
              title={'Tuyến cáp : '}
              titleButton={'Chi tiết >>'}
              onPress={() =>
                navigation.navigate(
                  'DetailOpticCableIncident',
                  result?.optical_cable_id,
                )
              }
              content={result?.optical_cable}
            />

            <ComponentViewRow
              title={'Mô tả sự cố : '}
              content={result?.description}
            />
            <View>
              <Text style={styles.content}>File đính kèm : </Text>
              <FlatList
                style={{height: 210}}
                horizontal
                data={result?.document_files}
                keyExtractor={uuid}
                renderItem={({item}) => renderDocumentFiles(item)}
              />
            </View>

            <ComponentViewRow
              title={'Thời gian yêu cầu : '}
              content={result?.required_time}
            />
            <ComponentViewRow
              title={'Thời gian tiếp nhận : '}
              content={result?.received_time}
            />
            <ComponentViewRow
              title={'Thời gian hoàn thành : '}
              content={result?.completion_time}
            />
            {(result?.issue_status == 'CHƯA NGHIỆM THU' ||
              result?.issue_status == 'ĐÃ HOÀN THÀNH') && (
              <ComponentViewRow
                title={'Chi tiết báo cáo : '}
                titleButton={'Chi tiết >>'}
                onPress={() =>
                  navigation.navigate('ReportIncidentDetail', result?.id)
                }
              />
            )}
          </ScrollView>
          {userInfor?.role == 'EMPLOYEE' &&
            (result?.issue_status == 'CHƯA TIẾP NHẬN' ||
              result?.issue_status == 'ĐANG THỰC HIỆN') && (
              <ComponentTwoButton
                accept={result?.issue_status == 'ĐANG THỰC HIỆN'}
                disabledLeft={result?.issue_status == 'TỪ CHỐI' ? true : false}
                disabledRight={
                  result?.issue_status == 'CHƯA TIẾP NHẬN' ? false : true
                }
                disableSecondRight={
                  result?.issue_status == 'ĐANG THỰC HIỆN' ? false : true
                }
                onPressLeft={() => navigation.goBack()}
                onPressRight={() => receiveIssue()}
                onPressSecondRight={() => reportRequest()}
              />
            )}
          {result?.issue_status == 'CHƯA NGHIỆM THU' &&
            userInfor?.role != 'EMPLOYEE' && (
              <View style={[styles.viewRow, {marginTop: 20}]}>
                <CustomTextButton
                  styleButton={styles.viewCustomTextButton}
                  label={'Từ chối'}
                  textStyle={styles.textCustomTextButton}
                  onPress={() => rejectIssue()}
                />
                <CustomTextButton
                  styleButton={styles.viewCustomTextButton}
                  label={'Nghiệm thu'}
                  textStyle={styles.textCustomTextButton}
                  onPress={() => acceptance()}
                />
              </View>
            )}
          {result?.issue_status == 'CHƯA TIẾP NHẬN' &&
            userInfor?.role != 'EMPLOYEE' && (
              <CustomTextButton
                styleButton={styles.viewCustomTextButton}
                label={'Hủy yêu cầu'}
                textStyle={styles.textCustomTextButton}
                onPress={() => rejectIssue()}
              />
            )}
        </View>
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
    marginTop: 10,
  },
  title: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  content: {fontSize: 16, fontWeight: 'bold'},
  image: {width: '70%', height: 150},
  viewComponentTwoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 50,
  },
  buttonComponentTwoButton: {
    height: 50,
    width: '50%',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: colors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageComponentTwoButton: {height: 25, width: 25, marginRight: 5},
  viewCustomTextButton: {
    width: 150,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.mainColor,
    alignSelf: 'center',
  },
  textCustomTextButton: {color: 'white', fontSize: 16, fontWeight: 'bold'},
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  renderDocumentFiles: {
    borderWidth: 0.5,
    borderColor: colors.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IncidentDetail;

const ComponentViewRow = props => {
  const {
    title,
    content,
    styleTitle,
    styleContent,
    source,
    titleButton,
    onPress,
  } = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.5,
      }}>
      <Text style={[styles.content, {width: '25%'}, styleTitle]}>{title}</Text>
      {content && (
        <Text style={[styles.content, {maxWidth: '50%'}, styleContent]}>
          {content}
        </Text>
      )}
      {source && <Image style={[styles.image]} source={{uri: source}} />}
      {titleButton && (
        <TouchableOpacity onPress={onPress}>
          <Text
            style={{fontSize: 16, color: colors.mainColor, fontWeight: 'bold'}}>
            {titleButton}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const ComponentTwoButton = props => {
  const {
    onPressLeft,
    onPressRight,
    disabledLeft,
    disabledRight,
    accept,
    onPressSecondRight,
    disableSecondRight,
  } = props;
  return (
    <View style={styles.viewComponentTwoButton}>
      <TouchableOpacity
        disabled={disabledLeft}
        onPress={onPressLeft}
        style={styles.buttonComponentTwoButton}>
        <Image
          source={icons.ic_back}
          style={[styles.imageComponentTwoButton, {tintColor: 'grey'}]}
        />
        <Text>Quay lại</Text>
      </TouchableOpacity>
      {accept ? (
        <TouchableOpacity
          disabled={disableSecondRight}
          onPress={onPressSecondRight}
          style={styles.buttonComponentTwoButton}>
          <Image
            source={icons.ic_document}
            style={[
              styles.imageComponentTwoButton,
              {tintColor: colors.mainColor},
            ]}
          />
          <Text style={{color: colors.mainColor}}>Báo cáo</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          disabled={disabledRight}
          onPress={onPressRight}
          style={styles.buttonComponentTwoButton}>
          <Image
            source={icons.ic_document}
            style={[
              styles.imageComponentTwoButton,
              {tintColor: colors.mainColor},
            ]}
          />
          <Text style={{color: colors.mainColor}}>Tiếp nhận</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
