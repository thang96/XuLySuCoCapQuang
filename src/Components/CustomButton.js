import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

const CustomButton = props => {
  const {title, styleText, onPress, styleButton, disabled} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.button, styleButton]}>
      <Text style={[styles.text, styleText]}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 8,
    textAlign: 'center',
  },
});
export default CustomButton;
