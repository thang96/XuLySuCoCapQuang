import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AccountScreen,
  Personalinformation,
  AppSetting,
  ChangePassword,
} from '../../../Screens';
const Stack = createStackNavigator();
const StackAccountNavigation = props => {
  return (
    <Stack.Navigator initialRouteName="AccountScreen">
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Personalinformation"
        component={Personalinformation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AppSetting"
        component={AppSetting}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default StackAccountNavigation;
