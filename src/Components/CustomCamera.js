import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
  CameraDeviceFormat,
} from 'react-native-vision-camera';
import {icons} from '../Constants';
const CustomCamera = props => {
  const {camera, device, onPress} = props;
  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        preset="hd-1920x1080"
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        fps={40}
        orientation="portrait"
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
            borderColor: 'rgb(33,150,243)',
          }}></View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(119,119,119,0.8)',
            height: 200,
          }}></View>
      </View>
      <View style={{flex: 1, backgroundColor: 'rgba(119,119,119,0.8)'}}></View>
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{
            bottom: 10,
            width: 50,
            height: 50,
            position: 'absolute',

            alignSelf: 'center',
          }}
          source={icons.ic_button_camera}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  button: {
    width: 50,
    height: 50,
    position: 'absolute',

    alignSelf: 'center',
  },
});
export default CustomCamera;
