import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {colors, icons} from '../Constants';

const CustomModalShowImage = props => {
  const {onRequestClose, modalVisible, source, onPress} = props;
  const widthWindow = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          <Image
            source={{uri: source}}
            style={{
              width: widthWindow * 1.8,
              height: widthWindow,
              transform: [{rotate: '90deg'}],
              flex: 1,
            }}
            resizeMode={'cover'}
          />
          <TouchableOpacity onPress={onPress}>
            <Image
              source={icons.ic_rotate}
              style={styles.styleButtonIcon}
              resizeMode={'cover'}
            />
          </TouchableOpacity>
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
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  styleButtonIcon: {
    width: 40,
    height: 40,
    marginVertical: 10,
    transform: [{rotate: '90deg'}],
  },
});
export default CustomModalShowImage;
