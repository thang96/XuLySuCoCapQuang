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
import CustomButtonFunction from '../../../../Components/CustomButtonFunction';
import {colors, icons} from '../../../../Constants';
import {useNavigation} from '@react-navigation/native';

const DocumentManagement = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();

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
          <Text style={styles.textQLKV}>Quản lý văn bản</Text>
        </View>
        <View style={[styles.viewBottom, {height: windowHeight - 270}]}>
          <View style={styles.viewRow}>
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.documentManagement}
              title={'Quản lý\nvăn bản'}
              titleColor={colors.purple}
              onPress={() => navigation.navigate('ContinueScreen')}
            />
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.contract}
              title={'Hợp đồng'}
              titleColor={colors.purple}
              onPress={() => navigation.navigate('ContinueScreen')}
            />
          </View>
          <View style={styles.viewRow}>
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.document}
              title={'Văn bản\nvật tư'}
              titleColor={colors.purple}
              onPress={() => navigation.navigate('ContinueScreen')}
            />
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.document}
              title={'Văn bản\ndự án'}
              titleColor={colors.purple}
              onPress={() => navigation.navigate('ContinueScreen')}
            />
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.document}
              title={'Văn bản\nchứng từ'}
              titleColor={colors.purple}
              onPress={() => navigation.navigate('ContinueScreen')}
            />
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.document}
              title={'Văn bản\nhóa đơn'}
              titleColor={colors.purple}
              onPress={() => navigation.navigate('ContinueScreen')}
            />
          </View>
          <View style={styles.viewRow}>
            <CustomButtonFunction
              styleView={styles.customButtonFunction}
              icon={icons.gear}
              title={'Quản trị'}
              titleColor={colors.purple}
              onPress={() => navigation.navigate('ContinueScreen')}
            />
          </View>
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
  customInput: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  textNews: {
    color: 'black',
    marginLeft: 15,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewRow: {
    height: 110,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    marginTop: 30,
    flexDirection: 'row',
  },
  customButtonFunction: {
    height: 80,
    width: 80,
    marginRight: 5,
  },
});
export default DocumentManagement;
