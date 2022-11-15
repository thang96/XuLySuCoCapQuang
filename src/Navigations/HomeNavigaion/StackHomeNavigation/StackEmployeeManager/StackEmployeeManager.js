import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {EmployeeManager, EmployeeDetails} from '../../../../Screens';
const Stack = createStackNavigator();
const StackEmployeeManager = props => {
  return (
    <Stack.Navigator initialRouteName="EmployeeManager">
      <Stack.Screen
        component={EmployeeManager}
        name={'EmployeeManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EmployeeDetails}
        name={'EmployeeDetails'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackEmployeeManager;
