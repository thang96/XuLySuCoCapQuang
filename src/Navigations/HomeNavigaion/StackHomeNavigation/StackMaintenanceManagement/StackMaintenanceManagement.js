import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  MaintenanceManagement,
  FiberOpticCableManagement,
  MaintenanceList,
  FiberOpticCableDetail,
  DetailUser,
  DetailOpticCable,
  CreateAMaintenanceRequest,
  AcceptMaintenanceRequests,
  DetailMaintenanceRequests,
  ReportMaintenance,
  CreateNewCableRoute,
  FibelOpticCableDetail,
  ReportMaintenanceDetail,
} from '../../../../Screens';
const Stack = createStackNavigator();
const StackMaintenanceManagement = props => {
  return (
    <Stack.Navigator initialRouteName="MaintenanceManagement">
      <Stack.Screen
        component={MaintenanceManagement}
        name={'MaintenanceManagement'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={FiberOpticCableManagement}
        name={'FiberOpticCableManagement'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={MaintenanceList}
        name={'MaintenanceList'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={FiberOpticCableDetail}
        name={'FiberOpticCableDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailUser}
        name={'DetailUser'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailOpticCable}
        name={'DetailOpticCable'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CreateAMaintenanceRequest}
        name={'CreateAMaintenanceRequest'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AcceptMaintenanceRequests}
        name={'AcceptMaintenanceRequests'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailMaintenanceRequests}
        name={'DetailMaintenanceRequests'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ReportMaintenance}
        name={'ReportMaintenance'}
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
      <Stack.Screen
        component={ReportMaintenanceDetail}
        name={'ReportMaintenanceDetail'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackMaintenanceManagement;
