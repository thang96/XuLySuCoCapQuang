import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  FiberOpticCableManagement,
  CreateNewCableRoute,
  FibelOpticCableDetail,
} from '../../../../Screens';
const Stack = createStackNavigator();
const StackFiberOpticCableManagement = props => {
  return (
    <Stack.Navigator initialRouteName="FiberOpticCableManagement">
      <Stack.Screen
        component={FiberOpticCableManagement}
        name={'FiberOpticCableManagement'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CreateNewCableRoute}
        name={'CreateNewCableRoute'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={FibelOpticCableDetail}
        name={'FibelOpticCableDetail'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackFiberOpticCableManagement;
