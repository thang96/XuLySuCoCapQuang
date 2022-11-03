import {useNavigation} from '@react-navigation/native';
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
import CustomButtonText from '../../../../../Components/CustomTextButton';
import {images, colors, icons} from '../../../../../Constants';
const Accepted = props => {
  const navigation = useNavigation();
  return (
    <ImageBackground style={styles.container} source={images.splashPurple}>
      <View style={styles.viewCircle}>
        <Image source={icons.vectorOk} />
      </View>
      <Text style={styles.status}>
        {
          'Bạn đã tiếp nhận yêu cầu công việc\nVui lòng thực hiện đúng thời gian yêu cầu'
        }
      </Text>
      <CustomButtonText
        styleButton={styles.styleButton}
        label={'Tiếp tục'}
        colorText={colors.purple}
        onPress={() => navigation.navigate('WorkScreen')}
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
export default Accepted;
