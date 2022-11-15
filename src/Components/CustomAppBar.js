import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {icons} from '../Constants';
import CustomButtonLogo from './CustomButtonLogo';
const CustomAppbar = props => {
  const {
    styleAppBar,
    iconLeft,
    onPressLeftIcon,
    title,
    iconRight1,
    iconRight2,
  } = props;
  return (
    <View style={[styles.container, styleAppBar]}>
      <View>
        {iconLeft && (
          <CustomButtonLogo
            styleButton={styles.customButtonLogo}
            source={iconLeft}
            onPress={onPressLeftIcon}
          />
        )}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.viewRow}>
        {iconRight1 && (
          <CustomButtonLogo
            styleButton={styles.customButtonLogoRight}
            source={iconRight1}
            onPress={onPressLeftIcon}
          />
        )}
        {iconRight2 && (
          <CustomButtonLogo
            styleButton={styles.customButtonLogoRight}
            source={iconRight2}
            onPress={onPressLeftIcon}
          />
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  customButtonLogo: {
    width: 25,
    height: 25,
  },
  title: {color: 'grey', fontWeight: '900', fontSize: 18, textAlign: 'center'},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customButtonLogoRight: {
    width: 25,
    height: 25,
    marginLeft: 5,
  },
});
export default CustomAppbar;
