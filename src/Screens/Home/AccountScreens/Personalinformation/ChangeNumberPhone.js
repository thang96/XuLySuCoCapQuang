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
const ChangeNumberPhone = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Đổi số điện thoại'}
        iconsLeft={icons.back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <Text style={styles.title}>Số điện thoại</Text>
        <View style={styles.viewRow}>
          <CustomInput
            disabled={true}
            styleInput={{flex: 1}}
            placeholder={'Nhập Số điện thoại'}
            source={icons.phone}
          />
          <CustomButtonText label={'Gửi'} styleButton={styles.styleButton} />
        </View>
        <View style={styles.viewRow}>
          <CustomInput
            disabled={true}
            styleInput={{flex: 1}}
            placeholder={'Nhập Số điện thoại'}
            source={icons.shieldCheck}
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
export default ChangeNumberPhone;
