import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';

const CustomButtonLogo = props => {
  const {onPress, styleButton, disabled, source, styleImage} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, styleButton]}>
      <Image
        source={source}
        style={[styles.image, styleImage]}
        resizeMode={'contain'}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default CustomButtonLogo;
