import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Modal,
} from 'react-native';
import CustomAppBar from '../../../../../Components/CustomAppBar';
import {colors, icons, images} from '../../../../../Constants';
import CustomInput from '../../../../../Components/CustomInput';
import CustomButtonText from '../../../../../Components/CustomTextButton';
import {useNavigation} from '@react-navigation/native';
import CustomButtonIcon from '../../../../../Components/CustomButtonIcon';

const FAKE_DATA = [
  {name: 'Cáp AA', type: 'Nhập', id: 1},
  {name: 'Cáp AAA', type: 'Xuất', id: 2},
  {name: 'Dây thừng 100m', type: 'Nhập', id: 3},
];
const ImportAndExportManagementList = props => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity style={[styles.viewRowChildren, {marginTop: 20}]}>
        <Text>{item.name}</Text>
        <Text>{item.type}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
            backgroundColor: 'white',
          }}>
          <TouchableOpacity
            style={{width: 150, borderWidth: 5}}
            onPress={() => setModalVisible(false)}>
            <Text>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <CustomAppBar
        iconsLeft={icons.back}
        title={'Danh sách nhập/xuất'}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <View style={styles.viewRow}>
          <CustomInput
            disabled={true}
            styleInput={{flex: 1}}
            placeholder={'Tìm kiếm công việc'}
            source={icons.seach}
          />
        </View>
        <View style={styles.viewRowParents}>
          <Text style={styles.title}>Lọc</Text>
          <Text style={{color: colors.purple}}>Lưu điều kiện lọc</Text>
        </View>
        <View style={[styles.viewRowParents]}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              height: 50,
              width: 200,
              backgroundColor: 'white',
              borderRadius: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 20,
            }}>
            <Text style={{color: 'black', fontSize: 16}}>Chọn đối tượng</Text>
            <Image source={icons.down} style={{width: 20, height: 20}} />
          </TouchableOpacity>
          <View style={{height: 50}}>
            <CustomButtonIcon source={icons.plus} />
          </View>
        </View>
        <View style={styles.viewRowParents}>
          <Text style={styles.textTitle}>Tên văn bản</Text>
          <Text style={styles.textTitle}>Loại nghiệp vụ</Text>
          <Text />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={FAKE_DATA}
            keyExtractor={key => key.id}
            renderItem={({item, index}) => renderItem(item, index)}
          />
        </View>
        <View
          style={[styles.viewRowParents, {height: 30, alignItems: 'center'}]}>
          <Text>{`Tổng số : ${FAKE_DATA.length}`}</Text>
          <TouchableOpacity style={styles.buttonRowBottom}>
            <Image source={icons.edit} style={{width: 20, height: 20}} />
            <Text style={{color: colors.purple}}>Kết xuất báo cáo</Text>
          </TouchableOpacity>
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
  },
  styleButton: {
    height: 50,
    width: 70,
    marginStart: 10,
    backgroundColor: 'rgb(147,148,149)',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50,
    marginBottom: 10,
  },
  viewRow: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
    marginVertical: 10,
  },
  customButtonText: {
    height: 50,
    width: 120,
    backgroundColor: colors.purple,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  viewRowParents: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  textTitle: {
    color: colors.grey,
    fontWeight: '700',
    fontSize: 18,
  },
  viewRowChildren: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  textTitleChildren: {
    color: colors.grey,
    fontWeight: '700',
    fontSize: 16,
  },
  buttonRowBottom: {flexDirection: 'row', alignItems: 'center'},
});
export default ImportAndExportManagementList;
