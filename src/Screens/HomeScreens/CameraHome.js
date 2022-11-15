import React, {useEffect, useState, useRef, useMemo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {icons} from '../../Constants';
import common from '../../Utils/common';
import {CameraScreen, Camera, CameraType} from 'react-native-camera-kit';
import AICameraAPI from '../../Apis/HomeAPI/AICameraAPI/AICameraAPI';
const CameraHome = () => {
  const navigation = useNavigation();
  // useEffect(() => {
  //   checkPer();
  // }, []);
  // const checkPer = async () => {
  //   const cameraPermission = await Camera.getCameraPermissionStatus();
  //   if (cameraPermission == 'denied') {
  //     Camera.requestCameraPermission();
  //   }
  // };
  const camera = useRef();
  // const onBottomButtonPressed = event => {
  //   const image = JSON.stringify(event.captureImages);
  //   // console.log(event);
  //   console.log(image), '-----';
  //   navigation.goBack();
  // };
  const takePicture = async () => {
    const image = await camera.current.capture();

    // const resizeImage = await common.resizeImageNotVideo(image);
    console.log(image);
    await AICameraAPI.CutImageAPI(image)
      .then(res => {
        console.log(res);
        navigation.navigate('HomeScreen');
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      {/* <CameraScreen
        style={styles.camera}
        onBottomButtonPressed={event => onBottomButtonPressed(event)}
        captureButtonImage={require('../../Assets/icons/ic_button_camera.png')} // optional, image capture button
        captureButtonImageStyle={{
          width: 50,
          height: 50,
          position: 'absolute',
          bottom: 0,
        }}
        // torchOnImage={require('path/to/image')} // optional, image for toggling on flash light
        // torchOffImage={require('path/to/image')} // optional, image for toggling off flash light
        hideControls={false} // (default false) optional, hides camera controls
        showCapturedImageCount={false} // (default false) optional, show count for photos taken during that capture session
      /> */}
      <Camera
        style={styles.camera}
        ref={camera}
        cameraType={CameraType.Back} // front/back(default)
      />

      <View style={{flex: 1, backgroundColor: 'rgba(119,119,119,0.8)'}}></View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(119,119,119,0.8)',
            height: 200,
          }}></View>
        <View
          style={{
            width: 330,
            height: 200,
            borderWidth: 2,
            borderColor: 'red',
          }}></View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(119,119,119,0.8)',
            height: 200,
          }}></View>
      </View>
      <View style={{flex: 1, backgroundColor: 'rgba(119,119,119,0.8)'}}></View>
      <TouchableOpacity
        onPress={takePicture}
        style={{
          width: 70,
          height: 70,
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
        }}>
        <Image
          source={icons.ic_button_camera}
          style={{
            width: 70,
            height: 70,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

export default CameraHome;
