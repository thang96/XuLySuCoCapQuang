import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DocumentManagement} from '../../../../Screens';
const Stack = createStackNavigator();
const StackDocumentManagement = props => {
  return (
    <Stack.Navigator initialRouteName="DocumentManagement">
      <Stack.Screen
        component={DocumentManagement}
        name={'DocumentManagement'}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackDocumentManagement;
