import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

const CardTemplate = props => {
  const {
    uri,
    type,
    detail,
    describe,
    styleCard,
    onPress,
    styleImage,
    describeSize,
  } = props;
  return (
    <View style={[styleCard]}>
      <View
        style={{flexDirection: 'row', marginBottom: 10, paddingHorizontal: 10}}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={{color: 'white'}}>{type}</Text>
        </TouchableOpacity>
        <Text style={styles.describe}>{describe}</Text>
      </View>
      <Image
        source={uri}
        style={[styles.image, styleImage]}
        resizeMode="cover"
      />
      <View style={{alignSelf: 'center', marginTop: 5}}>
        <Text style={styles.detail}>{detail}</Text>
        <Text style={styles.detail}>{describeSize}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(26,109,255)',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    marginRight: 10,
  },
  describe: {
    fontWeight: '500',
    color: 'rgb(26,109,255)',
    width: '65%',
  },
  image: {alignSelf: 'center'},
  detail: {color: 'black', fontSize: 16, fontWeight: 'bold'},
});
export default CardTemplate;
