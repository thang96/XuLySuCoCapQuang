import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NotificationScreens} from '../../../Screens';
const Stack = createStackNavigator();
const StackNotificationNavigation = props => {
  return (
    <Stack.Navigator initialRouteName="NotificationScreens">
      <Stack.Screen
        component={NotificationScreens}
        name={'NotificationScreens'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackNotificationNavigation;
