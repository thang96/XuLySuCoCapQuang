import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ImageBackground,
  Image,
} from 'react-native';
import {colors, icons, images} from '../Constants';
import CustomButtonText from '../Components/CustomTextButton';
const ContinueScreen = props => {
  const navigation = useNavigation();
  return (
    <ImageBackground style={styles.container} source={images.im_plash}>
      <Image
        source={icons.ic_error_persion}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.text}>
        {'Tính năng đang được hoàn thiện\nvui lòng quay lại sau'}
      </Text>
      <CustomButtonText
        textStyle={styles.textStyle}
        styleButton={styles.customButtonText}
        label={'Trở lại'}
        onPress={() => navigation.goBack()}
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
  image: {
    width: 100,
    height: 150,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.mainColor,
    textAlign: 'center',
  },
  customButtonText: {
    height: 50,
    width: 120,
    backgroundColor: colors.mainColor,
    borderRadius: 10,
    marginTop: 30,
  },
  textStyle: {color: 'white', fontSize: 18, fontWeight: 'bold'},
});
export default ContinueScreen;
