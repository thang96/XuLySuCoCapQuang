import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from '../Constants';
const CustomTwoButtonFunction = props => {
  const {
    isChoose,
    onPressLeftButton,
    onPressRightButton,
    labelLeft,
    labelRight,
    styleTwoButton,
  } = props;
  return (
    <View style={[styles.container, styleTwoButton]}>
      <TouchableOpacity
        onPress={onPressLeftButton}
        style={[
          styles.button,
          {
            borderBottomColor: isChoose ? colors.purple : 'rgb(119,119,119)',
            borderBottomWidth: isChoose ? 3 : 1,
          },
        ]}>
        <Text
          style={[
            {color: isChoose ? 'black' : 'rgb(119,119,119)'},
            styles.text,
          ]}>
          {labelLeft}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressRightButton}
        style={[
          styles.button,
          {
            borderBottomColor: isChoose ? 'rgb(119,119,119)' : colors.purple,
            borderBottomWidth: isChoose ? 1 : 3,
          },
        ]}>
        <Text
          style={[
            {color: isChoose ? 'rgb(119,119,119)' : 'black'},
            styles.text,
          ]}>
          {labelRight}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 56,
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    width: '50%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default CustomTwoButtonFunction;
