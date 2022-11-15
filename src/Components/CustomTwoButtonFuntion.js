import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import {colors} from '../Constants';
import CustomButton from './CustomButton';
const CustomTwoButtonFuntion = props => {
  const {
    styleTwoButton,
    styleButtonRight,
    styleButtonLeft,
    onPressLeft,
    onPressRight,
    titleLeft,
    disabled,
    styleTextLeft,
    styleTextRight,
    titleRight,
  } = props;
  return (
    <View style={[styles.container, styleTwoButton]}>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPressLeft}
        style={[styles.customButton, styleButtonLeft]}>
        <Text style={[styles.text, styleTextLeft]}>{titleLeft}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabled}
        onPress={onPressRight}
        style={[styles.customButton, styleButtonRight]}>
        <Text style={[styles.text, styleTextRight]}>{titleRight}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customButton: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginHorizontal: 8,
    textAlign: 'center',
  },
});

export default CustomTwoButtonFuntion;
