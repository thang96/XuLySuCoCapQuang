import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {colors} from '../Constants';
const CusttomTwoButtonBottom = props => {
  const {
    styleTwoButton,
    onPressLeftButton,
    styleButtonLeft,
    styleIconLeft,
    iconLeft,
    titleLeft,
    styleTitleLeft,
    disabledLeft,
    onPressLeftRight,
    styleButtonRight,
    styleIconRight,
    iconRight,
    titleRight,
    styleTitleRight,
    disabledRight,
  } = props;
  return (
    <View style={[styleTwoButton, styles.styleView]}>
      <TouchableOpacity
        onPress={onPressLeftButton}
        disabled={disabledLeft}
        style={[styleButtonLeft, styles.button]}>
        {iconLeft && <Image style={styleIconLeft} source={iconLeft} />}
        <Text style={styleTitleLeft}>{titleLeft}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressLeftRight}
        disabled={disabledRight}
        style={[styleButtonRight, styles.button]}>
        {iconLeft && <Image style={styleIconRight} source={iconRight} />}
        <Text style={styleTitleRight}>{titleRight}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  styleView: {flexDirection: 'row', justifyContent: 'space-between'},
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default CusttomTwoButtonBottom;
