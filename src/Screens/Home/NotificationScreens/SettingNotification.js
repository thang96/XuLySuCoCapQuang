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
  Switch,
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import {colors, icons, images} from '../../../Constants';
const SettingNotification = props => {
  const navigation = useNavigation();
  const [notification, setNotification] = useState(false);
  const [notificationSystem, setNotificationSystem] = useState(false);
  const [notificationBreakdown, setNotificationBreakdown] = useState(false);
  const [notificationMaintenance, setNotificationMaintenance] = useState(false);
  const [notificationChat, setNotificationChat] = useState(false);
  return (
    <View style={styles.container}>
      <CustomAppBar
        title={'Cài đặt thông báo'}
        iconsLeft={icons.back}
        onPressIconsLeft={() => navigation.goBack()}
      />
      <View style={styles.eachContainer}>
        <View style={styles.viewRowNotify}>
          <Text style={styles.title}>Thông báo</Text>
          <Switch
            ios_backgroundColor="#3e3e3e"
            trackColor={{false: '#767577', true: colors.purple}}
            thumbColor={'#f4f3f4'}
            onValueChange={prev =>
              setNotification(prev => (prev == false ? true : false))
            }
            value={notification}
          />
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.title}>Thông báo hệ thống</Text>
          <Switch
            ios_backgroundColor="#3e3e3e"
            trackColor={{false: '#767577', true: colors.purple}}
            thumbColor={'#f4f3f4'}
            onValueChange={prev =>
              setNotificationSystem(prev => (prev == false ? true : false))
            }
            value={notificationSystem}
          />
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.title}>Thông báo sự cố</Text>
          <Switch
            ios_backgroundColor="#3e3e3e"
            trackColor={{false: '#767577', true: colors.purple}}
            thumbColor={'#f4f3f4'}
            onValueChange={prev =>
              setNotificationBreakdown(prev => (prev == false ? true : false))
            }
            value={notificationBreakdown}
          />
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.title}>Thông báo bảo trì</Text>
          <Switch
            ios_backgroundColor="#3e3e3e"
            trackColor={{false: '#767577', true: colors.purple}}
            thumbColor={'#f4f3f4'}
            onValueChange={prev =>
              setNotificationMaintenance(prev => (prev == false ? true : false))
            }
            value={notificationMaintenance}
          />
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.title}>Thông báo trò chuyện</Text>
          <Switch
            ios_backgroundColor="#3e3e3e"
            trackColor={{false: '#767577', true: colors.purple}}
            thumbColor={'#f4f3f4'}
            onValueChange={prev =>
              setNotificationChat(prev => (prev == false ? true : false))
            }
            value={notificationChat}
          />
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
  viewRowNotify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: 'grey',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
});
export default SettingNotification;
