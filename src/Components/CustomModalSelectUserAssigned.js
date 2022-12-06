import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import {colors, icons} from '../Constants';
import CustomButtonIcon from './CustomButtonIcon';
import CustomInput from './CustomInput';
const CustomModalSelectUserAssigned = props => {
  const {modalVisible, onRequestClose, data, onPress, closeModal} = props;
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => onPress(item)}>
        <Image
          style={styles.image}
          source={
            item?.avatar_img
              ? {
                  uri: `${item?.avatar_img}`,
                }
              : icons.ic_user
          }
        />
        <Text style={styles.title}>{item?.full_name}</Text>
      </TouchableOpacity>
    );
  };
  const filteredData = () =>
    data.filter(eachData =>
      eachData?.full_name
        ? eachData?.full_name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        : null,
    );
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    try {
      setRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View style={styles.container}>
          <View style={styles.eachContainer}>
            <CustomInput
              styleInput={{height: 50, marginVertical: 10, width: 300}}
              placeholder={'Tìm kiếm theo tên'}
              source={icons.ic_seach}
              value={search}
              onChangeText={test => setSearch(test)}
            />
            <CustomButtonIcon
              source={icons.ic_cancel}
              styleButton={styles.buttonClose}
              imageStyle={styles.imageButton}
              onPress={closeModal}
            />
            {filteredData().length > 0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                data={filteredData()}
                keyExtractor={key => key.id}
                renderItem={({item, index}) => renderItem(item, index)}
              />
            ) : (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.textWarning}>Không tìm thấy</Text>
              </View>
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
    height: 400,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 10,
    padding: 5,
    width: 300,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(119,119,119,0.5)',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {width: 50, height: 50, borderRadius: 50, marginRight: 5},
  textWarning: {fontSize: 16, fontWeight: '500', color: 'grey'},
  buttonClose: {
    position: 'absolute',
    top: -50,
    right: 0,
    left: 0,
    alignSelf: 'center',
    zIndex: 9999,
  },
  imageButton: {
    tintColor: 'white',
    width: 30,
    height: 30,
  },
});
export default CustomModalSelectUserAssigned;
