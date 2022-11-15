import {useNavigation} from '@react-navigation/native';
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
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import {icons, colors, images} from '../../../Constants';

const DATA = [
  {title: 'Tất cả'},
  {title: 'Chưa đọc'},
  {title: 'Hệ thống'},
  {title: 'Bảo trì'},
  {title: 'Sự cố'},
];
const DATA_SYSTEM = [
  {
    title: 'Hệ thống',
    status: 'Yêu cầu xử lý thành công',
    content:
      'Yêu cầu số 123456 do bạn tiêp nhận và thực hiện đã hoàn thành vào lúc 28/09/2022 đã được xác nhân hoàn thành',
    time: '28/09/2022',
    id: 1,
    icon: icons.gear,
  },
  {
    title: 'Hệ thống',
    status: 'Yêu cầu xử lý thành công',
    content:
      'Yêu cầu số 123456 do bạn tiêp nhận và thực hiện đã hoàn thành vào lúc 27/09/2022 đã được xác nhân hoàn thành',
    time: '27/09/2022',
    id: 2,
    icon: icons.gear,
  },
  {
    title: 'Sự cố',
    status: 'Bạn có một công việc xử lý sự cố cần tiếp nhận',
    content:
      'Bạn có một yêu cầu công việc xử lý sự cố số 444999. Vui lòng tiếp nhận',
    time: '23/09/2022',
    id: 3,
    icon: icons.incidentManagement,
  },
  {
    title: 'Bảo trì',
    status: 'Bạn có một công việc xử lý bảo trì cần tiếp nhận',
    content:
      'Bạn có một yêu cầu công việc xử lý bảo trì số 000114. Vui lòng tiếp nhận',
    time: '20/09/2022',
    id: 4,
    icon: icons.report,
  },
];
const Notification = props => {
  const windowWidth = Dimensions.get('screen').width;
  const navigation = useNavigation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderHorizontal = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => setSelectedIndex(index)}
        style={[
          {
            backgroundColor:
              index == selectedIndex ? colors.purple : 'rgba(119,119,119,0.5)',
          },

          styles.buttonHorizontal,
        ]}>
        <Text
          style={[
            {
              color: index == selectedIndex ? 'white' : colors.grey,
            },
            styles.titleHorizontal,
          ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderItem = (item, index) => {
    return (
      <TouchableOpacity style={styles.renderButton}>
        <View style={styles.renderViewRow}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={item.icon}
              style={[
                {
                  tintColor:
                    item.title == 'Hệ thống'
                      ? colors.purple
                      : item.title == 'Sự cố'
                      ? 'blue'
                      : item.title == 'Bảo trì'
                      ? 'orange'
                      : 'black',
                },
                styles.renderIcon,
              ]}
            />
            <Text
              style={[
                {
                  color:
                    item.title == 'Hệ thống'
                      ? colors.purple
                      : item.title == 'Sự cố'
                      ? 'blue'
                      : item.title == 'Bảo trì'
                      ? 'orange'
                      : 'black',
                },
                styles.renderTitle,
              ]}>
              {item.title}
            </Text>
          </View>
          <Text style={{color: 'rgba(119,119,119,0.7)'}}>{item.time}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
          }}>
          <Text
            style={[
              {
                color:
                  item.title == 'Hệ thống'
                    ? colors.purple
                    : item.title == 'Sự cố'
                    ? 'blue'
                    : item.title == 'Bảo trì'
                    ? 'orange'
                    : 'black',
              },
              styles.renderStatus,
            ]}>
            {item.status}
          </Text>
          <Text style={styles.renderContent}>{item.content}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <CustomAppBar title={'Thông báo'} iconLeft={icons.gear} />
      <TouchableOpacity
        onPress={() => navigation.navigate('SettingNotification')}
        style={styles.buttonSetting}>
        <Image source={icons.gear} style={styles.iconGear} />
      </TouchableOpacity>
      <View style={styles.eachContainer}>
        <FlatList
          horizontal
          data={DATA}
          keyExtractor={key => key.title}
          renderItem={({item, index}) => renderHorizontal(item, index)}
        />
        <FlatList
          data={DATA_SYSTEM}
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
    paddingHorizontal: 10,
  },
  buttonSetting: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 30,
    height: 30,
  },
  iconGear: {width: 30, height: 30, tintColor: 'white'},
  buttonHorizontal: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 10,
    marginRight: 5,
    marginVertical: 10,
  },
  titleHorizontal: {fontSize: 16, fontWeight: '500'},
  renderButton: {
    borderRadius: 15,
    height: 200,
    backgroundColor: 'white',
    marginVertical: 10,
    elevation: 2,
    zIndex: 2,
  },
  renderViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(119,119,119,0.5)',
  },
  renderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  renderStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  renderContent: {
    fontSize: 14,
    fontWeight: '500',
  },
  renderIcon: {marginRight: 10, width: 30, height: 30},
});
export default Notification;
