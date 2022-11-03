import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, ContinueScreen, News, ListNews} from '../../../Screens';
import StackIncidentManagement from './StackIncidentManagement/StackIncidentManagement';
import StackEmployeeManager from './StackEmployeeManager/StackEmployeeManager';
import StackMaintenanceManagement from './StackMaintenanceManagement/StackMaintenanceManagement';
import StackWarehouseManagement from './StackWarehouseManagement/StackWarehouseManagement';
import StackDocumentManagement from './StackDocumentManagement/StackDocumentManagement';
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
    </Stack.Navigator>
  );
};
export default StackHomeNavigation;
