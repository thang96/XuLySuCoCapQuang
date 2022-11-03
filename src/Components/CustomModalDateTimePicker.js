import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {colors} from '../Constants';
import DatePicker from 'react-native-date-picker';

const CustomModalDateTimePicker = props => {
  const {
    onRequestClose,
    modalVisible,
    openPicker,
    value,
    onCancel,
    onConfirm,
    mode,
    onDateChange,
    onPress,
  } = props;
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.container}>
          <View style={styles.eachContainer}>
            <DatePicker
              mode={mode}
              open={openPicker}
              date={value}
              onCancel={onCancel}
              onConfirm={onConfirm}
              onDateChange={onDateChange}
              textColor={'black'}
            />
            <View
              style={{
                height: 40,
                flexDirection: 'row',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={onPress}
                style={{marginHorizontal: 20}}>
                <Text style={styles.text}>Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  eachContainer: {
    height: 250,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: 9999,
    position: 'absolute',
    bottom: 0,
  },
  text: {color: colors.mainColor, fontSize: 18, fontWeight: 'bold'},
});
export default CustomModalDateTimePicker;
