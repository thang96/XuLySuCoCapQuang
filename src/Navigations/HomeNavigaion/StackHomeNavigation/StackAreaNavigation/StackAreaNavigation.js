import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AreaManagement, DetailArea, DetailAreaUser} from '../../../../Screens';
const Stack = createStackNavigator();
const StackAreaNavigation = props => {
  return (
    <Stack.Navigator initialRouteName="AreaManagement">
      <Stack.Screen
        name="AreaManagement"
        component={AreaManagement}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailArea"
        component={DetailArea}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailAreaUser"
        component={DetailAreaUser}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default StackAreaNavigation;
