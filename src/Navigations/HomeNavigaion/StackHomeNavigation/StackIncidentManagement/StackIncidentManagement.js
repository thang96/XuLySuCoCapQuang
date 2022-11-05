import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  IncidentManagement,
  InformationListOfCableRoutes,
  CableRouteDetails,
  IncidentHistory,
  CreateCableRoute,
  CreateNewRequest,
  AcceptRequests,
  DetailRequest,
  IncidentList,
  IncidentDetail,
  DetailUserIncident,
  DetailOpticCableIncident,
  ReportIncident,
  ReportIncidentDetail,
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
        component={InformationListOfCableRoutes}
        name={'InformationListOfCableRoutes'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CableRouteDetails}
        name={'CableRouteDetails'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CreateCableRoute}
        name={'CreateCableRoute'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={IncidentHistory}
        name={'IncidentHistory'}
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
        component={DetailRequest}
        name={'DetailRequest'}
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
    </Stack.Navigator>
  );
};
export default StackIncidentManagement;
