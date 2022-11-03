import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Notification,
  SettingNotification,
  ContinueScreen,
} from '../../../Screens';
const Stack = createStackNavigator();
const StackNotificationNavigation = props => {
  return (
    <Stack.Navigator initialRouteName="ContinueScreen">
      <Stack.Screen
        component={ContinueScreen}
        name={'ContinueScreen'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackNotificationNavigation;
