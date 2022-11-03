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
const CustomToolBarBottom = props => {
  const {
    styleToolBar,
    label1,
    label2,
    label3,
    styleButton1,
    styleButton2,
    styleButton3,
    source1,
    source2,
    source3,
    styleIcon1,
    styleIcon2,
    styleIcon3,
    styleLabel1,
    styleLabel2,
    styleLabel3,
    onPress1,
    onPress2,
    onPress3,
  } = props;
  return (
    <View style={[styles.viewAppBar, styleToolBar]}>
      {label1 && (
        <TouchableOpacity
          onPress={onPress1}
          style={[styleButton1, styles.styleButton]}>
          <Image
            source={source1}
            style={[styles.icon, styleIcon1]}
            resizeMode={'contain'}
          />
          <Text style={[styles.label, styleLabel1]}>{label1}</Text>
        </TouchableOpacity>
      )}
      {label2 && (
        <TouchableOpacity
          onPress={onPress2}
          style={[styleButton2, styles.styleButton]}>
          <Image
            source={source2}
            style={[styles.icon, styleIcon2]}
            resizeMode={'contain'}
          />
          <Text style={[styles.label, styleLabel2]}>{label2}</Text>
        </TouchableOpacity>
      )}
      {label3 && (
        <TouchableOpacity
          onPress={onPress3}
          style={[styleButton3, styles.styleButton]}>
          <Image
            source={source3}
            style={[styles.icon, styleIcon3]}
            resizeMode={'contain'}
          />
          <Text style={[styles.label, styleLabel3]}>{label3}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  viewAppBar: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  styleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  label: {
    fontWeight: '500',
    textAlign: 'center',
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 5,
  },
});
export default CustomToolBarBottom;
