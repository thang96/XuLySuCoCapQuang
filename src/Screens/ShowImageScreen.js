import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, icons, images} from '../Constants';
import CustomButtonText from '../Components/CustomTextButton';
const ShowImageScreen = props => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.button}>
        <Image source={icons.ic_back} style={styles.icon} />
      </TouchableOpacity>
      <Image
        source={{uri: route.params?.path}}
        style={styles.image}
        resizeMode={'contain'}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  icon: {width: 35, height: 35, tintColor: colors.mainColor},
  button: {
    position: 'absolute',
    height: 50,
    width: 50,
    top: 8,
    left: 8,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ShowImageScreen;
