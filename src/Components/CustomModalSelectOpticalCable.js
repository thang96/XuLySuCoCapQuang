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
const CustomModalSelectOpticalCable = props => {
  const {modalVisible, onRequestClose, data, onPress} = props;
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => onPress(item)}>
        <Text style={styles.title}>{item?.name}</Text>
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
              data={data}
              key={key => key?.id}
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
    position: 'absolute',
  },
  eachContainer: {
    height: 300,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 10,
    padding: 5,
    width: 300,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(119,119,119,0.5)',
  },
});
export default CustomModalSelectOpticalCable;
