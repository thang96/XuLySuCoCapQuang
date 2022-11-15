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
import {colors, icons} from '../../../../Constants';
const News = props => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Chi tiết tin tức/thông báo'}
        iconsLeft={icons.back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <Text style={styles.title}>Mục tin tức</Text>
      <View style={[styles.eachContainer, {paddingBottom: 10}]}>
        <View
          style={{
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            borderRadius: 15,
          }}>
          <Text style={{color: 'white', fontSize: 50}}>
            {route.params.item.id}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    margin: 10,
  },
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
export default News;
