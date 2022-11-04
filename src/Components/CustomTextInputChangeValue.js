import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
const CustomTextInputChangeValue = props => {
  const {
    title,
    styleTitle,
    editable,
    styleInput,
    value,
    onChangeText,
    styleViewInput,
    placeholder,
    keyboardType,
  } = props;
  return (
    <View style={[styleViewInput, {minHeight: 50}]}>
      {title && <Text style={styleTitle}>{title}</Text>}
      <TextInput
        keyboardType={keyboardType}
        multiline
        placeholder={placeholder}
        style={styleInput}
        editable={editable}
        value={value}
        onChangeText={text => onChangeText(text)}
      />
    </View>
  );
};
const styles = StyleSheet.create({});
export default CustomTextInputChangeValue;
