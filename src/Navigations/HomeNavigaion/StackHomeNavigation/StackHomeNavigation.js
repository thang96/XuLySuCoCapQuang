import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  HomeScreen,
  ContinueScreen,
  WordList,
  ShowImageScreen,
} from '../../../Screens';
import StackIncidentManagement from './StackIncidentManagement/StackIncidentManagement';
import StackEmployeeManager from './StackEmployeeManager/StackEmployeeManager';
import StackMaintenanceManagement from './StackMaintenanceManagement/StackMaintenanceManagement';
import StackAreaNavigation from './StackAreaNavigation/StackAreaNavigation';
import StackFiberOpticCableManagement from './StackFiberOpticCableManagement/StackFiberOpticCableManagement';
import StackWarehouseManagement from './StackWarehouseManagement/StackWarehouseManagement';

const Stack = createStackNavigator();
const StackHomeNavigation = props => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        component={HomeScreen}
        name={'HomeScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ShowImageScreen}
        name={'ShowImageScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={WordList}
        name={'WordList'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ContinueScreen}
        name={'ContinueScreen'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={StackIncidentManagement}
        name={'StackIncidentManagement'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={StackEmployeeManager}
        name={'StackEmployeeManager'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={StackMaintenanceManagement}
        name={'StackMaintenanceManagement'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={StackAreaNavigation}
        name={'StackAreaNavigation'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={StackFiberOpticCableManagement}
        name={'StackFiberOpticCableManagement'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={StackWarehouseManagement}
        name={'StackWarehouseManagement'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackHomeNavigation;
