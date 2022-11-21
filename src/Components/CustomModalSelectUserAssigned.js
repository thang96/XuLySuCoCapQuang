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
import {icons} from '../Constants';
import CustomInput from './CustomInput';
const CustomModalSelectUserAssigned = props => {
  const {modalVisible, onRequestClose, data, onPress} = props;
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
        .toLocaleLowerCase()
        .includes(search.toLocaleLowerCase()),
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
            {/* <FlatList
              data={data}
              key={key => key?.id}
              renderItem={({item, index}) => renderItem(item, index)}
            /> */}
            <CustomInput
              styleInput={{height: 50, marginVertical: 10, width: 300}}
              placeholder={'Tìm kiếm nhân viên'}
              source={icons.ic_seach}
              value={search}
              onChangeText={test => setSearch(test)}
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
                <Text style={styles.textWarning}>Không tìm thấy nhân viên</Text>
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
    height: 300,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(119,119,119,0.5)',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {width: 50, height: 50, borderRadius: 50, marginRight: 5},
  textWarning: {fontSize: 16, fontWeight: '500', color: 'grey'},
});
export default CustomModalSelectUserAssigned;
