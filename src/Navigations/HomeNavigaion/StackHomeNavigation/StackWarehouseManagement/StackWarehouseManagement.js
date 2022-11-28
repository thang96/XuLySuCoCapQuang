import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  WarehouseManagement,
  StableWarehouse,
  DetailStableWarehouse,
  ListSupplies,
  DetailSupplies,
  CreateSupplies,
  ListInventoryReceivingVoucher,
  CreateAInventoryReceivingVoucher,
  DetailInventoryReceivingVoucher,
  UpdateInventoryReceivingVoucher,
  ListInventoryDeliveryVoucher,
  CreateAInventoryDeliveryVoucher,
  DetalInventoryDeliveryVoucher,
  UpdateInventoryDeliveryVoucher,
  ListInventoryControlVoucher,
  CreateInventoryControlVoucher,
  DetailInventoryControlVoucher,
  UpdateInventoryControlVoucher,
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
        component={StableWarehouse}
        name={'StableWarehouse'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailStableWarehouse}
        name={'DetailStableWarehouse'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ListSupplies}
        name={'ListSupplies'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailSupplies}
        name={'DetailSupplies'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CreateSupplies}
        name={'CreateSupplies'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ListInventoryReceivingVoucher}
        name={'ListInventoryReceivingVoucher'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CreateAInventoryReceivingVoucher}
        name={'CreateAInventoryReceivingVoucher'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailInventoryReceivingVoucher}
        name={'DetailInventoryReceivingVoucher'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={UpdateInventoryReceivingVoucher}
        name={'UpdateInventoryReceivingVoucher'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ListInventoryDeliveryVoucher}
        name={'ListInventoryDeliveryVoucher'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CreateAInventoryDeliveryVoucher}
        name={'CreateAInventoryDeliveryVoucher'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetalInventoryDeliveryVoucher}
        name={'DetalInventoryDeliveryVoucher'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={UpdateInventoryDeliveryVoucher}
        name={'UpdateInventoryDeliveryVoucher'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={ListInventoryControlVoucher}
        name={'ListInventoryControlVoucher'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={CreateInventoryControlVoucher}
        name={'CreateInventoryControlVoucher'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={DetailInventoryControlVoucher}
        name={'DetailInventoryControlVoucher'}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        component={UpdateInventoryControlVoucher}
        name={'UpdateInventoryControlVoucher'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackWarehouseManagement;
