import React from 'react';
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {icons, colors, images} from '../Constants';
const CustomViewRowFunction = props => {
  const {
    styleView,
    icon1,
    title1,
    onPress1,
    icon2,
    title2,
    onPress2,
    icon3,
    title3,
    onPress3,
    icon4,
    title4,
    onPress4,
  } = props;
  return (
    <View style={styleView}>
      <View style={styles.viewRow}>
        <TouchableOpacity style={styles.button} onPress={onPress1}>
          <Image source={icon1} style={styles.image} resizeMode="cover" />
          <Text style={styles.title}>{title1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPress2}>
          <Image source={icon2} style={styles.image} resizeMode="cover" />
          <Text style={styles.title}>{title2}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPress3}>
          <Image source={icon3} style={styles.image} />
          <Text style={{color: colors.purple}}>{title3}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onPress4}>
          <Image source={icon4} style={styles.image} />
          <Text style={styles.title}>{title4}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 5,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    elevation: 5,
    paddingHorizontal: 10,
  },
  button: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 75,
  },
  image: {width: 40, height: 40},
  title: {color: colors.purple, textAlign: 'center'},
});
export default CustomViewRowFunction;
