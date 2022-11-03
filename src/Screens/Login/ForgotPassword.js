import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButtonText from '../../Components/CustomTextButton';
import CustomInput from '../../Components/CustomInput';
import CusttomTwoButtonBottom from '../../Components/CusttomTwoButtonBottom';
import {colors, icons} from '../../Constants';
import CustomAppBar from '../../Components/CustomAppBar';
const ForgotPassword = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Quên mật khẩu'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <ScrollView style={{flex: 1}}>
        <View style={{padding: 10}}>
          <Text style={styles.textTopic}>Email</Text>
          <CustomInput
            disabled={true}
            styleInput={{marginBottom: 8}}
            placeholder={'Nhập email'}
            source={icons.ic_email}
          />
        </View>
        <View style={{padding: 10}}>
          <Text style={styles.textTopic}>Số điện thoại</Text>
          <View style={{flexDirection: 'row'}}>
            <CustomInput
              disabled={true}
              styleInput={{marginBottom: 8, flex: 1}}
              placeholder={'Nhập Số điện thoại'}
              source={icons.ic_phone}
            />
            <CustomButtonText label={'Gửi'} styleButton={styles.styleButton} />
          </View>
          <CustomInput
            disabled={true}
            placeholder={'Nhập mã OTP'}
            source={icons.ic_shieldCheck}
          />
        </View>
        <View style={{padding: 10}}>
          <Text style={styles.textTopic}>Mật khẩu mới</Text>
          <CustomInput
            disabled={true}
            styleInput={{marginBottom: 8}}
            placeholder={'Nhập mật khẩu mới'}
            source={icons.ic_key}
          />
          <CustomInput
            disabled={true}
            styleInput={{marginBottom: 8}}
            placeholder={'Xác nhận mật khẩu'}
            source={icons.ic_key}
          />
        </View>
        <CusttomTwoButtonBottom
          styleTwoButton={styles.CusttomTwoButtonBottom}
          titleCancel={'Hủy bỏ'}
          titleNext={'Tiếp tục'}
          onPressCancel={() => navigation.goBack()}
          onPressNext={() =>
            navigation.navigate('ConfirmSuccessfulPasswordChange')
          }
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  viewAppBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.mainColor,
    height: 56,
  },
  styleTitleAppBar: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  textTopic: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  styleButton: {
    height: 50,
    width: 70,
    marginStart: 10,
    backgroundColor: 'rgb(147,148,149)',
    borderRadius: 10,
  },
  CusttomTwoButtonBottom: {paddingHorizontal: 10},
});
export default ForgotPassword;
