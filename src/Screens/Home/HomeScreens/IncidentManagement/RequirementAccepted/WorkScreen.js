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
} from 'react-native';
import {colors, icons, images} from '../../../../../Constants';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import CusttomTwoButtonBottom from '../../../../../Components/CusttomTwoButtonBottom';
import CustomToolBarBottom from '../../../../../Components/CustomToolBarBottom';
const WorkScreen = props => {
  const navigation = useNavigation();
  const userInfor = useSelector(state => state?.userInfor?.userInfor);
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Màn hình công việc'}
        iconsLeft={icons.back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <ScrollView style={styles.container}>
        <View style={styles.eachContainer}>
          <Text style={[styles.title, {marginBottom: 15}]}>
            Thông tin yêu cầu xử lý
          </Text>
          <Text style={styles.text}>Mã CV : 123456789</Text>
          <Text style={styles.text}>
            {`Nhân sự kỹ thuật : ${userInfor?.full_name}`}
          </Text>
          <View style={styles.viewRow}>
            <Text style={styles.text}>Tình trạng : </Text>
            <Text style={styles.textState}>Chưa tiếp nhận</Text>
          </View>
          <View style={[styles.viewRow, {marginTop: 15}]}>
            <Text style={[styles.title, {marginRight: 15}]}>Thông tin</Text>
            <Text style={styles.textState}>Chi tiết thông tin</Text>
          </View>
          <Text style={styles.text}>{`Tuyến cáp : Sơn Trà 1`}</Text>
          <Text
            style={
              styles.text
            }>{`Thời gian yêu cầu : 10:30 - 09/09/2022`}</Text>
        </View>
        <View style={[styles.incidentInfor, {marginTop: 30}]}>
          <Text style={[styles.title]}>Thông tin sự cố</Text>
          <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
            <Image style={styles.imageIncident} source={images.map} />
            <Text
              style={[
                styles.text,
                {width: 150},
              ]}>{`Mô tả sự cố : Phát sinh sự cố theo mô tả,lỗi phát sinh tại km138 bán đảo sơn trà`}</Text>
          </View>
        </View>
        <View style={[styles.incidentInfor, {marginTop: 30}]}>
          <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
            <Text style={[styles.title]}>Mã CV : </Text>
            <Text style={[styles.title]}>{`12346146655FaaD564`}</Text>
          </View>
          <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
            <Text style={[styles.text]}>Thời gian yêu cầu : </Text>
            <Text style={[styles.text]}>{`10:30 - 09/09/2022`}</Text>
          </View>
          <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
            <Text style={[styles.text]}>Thời gian tiếp nhận : </Text>
            <Text style={[styles.text]}>{`12:30 - 09/09/2022`}</Text>
          </View>
          <View style={[styles.viewRow, {justifyContent: 'space-between'}]}>
            <Text style={[styles.text]}>Thời gian hoàn thành : </Text>
            <Text style={[styles.text]}>{`17:30 - 09/09/2022`}</Text>
          </View>
        </View>
      </ScrollView>
      <CustomToolBarBottom
        label1={'Từ chối'}
        label2={'Yêu cầu\nhỗ trợ'}
        label3={'Báo cáo\nhoàn thành'}
        source1={icons.cancel}
        source2={icons.chats}
        source3={icons.checkList}
        styleButton1={styles.styleButton1}
        styleButton2={styles.styleButton1}
        styleButton3={styles.styleButton3}
        styleIcon1={styles.styleIcon1}
        styleIcon2={styles.styleIcon2}
        styleLabel2={styles.styleLabel2}
        styleLabel3={styles.styleLabel3}
        onPress2={() => navigation.navigate('StackChatNavigation')}
      />
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
    paddingTop: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: 'black',
  },
  text: {
    fontSize: 16,
    color: colors.grey,
    fontWeight: 'normal',
  },
  textState: {
    fontSize: 16,
    color: colors.purple,
    fontWeight: 'bold',
  },
  incidentInfor: {
    backgroundColor: 'white',
    padding: 10,
  },
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  imageIncident: {
    width: 150,
    height: 110,
    backgroundColor: colors.background,
  },
  styleButton1: {
    width: '30%',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.background,
  },
  styleButton3: {
    width: '40%',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: colors.background,
  },
  styleIcon1: {
    tintColor: 'grey',
  },
  styleIcon2: {
    tintColor: 'blue',
  },
  styleLabel2: {color: 'blue'},
  styleLabel3: {color: colors.purple},
});

export default WorkScreen;
