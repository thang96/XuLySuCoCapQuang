import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {icons} from '../Constants';
const ChooseOption = props => {
  const {isCheck, label, onPress, style} = props;
  return (
    <View style={[styles.viewContainer, style]}>
      <Text style={{color: 'grey', marginRight: 5, fontSize: 16}}>{label}</Text>
      <TouchableOpacity onPress={onPress}>
        {isCheck ? (
          <Image
            style={{width: 20, height: 20, tintColor: 'grey'}}
            source={icons.ic_checkBox}
          />
        ) : (
          <Image
            style={{width: 20, height: 20, tintColor: 'grey'}}
            source={icons.ic_checkBoxEmpty}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
  },
});
export default ChooseOption;
