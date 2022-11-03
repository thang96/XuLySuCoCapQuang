import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import CustomAppBar from '../../../../Components/CustomAppBar';
import CustomInput from '../../../../Components/CustomInput';
import {colors, icons} from '../../../../Constants';
const FAKE_DATA = [{id: 1}, {id: 2}, {id: 3}];
const ListNews = props => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('News', {item})}
        style={[styles.buttonNews]}>
        <Text style={{fontSize: 25}}>{item.id}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Tin tức - thông báo'}
        iconsLeft={icons.back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <CustomInput
          styleInput={{height: 50}}
          placeholder={'Tìm kiếm thông tin'}
          source={icons.seach}
        />
        <Text style={styles.title}>Mục tin tức</Text>
        <FlatList
          data={FAKE_DATA}
          keyExtractor={key => key.id}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  eachContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  buttonNews: {
    height: 150,
    backgroundColor: 'grey',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
});
export default ListNews;
