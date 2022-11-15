import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from 'react-native';
import {colors, icons} from '../Constants';
import CustomButton from './CustomButton';

const CustomModalNotification = props => {
  const {
    onRequestClose,
    modalVisible,
    source,
    title,
    titleButton,
    content,
    onPress,
  } = props;
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          <View style={styles.viewNotify}>
            <Image source={source} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
            <CustomButton
              title={titleButton}
              styleButton={styles.styleButton}
              styleText={styles.textCustomButton}
              onPress={onPress}
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
    height: '100%',
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewNotify: {
    height: 300,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    color: 'black',
  },
  styleButton: {
    height: 45,
    backgroundColor: colors.backgroundButton,
    borderRadius: 10,
    width: 200,
    marginTop: 15,
  },
  textCustomButton: {color: 'white', fontWeight: 'bold', fontSize: 16},
});
export default CustomModalNotification;
