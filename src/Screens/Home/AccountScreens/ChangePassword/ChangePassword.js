import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import CustomAppBar from '../../../../Components/CustomAppBar';
import {colors, icons, images} from '../../../../Constants';
import CustomInput from '../../../../Components/CustomInput';
import CustomButtonText from '../../../../Components/CustomTextButton';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AccountAPI from '../../../../Api/Account/AccountAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ChangePassword = props => {
  const navigation = useNavigation();
  const token = useSelector(state => state?.token?.token);
  const [oldPassword, setOldPassword] = useState('');
  const [newdPassword, setNewPassword] = useState('');
  const [reNewdPassword, setReNewPassword] = useState('');
  const isValueOk = () =>
    oldPassword.length > 0 &&
    newdPassword.length > 0 &&
    reNewdPassword.length > 0 &&
    newdPassword == reNewdPassword;
  const changePassword = async () => {
    const data = {
      password: oldPassword,
      new_password: newdPassword,
      renew_password: reNewdPassword,
    };
    await AccountAPI.ChangePasswordAPI(token, data)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          Alert.alert(
            'Đổi mật khẩu',
            'Đổi mật khẩu thành công\nvui lòng đăng nhập lại để sử dụng',
          );
          logOut();
        }
      })
      .catch(function (error) {
        console.log(error);
        Alert.alert('Đổi mật khẩu', 'Đổi mật khẩu thất bại');
      });
  };
  const logOut = async () => {
    await AsyncStorage.setItem('token', '1')
      .then(() => {
        navigation.navigate('LoginNavigation');
      })
      .catch(error => console.log(error));
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Đổi mật khẩu'}
        iconsLeft={icons.ic_back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <Text style={styles.title}>Mật khẩu cũ</Text>

        <View style={styles.viewRow}>
          <CustomInput
            secureTextEntry={true}
            disabled={true}
            styleInput={{flex: 1}}
            placeholder={'Nhập mật khẩu cũ'}
            source={icons.key}
            value={oldPassword}
            onChangeText={text => setOldPassword(text)}
          />
        </View>
        <Text style={styles.title}>Mật khẩu mới</Text>
        <View style={styles.viewRow}>
          <CustomInput
            secureTextEntry={true}
            disabled={true}
            styleInput={{flex: 1}}
            placeholder={'Nhập mật khẩu mới'}
            source={icons.key}
            value={newdPassword}
            onChangeText={text => setNewPassword(text)}
          />
        </View>
        <View style={styles.viewRow}>
          <CustomInput
            secureTextEntry={true}
            disabled={true}
            styleInput={{flex: 1}}
            placeholder={'Nhập lại mật khẩu mới'}
            source={icons.key}
            value={reNewdPassword}
            onChangeText={text => setReNewPassword(text)}
          />
        </View>
        <CustomButtonText
          disabled={isValueOk() ? false : true}
          styleButton={[
            styles.customButtonText,
            {backgroundColor: isValueOk() ? colors.mainColor : 'grey'},
          ]}
          label={'Thay đổi'}
          textStyle={styles.textStyle}
          onPress={() => changePassword()}
        />
      </View>
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
  styleButton: {
    height: 50,
    width: 70,
    marginStart: 10,
    backgroundColor: 'rgb(147,148,149)',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50,
    marginBottom: 10,
  },
  viewRow: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginBottom: 10,
  },
  customButtonText: {
    height: 50,
    width: 120,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  textStyle: {color: 'white', fontSize: 18, fontWeight: 'bold'},
});
export default ChangePassword;
