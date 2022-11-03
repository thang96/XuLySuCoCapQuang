import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {WordList, WorkDetails, ReportWork} from '../../../Screens';
const Stack = createStackNavigator();
const StackWordListNavigation = props => {
  return (
    <Stack.Navigator initialRouteName="Notification">
      <Stack.Screen
        component={WordList}
        name={'WordList'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={WorkDetails}
        name={'WorkDetails'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ReportWork}
        name={'ReportWork'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackWordListNavigation;
