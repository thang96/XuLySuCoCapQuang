import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
const CustomTextButton = props => {
  const {styleButton, label, onPress, textStyle, disabled} = props;
  return (
    <View style={styleButton}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={styles.button}>
        <Text style={textStyle}>{label}</Text>
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
    flexDirection: 'row',
  },
});
export default CustomTextButton;
