import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  InventoryManagement,
  WarehouseManagement,
  ImportAndExportManagementList,
  ProjectManagement,
  ProjectList,
  ListOfSupplies,
  SuppliesInformation,
} from '../../../../Screens';
const Stack = createStackNavigator();
const StackWarehouseManagement = props => {
  return (
    <Stack.Navigator initialRouteName="WarehouseManagement">
      <Stack.Screen
        component={WarehouseManagement}
        name={'WarehouseManagement'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={InventoryManagement}
        name={'InventoryManagement'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ImportAndExportManagementList}
        name={'ImportAndExportManagementList'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ProjectManagement}
        name={'ProjectManagement'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ProjectList}
        name={'ProjectList'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ListOfSupplies}
        name={'ListOfSupplies'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={SuppliesInformation}
        name={'SuppliesInformation'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackWarehouseManagement;
