import React from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../Constants';
const CustomInput = props => {
  const {
    styleInput,
    placeholder,
    value,
    secureTextEntry,
    keyboardType,
    source,
    onChangeText,
    onPress,
    disabled,
    editable,
  } = props;
  return (
    <View style={styleInput}>
      <View style={styles.viewRow}>
        <TextInput
          editable={editable}
          onChangeText={text => onChangeText(text)}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          value={value}
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor={'grey'}
        />
        {source ? (
          <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={styles.button}>
            <Image resizeMode="cover" style={styles.image} source={source} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    flex: 1,
    backgroundColor: 'white',
    elevation: 2,
    zIndex: 2,
    paddingStart: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(119,119,119,0.5)',
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  image: {width: 25, height: 25, tintColor: colors.mainColor},
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CustomInput;
