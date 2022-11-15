import React from 'react';
import {Image, Text, View, StyleSheet, Animated} from 'react-native';
import {icons, colors} from '../../Constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import StackHomeNavigation from './StackHomeNavigation/StackHomeNavigation';
import StackChatNavigation from './StackChatNavigation/StackChatNavigation';
import StackAccountNavigation from './StackAccountNavigation/StackAccountNavigation';
import StackNotificationNavigation from './StackNotificationNavigation/StackNotificationNavigation';
import StackWordListNavigation from './StackWordListNavigation/StackWordListNavigation';
import StackAreaNavigation from './StackHomeNavigation/StackAreaNavigation/StackAreaNavigation';

const Tab = createBottomTabNavigator();

const HomeNavigation = props => {
  const renderTabBar = (focused, icon, title) => {
    return (
      <View style={styles.view}>
        <Image
          source={icon}
          style={[
            {tintColor: focused ? colors.mainColor : 'black'},
            styles.image,
          ]}
          resizeMode="contain"
        />
        <Text
          style={[
            {color: focused ? colors.mainColor : 'rgb(119,119,119)'},
            styles.text,
          ]}>
          {title}
        </Text>
      </View>
    );
  };
  const renderMidButton = () => {
    return (
      <View style={styles.midButton}>
        <Image source={icons.ic_click} style={{width: 25, height: 25}} />
      </View>
    );
  };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {height: 90},
      })}
      initialRouteName="StackHomeNavigation">
      <Tab.Screen
        component={StackHomeNavigation}
        name={'StackHomeNavigation'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_home, 'trang chủ'),
        }}
      />
      <Tab.Screen
        component={StackChatNavigation}
        name={'StackChatNavigation'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_chats, 'Trò chuyện'),
        }}
      />
      <Tab.Screen
        component={StackWordListNavigation}
        name={'StackWordListNavigation'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) => renderMidButton(),
        }}
      />

      <Tab.Screen
        component={StackNotificationNavigation}
        name={'StackNotificationNavigation'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_bell, 'Thông báo'),
        }}
      />
      <Tab.Screen
        component={StackAccountNavigation}
        name={'StackAccountNavigation'}
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.mainColor,
          tabBarInactiveTintColor: 'rgb(119,119,119)',
          tabBarIcon: ({color, focused, size}) =>
            renderTabBar(focused, icons.ic_gear, 'Tài khoản'),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  view: {justifyContent: 'center', alignItems: 'center'},
  image: {width: 25, height: 25},
  text: {textAlign: 'center', fontSize: 14},
  midButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.mainColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeNavigation;
