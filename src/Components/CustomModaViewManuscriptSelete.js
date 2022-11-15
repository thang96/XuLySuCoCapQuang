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
import CustomButtonLogo from './CustomButtonLogo';

const CustomModaViewManuscriptSelete = props => {
  const {
    onRequestClose,
    modalVisible,
    iconTop,
    titleTop,
    secondIconTop,
    firtTitle,
    firtIcon,
    firtOnpress,
    secondTitle,
    secondIcon,
    secondOnpress,
    thirdTitle,
    thirdIcon,
    thirdOnpress,
    fourthTitle,
    fourthIcon,
    fourthOnpress,
    closeModal,
  } = props;
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.eachContainer}>
          <View style={styles.viewContainer}>
            <CustomButtonLogo
              source={icons.ic_closeRed}
              styleButton={styles.buttonClose}
              onPress={closeModal}
            />
            {titleTop && <Text style={styles.styleTopTitle}>{titleTop}</Text>}

            {iconTop && (
              <View style={styles.viewOderIcon}>
                <Image
                  source={iconTop}
                  style={styles.viewOderIcon}
                  resizeMode={'contain'}
                />
                {secondIconTop && (
                  <Image source={secondIconTop} style={styles.imageOderCheck} />
                )}
              </View>
            )}
            {firtTitle && (
              <TouchableOpacity onPress={firtOnpress} style={styles.button}>
                <Text style={styles.title}>{firtTitle}</Text>
                <Image
                  source={firtIcon}
                  resizeMode={'cover'}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            {secondTitle && (
              <TouchableOpacity onPress={secondOnpress} style={styles.button}>
                <Text style={styles.title}>{secondTitle}</Text>
                <Image
                  source={secondIcon}
                  resizeMode={'cover'}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            {thirdTitle && (
              <TouchableOpacity onPress={thirdOnpress} style={styles.button}>
                <Text style={styles.title}>{thirdTitle}</Text>
                <Image
                  source={thirdIcon}
                  resizeMode={'cover'}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
            {fourthTitle && (
              <TouchableOpacity onPress={fourthOnpress} style={styles.button}>
                <Text style={styles.title}>{fourthTitle}</Text>
                <Image
                  source={fourthIcon}
                  resizeMode={'cover'}
                  style={styles.icon}
                />
              </TouchableOpacity>
            )}
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
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(119,119,119,0.7)',
    paddingHorizontal: 10,
  },
  viewContainer: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  viewOderIcon: {width: 120, height: 120, marginBottom: 20},
  imageOderCheck: {
    width: 35,
    height: 35,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  button: {
    marginBottom: 10,
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(119,119,119,0.5)',
    backgroundColor: 'rgb(248,253,255)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  icon: {width: 35, height: 35},
  buttonClose: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  styleTopTitle: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
});
export default CustomModaViewManuscriptSelete;
