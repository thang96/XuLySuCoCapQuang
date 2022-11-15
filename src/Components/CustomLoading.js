import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../Constants';

const CustomModalCamera = props => {
  const {onRequestClose, modalVisible, openCamera, selectGallery, cancel} =
    props;
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.container}>
          <View style={styles.eachContainer}>
            <Text style={styles.title}>Loading...</Text>
            <ActivityIndicator color={colors.backgroundButton} size={'large'} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eachContainer: {
    height: 150,
    width: '90%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  title: {fontSize: 28, fontWeight: '900', color: 'black'},
});
export default CustomModalCamera;
