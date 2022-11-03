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
import {ScrollView} from 'react-native-gesture-handler';
import CustomButtonFunction from '../../../../../Components/CustomButtonFunction';
import CustomViewRowFunction from '../../../../../Components/CustomViewRowFunction';
import {colors, icons} from '../../../../../Constants';
import CustomInput from '../../../../../Components/CustomInput';
import {useNavigation} from '@react-navigation/native';

const FAKE_DATA = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];
const ProjectList = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

  const renderItem = (item, index) => {
    return (
      <CustomButtonFunction
        styleView={styles.customButtonFunction}
        icon={icons.inventory}
        title={`Kho dự án ${item.id}`}
        titleColor={colors.purple}
      />
    );
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.viewTop}>
          <TouchableOpacity style={styles.viewUse}>
            <Image source={icons.user} style={styles.imageUser} />
            <View style={styles.viewRowUser}>
              <Text style={styles.useName}>Phạm thọ quang</Text>
              <Text style={styles.textMSNV}>MSNV : 123456</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.textQLKV}>Danh sách kho dự án</Text>
        </View>
        <View style={[styles.viewBottom, {height: windowHeight - 270}]}>
          <FlatList
            numColumns={4}
            data={FAKE_DATA}
            keyExtractor={key => key.id}
            renderItem={({item, index}) => renderItem(item, index)}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  viewTop: {
    backgroundColor: colors.purple,
    width: '100%',
    height: 250,
    paddingStart: 30,
  },
  viewUse: {
    flexDirection: 'row',
    marginTop: 30,
  },
  useName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  textMSNV: {
    color: 'white',
    fontSize: 16,
  },
  textQLKV: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  imageUser: {width: 60, height: 60, borderRadius: 60, marginRight: 5},
  viewRowUser: {flexDirection: 'column', justifyContent: 'center'},
  customViewRowFunction: {
    width: '100%',
    height: 100,
    paddingHorizontal: 20,
    position: 'absolute',
    top: 180,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewBottom: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  viewRowFunction: {
    flexDirection: 'row',
    marginTop: 70,
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  customButtonFunction: {
    height: 80,
    width: 80,
    marginRight: 5,
  },
});
export default ProjectList;
