import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
const CustomTwoBottomButtonFuntion = props => {
  const {
    titleLeft,
    titleRight,
    styleTextLeft,
    styleTextRight,
    onPressLeft,
    onPressRight,
    disabledLeft,
    disabledRight,
    styleButtonLeft,
    styleButtonRight,
    styleTwoButton,
  } = props;
  return (
    <View style={[styles.container, styleTwoButton]}>
      <TouchableOpacity
        disabled={disabledLeft}
        onPress={onPressLeft}
        style={[styles.button, styleButtonLeft]}>
        <Text style={[styles.text, styleTextLeft]}>{titleLeft}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={disabledRight}
        onPress={onPressRight}
        style={[styles.button, styleButtonRight]}>
        <Text style={[styles.text, styleTextRight]}>{titleRight}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    marginHorizontal: 8,
    textAlign: 'center',
  },
});
export default CustomTwoBottomButtonFuntion;
