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
import {colors, icons} from '../Constants';
import CustomButtonIcon from './CustomButtonIcon';
const CustomAppBar = props => {
  const {title, iconsLeft, iconRight, onPressIconsLeft, onPressIconsRight} =
    props;
  return (
    <View style={styles.viewAppBar}>
      {iconsLeft ? (
        <CustomButtonIcon
          styleButton={styles.buttonLeft}
          source={iconsLeft}
          onPress={onPressIconsLeft}
        />
      ) : null}
      <Text style={styles.title}>{title}</Text>
      {iconRight ? (
        <CustomButtonIcon
          styleButton={styles.buttonLeft}
          source={iconRight}
          onPress={onPressIconsRight}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  viewAppBar: {
    height: 56,
    width: '100%',
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    alignSelf: 'center',
  },
  buttonLeft: {
    width: 40,
    height: 40,
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRight: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: 'white',
  },
});
export default CustomAppBar;
