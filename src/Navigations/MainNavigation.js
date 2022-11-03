import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Splash} from '../Screens';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import LoginNavigation from './LoginNavigation/LoginNavigation';
import HomeNavigation from './HomeNavigaion/HomeNavigation';

const MainNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Splash}
        name={'Splash'}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={LoginNavigation}
        name={'LoginNavigation'}
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={HomeNavigation}
        name={'HomeNavigation'}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default MainNavigation;
