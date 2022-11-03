import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
const CustomButtonIcon = props => {
  const {styleButton, source, onPress, imageStyle} = props;
  return (
    <View style={styleButton}>
      <TouchableOpacity onPress={onPress} style={[styles.button]}>
        <Image
          resizeMode="cover"
          style={imageStyle ? imageStyle : styles.icon}
          source={source}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
});
export default CustomButtonIcon;
