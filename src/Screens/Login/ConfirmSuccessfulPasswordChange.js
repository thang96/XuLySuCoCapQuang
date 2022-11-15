import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ImageBackground, StyleSheet, View, Image, Text} from 'react-native';
import CustomButtonText from '../../Components/CustomTextButton';
import {images, icons, colors} from '../../Constants';
const ConfirmSuccessfulPasswordChange = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground style={styles.container} source={images.splashmainColor}>
      <View style={styles.viewCircle}>
        <Image source={icons.vectorOk} />
      </View>
      <Text style={styles.status}>
        {'Chúc mừng! Bạn đã đổi mật khẩu \nthành công'}
      </Text>
      <CustomButtonText
        styleButton={styles.styleButton}
        label={'Trở lại'}
        colorText={colors.mainColor}
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewCircle: {
    backgroundColor: 'rgb(230,200,185)',
    height: 120,
    width: 120,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    elevation: 5,
  },
  status: {
    color: 'white',
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 20,
  },
  styleButton: {
    height: 50,
    width: 120,
    backgroundColor: 'white',
    borderRadius: 15,
  },
});
export default ConfirmSuccessfulPasswordChange;
