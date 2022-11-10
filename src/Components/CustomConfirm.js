import React from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {colors} from '../Constants';
import CustomTextButton from './CustomTextButton';

const CustomConfirm = props => {
  const {
    onRequestClose,
    modalVisible,
    title,
    content,
    leftLabel,
    rightLabel,
    leftPress,
    rightPress,
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
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
            <View style={styles.viewRow}>
              <CustomTextButton
                styleButton={styles.customTextButton}
                label={leftLabel}
                textStyle={styles.leftButton}
                onPress={leftPress}
              />
              <CustomTextButton
                styleButton={styles.customTextButton}
                label={rightLabel}
                textStyle={styles.rightButton}
                onPress={rightPress}
              />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  eachContainer: {
    height: 200,
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.mainColor,
    marginBottom: 15,
  },
  content: {fontSize: 16, color: 'black'},
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 50,
  },
  customTextButton: {height: 50, width: 150},
  leftButton: {color: 'black', fontWeight: 'bold', fontSize: 16},
  rightButton: {color: 'red', fontWeight: 'bold', fontSize: 16},
});
export default CustomConfirm;
