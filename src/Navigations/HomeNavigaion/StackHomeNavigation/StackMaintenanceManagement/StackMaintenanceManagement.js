import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  MaintenanceManagement,
  MaintenanceList,
  MaintenanceDetail,
  DetailUser,
  DetailOpticCable,
  CreateAMaintenanceRequest,
  AcceptMaintenanceRequests,
  ReportMaintenance,
  ReportMaintenanceDetail,
  MaintenanceCableRouteReport,
  GeneralMaintenanceReport,
  DetailedMaintenanceReport,
  EditMaintenance,
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
        component={MaintenanceList}
        name={'MaintenanceList'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={MaintenanceDetail}
        name={'MaintenanceDetail'}
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
        component={EditMaintenance}
        name={'EditMaintenance'}
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
        component={ReportMaintenance}
        name={'ReportMaintenance'}
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
      <Stack.Screen
        component={MaintenanceCableRouteReport}
        name={'MaintenanceCableRouteReport'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={GeneralMaintenanceReport}
        name={'GeneralMaintenanceReport'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailedMaintenanceReport}
        name={'DetailedMaintenanceReport'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackMaintenanceManagement;
