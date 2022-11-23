import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import {icons, colors, images} from '../../../Constants';
import {ReadNotificationAPI} from '../../../Api/NotificationAPI/NotificationAPI';
import {useSelector} from 'react-redux';
import uuid from '../../../utils/uuid';

const NotificationScreens = props => {
  const windowWidth = Dimensions.get('screen').width;
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector(state => state?.token?.token);
  const isFocused = useIsFocused();
  useEffect(() => {
    getResult();
  }, [isFocused]);
  const getResult = async () => {
    await ReadNotificationAPI(token)
      .then(res => {
        if (res?.status == 200 && res?.data?.success == true) {
          setResult(res?.data?.data);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  const renderItem = (item, index) => {
    return (
      <View style={styles.buttonNotifi}>
        <Text style={styles.titleNotifi}>{item?.notify_title}</Text>
        <View style={styles.line} />
        <Text style={styles.contentNotifi}>{item?.notify_body}</Text>
        <Text
          style={styles.timeNotifi}>{`Thời gian : ${item?.created_time}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomAppBar title={'Thông báo'} />
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingNotification')}
        style={styles.buttonSetting}>
        <Image source={icons.gear} style={styles.iconGear} />
      </TouchableOpacity>
      <View style={styles.eachContainer}>
        <FlatList
          keyExtractor={uuid}
          data={result}
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
    paddingHorizontal: 10,
  },
  buttonSetting: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 30,
    height: 30,
  },
  buttonNotifi: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginVertical: 20,
  },
  titleNotifi: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.mainColor,
    alignSelf: 'center',
  },
  contentNotifi: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  timeNotifi: {
    fontSize: 14,
    color: 'black',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.mainColor,
    marginVertical: 5,
  },
});
export default NotificationScreens;
