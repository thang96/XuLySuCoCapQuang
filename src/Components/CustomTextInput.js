import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
const CustomTextInput = props => {
  const {
    placeholder,
    placeholderTextColor,
    styleViewInput,
    value,
    onChangeText,
    secureTextEntry,
    image,
    onPress,
    disabled,
    instructionText,
    imageRight,
    disabledRight,
    onPressRight,
  } = props;
  return (
    <View style={[styleViewInput, styles.view]}>
      {instructionText && (
        <Text style={styles.instructionText}>{instructionText}</Text>
      )}
      {image && (
        <TouchableOpacity
          disabled={disabled ?? true}
          onPress={onPress}
          style={styles.button}>
          <Image source={image} style={styles.image} />
        </TouchableOpacity>
      )}
      <TextInput
        numberOfLines={1}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder}
        style={[styles.textInput]}
        value={value}
        onChangeText={onChangeText}
      />
      {imageRight && (
        <TouchableOpacity
          disabled={disabledRight ?? true}
          onPress={onPressRight}
          style={styles.button}>
          <Image source={imageRight} style={styles.image} />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  view: {flexDirection: 'row', alignItems: 'center'},
  textInput: {
    fontSize: 18,
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 30,
    height: 30,
    tintColor: 'black',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginHorizontal: 5,
  },
});
export default CustomTextInput;
