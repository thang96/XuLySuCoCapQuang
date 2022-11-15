import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import CustomAppBar from '../../../../Components/CustomAppBar';
import {colors, icons, images} from '../../../../Constants';
import CustomInput from '../../../../Components/CustomInput';
import {useNavigation} from '@react-navigation/native';
import CustomTwoButtonFunction from '../../../../Components/CustomTwoButtonFunction';
import CustomButtonIcon from '../../../../Components/CustomButtonIcon';
import CustomButtonText from '../../../../Components/CustomTextButton';
const AppSetting = props => {
  const navigation = useNavigation();
  const [isChoose, setIsChoose] = useState(true);
  const [password, setPassword] = useState('phamtiendat91');
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Cài đặt ứng dụng'}
        iconsLeft={icons.back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <CustomTwoButtonFunction
          styleTwoButton={{marginBottom: 30}}
          labelLeft={'Bảo mật tài khoản'}
          labelRight={'Thông tin cá nhân'}
          isChoose={isChoose}
          onPressLeftButton={() => setIsChoose(true)}
          onPressRightButton={() => setIsChoose(false)}
        />
        <View style={styles.viewRowInfor}>
          <Text style={styles.title}>Tên đăng nhập</Text>
          <Text style={styles.name}>phamtiendat91</Text>
        </View>
        <View style={styles.viewRowInfor}>
          <Text style={styles.title}>Mật khẩu</Text>
          <View style={styles.viewRow}>
            <TextInput
              value={password}
              style={{fontSize: 20, color: colors.grey}}
              secureTextEntry={true}
              editable={false}
            />
            <CustomButtonIcon
              source={icons.pencil}
              styleButton={styles.customButtonIcon}
              onPress={() => navigation.navigate('ChangePassword')}
            />
          </View>
        </View>
        <View style={styles.viewRowInfor}>
          <Text style={styles.title}>Ngôn ngữ</Text>
          <View style={styles.viewRow}>
            <Text style={styles.textInfor} numberOfLines={1}>
              Tiếng Việt
            </Text>
            <CustomButtonIcon
              source={icons.pencil}
              styleButton={styles.customButtonIcon}
            />
          </View>
        </View>
        <View style={styles.viewRowInfor}>
          <Text style={styles.title}>Thông tin ứng dụng</Text>
          <View style={styles.viewRow}>
            <CustomButtonText
              colorText={colors.grey}
              label={'>'}
              styleButton={styles.customButtonIcon}
              onPress={() => navigation.navigate('ChangeAddress')}
            />
          </View>
        </View>
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
  viewRowInfor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    width: '100%',
    borderBottomWidth: 0.5,
    marginBottom: 10,
  },
  title: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  name: {fontSize: 20, fontWeight: 'bold', color: colors.purple},
  viewRow: {flexDirection: 'row', alignItems: 'center'},
  textInfor: {
    fontSize: 16,
    fontWeight: '500',
    maxWidth: 180,
    textAlign: 'center',
  },
  customButtonIcon: {width: 40, height: 40},
});
export default AppSetting;
