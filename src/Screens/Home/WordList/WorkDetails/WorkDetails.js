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
import {colors, icons, images} from '../../../../Constants';
import CustomAppBar from '../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import IncidentManagementAPI from '../../../../Api/Home/IncidentManagementAPI/IncidentManagementAPI';
import CustomTextButton from '../../../../Components/CustomTextButton';
const WorkDetails = props => {
  const navigation = useNavigation();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  const token = useSelector(state => state?.token?.token);
  const route = useRoute();
  useEffect(() => {}, []);
  const rejectIssue = async () => {
    await IncidentManagementAPI.RejectIssueAPI(token, route.params?.id)
      .then(res => {
        if (res?.status == 200) {
          alert('Từ chối thành công');
          navigation.goBack();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const receiveIssue = async () => {
    let id = route.params?.id;
    await IncidentManagementAPI.ReceiveIssueAPI(token, id)
      .then(res => {
        if (res?.status == 200) {
          alert('Tiếp nhận thành công');
          navigation.navigate('ReportWork', id);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  const reportRequest = () => {
    let id = route.params?.id;
    navigation.navigate('ReportWork', id);
  };
  const acceptance = async () => {
    let id = route.params?.id;
    await IncidentManagementAPI.AcceptIssueRequestAPI(token, id)
      .then(res => {
        if (res?.status == 200) {
          alert('Nghiệm thu thành công');
          navigation.goBack();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi tiết công việc'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <ScrollView style={styles.eachContainer}>
        <Text style={[styles.title, {marginBottom: 10}]}>
          Thông tin công việc
        </Text>
        <ComponentViewRow title={'Mã VC : '} content={route.params?.code} />
        <ComponentViewRow title={'ID: '} content={route.params?.id} />
        <ComponentViewRow
          title={'Nhân sự kỹ thuật : '}
          titleButton={'Chi tiết >>'}
          onPress={() => {}}
          content={route.params?.user_assigned}
        />
        <ComponentViewRow
          title={'Tình trạng : '}
          styleContent={{
            color:
              route.params?.issue_status == 'CHƯA TIẾP NHẬN' ? 'red' : 'green',
          }}
          content={route.params?.issue_status}
        />
        <ComponentViewRow
          title={'Tuyến cáp : '}
          titleButton={'Chi tiết >>'}
          onPress={() => {}}
          content={route.params?.optical_cable}
        />
        <ComponentViewRow
          title={'Thời gian yêu cầu : '}
          content={route.params?.required_time}
        />
        <ComponentViewRow
          title={'Mô tả sự cố : '}
          content={route.params?.description}
        />
        <ComponentViewRow
          title={'File đính kèm : '}
          source={route.params?.document}
        />
        <ComponentViewRow
          title={'Thời gian tiếp nhận : '}
          content={route.params?.received_time}
        />
        <ComponentViewRow
          title={'Thời gian hoàn thành : '}
          content={route.params?.completion_time}
        />
      </ScrollView>
      {userInfor?.role != 'GENERAL_MANAGER' && (
        <ComponentTwoButton
          accept={route.params?.issue_status == 'ĐANG THỰC HIỆN'}
          disabledLeft={route.params?.issue_status == 'TỪ CHỐI' ? true : false}
          disabledRight={
            route.params?.issue_status == 'CHƯA TIẾP NHẬN' ? false : true
          }
          disableSecondRight={
            route.params?.issue_status == 'ĐANG THỰC HIỆN' ? false : true
          }
          onPressLeft={() => rejectIssue()}
          onPressRight={() => receiveIssue()}
          onPressSecondRight={() => reportRequest()}
        />
      )}
      {route.params?.issue_status == 'CHƯA NGHIỆM THU' &&
        userInfor?.role == 'GENERAL_MANAGER' && (
          <CustomTextButton
            styleButton={styles.viewCustomTextButton}
            label={'Nghiệm thu'}
            textStyle={styles.textCustomTextButton}
            onPress={() => acceptance()}
          />
        )}
      {route.params?.issue_status == 'CHƯA TIẾP NHẬN' &&
        userInfor?.role == 'GENERAL_MANAGER' && (
          <CustomTextButton
            styleButton={styles.viewCustomTextButton}
            label={'Hủy yêu cầu'}
            textStyle={styles.textCustomTextButton}
            onPress={() => rejectIssue()}
          />
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
});

export default WorkDetails;

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
          source={icons.ic_edit}
          style={[styles.imageComponentTwoButton, {tintColor: 'grey'}]}
        />
        <Text>Từ chối</Text>
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
