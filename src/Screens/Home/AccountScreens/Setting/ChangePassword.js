import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomAppBar from '../../../../Components/CustomAppBar';
import {colors, icons, images} from '../../../../Constants';
import CustomInput from '../../../../Components/CustomInput';
import CustomButtonText from '../../../../Components/CustomTextButton';
import {useNavigation} from '@react-navigation/native';
const ChangePassword = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Đổi mật khẩu'}
        iconsLeft={icons.back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <Text style={styles.title}>Mật khẩu cũ</Text>

        <View style={styles.viewRow}>
          <CustomInput
            disabled={true}
            styleInput={{flex: 1}}
            placeholder={'Nhập mật khẩu cũ'}
            source={icons.key}
          />
        </View>
        <Text style={styles.title}>Mật khẩu mới</Text>
        <View style={styles.viewRow}>
          <CustomInput
            disabled={true}
            styleInput={{flex: 1}}
            placeholder={'Nhập mật khẩu mới'}
            source={icons.key}
          />
        </View>
        <View style={styles.viewRow}>
          <CustomInput
            disabled={true}
            styleInput={{flex: 1}}
            placeholder={'Nhập lại mật khẩu mới'}
            source={icons.key}
          />
        </View>
        <CustomButtonText
          styleButton={styles.customButtonText}
          label={'Thay đổi'}
          onPress={() => navigation.goBack()}
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
    backgroundColor: colors.purple,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});
export default ChangePassword;
