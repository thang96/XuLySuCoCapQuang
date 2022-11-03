import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatScreen, DetailChat, ContinueScreen} from '../../../Screens';
const Stack = createStackNavigator();
const StackChatNavigation = () => {
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
export default StackChatNavigation;
