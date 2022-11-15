import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const CustomModalPicker = props => {
  const {modalVisible, onRequestClose, onPressChoose, data} = props;
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => onPressChoose(item)}
        style={styles.buttonDateTime}>
        <Text style={styles.textDateTime}>{item?.key}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.container}>
          <View style={styles.eachContainer}>
            <FlatList
              style={{flex: 1}}
              data={data}
              key={key => key?.value}
              renderItem={({item, index}) => renderItem(item, index)}
            />
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
  },
  eachContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  textDateTime: {color: 'black', fontSize: 16, fontWeight: 'bold'},
  viewDateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonDateTime: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
});
export default CustomModalPicker;
