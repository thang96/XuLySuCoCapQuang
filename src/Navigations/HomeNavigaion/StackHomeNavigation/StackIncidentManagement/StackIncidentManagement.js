import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  IncidentManagement,
  CreateNewRequest,
  AcceptRequests,
  IncidentList,
  IncidentDetail,
  EditIncident,
  DetailUserIncident,
  DetailOpticCableIncident,
  ReportIncident,
  ReportIncidentDetail,
  CompilationOfCrashReports,
  DetailOfCrashReports,
  CableRouteReport,
} from '../../../../Screens';
const Stack = createStackNavigator();
const StackIncidentManagement = props => {
  return (
    <Stack.Navigator initialRouteName="IncidentManagement">
      <Stack.Screen
        component={IncidentManagement}
        name={'IncidentManagement'}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={CreateNewRequest}
        name={'CreateNewRequest'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={AcceptRequests}
        name={'AcceptRequests'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={IncidentList}
        name={'IncidentList'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={IncidentDetail}
        name={'IncidentDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={EditIncident}
        name={'EditIncident'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailUserIncident}
        name={'DetailUserIncident'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailOpticCableIncident}
        name={'DetailOpticCableIncident'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ReportIncident}
        name={'ReportIncident'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ReportIncidentDetail}
        name={'ReportIncidentDetail'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CableRouteReport}
        name={'CableRouteReport'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CompilationOfCrashReports}
        name={'CompilationOfCrashReports'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailOfCrashReports}
        name={'DetailOfCrashReports'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackIncidentManagement;
