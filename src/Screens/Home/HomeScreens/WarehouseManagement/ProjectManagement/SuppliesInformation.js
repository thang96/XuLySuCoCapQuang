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
import {colors, icons, images} from '../../../../../Constants';
import CustomInput from '../../../../../Components/CustomInput';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomAppBar from '../../../../../Components/CustomAppBar';
const SuppliesInformation = props => {
  const navigation = useNavigation();
  const route = useRoute();
  console.log(route.params.item);
  const [nameSupplies, setNameSupplies] = useState('');
  const [amount, setAmount] = useState('');
  useEffect(() => {
    setNameSupplies(route.params.item.name ?? '');
    setAmount(route.params.item.amount ?? '');
  }, []);
  return (
    <View style={styles.container}>
      <CustomAppBar
        iconsLeft={icons.back}
        title={'Thông tin vật tư'}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <Text style={styles.title}>{nameSupplies}</Text>
        <Image
          resizeMode="cover"
          source={images.splashPurple}
          style={{width: '100%', height: 200}}
        />
        <View style={[styles.viewRow, {marginTop: 20}]}>
          <Text style={styles.normalTitle}>Số lượng</Text>
          <Text style={styles.normalTitle}>{amount}</Text>
        </View>

        <View style={[styles.viewRow, {marginTop: 20}]}>
          <Text style={styles.normalTitle}>Mã vật tư</Text>
          <Text style={styles.normalTitle}>{'A12345'}</Text>
        </View>
        <View style={[styles.viewRow, {marginTop: 20}]}>
          <Text style={styles.normalTitle}>Mô tả</Text>
          <Text style={styles.normalTitle}>{'Dây nhập khẩu từ Đức'}</Text>
        </View>
        <View style={[styles.viewRow, {marginTop: 20}]}>
          <Text style={styles.normalTitle}>Đặc tính</Text>
          <Text style={styles.normalTitle}>{'Chịu nhiệt tốt'}</Text>
        </View>
        <View style={[styles.viewRow, {marginTop: 20}]}>
          <Text style={styles.normalTitle}>Hạn mức tồn kho</Text>
          <Text style={styles.normalTitle}>{'500'}</Text>
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
  eachContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: '900',
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  normalTitle: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'normal',
  },
});
export default SuppliesInformation;
