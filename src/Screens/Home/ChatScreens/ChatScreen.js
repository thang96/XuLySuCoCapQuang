import {useNavigation} from '@react-navigation/native';
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
  ScrollView,
} from 'react-native';
import CustomAppBar from '../../../Components/CustomAppBar';
import {icons, colors, images} from '../../../Constants';
import CustomTwoButtonFunction from '../../../Components/CustomTwoButtonFunction';
import CustomInput from '../../../Components/CustomInput';
const FAKE_DATA_Chat = [
  {
    name: 'Nguyễn Văn A',
    chat: 'được a ơi',
    icon: icons.user,
    time: '14:03',
    chatLength: 4,
    id: 1,
  },
  {
    name: 'Nguyễn Văn B',
    chat: 'chưa xong a ơi',
    icon: icons.gear,
    time: '12:10',
    chatLength: 2,
    id: 2,
  },
  {
    name: 'Nguyễn Văn C',
    chat: 'alo, a còn ở đấy ko',
    icon: icons.bell,
    time: '10:03',
    chatLength: 5,
    id: 3,
  },
  {
    name: 'Nguyễn Văn D',
    chat: 'nay làm chỗ nào a',
    icon: icons.user,
    time: '09:03',
    chatLength: 0,
    id: 4,
  },
  {
    name: 'Nguyễn Văn E',
    chat: 'ok',
    icon: icons.user,
    time: '08:33',
    chatLength: 0,
    id: 5,
  },
  {
    name: 'Nguyễn Văn F',
    chat: 'dậy chưa a ơi',
    icon: icons.user,
    time: '09:03',
    chatLength: 1,
    id: 6,
  },
];
const FAKE_DATA_AREA_STAFF = [
  {
    name: 'QLKV_Quyết',
    sdt: '0943745858',
    id: 1,
    icon: icons.documentManagement,
  },
  {name: 'KS_Tiến', sdt: '0333778585', id: 2, icon: icons.home},
  {name: 'KS_Hoàng', sdt: '01685123497', id: 3, icon: icons.email},
  {name: 'Đức Anh', sdt: '0848556965', id: 4, icon: icons.hidden},
];
const ChatScreen = props => {
  const {choose} = props;
  const [isChoose, setIsChoose] = useState(null);
  useEffect(() => {
    choose ? setIsChoose(choose) : setIsChoose(true);
  }, []);
  return (
    <View style={styles.container}>
      <CustomAppBar title={'Trò chuyện'} />
      <CustomTwoButtonFunction
        labelLeft={'Trò chuyện'}
        labelRight={'Yêu cầu hỗ trợ'}
        isChoose={isChoose}
        onPressLeftButton={() => {
          setIsChoose(true);
        }}
        onPressRightButton={() => {
          setIsChoose(false);
        }}
      />
      {isChoose ? <ClassChat /> : <RequireToBeSupported />}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
export default ChatScreen;

const ClassChat = props => {
  const navigation = useNavigation();
  const renderStaff = (item, index) => {
    return (
      <TouchableOpacity style={styleClassChat.renderStaffButton}>
        <Image
          source={item.icon}
          resizeMode={'cover'}
          style={styleClassChat.renderStaffImage}
        />
        <Text style={styleClassChat.renderStaffName}>{item.name}</Text>
        <Text style={styleClassChat.renderStaffSDT}>{item.sdt}</Text>
      </TouchableOpacity>
    );
  };
  const renderChat = (item, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailChat', {item});
        }}
        style={styleClassChat.renderChatButton}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={{height: 50, width: 50, marginRight: 5}}
            source={item.icon}
          />
          <View style={{width: 150}}>
            <Text
              style={{color: colors.purple, fontWeight: 'bold'}}
              numberOfLines={1}>
              {item.name}
            </Text>
            <Text numberOfLines={1}>{item.chat}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'black'}}>{item.time}</Text>
          {item.chatLength > 0 && (
            <View style={styleClassChat.renderChatLength}>
              <Text style={{color: 'white', fontSize: 12}}>
                {item.chatLength}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styleClassChat.container}>
      <CustomInput
        placeholder={'Tìm kiếm(Tên,SĐT...)'}
        styleInput={styleClassChat.customInput}
        source={icons.seach}
      />
      <Text style={styleClassChat.title}>Danh sách nhân viên khu vực</Text>
      <View style={{height: 100}}>
        <FlatList
          horizontal
          data={FAKE_DATA_AREA_STAFF}
          keyExtractor={key => key.id}
          renderItem={({item, index}) => renderStaff(item, index)}
        />
      </View>
      <Text style={styleClassChat.title}>Trò chuyện gần đây</Text>
      <FlatList
        data={FAKE_DATA_Chat}
        keyExtractor={key => key.id}
        renderItem={({item, index}) => renderChat(item, index)}
      />
    </View>
  );
};
const styleClassChat = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },
  customInput: {
    height: 50,
    marginVertical: 20,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  renderStaffButton: {
    width: 100,
    height: 100,
    marginRight: 5,
    alignItems: 'center',
  },
  renderStaffImage: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginBottom: 2,
  },
  renderStaffName: {
    color: colors.purple,
    fontWeight: '500',
    fontSize: 14,
  },
  renderStaffSDT: {fontSize: 14, color: colors.grey},
  renderChatButton: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  renderChatLength: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
});
const FAKE_DATA_REQUIRE = [
  {
    icon: icons.home,
    title: 'Xử lý sự cố',
    time: '28/06/2022',
    status:
      'Xử lý sự cố số : 132456789\nQuá hạn ngày ; 14/02/2022\nThời gian quá hạn : 31 ngày\nNhân sự xử lý : Nguyễn Văn A\nTrạng thái công việc : Quá hạn',
    id: 2,
  },
  {
    icon: icons.home,
    title: 'Xử lý sự cố',
    time: '24/06/2022',
    status:
      'Xử lý sự cố số : 987654321\nQuá hạn ngày ; 24/03/2022\nThời gian quá hạn : 11 ngày\nNhân sự xử lý : Nguyễn Văn A\nTrạng thái công việc : Quá hạn',
    id: 1,
  },
  {
    icon: icons.key,
    title: 'Xử lý sự cố',
    time: '24/03/2022',
    status:
      'Xử lý sự cố số : 132456789\nQuá hạn ngày ; 14/02/2022\nThời gian quá hạn : 0 ngày\nNhân sự xử lý : Nguyễn Văn B\nTrạng thái công việc : Đã hoàn thành',
    id: 3,
  },
  {
    icon: icons.incidentManagement,
    title: 'Xử lý yêu cầu',
    time: '28/09/2022',
    status:
      'Xử lý sự cố số : 1111112312\nQuá hạn ngày ; 14/08/2022\nThời gian quá hạn : 0 ngày\nNhân sự xử lý : Nguyễn Văn C\nTrạng thái công việc : Đang xử lý',
    id: 4,
  },
];

const RequireToBeSupported = props => {
  const renderDetailChat = (item, index) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 15,
          height: 160,
          marginVertical: 10,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            resizeMode="cover"
            source={item.icon}
            style={{width: 40, height: 40, borderRadius: 40, marginRight: 5}}
          />
          <View>
            <Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>
              {item.title}
            </Text>
            <Text style={{color: 'black', fontWeight: 'normal'}}>
              {item.status}
            </Text>
          </View>
        </View>
        <View style={{justifyContent: 'space-between'}}>
          <Text style={{color: colors.grey, fontWeight: 'normal'}}>
            {item.time}
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styleRequire.container}>
      <FlatList
        data={FAKE_DATA_REQUIRE}
        keyExtractor={key => key.id}
        renderItem={({item, index}) => renderDetailChat(item, index)}
      />
    </View>
  );
};
const styleRequire = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 10,
  },
});
