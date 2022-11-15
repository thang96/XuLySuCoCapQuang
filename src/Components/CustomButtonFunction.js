import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {icons, colors} from '../Constants';
const CustomButtonFunction = props => {
  const {styleView, icon, title, onPress, titleColor, styleIcon} = props;
  return (
    <View style={[styleView]}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.view}>
          <Image
            source={icon}
            style={[styles.image, styleIcon]}
            resizeMode={'contain'}
          />
        </View>
        <Text
          style={[styles.title, {color: titleColor ? titleColor : 'black'}]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  view: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(119,119,119,0.5)',
    padding: 4,
  },
  button: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 5,
    elevation: 5,
    height: 80,
  },
  image: {
    width: 40,
    height: 40,
  },
  title: {
    textAlign: 'center',

    fontWeight: '500',
  },
});
export default CustomButtonFunction;
